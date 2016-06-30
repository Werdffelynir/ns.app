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
            '../src/applibrary/aj.js',
            '../src/applibrary/dom.js',
            '../src/applibrary/tpl.js',
            '../src/applibrary/util.js',
            '../src/application.js'
        ],

        function(list){

            /** ***************************************************
             * Global alias of Application instance
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
             * Application Parts: Controller
             */
            appinc.require(
                [
                    'js/app/controller/login.js',
                    'js/app/controller/main.js',
                    'js/app/controller/possessing.js'
                ]);

            /**
             * Application Parts: Actions
             */
            appinc.require(
                [
                    'js/app/action/form.auth.js',
                    'js/app/action/form.register.js'
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
        console.error('Loading script is fail. Error: ', error);
    }

    /**
     * Загрузка всех компонентов закончена
     * @param list  список загруженных скриптов
     */
    function applicationStarted(list){
        App.log('start!');

        // ....
        // ....
        // ....

        App.Controller.Possessing.construct();

        // ....
        // ....
        // ....
    }

})(Inc);