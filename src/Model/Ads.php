<?php

namespace lemariva\AdsenseKit\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@adsensekit_ads",eventPrefix="adsensekit_ads")
 */
class Ads implements \JsonSerializable {
	use AdsModelTrait;

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

  /** @Column(type="string") */
  public $adformat = '';

	/** @Column(type="string") */
  public $adlayoutkey = '';

	/** @Column(type="string") */
  public $adclient = '';

	/** @Column(type="string") */
	public 	$adslot = '';

	/** @Column(type="datetime") */
	public $date;


	public static function getStatuses()
	{
			return [
					self::STATUS_PUBLISHED => __('Published'),
					self::STATUS_UNPUBLISHED => __('Unpublished'),
					self::STATUS_DRAFT => __('Draft'),
					self::STATUS_PENDING_REVIEW => __('Pending Review')
			];
	}

	public function getStatusText()
	{
			$statuses = self::getStatuses();

			return isset($statuses[$this->status]) ? $statuses[$this->status] : __('Unknown');
	}

	public function getAuthor()
	{
			return $this->user ? $this->user->username : null;
	}

	public function isPublished()
	{
			return $this->status === self::STATUS_PUBLISHED && $this->date < new \DateTime;
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
