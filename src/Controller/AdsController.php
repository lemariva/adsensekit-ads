<?php

namespace lemariva\AdsenseKit\Controller;

use Pagekit\Application as App;
use Pagekit\Kernel\Exception\NotFoundException;
use lemariva\AdsenseKit\Model\Ads;

/**
 * @Access("adsensekit: manage ads", admin=true)
 * @Route("ads", name="ads")
 */
class AdsController {

	/**
	 * @Route("/edit", name="edit")
	 * @Request({"id": "int"})
	 */
	public function editAction ($id = 0) {
		$adsensekit = App::module('lemariva/adsensekit');

		if (!$ad = Ads::find($id)) {
			$ad = Ads::create([
					'user_id' => App::user()->id,
					'status' => Ads::STATUS_DRAFT,
					'date_start' => new \DateTime(),
					'date_end' => new \DateTime()
			]);

		}

		if (!$ad) {
			throw new NotFoundException(__('Ad not found.'));
		}

		return [
			'$view' => [
				'title' => __('Ads'),
				'name' => 'lemariva/adsensekit:views/admin/adskit-edit.php'
			],
			'$data' => [
				'config' => $adsensekit->config(),
				'ad' => $ad,
				'statuses' => Ads::getStatuses(),
				'adstypes' => Ads::getAdsType()
			]
		];
	}

}
