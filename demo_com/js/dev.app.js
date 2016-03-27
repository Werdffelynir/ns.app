

(function (window){

    var
        proto = {
            config: {
                url: '/',
                name: true,
                debug: true
            },
            merge: function (objectBase, src) {
                for (var key in src)
                    if (objectBase[key] === undefined)
                        objectBase[key] = src[key];
                return objectBase;
            }


        } , app = function(config){

            if (!(this instanceof NamespaceApplication))
                return new NamespaceApplication(config);

            var self = this;

            this.setConfig(config)



        };

    proto.setConfig = function(config) {
        config = typeof config === 'object' ? this.merge(this.config, config) : this.config;
        for(var prop in config){
            if(this[prop] === undefined)
                this[prop] = config[prop];
        }
    };

    /**
     *
     * @param namespace
     * @param callback
     * @returns {{}}
     */
    proto.namespace = function(namespace, callback) {

        var
            name,
            path = namespace.split('.'),
            tmp = this || {},
            len = path.length;

        for (var i = 0; i < len; i ++ ){
            name = path[i].trim();
            if (typeof tmp[name] !== 'object'){
                tmp[name] = (i+1 >= len) ? (callback?callback.call(tmp,this,{}):{}) :{};
                tmp = tmp[name];
            }else{
                tmp = tmp[name];
            }
        }
        return tmp;
    };


    proto.require = function(key, path, oncomplete, onerror){
        this.require.stack[key] = {
            src:  Array.isArray(path) ? path : [path],
            oncomplete : oncomplete,
            onerror : onerror
        };
    };
    proto.require.stack = {};

    proto.requireStart = function(key){
        var source;
        if(this.require.stack[key]){
            this._loadScriptRecursive(0, key);
        }else{
            console.error("Require source not found! Key: " + key + " not exist!");
        }

    };

    proto._loadScriptRecursive = function  (i, key) {
        var self = this,
            source = this.require.stack[key];

        if (source.src[i]) {
            if(!Array.isArray(source.node)) source.node = [];
            source.node.push(this.loadScript(source.src[i], function(){
                self._loadScriptRecursive(++i, key);
            }, source.onerror));
        } else if (i ===  source.src.length)
            source.oncomplete.call(self, source.node);

    };

    proto.loadScript = function  (src, onload, onerror) {
        var
            script = document.createElement('script'),
            id = this.require.encodeId(src);

        script.src = (src.substr(-3) === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        script.id = id;
        script.onload = onload;
        script.onerror = onerror;

        document.head.appendChild(script);

        return script;
    };



    proto.loadCSSLink = function  (src, onload, onerror) {
        var link = document.createElement('link'),
            id = this.encodeId(src);

        link.href = (src.substr(-3) === '.css') ? src : src + '.css';
        link.rel = 'stylesheet';
        link.id = id;
        link.onload = onload;
        link.onerror = onerror;
        document.head.appendChild(link);
        return link;
    };

   /*function recursiveScriptLoader(i, source) {
        var src = source.src[i++];
        console.log(src);
        loadScript(src,
            function(event){
                recursiveScriptLoader.call(i, source.src[i], source.oncomplete, source.onerror);
                console.log(event);
            },
            function(error){

                console.log(error);

            }
        );

    }*/




    //proto.require.loadScriptsRecursive.i;


    proto.require.encodeId = function (src) {
        src = typeof src == 'string' ? src : Math.random().toString(36);
        return encodeURIComponent(src.replace(/\W+/gm, ''));
    };





    proto.render = function(){};





    /**
     * Global name
     */
    window.NamespaceApplication = app;
    window.NamespaceApplication.prototype = proto;
    window.NamespaceApplication.prototype.constructor = app;

})(window);


















