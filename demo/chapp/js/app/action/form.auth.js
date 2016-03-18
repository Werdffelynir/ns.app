
/**
 * Action form.auth.js
 * @namespace App.Action.FormAuth
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.FormAuth');

    /**
     * Construct for action
     */
    o.init = function() {
        App.node['input'].style.display = 'none';
        App.node['topnav'].textContent = '';

        Tpl.loadHTML('login', formHtmlLoaded);
    };

    function formHtmlLoaded(htmlData){
        "use strict";
        var dialog = Tpl.inject(App.node.dialog, htmlData);



    }



})(App, Dom, Tpl);