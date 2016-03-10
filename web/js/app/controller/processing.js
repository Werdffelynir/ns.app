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
        var jObject = App.namespace('Using.depending.onthe.base.application.First.weneed.toselect.allthe.elements.necessary.for.work');
        var page = App.ns('node').page;

            console.log(jObject);
            console.log(App.Using.depending.onthe);
            console.log(page);



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