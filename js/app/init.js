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

    inc.require([
    /**
     * Dependence
     */
        property.url + 'js/app/libs/aj.js',
        property.url + 'js/app/libs/dom.js',
        property.url + 'js/app/libs/tpl.js',
        property.url + 'js/app/libs/util.js',

    /**
     * Base Application
     */
        property.url + 'js/app/application.js'
    ]);

    inc.onerror = function(errorInfo){ console.error("ErrorInfo: ", errorInfo) };
    inc.onload = function(list){
        console.log(list);
        /**
         *
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
        //incApp.require(App.basePath+'js/app/controller/main.js');
        //incApp.require(App.basePath+'js/app/controller/login.js');
        //incApp.require(App.basePath+'js/app/controller/possessing.js');


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
         * Start connecting and downloading application parts scripts
         */
        incApp.init();
    };
    /**
     * Start connecting and downloading the dependency scripts
     */
    inc.init();


    /** ****************************************************************************************************************
     *
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