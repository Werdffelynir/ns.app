/**
 * Aspirations
 * Aspire
 * longing
 * processes
 * processing
 */
(function () {

    /**
     * Application prototype
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
             * Application name
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
             * @returns {{Application}}
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
            }
        },

        /**
         * Constructor
         * @constructor app
         * @param prop
         * @returns {app|*}
         */
        app = function (prop) {
            if (!(this instanceof Application))
                return new Application(prop);

            if (!app.instance)
                app.instance = this;

            this.namespace = app.namespace;
            this.logError = app.logError;
            this.log = app.log;
            this.ns = app.ns;
            this.start(prop);
        };


    /**
     * instance
     * @type {null|Application}
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
            var _title = 'Application throw error: ';
            if (typeof text === 'function')
                text.call(app.instance, _title);
            else
                console.error(_title + text);
        }
    };

    /**
     * Debug info log
     * @param text
     */
    app.log = function (text) {
        if (app.instance && app.instance.debug) {
            var _title = 'Application: ';
            if (typeof text === 'function')
                text.call(app.instance, _title);
            else
                console.log(_title + text);
        }
    };

    /**
     * Global name
     */
    window.Application = app;
    window.Application.prototype = proto;
    window.Application.prototype.constructor = app;

})();