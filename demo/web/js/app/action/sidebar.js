
/**
 * Action popup.js
 * @namespace App.Action.Sidebar
 */

(function(App, Dom, Tpl){

    "use strict";

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Sidebar');

    /**
     * Construct for action
     */
    o.init = function() {
        var btn = Dom('#sb-open').on('click', function(event){
            //console.log(this, event);
            if(this.classList.contains('sb-opened')){
                this.classList.remove('sb-opened');
                App.node.content.classList.remove('sb-opened');
                App.node.sidebar.classList.remove('sb-opened');
            }else{
                this.classList.add('sb-opened');
                App.node.content.classList.add('sb-opened');
                App.node.sidebar.classList.add('sb-opened');
            }
        });
    };



})(App, Dom, Tpl);