(function(Inc){

    /** ***************************************************
     * Global alias of Application instance
     * @type {Application}
     */
    window.App = null;

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
    var property = {
            url: '/',
            name: 'Space Application',
            data: {},
            path: '/',
            namespaces: [
                'Controller','Components','Action','Module','Template'
            ]
        },
        /**
         * Javascript include
         * @type {*|Function|Inc}
         */
        inc = new Inc();

    /**
     * The high level of application depending
     * Connection of dependence library scripts
     * And Base Application
     */
    inc.require([
        property.url + 'js/app/libs/aj.js',
        property.url + 'js/app/libs/dom.js',
        property.url + 'js/app/libs/tpl.js',
        property.url + 'js/app/libs/util.js',
        property.url + 'js/app/application.js'
    ]);

    /**
     * Error connection with library handler
     * @param errorInfo
     */
    inc.onerror = function(errorInfo){ console.error("ErrorInfo: ", errorInfo) };

    /**
     * Loaded library handler
     * @param list
     */
    inc.onload = function(list){

        /**
         * @type {*|Application}
         */
        window.App = Application.run(property);

        /**
         * Connection of application scripts parts.
         * The high level of application depending
         * @type {*|Function|Inc}
         */
        var inc = new Inc();

        /**
         * Application Parts: Controller
         */
        inc.require([
            property.url+'js/app/controller/main.js',
            property.url+'js/app/controller/login.js',
            property.url+'js/app/controller/possessing.js'
        ]);

        /**
         * Application Parts: Actions
         */
        inc.require([
            property.url+'js/app/action/form.js'
        ]);

        /**
         * Application Parts: Controller
         */

        /**
         * Processing loading results or errors
         * @type {onErrorApplication}
         * @type {onLoadedApplication}
         */
        inc.onerror = onErrorApplication;
        inc.onload = onLoadedApplication;

        /**
         * Start connecting and downloading application units parts scripts
         */
        inc.init();
    };

    /**
     * Start connecting and downloading the dependency library scripts
     */
    inc.init();

    /** ***************************************************
     * Работа начинается тута
     */

    /**
     * Ошибка загрузки компонентов приложения
     * @param errorInfo
     */
    function onErrorApplication(errorInfo){

    }

    /**
     * Загрузка всех компонентов закончена
     * @param list  список загруженных скриптов
     */
    function onLoadedApplication(list){

    }

})(Inc);