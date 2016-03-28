/**
 *
 */
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

            this.version = '0.1.0';
            this.setConfig(config);
        };

    /**
     * Apply config object to instance properties
     * @param config
     * @returns {proto}
     */
    proto.setConfig = function(config) {
        config = typeof config === 'object' ? this.merge(config, this.config) : this.config;
        for(var prop in config){
            if(this[prop] === undefined)
                this[prop] = config[prop];
        }
        return this;
    };

    /**
     * Create namespace for module-script
     * @param namespace  "Controller.Name" or "Action.Name"
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

    /**
     * Designate a list of scripts for loading
     * @param key           list key (identifier)
     * @param path          array with scripts url
     * @param oncomplete    executing when all scripts are loaded
     * @param onerror
     * @returns {proto}
     */
    proto.require = function(key, path, oncomplete, onerror){
        this.require.stack[key] = {
            src:  Array.isArray(path) ? path : [path],
            oncomplete : oncomplete,
            onerror : onerror
        };
        return this;
    };
    proto.require.stack = {};

    /**
     * Start loading the list of scripts by key (identifier)
     * @param key
     */
    proto.requireStart = function(key){
        var source;
        if(this.require.stack[key]){
            this._recursive_load_script(0, key);
        }else{
            console.error("Require source not found! Key: " + key + " not exist!");
        }
        return this;
    };

    proto._recursive_load_script = function  (i, key) {
        var self = this,
            source = this.require.stack[key];

        if (source.src[i]) {
            if(!Array.isArray(source.node)) source.node = [];
            source.node.push(this.loadScript(source.src[i], function(){
                self._recursive_load_script(++i, key);
            }, source.onerror));
        } else if (i ===  source.src.length)
            source.oncomplete.call(self, source.node);

    };

    /**
     * Loads the script element
     * @param src
     * @param onload
     * @param onerror
     * @returns {Element}
     */
    proto.loadScript = function  (src, onload, onerror) {
        var
            script = document.createElement('script'),
            id = "src-" + Math.random().toString(32).slice(2); //this.require.encodeId(src);

        script.src = (src.substr(-3) === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        script.id = id;
        script.onload = onload;
        script.onerror = onerror;

        document.head.appendChild(script);

        return script;
    };


    /**
     * Loads the CSS link element
     * @param src
     * @param onload
     * @param onerror
     * @returns {Element}
     */
    proto.loadCSSLink = function  (src, onload, onerror) {
        var link = document.createElement('link'),
            id = "src-" + Math.random().toString(32).slice(2);//this.encodeId(src);

        link.href = (src.substr(-4) === '.css') ? src : src + '.css';
        link.rel = 'stylesheet';
        link.id = id;
        link.onload = onload;
        link.onerror = onerror;
        document.head.appendChild(link);
        return link;
    };

    /**
     * Loads the file
     * @param url
     * @param onload
     * @param onerror
     */
    proto.loadFile = function  (url, onload, onerror) {
        this.request('GET', url, function(event){
            if(event.target.status === 200)
                onload.call(this, event.target.responseText, event);
            else
                onerror.call(this, event);
        }, onerror)
    };

    /**
     * Base url request
     * @param method
     * @param url
     * @param callback
     * @param callbackError
     * @returns {XMLHttpRequest}
     */
    proto.request = function(method, url, callback, callbackError) {
        var xhr = new XMLHttpRequest();
        method = method || 'POST';
        url = url || '/';

        xhr.open(method, url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if(typeof callback === 'function') xhr.onloadend = callback;
        if(typeof callbackError === 'function') xhr.onerror = callbackError;
        xhr.send();
        return xhr;
    };

    /**
     * Templates creator
     * @param stringData
     * @param params
     * @returns {*}
     */
    proto.assignValues = function  (stringData, params) {
        if(typeof params === 'object')
            for(var k in params)
                stringData = stringData.replace(new RegExp('{{'+k+'}}', 'gi'), params[k]);

        return stringData;
    };

    /**
     * Simple router
     * @param urlPath
     * @param callback
     */
    proto.route = function(urlPath, callback){
        urlPath = urlPath || '';
        var reg = new RegExp('^'+urlPath+'$', 'i'),
            path = window.location.pathname;

        if(path.indexOf(this.url) === 0){
            path = path.substr(this.url.length);
            if(reg.test(path)) callback.call(this)
        }
        return this;
    };

    /**
     * Simple render
     * @param selector
     * @param data
     * @returns {*}
     */
    proto.render = function(selector, data){
        if(typeof selector === 'string') selector = this.query(selector);
        if(typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE) {
            selector.textContent = '';
            if(typeof data === 'object')
                selector.appendChild(data);
            else
                selector.innerHTML = data;
            return selector;
        }
        return null;
    };

    /**
     * Query DOM Element by selector
     *
     * @param selector
     * @param callback
     * @returns {Element}
     */
    proto.query = function(selector, callback){
        var elem = document.querySelector(selector);
        if(elem && typeof callback == 'function')
            callback.call(this, elem);
        return elem;
    };

    /**
     * Query DOM Elements by selector
     * @param selector
     * @param callback
     * @returns {Array.<T>}
     */
    proto.queryAll = function(selector, callback){
        var elems = [].splice.call(document.querySelectorAll(selector));
        if(elems.length > 0 && typeof callback == 'function')
            callback.call(this, elems);
        return elems;
    };


    /**
     * Apply an callback to each element of list
     * @param list      Array|Object
     * @param callback
     * @param tmp
     * @returns {*}
     */
    proto.each = function (list, callback, tmp) {
        tmp = tmp || {};
        if (list instanceof Array) {
            for (var i = 0; i < list.length; i++) {
                callback.call(this, list[i], i, tmp);
            }
        } else if (list instanceof Object) {
            for (var k in list) {
                callback.call(this, list[k], k, tmp);
            }
        }
        return list;
    };


    /**
     * Global name
     */
    window.NamespaceApplication = app;
    window.NamespaceApplication.prototype = proto;
    window.NamespaceApplication.prototype.constructor = app;

})(window);


















