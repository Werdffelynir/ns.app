
var App = {

    name: 'place',

    path: '/place/',

    node: {},

    isInit: false

};

(function (App, Inc) {

    /**
     * Connection of library scripts.
     * The high level of application depending
     * @type {*|Function|Inc}
     */
    var
        incLibs = new Inc(), //

        /**
         * Internal application core object
         * @type {{}}
         */
        core = {};

    core.stackHas = function (ns, name) {
        var has = (function (has) {
            return !!(core.stack && core.stack[ns] && core.stack[ns][has])
        });
        if (name) return has(name);
        else return has;
    };
    core.stackInit = function () {
        return {
            controller: {has: core.stackHas('controller')},
            components: {has: core.stackHas('components')},
            action: {has: core.stackHas('action')},
            module: {has: core.stackHas('module')}
        }
    };

    /**
     * Storage indicators depending loaded modules
     * @type {{controller, components, action, module}}
     */
    core.stack = core.stackInit();

    /**
     * Token issued by a web server to verify the authenticity of requests
     * @type {null}
     */
    core.requesttoken = null;

    /**
     * Dependence on the application of these scripts
     */
    incLibs.require(App.path+'js/app/libs/aj.js');
    incLibs.require(App.path+'js/app/libs/dom.js');
    incLibs.require(App.path+'js/app/libs/tpl.js');
    incLibs.require(App.path+'js/app/libs/util.js');

    incLibs.onerror = onError;
    incLibs.onload = function(){
        /**
         * Connection of application scripts parts.
         * The high level of application depending
         * @type {*|Function|Inc}
         */
        var
            incApp = new Inc();

        /**
         * Application Parts
         */
        incApp.require(App.path+'js/app/controller/main.js');
        incApp.require(App.path+'js/app/action/login.js');



        incApp.onload = onLoadedApplication;
        incApp.onerror = onError;
        incApp.init(); // Start connecting and downloading application parts scripts
    };

    incLibs.init(); // Start connecting and downloading library scripts


    /**
     * Executed if any errors occur while loading scripts
     * @param error
     */
    function onError(error) {
        console.error('Error on loading script. Message: ' + error);
        if(Dom) App.Error.page('Error on loading script');
    }

    /**
     * Running when all scripts loaded is successfully
     */
    function onLoadedApplication() {
        //console.log('application loaded...');
        core.requesttoken = 'xxx-xxx-xxx-xxx';
        core.stack = core.stackInit();
        App.isInit = true;

        /**
         * Регистрация контролеров
         */
        //App.registerController('Login');
        //App.registerController('Main');

        var MainController = App.Controller.has('Main'); //App.registerController('Main'); //.construct()

        console.log(MainController);


        //console.log( App.Controller.has('Login') );

        //console.log(App.Controller.has('Main'));
        //console.log(App.Controller.has('Login'));
        /**
         * Start controller handler
         */
        //App.controller.login.construct();
        //MainController.construct();
    }




    /* -------------------------------------------------------------- */
    /*           App register Controller, Action, Module              */
    /*                           methods                              */

    /**
     * Aliases for modules
     * @type Controller {{}}    Alias to Controllers stack
     * @type Action {{}}        Alias to Actions stack
     * @type Module {{}}        Alias to Modules stack
     */
    App.Controller = core.stack['controller'];
    App.Action = core.stack['action'];
    App.Module = core.stack['module'];

    App.register = function(nsName, replace){
        var path = nsName.split('.');
        if(path.length >= 2){
            var ns = path[0].trim(),
                name = path[1].trim(),
                stack = core.stack[ns];

            if(!stack[name] || replace)
                stack[name] = App.register.config(name, {name:name, type:ns, permission:1});
            return stack[name];
        }else{}
    };
    App.register.config = function (registrar, config){
        var source = !!window[registrar] ? window[registrar] : {},
            refConfig = {
                _registry: {name: registrar, permission: 1},
                init: function(){},
                construct: function(){}};
        Util.objMerge(refConfig._registry, config);
        if(typeof source === 'function'){
            Util.objMergeNotExists(source.prototype, refConfig);
        }else if(typeof source === 'object'){
            Util.objMergeNotExists(source, refConfig);
        }
        return source;
    };

    /*
     App.registerController = function(name){
     var stack = core.stack['controller'];
     if(!stack[name])
     stack[name] = App.createRegisterConfig(name, {name:name, type:'controller', permission:1});
     return stack[name];
     };
     App.registerAction = function(name){
     var stack = core.stack['action'];
     if(!stack[name])
     stack[name] = App.createRegisterConfig(name, {name:name, type:'action', permission:1});
     return stack[name];
     };
     App.registerModule = function(name, replace){
     var stack = core.stack['module'];
     if(!stack[name] || !!replace)
     stack[name] = App.createRegisterConfig(name, {name:name, type:'module', permission:1});
     return stack[name];
     };*/



    /**
     *
     * @param registrar
     * @param config
     * @returns {*}

     App.createRegisterConfig = function (registrar, config){
        var source = !!window[registrar] ? window[registrar] : {},
            refConfig = {
                _registry: {
                    name: registrar,
                    permission: 1
                },
                init: function(){},
                construct: function(){}
            };
        Util.objMerge(refConfig._registry, config);
        if(typeof source === 'function'){
            Util.objMergeNotExists(source.prototype, refConfig);
        }else if(typeof source === 'object'){
            Util.objMergeNotExists(source, refConfig);
        }
        return source;
    };

     */
    /* -------------------------------------------------------------- */
    /*                         App.Api methods                        */


    /**
     * The method requests to the server.
     * The application should use this method for asynchronous requests
     *
     * @param key  Its execute method on server
     * @param func After request, a run function
     * @param args Arguments to key method
     */
    App.Api = function (key, func, args){};




    /* -------------------------------------------------------------- */
    /*                        App.Error methods                       */

    App.Error = function(){};
    App.Error.config = {};
    App.Error.page = function(text){
        Dom.loaded(function(){
            if(!App.node.errorPage) {
                App.node.errorPage = Util.createElement('div', {id:'app-error-page', 'style':'display:block'}, '<h1>app-error-page</h1>');

                /*console.log(App.node.errorPage);
                 Dom('body').one(function(item){
                 console.log(item);
                 });*/
                //_body.insertBefore(App.node.errorPage, _body.)
            }
        });
    };
    App.Error.inline = function(){};

    App.Message = function(){};
    App.Message.config = {};
    App.Message.page = function(){};
    App.Message.popup = function(){};
    App.Message.inline = function(){};


})(App, Inc);


