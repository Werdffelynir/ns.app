
(function () {
/*
*             url: '/',
 path: '/',
 name: 'banking',
 data: {},
 debug: DEBUG,
 namespaces: [
 'Controller','Action','Module'
 ]
 */
    /**
     * Application prototype
     * @type {{*}}
     */
    var proto = {

            version:'0.0.2',

            /**
             * URL path
             */
            url:'/',

            /**
             * Base path
             */
            path:'/',

            /**
             * Application name
             */
            name:'Application',

            /**
             *
             */
            debug: true,

            /**
             * Stack namespaces objects, if the application is initialized, specify the namespace
             * in array: "['Controller', 'Action', 'Module']" names will be binded in stack of namespaces.
             * Also be created aliases to the properties instance "App.Controller" and other
             */
            namespaces:{},

            /**
             * If the application is initialized, the parameter contains a boolean - true
             */
            isInit:false,

            /**
             * Create function .has() for each namespace
             * @param namespace
             * @param name
             * @returns {has}
             */
            has: function(namespace, name){
                var inst = app.instance,
                    has = function (has) {
                        return !!(inst.namespaces[namespace] &&  inst.namespaces[namespace][has])
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
            merge: function(objectBase, src) {
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
            label: function(obj, options) {
                var source = !!window[obj] ? window[obj] : {};
                if(typeof source === 'function')
                    source = this.merge(source.prototype, options);
                else if(typeof source === 'object')
                    source = this.merge(source, options);
                return source;
            },

            /**
             * Run application, insert properties into application instance
             * @param properties
             * @returns {{Application}}
             **/
            start: function(properties){
                var inst = app.instance;

                for(var name in properties){
                    if(name == 'namespaces'){
                        properties[name].map(function(o){
                            inst[o] = inst.namespaces[o] = {has: inst.has(o)};
                        });
                    }else
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
        app = function(prop){
            if (!(this instanceof Application))
                return new Application(prop);

            if(!app.instance)
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
    app.namespace = function(namespace, reload){

        var inst = app.instance,
            path = namespace.split('.');

        if (inst.isInit && path.length >= 2) {
            var n = path[0].trim(),
                m = path[1].trim();

            if (typeof inst.namespaces[n] !== 'object')
                inst.namespaces[n] = {has: inst.has(n)};
            if (typeof inst[n] !== 'object')
                inst[n] = inst.namespaces[n];

            if (typeof inst.namespaces[n][m] !== 'object' || !!reload)
                inst.namespaces[n][m] = inst.label(m, {_app_:{name:m,permission:1}});
            inst[n][m] = inst.namespaces[n][m];

            /*if(n === 'Controller' && inst[n][m].construct) {
                console.log(inst[n][m].construct);
                inst[n][m].construct.call(inst[n][m])
            }
            if(n === 'Action' && inst[n][m].init) {
                inst[n][m].init.call(inst[n][m])
            }*/
            return inst.namespaces[n][m];
        }
    };

    /**
     * Get module object by namespace string
     *
     * @param namespace string as `Controller.Name`
     * @param func      if specified 'function', it will be called with the argument of the found object by
     *                      namespace or null, well object found is returned
     * @returns {*}
     */
    app.ns = function(namespace, func){

        var inst = app.instance,
            path = namespace.split('.');

        if (inst.isInit && path.length >= 2) {
            var n = path[0].trim(),
                m = path[1].trim();
            if(inst.namespaces[n][m]){
                if(typeof func === 'function'){
                    func.call(inst, inst.namespaces[n][m]);
                }
                return inst.namespaces[n][m];
            }
        }
        if(typeof func === 'function'){
            func.call(inst, null);
        }
        return null;
    };

    /**
     * Debug error log
     * @param text
     */
    app.logError = function(text){
        if(app.instance && app.instance.debug){
            var _title = 'Application throw error: ';
            if(typeof text === 'function')
                text.call(app.instance, _title);
            else
                console.error(_title + text);
        }
    };

    /**
     * Debug info log
     * @param text
     */
    app.log = function(text){
        if(app.instance && app.instance.debug){
            var _title = 'Application: ';
            if(typeof text === 'function')
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