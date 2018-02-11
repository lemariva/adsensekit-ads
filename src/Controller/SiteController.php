<?php

namespace lemariva\AdsenseKit\Controller;

use Pagekit\Application as App;
use lemariva\AdsenseKit\Model\Ads;

class SiteController {

	/**
	 * @Route("/{id}", name="ads/front")
	 */
	public function adsAction ($id = 0) {
		if (!$ads = App::module('lemariva/adsensekit')) {
			return 'AdsenseKit extension is disabled!';
		}

		$user = App::user();
		/** @var Ads $ads */


		if (!$ads = Ads::where(['id = ?'], [$id])->first()) {
			App::abort(404, __('Ads not found!'));
		}

		if (!App::node()->hasAccess(App::user())) {
			App::abort(403, __('Insufficient User Rights.'));
		}
		$app = App::getInstance();

		$ads->prepareView($app, $ads);

		return [
			'$view' => [
				'title' => __($ads->title),
				'name' => 'lemariva/adsensekit:views/adskit-site.php'
			],
			'node' => App::node()
		];

	}

}
