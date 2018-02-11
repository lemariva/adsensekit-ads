<?php

namespace lemariva\AdsenseKit\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait AdsModelTrait
{
    use ModelTrait;
    /**
     * @Saving
     */
    public static function saving($event, Ads $ads)
    {

        $i  = 2;
        $id = $ads->id;

        if (!$ads->slug) {
            $ads->slug = $ads->title;
        }

        while (self::where(['slug = ?'], [$ads->slug])->where(function ($query) use ($id) {
            if ($id) $query->where('id <> ?', [$id]);
        })->first()) {
            $ads->slug = preg_replace('/-\d+$/', '', $ads->slug).'-'.$i++;
        }

    }

}
