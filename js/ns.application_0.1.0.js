/**
 * Static:
 NamespaceApplication.version
 NamespaceApplication.domLoaded ( callback )
 NamespaceApplication.request ( method, url, callback, callbackError )
 NamespaceApplication.assign ( stringData, params )
 NamespaceApplication.script ( src, onload, onerror )
 NamespaceApplication.style ( src, onload, onerror )
 NamespaceApplication.file ( url, onload, onerror )

 properties = {
    url: '/',
    debug: true,
    constructsType: 'runtime'
}
 ns = new NamespaceApplication( properties )

 merge ( objectBase, src )
 setproperties ( properties )
 namespace ( namespace, callback, args )
 constructsStart ( args )
 node ( nodes )
 require ( key, path, oncomplete, onerror )
 requireStart ( key )
 script ( src, onload, onerror )
 style ( src, onload, onerror )
 file ( url, onload, onerror )
 request ( method, url, callback, callbackError )
 assign ( stringData, params )
 route ( urlPath, callback )
 inject ( selector, data )
 query ( selector, parent )
 queryAll ( selector, parent )
 each ( list, callback, tmp )
 domLoaded ( callback )

 */

(function () {


    var version = '0.1.0';


    /**
     * NamespaceApplication Constructor
     * @param properties
     * @returns {app|NamespaceApplication}
     */
    var app = function (properties) {
        if (!(this instanceof NamespaceApplication))
            return new NamespaceApplication(properties);


        this.version = version;
        this.domLoaded = app.domLoaded;
        this.setProperties(properties);

    };

    /** Execute callback function if or when DOM is loaded
     * @param callback
     */
    app.domLoaded = function (callback) {
        if (document.querySelector('body')) {
            callback.call({});
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                callback.call({})
            }, false);
        }
    };


    /**
     * Base url request
     * @param method
     * @param url
     * @param callback
     * @param callbackError
     * @returns {XMLHttpRequest}
     */
    app.request = function(method, url, callback, callbackError) {
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
     * Loads the script element
     * @param src
     * @param onload
     * @param onerror
     * @returns {*}
     */
    app.script = function (src, onload, onerror) {

        if(!src) return null;

        var script = document.createElement('script'),
            id = "src-" + Math.random().toString(32).slice(2);

        script.src = (src.substr(-3) === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        script.id = id;
        script.onload = onload;
        script.onerror = onerror;

        document.head.appendChild(script);

        return script;
    };


    /**
     *
     * Loads the CSS link element
     *
     * @param url
     * @param onload
     * @param onerror
     * @returns {Element}
     */
    app.style = function (url, onload, onerror) {
        var link = document.createElement('link'),
            id = "src-" + Math.random().toString(32).slice(2);

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
    app.file = function  (url, onload, onerror) {
        app.request('GET', url, function(event){
            if(event.target.status === 200)
                onload.call(this, event.target.responseText, event);
            else
                onerror.call(this, event);
        }, onerror)
    };

    /**
     *
     * @param objectBase
     * @param src
     * @returns {*}
     */
    app.merge = function (objectBase, src) {
        for (var key in src)
            if (objectBase[key] === undefined)
                objectBase[key] = src[key];
        return objectBase;
    };


    /**
     * Storage memory
     *
     *      if `object` is a Object - set new objects
     *      if `object` is a String - return object by name
     *      if `object` is a not set - return all objects
     *
     * @param object
     * @returns {*}
     */
    app.store = function (object) {
        if(typeof object === 'object') {
            for (var key in object)
                this._stackStorage[key] = object[key];
            return this._stackStorage;
        }
        else if (typeof object === 'string')
            return this._stackStorage[object] ? this._stackStorage[object] : null;

        else if (object === undefined)
            return this._stackStorage;
    };


    /**
     * Simple router
     *
     * @param urlPath
     * @param callback
     * @returns {app}
     */
    app.route = function (urlPath, callback) {
        urlPath = urlPath || '';
        var reg = new RegExp('^'+urlPath+'$', 'i'),
            path = window.location.pathname;

        if(path.indexOf(this.url) === 0){
            path = path.substr(this.url.length);
            if(reg.test(path)) callback.call(this)
        }
        return this;
    };



    app.assign = function (stringData, params) {
        if(typeof params === 'object')
            for(var k in params)
                stringData = stringData.replace(new RegExp('{{'+k+'}}', 'gi'), params[k]);

        return stringData;
    };


    /**
     * Simple inject data to HTMLElement [by selector]
     * @param selector
     * @param data
     * @returns {*}
     */
    app.inject = function (selector, data) {
        if (typeof selector === 'string') selector = this.query(selector);
        if (typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE) {
            selector.textContent = '';
            if (typeof data === 'object')
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
     * @param parent|callback
     * @returns {Element}
     */
    app.query = function (selector, parent) {
        var elems = this.queryAll(selector, parent);
        if (elems && elems.length > 0)
            return elems[0];
        return null;
    };



    /**
     * Query DOM Elements by selector
     *
     * @param selector
     * @param parent    callback
     * @returns {*}
     */
    app.queryAll = function (selector, parent) {
        var callback, _elemsList, elems, from = document;

        if (typeof parent === 'function')
            callback = parent;
        else if (typeof parent === 'string')
            from = document.querySelector(parent);
        else if (typeof parent === 'object' && parent.nodeType === Node.ELEMENT_NODE)
            from = parent;


        if (from) {
            elems = [].slice.call(from.querySelectorAll(selector));
        }


        if (elems.length > 0 && typeof callback == 'function')
            callback.call(this, elems);

        // debug
        if (this.debug && !elems)
            console.error("Error queryAll DOM Elements by selector ", selector);

        return elems;
    };


    /**
     *
     * @param list
     * @param callback
     * @param tmp
     */
    app.each = function (list, callback, tmp) {
        var i = 0;
        if (list instanceof Array)
            for (i = 0; i < list.length; i++) callback.call({}, list[i], i, tmp);
        else
            for (i in list) callback.call({}, list[i], i, tmp);
    };


    /**
     *
     * @type {{url: string, debug: boolean, constructsType: string, _lastKey: null, _stackRequires: {}, _stackStorage: {}, _stackConstructs: Array}}
     */
    app.prototype._properties = {

        /**
         * Base url
         */
        url: '/',

        /**
         * Debug mod
         */
        debug: true,

        /**
         * Startup type of constructor for modules
         * Type: false - off constructor
         *      'runtime' - perform during the assignment of namespace
         *      'gather' - save in the stack,
         *          for call and execute all constructor methods, use .constructsStart()
         */
        constructsType: 'runtime',

        _lastKey: null,
        _stackRequires: {},
        _stackStorage: {},
        _stackConstructs: []
    };


    /**
     * Create namespace for module-script
     * @param namespace  "Controller.Name" or "Action.Name"
     * @param callback
     * @param args
     * @returns {{}}
     */
    app.prototype.namespace = function (namespace, callback, args) {
        var
            name,
            path = namespace.split('.'),
            tmp = this || {},
            len = path.length;

        for (var i = 0; i < len; i++) {
            name = path[i].trim();
            if (typeof tmp[name] !== 'object') {
                tmp[name] = (i + 1 >= len) ? (callback ? callback.call(tmp, this, {}) : {}) : {};
                tmp = tmp[name];
            } else
                tmp = tmp[name];
        }

        if (typeof tmp === "object" && tmp.construct) {
            args = Array.isArray(args) ? args : [];
            if (this.constructsType == 'runtime') {
                tmp.construct.apply(tmp, args);
            }
            else if (this.constructsType == 'gather')
                this._stackConstructs.push(tmp);
        }

        return tmp;
    };


    /**
     * Run all modules constructs
     * @param args
     * @returns {app}
     */
    app.prototype.constructsStart = function(args) {
        app.each(this._stackConstructs, function(item, index){
            item.construct.apply(item, args);
        },args);
        this._stackConstructs = [];
        return this;
    };


    /**
     * Designate a list of scripts for loading
     * @param key           list key (identifier)
     * @param path          array with scripts url
     * @param oncomplete    executing when all scripts are loaded
     * @param onerror
     * @returns {app}
     */
    app.prototype.require = function (key, path, oncomplete, onerror) {
        this._lastKey = key;
        this._stackRequires[key] = {
            src:  Array.isArray(path) ? path : [path],
            oncomplete : oncomplete,
            onerror : onerror
        };
        return this;
    };


    /**
     * Start loading the list of scripts by key (identifier)
     *
     * @param key
     * @returns {app}
     */
    app.prototype.requireStart = function (key) {
        var source;
        key = key || this._lastKey;
        if(this._stackRequires[key]){
            this._recursive_load_script(0, key);
        }else{
            console.error("Require source not found! Key: " + key + " not exist!");
        }
        return this;
    };


    /**
     *
     * @param i
     * @param key
     * @private
     */
    app.prototype._recursive_load_script = function  (i, key) {
        var self = this,
            source = this._stackRequires[key];

        if (source.src[i]) {
            if(!Array.isArray(source.node)) source.node = [];

            source.node.push(app.script(source.src[i], function(){
                self._recursive_load_script(++i, key);
            }, source.onerror));

        } else if (i ===  source.src.length)
            source.oncomplete.call(self, source.node);
        else
            self._recursive_load_script(++i, key);
    };


    /**
     * Apply properties object to instance properties
     * @param properties
     * @returns {app}
     */
    app.prototype.setProperties = function (properties) {
        properties = typeof properties === 'object' ? app.merge(this._properties, properties) : this._properties;

        for (var prop in properties) {
            if (this[prop] === undefined)
                this[prop] = properties[prop];
        }
        return this;
    };


    app.prototype.constructsStart = function (args) {
    };


    /**
     *
     * @type {app}
     */
    window.NamespaceApplication = app;

})();