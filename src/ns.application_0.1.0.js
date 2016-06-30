/**
 * Static:
 NamespaceApplication.version
 NamespaceApplication.domLoaded ( callback )
 NamespaceApplication.request ( method, url, callback, callbackError )
 NamespaceApplication.assign ( stringData, params )
 NamespaceApplication.script ( src, onload, onerror )
 NamespaceApplication.style ( src, onload, onerror )
 NamespaceApplication.file ( url, onload, onerror )

 config = {
    url: '/',
    debug: true,
    constructsType: 'runtime'
}
 ns = new NamespaceApplication( config )

 merge ( objectBase, src )
 setConfig ( config )
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

    var app = function () {

        this.version = version;
        this.domLoaded = app.domLoaded;

    };

    /** Execute callback function if or when DOM is loaded
     * @param callback
     */
    app.domLoaded = function (callback) {
        if(document.querySelector('body')) {
            callback.call({});
        }else{
            document.addEventListener('DOMContentLoaded', function(){callback.call({})}, false);
        }
    };
    app.request = function (method, url, callback, callbackError) {
    };
    app.script = function (url, onload, onerror) {
    };
    app.style = function (url, onload, onerror) {
    };
    app.file = function (url, onload, onerror) {
    };
    app.merge = function (objectBase, src) {
    };
    app.store = function (key, data) {
    };
    app.route = function (urlPath, callback) {
    };
    app.assign = function (stringData, params) {
    };
    app.inject = function (selector, data) {
    };
    app.query = function (selector, parent) {
    };
    app.queryAll = function (selector, parent) {
    };
    app.each = function (list, callback, tmp) {
        var i = 0;
        if(list instanceof Array)
            for (i = 0; i < list.length; i ++) callback.call({}, list[i], i, tmp);
        else
            for (i in list) callback.call({}, list[i], i, tmp);
    };

    app.prototype.namespace = function (namespace, callback, args) {
    };
    app.prototype.require = function (key, path, oncomplete, onerror) {
    };
    app.prototype.requireStart = function (key) {
    };
    app.prototype.setConfig = function (config) {
    };
    app.prototype.constructsStart = function (args) {
    };


    /**
     *
     * @type {app}
     */
    window.NSApp = app;

})();





















