<?php

namespace lemariva\AdsenseKit\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use lemariva\AdsenseKit\Model\Ads;

/**
 * @Access("adsensekit: manage own ads || adsensekit: manage all ads")
 * @Route("ads", name="ads")
 */
class AdsApiController {

	/**
	 * @Route("/", methods="GET")
	 * @Request({"filter": "array", "page":"int"})
	 */
	public function indexAction($filter = [], $page = 0)
	{
			$query  = Ads::query();
			$filter = array_merge(array_fill_keys(['status', 'search', 'order', 'limit'], ''), $filter);

			extract($filter, EXTR_SKIP);

			if(!App::user()->hasAccess('adsensekit: manage all posts')) {
					$author = App::user()->id;
			}

			if (is_numeric($status)) {
					$query->where(['status' => (int) $status]);
			}

			if ($search) {
					$query->where(function ($query) use ($search) {
							$query->orWhere(['title LIKE :search', 'slug LIKE :search'], ['search' => "%{$search}%"]);
					});
			}

			// if ($author) {
			// 		$query->where(function ($query) use ($author) {
			// 				$query->orWhere(['user_id' => (int) $author]);
			// 		});
			// }

			if (!preg_match('/^(date|title|comment_count)\s(asc|desc)$/i', $order, $order)) {
					$order = [1 => 'date', 2 => 'desc'];
			}

			$limit = (int) $limit ?: App::module('adsensekit')->config('ads.ads_per_page');
			$count = $query->count();
			$pages = ceil($count / $limit);
			$page  = max(0, min($pages - 1, $page));

			$ads = array_values($query->offset($page * $limit)->limit($limit)->orderBy($order[1], $order[2])->get());

			return compact('ads', 'pages', 'count');
	}


	/**
	 * @Route("/", methods="POST")
	 * @Route("/{id}", methods="POST", requirements={"id"="\d+"})
	 * @Request({"ad": "array", "id": "int"}, csrf=true)
	 */
	public function saveAction($data, $id = 0)
	{
			if (!$id || !$ad = Ads::find($id)) {

					if ($id) {
							App::abort(404, __('Ad not found.'));
					}

					$ad = Ads::create();
			}

			if (!$data['slug'] = App::filter($data['slug'] ?: $data['title'], 'slugify')) {
					App::abort(400, __('Invalid slug.'));
			}

			// user without universal access is not allowed to assign ads to other users
			if(!App::user()->hasAccess('adsensekit: manage all ads')) {
					$data['user_id'] = App::user()->id;
			}

			// user without universal access can only edit their own ads
			if(!App::user()->hasAccess('adsensekit: manage all ads') && !App::user()->hasAccess('adsensekit: manage own ads') && $ad->user_id !== App::user()->id) {
					App::abort(400, __('Access denied.'));
			}

			$ad->save($data);

			return ['message' => 'success', 'ad' => $ad];
	}



	/**
	 * @Route("/{id}", methods="DELETE", requirements={"id"="\d+"})
	 * @Request({"id": "int"}, csrf=true)
	 */
	public function deleteAction ($id) {
		if ($ads = Ads::find($id)) {
			$ads->delete();
		}
		return ['message' => 'success'];
	}

	/**
	 * @Route("/bulk", methods="DELETE")
	 * @Request({"ids": "array"}, csrf=true)
	 */
	public function bulkDeleteAction ($ids = []) {
		foreach (array_filter($ids) as $id) {
			$this->deleteAction($id);
		}

		return ['message' => 'success'];
	}

}
