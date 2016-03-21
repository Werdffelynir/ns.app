
(function(Inc){

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
            urlServer: '/ns.app/server/chapp.php',
            url: '/ns.app/demo/chapp/',
            path: '/ns.app/demo/chapp/',
            name: 'Developer Space',
            node: {},
            data: {},
            debug: DEBUG,
            namespaces: [
                'Controller','Action','Module'
            ],
            timeToDate: function(str){
                var _date = new Date();
                _date.setTime(parseInt(str));
                return _date;
            },
            dataToStr: function(date){
                return date.getHours() +
                    ':' + date.getMinutes() +
                    ':' + date.getSeconds() +
                    ' ' + date.getDate() +
                    '.' + date.getMonth() +
                    '.' + date.getFullYear();
            }
        };

    /**
     * The high level of application depending
     * Connection of dependence library scripts
     * And Base Application
     */
    libinc.require(
        [
            '../../js/applibrary/aj.js',
            '../../js/applibrary/dom.js',
            '../../js/applibrary/tpl.js',
            '../../js/applibrary/util.js',
            '../../js/applibrary/timer.js',
            '../../js/app/application.js'
        ],

        function(list){

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
             * NSApp Parts: Modules
             */
            appinc.require(
                [
                    'js/app/module/error.js',
                    'js/app/module/message.js',
                    'js/app/module/process.js',
                    'js/app/module/linker.js'
                ]);

            /**
             * Application Parts: Actions
             */
            appinc.require(
                [
                    'js/app/action/form.auth.js',
                    'js/app/action/form.register.js',
                    'js/app/action/dialog.js',
                    'js/app/action/sidebar.js'
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
        App.logError(function(title){
            console.error(title + 'loading script is fail. Error: ', error);
        });
    }

    /**
     * Загрузка всех компонентов закончена
     * @param list  список загруженных скриптов
     */
    function applicationStart(list){
        App.log('run...');


        App.actionLink = function(name, func){
            Dom('.action-link').attr('data-action');
        };


        App.Controller.Processing.construct();
    }

})(Inc);