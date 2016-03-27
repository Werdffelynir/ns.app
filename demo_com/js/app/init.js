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
         * @prop config.debug       debug inherit the DEBUG var
         * @prop config.namespaces  registered namespaces
         *
         * @type {{url: string, name: string, data: {}, path: string, namespaces: string[]}}
         */
        property = {
            url: '/',
            name: 'banking',
            node: {},
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
            'http://js.dev.loc/ns.app/src/applibrary/aj.js',
            'http://js.dev.loc/ns.app/src/applibrary/dom.js',
            'http://js.dev.loc/ns.app/src/applibrary/tpl.js',
            'http://js.dev.loc/ns.app/src/applibrary/util.js',
            'http://js.dev.loc/ns.app/src/application.js'
        ],

        function(list){

            Tpl.config({templates: property.url + 'js/app/templates/'});

            /** ***************************************************
             * Global alias of NSApp instance
             * @type {NSApp}
             */
            window.App = NSApp(property);

            /**
             * Connection of application scripts parts.
             * The high level of application depending
             * @type {*|Function|Inc}
             */
            appinc = new Inc(incOption);

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
             * Application Parts: Actions
             */
            appinc.require(
                [
                    'js/app/action/popup.js',
                    'js/app/action/sidebar.js',
                    'js/app/action/navigation.js'
                ]);


            /**
             * Application Parts: Controller
             */
            appinc.require(
                [
                    'js/app/controller/processing.js'
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

        App.node.tips = Dom('#app-tips').one();
        App.node.help = Dom('#app-help').one();
        App.node.popup = Dom('#app-popup').one();
        App.node.page = Dom('#app-page').one();
        App.node.content = Dom('#app-content').one();
        App.node.sidebar = Dom('#app-sidebar').one();

        App.route('/', function(){
            console.log('route');
        });

        var process =  App.Controller.Processing;
        process.construct();

    }

})(Inc);