
(function (Inc, Util) {

    var proto = {
            version:'0.0.2',
            namespaces:{},
            isInit:false,
            node:{},
            has: function(namespace, name){
                var inst = app.instance,
                    has = function (has) {
                        return !!(inst.namespaces[namespace] &&  inst.namespaces[namespace][has])
                    };
                if (name) return has(name);
                else return has;
            },

            label: function(obj, options) {
                var source = !!window[obj] ? window[obj] : {};
                if(typeof source === 'function')
                    Util.objMergeNotExists(source.prototype, options);
                else if(typeof source === 'object')
                    Util.objMergeNotExists(source, options);
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

        app = function(prop){
            if (!(this instanceof Application))
                return new Application(prop);

            if(!app.instance)
                app.instance = this;

            this.namespace = app.namespace;
            this.start(prop);
        };

    app.instance = null;

    /**
     * Create object with namespace
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

            return inst.namespaces[n][m];
        }
    };

    window.Application = app;
    window.Application.prototype = proto;
    window.Application.prototype.constructor = app;

})(Inc, Util);