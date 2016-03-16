/**
 * Controller processing.js
 * @namespace App.Controller.Processing
 */

(function(App, Dom, Tpl){

    "use strict";

    /**
     * Register controller
     * Using depending on the base application
     */
    var o = App.namespace('Controller.Processing');

    /**
     * Construct call first when this controller run
     */
    o.construct = function() {

        //if(App.Action.has('Navigation')) App.Action.Navigation.init();
        //console.log();
        
        Tpl.callbackError = App.logError;
        Tpl.loadHTML('navigation3.html', function(data){
            App.log(data);
            App.log(Util.isHtml(data));
            var nav = Tpl.inject('#navigation', data);
            var dom = Dom(nav).find('a').each(navigationLinkHandler);
            
            //console.log(dom);
        })

        /**
         * First we need to select all the elements necessary for work.
         * But after the DOM is loaded
         */
        Dom.loaded(function(){});
    };

    o.putContent = function() {

    };

    /**
     * * * * * * * * * * *    S T A T I C    * * * * * * * * * * * 
     */
    function navigationLinkHandler(item,index) {
        item.onclick = function(e){
            e.preventDefault();
            var method = 'action_' + this.getAttribute('data-action');
            if(typeof o[method] === 'function'){
                o[method].call(o, this);
            }
        };
    };
    
    
    /**
     * * * * * * * * * * *    M E T H O D S    * * * * * * * * * * * 
     */


    o.action_main = function(link) {
        console.log(link);
    };
    
    o.action_docs = function(link) {
        console.log(link);
    };


})(App, Dom, Tpl);