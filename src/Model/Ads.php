<?php

namespace lemariva\AdsenseKit\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@adsensekit_ads",eventPrefix="adsensekit_ads")
 */
class Ads implements \JsonSerializable {
	use AdsModelTrait;

	/* ad types */
	const AD_TYPE_ADSENSE = 0;
	const AD_TYPE_IMAGE = 1;

	/* ad draft status. */
	const STATUS_DRAFT = 0;

	/* ad pending review status. */
	const STATUS_PENDING_REVIEW = 1;

	/* ad published. */
	const STATUS_PUBLISHED = 2;

	/* ad unpublished. */
	const STATUS_UNPUBLISHED = 3;

	/** @Column(type="integer") @Id */
	public $id;

	/** @Column(type="integer") */
	public $status = 0;

	/** @Column(type="integer") */
	public $user_id;

	/**
	 * @BelongsTo(targetEntity="Pagekit\User\Model\User", keyFrom="user_id")
	 */
	public $user;

	/** @Column(type="string") */
	public $title;

	/** @Column(type="string") */
	public $slug;

	/** @Column(type="integer") */
	public $priority = 0;

	/** @Column(type="integer") */
	public $adtype = 0;

	/** @Column(type="string") */
	public $adsrc_img = '';

	/** @Column(type="string") */
	public $adurl_img = '';

	/** @Column(type="string") */
	public $adformat_adsense = '';

	/** @Column(type="string") */
	public $adlayoutkey_adsense = '';

	/** @Column(type="string") */
	public $adclient_adsense = '';

	/** @Column(type="string") */
	public 	$adslot_adsense = '';

	/** @Column(type="datetime") */
	public $date_start;

	/** @Column(type="datetime") */
	public $date_end;

	public static function getStatuses()
	{
			return [
					self::STATUS_PUBLISHED => __('Published'),
					self::STATUS_UNPUBLISHED => __('Unpublished'),
					self::STATUS_DRAFT => __('Draft'),
					self::STATUS_PENDING_REVIEW => __('Pending Review')
			];
	}

	public static function getAdsType()
	{
		return [
			self::AD_TYPE_ADSENSE => __('Adsense'),
			self::AD_TYPE_IMAGE => __('Image')
		];
	}

	public function getStatusText()
	{
			$statuses = self::getStatuses();

			return isset($statuses[$this->status]) ? $statuses[$this->status] : __('Unknown');
	}

	public function getAdsText()
	{
			$adstypes = self::getAdsType();

			return isset($adstypes[$this->adtype]) ? $adstypes[$this->adtype] : __('Unknown');
	}

	public function getAuthor()
	{
			return $this->user ? $this->user->username : null;
	}

	public function isPublished()
	{
			return $this->status === (self::STATUS_PUBLISHED) && ($this->date_start < new \DateTime) && ($this->date_end > new \DateTime);
	}

	/**
	 * Prepare form for display
	 * @param App $app
	 * @param \lemariva\AdsenseKit\AdsModule $adsensekit
	 */
	public function prepareView ($app, $adsensekit) {
		$ad = $this;
		$app->on('view.data', function ($event, $data) use ($ad, $adsensekit) {
			$data->add('$adsensekit_'.$ad->id, [
				'aditem' => $ad
			]);
		});
	}
}
