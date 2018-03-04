<?php

namespace lemariva\AdsenseKit;

use Pagekit\Application as App;
use Pagekit\Module\Module;
use lemariva\AdsenseKit\Plugin\AdsenseKitPlugin;
use lemariva\AdsenseKit\Model\Ads;


class AdsModule extends Module {
	/**
	 * {@inheritdoc}
	 */
	public function main (App $app) {

		$app->subscribe(
			new AdsenseKitPlugin()
		);
	}


  /**
   * @param App   $app
   * @param int   $ad_id
   * @param array $options
   * @param null  $view
   * @return mixed
   */
	public function renderAd (App $app, $ad_id, $options = [], $view = null) {
		$user = $app->user();
		/** @var Ads $ads */
		if (!$ads = Ads::where(['id = ?'], [$ad_id])->where(
			function ($query) use ($user) {
				if (!$user->isAdministrator())
					$query->where('status = 2');
				}
				)->first()) {
			throw new App\Exception('Ad not found', 404) ;
		}

		$ads->prepareView($app, $this);

		//return $app->view($view ?: 'lemariva/adsensekit:views/adskit-site.php');
		 return $app->view()->render('lemariva/adsensekit:views/adskit-site.php', ['id' => $ad_id]);
	}
}
