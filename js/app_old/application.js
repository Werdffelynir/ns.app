/**
 * Created by ProStation on 28.02.2016.
 */
(function (Inc, Util) {


    var

        /**
         * Internal application core object
         * @type core {{}}
         */
        core = {},

        /**
         * Application prototype object
         * @type appProto {{*}}
         * @prototype Application
         */
        appProto = {
            /**
             *
             */
            defaultProperty : {
                name: 'Application',
                basePath: '',
                url:  window.location.origin,
                node: {},
                namespace: ['controller','action','module']
            },

            unit:{},

            /**
             * Change to true when Application initialized
             */
            isInit: false
        },

        /**
         * Application constructor
         * @param property
         * @param config
         * @returns {Application}
         */
        app = function(property, config){
            if(!(this instanceof Application)) return new Application(config);

            core = {};
            app.self = this;

            Util.each(
                Util.objMerge(Util.objClone(this.defaultConfig), config),
                function(key, value){app.self[key] = value}
            );

            this.namespace.forEach(function(name){
                self.unit[name.toLowerCase()] = {has: app.callbackHasUnit(name)};
                app.self[Unit.ucfirst(name)] = self.unit[name.toLowerCase()];
            });

        };





//             controller: {has: core.stackHas('controller')},
    /*core.prototype.appointUnit = function(){
        var self = this;
        this.namespace.forEach(function(name){
            self.unit[name.toLowerCase()] = {};
        });
    };*/


    /*core.prototype.appointing = function(){
        var self = this;
        this.namespace.forEach(function(name){
            self.unit[name.toLowerCase()] = {};
        });
    };*/



   /* core.construct = function(namespace){
        console.log(namespace);
        namespace.forEach(function(name){
            core.unit[name.toLowerCase()] = {};
        });
        return core;
    };*/
    /*core.unit.has = function (ns, name) {
        var has = (function (has) {return !!(core.unit && core.unit[ns] && core.unit[ns][has])});
        if (name) return has(name);
        else return has;
    };
    core.stackCreate = function () {
        var _stack = {};
        return {
            controller: {has: core.stackHas('controller')},
            components: {has: core.stackHas('components')},
            action: {has: core.stackHas('action')},
            module: {has: core.stackHas('module')}
        }
    };*/



    app.callbackHasUnit = function (ns, name) {
        var has = (function (has) {
            return !!(core.stack && core.stack[ns] && core.stack[ns][has])
        });
        if (name) return has(name);
        else return has;
    };



    /** Application.register
     *******************************************************
     * Registers the all unit modules parts: Controller, Action, Module and other
     *
     **/

    /**
     *
     * @param nsName
     * @param replace
     * @returns {*}
     */
    app.register = function(nsName, replace){
        var path = nsName.split('.');

        if(path.length >= 2){
            var ns      = path[0].trim(),
                name    = path[1].trim(),
                unit    = app.unit[ns];

            if(!unit[name] || replace)
                unit[name] = app.register.config(name, {name:name, type:ns, permission:1});

            return unit[name];

        }else{}
    };

    /**
     *
     * @param registrar
     * @param config
     * @returns {*}
     */
    /*app.register.config = function (registrar, config){
        var source = !!window[registrar] ? window[registrar] : {},
            refConfig = {
                _registry: {name: registrar, permission: 1},
                init: function(){}, construct: function(){}
            };
        Util.objMerge(refConfig._registry, config);

        if(typeof source === 'function'){
            Util.objMergeNotExists(source.prototype, refConfig);
        }else if(typeof source === 'object'){
            Util.objMergeNotExists(source, refConfig);
        }else{}

        return source;
    };*/
    /**
     * Short methods
     * @param name
     */
   /* app.registerController = function(name){ return app.register('Controller.'+name) };
    app.registerAction = function(name){ return app.register('Action.'+name) };
    app.registerModule = function(name){ return app.register('Module.'+name) };*/

    /**
     * Aliases for modules
     * @type Controller {{}}    Alias to Controllers unit
     * @type Action {{}}        Alias to Actions unit
     * @type Module {{}}        Alias to Modules unit
     */
   /* app.Controller = core.unit['controller'];
    app.Action = core.unit['action'];
    app.Module = core.unit['module'];*/


    /** Application.Error
     *******************************************************
     *
     *
     **/

    app.Error = function(){};
    app.Error.page = function(){
        Dom.loaded(function(){
            if(!app.node.appErrorPage) {
                app.node.appErrorPage = Util.createElement('div', {id:'app-error-page', 'style':'display:block'}, '<h1>app-error-page</h1>');
                Dom('body').one(function(item){
                    console.log(item);
                });
            }
        });
    };
    app.Error.inline = function(){};
    app.Error.popup = function(){};
    app.Error.config = {};






    /** Application.Message
     ******************************************************* **/

    app.Message = function(){};
    app.Message.page = function(){};
    app.Message.inline = function(){};
    app.Message.popup = function(){};
    app.Message.config = {};







    /** Application.Api
     ******************************************************* **/

    app.Api = function (key, callback, args){};
    app.Api.checkToken = function (callback){};
    app.Api.config = {};












    window.Application = app;
    window.Application.prototype = appProto;
    window.Application.prototype.constructor = app;

})(Inc, Util);


