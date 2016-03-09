
(function () {

    var proto = {

            version:'0.0.2',

            /**
             * Stack namespaces objects
             */
            namespaces:{},

            /**
             * If application is run isInit = true
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

    app.logError = function(text){
        if(app.instance && app.instance.debug){
            var _title = 'Application throw error: ';
            if(typeof text === 'function')
                text.call(app.instance, _title);
            else
                console.error(_title + text);
        }
    };

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