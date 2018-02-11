<?php

return [

	'name' => 'lemariva/adsensekit',
	'type' => 'extension',
	'main' => 'lemariva\\AdsenseKit\\AdsModule',
	'autoload' => [
		'lemariva\\AdsenseKit\\' => 'src'
	],

	'routes' => [

		'/adsensekit' => [
			'name' => '@adsensekit',
			'controller' => [
				'lemariva\\AdsenseKit\\Controller\\AdsenseKitController',
				'lemariva\\AdsenseKit\\Controller\\AdsController',
				'lemariva\\AdsenseKit\\Controller\\SiteController'
			]
		],
		'/api/adsensekit' => [
			'name' => '@adsensekit/api',
			'controller' => [
				'lemariva\\AdsenseKit\\Controller\\AdsApiController',
			]
		]
	],

	'resources' => [
		'lemariva/adsensekit:' => ''
	],

	'menu' => [

		'adsensekit' => [
			'label' => 'AdsenseKit',
			'icon' => 'packages/lemariva/adsensekit/icon.svg',
			'url' => '@adsensekit',
			'active' => '@adsensekit(/*)'
		],

		'adsensekit: ads' => [
			'label' => 'ads',
			'parent' => 'adsensekit',
			'url' => '@adsensekit',
			'access' => 'adsensekit: manage ads',
			'active' => '@adsensekit(/edit)?'
		],

		'adsensekit: settings' => [
				'label' => 'Settings',
				'parent' => 'blog',
				'url' => '@adsensekit/settings',
				'active' => '@adsensekit/settings*',
				'access' => 'system: access settings'
		]

	],

	'permissions' => [

		'adsensekit: manage settings' => [
			'title' => 'Manage settings'
		],

		'adsensekit: manage ads' => [
			'title' => 'Manage ads'
		],

	],

	'settings' => '@adsensekit/settings',

	'config' => [
		'option1' => '',
		'option2' => ''

	]



];
