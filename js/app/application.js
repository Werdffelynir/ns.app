/**
 * Aspirations
 * Aspire
 * longing
 * processes
 * processing
 */
(function () {

    "use strict";


    /**
     * NSApp prototype
     * @type {{version: string, url: string, path: string, name: string, debug: boolean, namespaces: {}, isInit: boolean, has: proto.has, merge: proto.merge, label: proto.label, start: proto.start}}
     */
    var proto = {

            version: '0.0.2',

            /**
             * URL path
             */
            url: '/',

            /**
             * Base path
             */
            path: '/',

            /**
             * NSApp name
             */
            name: 'Application',

            /**
             *
             */
            debug: true,

            /**
             * Stack namespaces objects, if the application is initialized, specify the namespace
             * in array: "['Controller', 'Action', 'Module']" names will be binded in stack of namespaces.
             * Also be created aliases to the properties instance "App.Controller" and other
             */
            namespaces: {},

            /**
             * If the application is initialized, the parameter contains a boolean - true
             */
            isInit: false,

            /**
             * Create function .has() for each namespace
             * @param namespace
             * @param name
             * @returns {has}
             */
            has: function (namespace, name) {
                var inst = app.instance,
                    has = function (has) {
                        return !!(inst.namespaces[namespace] && inst.namespaces[namespace][has])
                    };
                if (name) return has(name);
                else return has;
            },

            /**
             * Merge objects
             * @param objectBase
             * @param src
             * @returns {*}
             */
            merge: function (objectBase, src) {
                for (var key in src)
                    if (objectBase[key] === undefined)
                        objectBase[key] = src[key];
                return objectBase;
            },

            /**
             * Create mark to elements of load
             * @param obj
             * @param options
             * @returns {{}}
             */
            label: function (obj, options) {
                var source = !!window[obj] ? window[obj] : {};
                if (typeof source === 'function')
                    source = this.merge(source.prototype, options);
                else if (typeof source === 'object')
                    source = this.merge(source, options);
                return source;
            },

            /**
             * Run application, insert properties into application instance
             * @param properties
             * @returns {{NSApp}}
             **/
            start: function (properties) {
                var inst = app.instance;

                for (var name in properties) {
                    if (name == 'namespaces') {
                        properties[name].map(function (o) {
                            inst[o] = inst.namespaces[o] = {has: inst.has(o)};
                        });
                    } else
                        inst[name] = properties[name];

                    inst.isInit = true;
                }
                return inst;
            },


            redirect: function(url){
                window.location =  this.url + (url.slice(0,1)=='/') ? url.slice(1) : url
            }
        },

        /**
         * Constructor
         * @constructor app
         * @param prop
         * @returns {app|*}
         */
        app = function (prop) {
            if (!(this instanceof NSApp))
                return new NSApp(prop);

            if (!app.instance)
                app.instance = this;

            this.namespace = app.namespace;
            this.logError = this.error = app.logError;
            this.log = app.log;
            this.ns = app.ns;
            this.start(prop);
        };


    /**
     * instance
     * @type {null|NSApp}
     */
    app.instance = null;

    /**
     * Create namespace for module-script
     * @param namespace  "Controller.Name" or "Action.Name"
     * @param reload     bool, if true reload object
     * @returns {*}
     */
    app.namespace = function (namespace, reload) {

        var
            inst = app.instance,
            inns = app.instance.namespaces,
            path = namespace.split('.');

        for (var i = 0; i < path.length; i ++){

            var name = path[i].trim();

            if(i === 0){
                if (typeof inns[name] !== 'object' || !!reload)
                    inns[name] = {has: app.instance.has(name)};
                if (typeof inst[name] !== 'object' || !!reload)
                    inst[name] = inns[name];
            }else{
                if (typeof inns[name] !== 'object' || !!reload)
                    inns[name] = app.instance.label(name,{_app_:{name:name,permission:1}});
                inst[name] = inns[name];
            }

            if(i+1 >= path.length) return inns[name];

            inns = inns[name];
            inst = inst[name];
        }

    };

    /**
     * Get module object by namespace string
     *
     * @param namespace string as `Controller.Name` or one part 'somename' as property of  application
     * @param func      if specified 'function', it will be called with the argument of the found object by
     *                      namespace or null, well object found is returned
     * @returns {*}
     */
    app.ns = function (namespace, func) {

        var inst = app.instance, item,
            inns = inst.namespaces,
            path = namespace.split('.');

        for (var i = 0; i < path.length; i ++){
            item = path[i].trim();
            if (typeof inns[item] == 'object' || typeof inns[item] == 'function') {
                inns = inns[item];
                if(path.length-1 === i){
                    if (typeof func === 'function') func.call(inst, inns);
                    return inns;
                }
            }
        }
        return null;
    };

    /**
     * Debug error log
     * @param text
     */
    app.logError = function (text) {
        if (app.instance && app.instance.debug) {
            var _title = 'NSApp throw error: ';
            if (typeof text === 'function')
                text.call(app.instance, _title);
            else
                console.error(_title, text);
        }
    };

    /**
     * Debug info log
     * @param param
     */
    app.log = function (param) {
        if (app.instance && app.instance.debug) {
            var _title = 'NSApp: ';
            if (typeof param === 'function')
                param.call(app.instance, _title);
            else
                for (var i = 0; i < arguments.length; i ++ )
                    console.log( i + ' ' + _title, arguments[i]);
        }
    };


    /**
     * Global name
     */
    window.NSApp = app;
    window.NSApp.prototype = proto;
    window.NSApp.prototype.constructor = app;

})();