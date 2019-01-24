require.config( {
    paths: {
        /*
         * Config
         */
        properties: 'config/properties',

    	/*
    	 * Libraries
    	 */
    	jquery: [
                    '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
                    'libraries/jquery-1.10.2.min'
                ],

        'hammer-jquery':    [
                                '//cdn.jsdelivr.net/hammerjs/1.0.5/jquery.hammer.min',
                                'libraries/jquery.hammer.min'
                            ],
        'github-service': 'libraries/jquery.github',
        hbs: 'libraries/hbs',
        Handlebars: 'libraries/Handlebars',
        underscore: 'libraries/underscore',
        i18nprecompile: 'libraries/i18nprecompile',
        json2: 'libraries/json2',

        /*
         * Utils
         */
        'analytics': 'utils/analytics',
        'circle-chart': 'utils/circleChart',
        'randon-order': 'utils/randonOrder',
        'bounce-in': 'utils/bounceIn',

        /*
         * Modules
         */
        menu: 'modules/menu',
        'github-repository': 'modules/github-repository',
        loader: 'modules/loader',
        feed: 'modules/feed',
        about: 'modules/about',
        logo: 'modules/logo',

    	/*
    	 * Start
    	 */
    	init: 'utils/loaderModules'
    },

    hbs : {
        templateExtension : 'hbs',
        i18nprecompile : false,
        json2 : false,
        disableI18n : true,
        disableHelpers: true
    }, 

    shim: {
        init: [ 'properties' ],
        'github-service': [ 'jquery' ]
    }
} );

// start application
require( [ 'init' ] );