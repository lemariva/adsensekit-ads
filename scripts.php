<?php
//npm i -g webpack@3.12
//npm i -g vue-loader@13.0.0
//npm i -g vue-template-compiler@2.5.17
//npm i -g babel

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
				$table->addColumn('adtype', 'smallint', ['default' => 0]);
				$table->addColumn('adsrc_img', 'string', ['length' => 255]);
				$table->addColumn('adurl_img', 'string', ['length' => 255]);
				$table->addColumn('adformat_adsense', 'string', ['length' => 255]);
				$table->addColumn('adlayoutkey_adsense', 'string', ['length' => 255]);
				$table->addColumn('adclient_adsense', 'string', ['length' => 255]);
				$table->addColumn('adslot_adsense', 'string', ['length' => 255]);
				$table->addColumn('date_start', 'datetime', ['notnull' => false]);
				$table->addColumn('date_end', 'datetime', ['notnull' => false]);
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
