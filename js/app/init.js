(function(Inc){

    /** ****************************************************************************************************************
     * Alias of Application instance
     * @type {Application}
     */
    window.App = null;

    var
        property = {
            url: '/place/',
            name: 'Space Place Application',
            data: {},
            path: '/place/',
            namespace: [
                'Controller','Components','Action','Module','Template'
            ]
        },

        inc = new Inc();
    /**
     * Dependence library
     * And Base Application
     */
    inc.require([
        property.url + 'js/app/libs/aj.js',
        property.url + 'js/app/libs/dom.js',
        property.url + 'js/app/libs/tpl.js',
        property.url + 'js/app/libs/util.js',
        property.url + 'js/app/application.js'
    ]);

    inc.onerror = function(errorInfo){ console.error("ErrorInfo: ", errorInfo) };

    inc.onload = function(list){
        /**
         * @type {*|Application}
         */
        App = new Application(property);

        /**
         * Connection of application scripts parts.
         * The high level of application depending
         * @type {*|Function|Inc}
         */
        var
            incApp = new Inc();

        /**
         * Application Parts: Controller
         */
        incApp.require([
            App.url+'js/app/controller/main.js',
            App.url+'js/app/controller/login.js',
            App.url+'js/app/controller/possessing.js'
        ]);

        /**
         * Application Parts: Action
         */
        incApp.require([
            App.basePath+'js/app/action/form.login.js'
        ]);

        /**
         * Processing loading results or errors
         * @type {onErrorApplication}
         * @type {onLoadedApplication}
         */
        incApp.onerror = onErrorApplication;
        incApp.onload = onLoadedApplication;

        /**
         * Start connecting and downloading application units parts scripts
         */
        incApp.init();
    };

    /**
     * Start connecting and downloading the dependency library scripts
     */
    inc.init();


    /** ****************************************************************************************************************
     * Вся работа ведется тута
     */

    /**
     *
     * @param list
     */
    function onErrorApplication(list){

    }
    /**
     *
     * @param list
     */
    function onLoadedApplication(list){

    }

})(Inc);