<?php

namespace lemariva\AdsenseKit\Controller;

use Pagekit\Application as App;
use lemariva\AdsenseKit\Model\Ads;

/**
 * @Access(admin=true)
 */
class AdsenseKitController {
	/**
	 * @Route("/", methods="GET")
	 */
	public function indexAction () {
        $ads = App::module('lemariva/adsensekit');

		return [
			'$view' => [
				'title' => __('AdsenseKit'),
				'name' => 'lemariva/adsensekit:views/admin/adskit-index.php'
			],
			'$data' => [
				'config' => $ads->config(),
				'statuses' => Ads::getStatuses()
			]
		];
	}

}
