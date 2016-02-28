
var App = {

        name: 'place'

    };

(function (App, Inc, Aj, Tpl, Util) {

    var inc = new Inc(),
        path = '/place/';

    inc.require(path+'js/app/controller/main.js');
    inc.require(path+'js/app/action/login.js');
    inc.require(path+'js/app/module/valid.js');
    inc.onerror = onError;
    inc.onload = onLoaded;
    inc.init();

    /**
     * Executed if any errors occur while loading scripts
     *
     * @param error
     */
    function onError(error) {
        console.error('Error on loading script. Message: ' + error);
        App.Error.page('Error on loading script');
    }

    /**
     * Running when all scripts loaded is successfully
     */
    function onLoaded() {

        console.log('application loaded...');


        /**
         * Start controller handler
         */
        //App.controller.login.construct();

    }


    /* -------------------------------------------------------------- */
    /*                            App methods                         */


    App.Controller = {};
    App.registerController = function(controller){
        if(!App.Controller[controller])
            App.Controller[controller] = {name:controller,construct:null,node:{},permission:1};
        return App.Controller[controller];
    };


    App.Action = {};
    App.registerAction = function(action){
        if(!App.Action[action])
            App.Action[action] = {name:action,init:null,node:{},permission:1};
        return App.Action[action];
    };

    App.Module = {};
    App.registerModule = function(module){
        if(!App.Module[module]) App.Module[module] = {name:module,permission:1};
        return App.Module[module];
    };


    /**
     * The method requests to the server.
     * The application should use this method for asynchronous requests
     *
     * @param key  Its execute method on server
     * @param func After request, a run function
     * @param args Arguments to key method
     */
    App.Api = function (key, func, args){};
    App.Api.requesttoken = null;

    App.Error = function(){};
    App.Error.page = function(){
        if(!App.Error.pageInsert) {
            if(Dom.domIsLoaded())
            App.Error.pageInsert = Dom('').one();
        }
    };
    App.Error.pageInsert = null;
    App.Error.inline = function(){};
    App.Error.inlineInsert = null;




})(App, Dom, Inc, Aj, Tpl, Util);


