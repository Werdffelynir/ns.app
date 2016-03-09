/**
 * Controller processing.js
 * @namespace App.Controller.Processing
 */

(function(App, Dom, Tpl){

    /**
     * Register controller
     * Using depending on the base application
     */
    var o = App.namespace('Controller.Processing');

    /**
     * Construct call first when this controller run
     */
    o.construct = function() {

        /**
         * First we need to select all the elements necessary for work.
         * But after the DOM is loaded
         */
        Dom.loaded(documentLoaded);
    };

    function documentLoaded(){

        console.log('Controller main.js is Loaded');

    }



})(Application, Dom, Tpl);