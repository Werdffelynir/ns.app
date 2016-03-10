/**
 * Configurations and includes scripts
 * completed settings for init the application
 */
(function(Inc){

    "use strict";


    /**
     * Locker
     */
    if( window.App ) return;

    var
        /**
         *
         * @type {boolean}
         */
        DEBUG = true,

        /**
         *
         * @type {{force: boolean, chain: boolean, debug: boolean}}
         */
        incOption = {
            force: false,
            chain: true,
            debug: DEBUG
        },

        /**
         * Javascript include, scripts-modules of application
         * @type {Inc}
         */
        appinc,

        /**
         * Javascript include, scripts-library of application
         * @type {Inc}
         */
        libinc = new Inc(incOption),

        /**
         * Configuration, added as property of Application
         *
         * @prop config.url         base url
         * @prop config.name        application name
         * @prop config.data        data provider
         * @prop config.path        base path
         * @prop config.namespaces  registered namespaces
         *
         * @type {{url: string, name: string, data: {}, path: string, namespaces: string[]}}
         */
        property = {
            url: '/',
            path: '/',
            name: 'banking',
            data: {},
            debug: DEBUG,
            namespaces: [
                'Controller','Action','Module'
            ]
        };

    /**
     * The high level of application depending
     * Connection of dependence library scripts
     * And Base Application
     */
    libinc.require(
        [
            '../js/applibrary/aj.js',
            '../js/applibrary/dom.js',
            '../js/applibrary/tpl.js',
            '../js/applibrary/util.js',
            '../js/app/application.js'
        ],

        function(list){

            /** ***************************************************
             * Global alias of Application instance
             * @type {Application}
             */
            window.App = Application(property);

            /**
             * Connection of application scripts parts.
             * The high level of application depending
             * @type {*|Function|Inc}
             */
            appinc = new Inc(incOption);

            /**
             * Application Parts: Controller
             */
            appinc.require(
                [
                    'js/app/controller/processing.js'
                ]);

            /**
             * Application Parts: Actions
             */
            appinc.require(
                [
                    'js/app/action/popup.js'
                ]);

            /**
             * Application Parts: Modules
             */
            appinc.require(
                [
                    'js/app/module/api.js',
                    'js/app/module/error.js',
                    'js/app/module/message.js'
                ]);

            /**
             * Processing loading results or errors
             * @type {applicationError}
             * @type {applicationStarted}
             */
            appinc.onerror = applicationError;
            appinc.oncomplete = applicationStarted;

            /**
             * Start connect and load of application units parts scripts
             */
            appinc.start();

        }, applicationError)

        /**
         * Start connect and load high level of application depending
         */
        .start();



    /** ***************************************************
     * Работа начинается тута
     */


    /**
     * Error loading
     * @param error
     */
    function applicationError(error){
        App.logError(function(title){
            console.error(title + 'loading script is fail. Error: ', error);
        });
    }

    /**
     * Загрузка всех компонентов закончена
     * @param list  список загруженных скриптов
     */
    function applicationStarted(list){
        App.log('run...');

        Dom.loaded(documentLoaded);
    }



    function documentLoaded(){

        var node = App.namespace('node');

            node.tips = Dom('#tips').one();
            node.help = Dom('#help').one();
            node.popup = Dom('#popup').one();
            node.page = Dom('#page').one();
            node.header = Dom('#header').one();
            node.navigation = Dom('#navigation').one();
            node.content = Dom('#content').one();
            node.sidebar = Dom('#sidebar').one();
            node.footer = Dom('#footer').one();

        var process =  App.Controller.Processing;
        process.construct();

    }

})(Inc);