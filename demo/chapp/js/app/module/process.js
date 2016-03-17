
/**
 * Module process.js
 * @namespace App.Module.Process
 */

(function(App, Dom, Tpl){

    /**
     * Register namespace of module
     * Using depending on the base application
     */
    var o = App.namespace('Module.Process'),

        process = function(id){
            this.id = id || (new Date()).getTime() + Math.random().toString(36);
        };

    o.create = function(id) {
        return new process(id);
    };

    process.prototype.id = undefined;

})(App, Dom, Tpl);