<?php

return [

    'install' => function ($app) {

		$util = $app['db']->getUtility();


    if ($util->tableExists('@adsensekit_ads') === false) {
      $util->createTable('@adsensekit_ads', function ($table) {
            $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
            $table->addColumn('status', 'smallint');
            $table->addColumn('priority', 'smallint', ['default' => 0]);
            $table->addColumn('title', 'string', ['length' => 255]);
            $table->addColumn('slug', 'string', ['length' => 255]);
            $table->addColumn('adformat', 'string', ['length' => 255]);
            $table->addColumn('adlayoutkey', 'string', ['length' => 255]);
            $table->addColumn('adclient', 'string', ['length' => 255]);
            $table->addColumn('adslot', 'string', ['length' => 255]);
            $table->addColumn('date', 'datetime', ['notnull' => false]);
            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['slug'], '@ADSENSEKIT_SLUG');
			});
		}

    },

    'uninstall' => function ($app) {

        $util = $app['db']->getUtility();

        if ($util->tableExists('@adsensekit_ads')) {
            $util->dropTable('@adsensekit_ads');
        }

		// remove the config
		$app['config']->remove('lemariva/adsensekit');

	}
];
