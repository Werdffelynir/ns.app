(function(Inc){

    /** ****************************************************************************************************************
     * Alias of Application instance
     * @type {Application}
     */
    window.App = null;

    var
        property = {
            name: 'Space Place Application',
            url: '/place/',
            data: {},
            basePath: basePath,
            namespace: [
                'Controller','Components','Action','Module','Template'
            ]
        },

        /**
         * Connection of library scripts.
         * The high level of application depending
         * @type {*|Function|Inc}
         */
        inc = new Inc();

    /** ****************************************************************************************************************
     * Dependence on the application of these scripts
     */
    inc.require(property.basePath+'js/app/libs/aj.js');
    inc.require(property.basePath+'js/app/libs/dom.js');
    inc.require(property.basePath+'js/app/libs/tpl.js');
    inc.require(property.basePath+'js/app/libs/util.js');
    /**
     * Base Application
     */
    inc.require(property.basePath+'js/app/application.js');

    inc.onerror = function(errorInfo){ console.error("ErrorInfo: ", errorInfo) };


    inc.onload = function(list){
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
        incApp.require(App.basePath+'js/app/controller/main.js');
        incApp.require(App.basePath+'js/app/controller/login.js');
        incApp.require(App.basePath+'js/app/controller/possessing.js');


        /**
         * Application Parts: Action
         */
        incApp.require(App.basePath+'js/app/action/form.login.js');

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