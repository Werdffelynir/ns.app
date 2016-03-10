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

        var head = App.ns('node').header;
        var navi = App.ns('node').navigation;
        var cont = App.ns('node').content;
        var page = App.ns('node').page;
        //page.style.width = '80%';



        /**
         * First we need to select all the elements necessary for work.
         * But after the DOM is loaded
         */
        Dom.loaded(function(){

        });
    };

    o.putContent = function() {

    };


})(App, Dom, Tpl);