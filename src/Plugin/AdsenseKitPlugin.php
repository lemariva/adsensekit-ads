<?php

namespace lemariva\AdsenseKit\Plugin;

use Pagekit\Application as App;
use Pagekit\Content\Event\ContentEvent;
use Pagekit\Event\EventSubscriberInterface;

class AdsenseKitPlugin implements EventSubscriberInterface
{

    /**
     * Content plugins callback.
     *
     * @param ContentEvent $event
     */
    public function onContentPlugins(ContentEvent $event)
    {
        $event->addPlugin('adsensekit', [$this, 'applyPlugin']);
    }

    /**
     * Defines the plugins callback.
     *
     * @param  array $options
     * @return string|null
     */
    public function applyPlugin(array $options)
    {
        if (!isset($options['id'])) {
            return;
        }
        $adsensekit = App::module('lemariva/adsensekit');
        $app = App::getInstance();
        $ad_id = $options['id'];
        unset($options['id']);

      	try {
      		  return $adsensekit->renderAd($app, $ad_id, $options);
      	} catch (App\Exception $e) {
      		  return $e->getMessage();
      	}
	}

    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'content.plugins' => ['onContentPlugins', 25],
        ];
    }
}
