/**
 * Alias of Application instance
 * @type {Application}
 */
var App = Application || {},

    /**
     * URI basePath
     * @type {string}
     */
    basePath = '/place/',

    /**
     * Connection of library scripts.
     * The high level of application depending
     * @type {*|Function|Inc}
     */
    inc = new Inc();


/**
 * Dependence on the application of these scripts
 */
inc.require(basePath+'js/app/libs/aj.js');
inc.require(basePath+'js/app/libs/dom.js');
inc.require(basePath+'js/app/libs/tpl.js');
inc.require(basePath+'js/app/libs/util.js');


/**
 * Base Application
 */
inc.require(basePath+'js/app/application.js');

inc.onerror = function(errorInfo){console.error("ErrorInfo: ", errorInfo)};
inc.onload = function(list){
    //console.log('Scripts library loaded and attached into HEAD', list);
    //console.log('Success, library if loaded');

    /**
     * Configuration
     * @type config {{}}
     */
    var
        property = {
            name: 'Space Place Application',
            url: '/place/',
            data: {},
            basePath: basePath,
            namespace: [
                'controller','components','action','module','template'
            ]
        },
        config = {};

    /**
     *
     * @type {*|Application}
     */
    App = new Application(property, config);

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
    /**
     * Application Parts: Action
     */
    incApp.require(App.basePath+'js/app/action/form.login.js');


    incApp.onerror = onErrorApplication;
    incApp.onload = onLoadedApplication;

    /**
     * Start connecting and downloading application parts scripts
     */
    incApp.init();
};
inc.init();

function onErrorApplication(list){

}
function onLoadedApplication(list){

}