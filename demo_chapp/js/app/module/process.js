
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
            o.list[this.id] = this;
        };

    o.list = {};

    o.create = function(id) {
        return new process(id);
    };

    process.prototype.id = undefined;
    process.prototype.cacheData = null;
    process.prototype.template = null;
    process.prototype.target = null;
    process.prototype.params = null;

    process.prototype.render = function(call_target, template, params, callback){

        var self = this;

        if(typeof call_target === 'function'){

            if( this.target && this.template ){

                Tpl.loadHTML(this.template, function(htmlData, conf){
                    var _page = Tpl.inject(self.target, htmlData, self.params);
                    self.cacheData = conf;

                    call_target.call(self, _page);
                });

            }else
                App.error('Params: target and/or template is empty');
        }
        else {
            this.target = call_target;
            this.template = template;
            this.params = params;

            this.render( typeof callback === 'function' ? callback : function(){} );
        }
    };

    process.prototype.renderCache = function(){
        return self.cacheData ? self.cacheData : null;
    };


})(App, Dom, Tpl);