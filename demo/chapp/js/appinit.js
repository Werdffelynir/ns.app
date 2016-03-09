
(function(Inc){

    /**
     * Locker
     */
    if( window.App ) return;

    /**
     * Javascript include, scripts-modules of application
     * @type {Inc}
     */
    var appinc,

        /**
         * Javascript include, scripts-library of application
         * @type {Inc}
         */
        libinc = new Inc(),

        /**
         * Configuration
         * added as property of Application
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
            name: 'Developer Space',
            data: {},
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
            '../../js/applibrary/dom.js',
            '../../js/applibrary/tpl.js',
            '../../js/app/application.js'
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
            appinc = new Inc();

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
                    'js/app/action/form.auth.js',
                ]);

            /**
             * Application Parts: Modules
             */
            appinc.require(
                [
                    'js/app/module/error.js',
                    'js/app/module/message.js'
                ]);

            /**
             * Processing loading results or errors
             * @type {applicationError}
             * @type {applicationStart}
             */
            appinc.onerror = applicationError;
            appinc.oncomplete = applicationStart;

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
        console.log('error: ',error);
    }


    /**
     * Загрузка всех компонентов закончена
     * @param list  список загруженных скриптов
     */
    function applicationStart(list){
        console.log('Application run ...');

        var process =  App.Controller.Processing;

        process.construct();


    }

})(Inc);