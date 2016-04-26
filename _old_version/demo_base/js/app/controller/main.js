/**
 * Controller main.js
 * @namespace App.Controller.Main
 */

(function(App, Dom, Tpl){

    "use strict";


    /**
     * Register controller
     * Using depending on the base application
     */
    var o = App.namespace('Controller.Main');

    var o1 = App.namespace('Controller.Om1');
    var o2 = App.namespace('Controller.Om2');
    var o3 = App.namespace('Controller.Om3');
    var o4 = App.namespace('Controller.Om4');


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
        console.log(App.Controller);

    }

})(App, Dom, Tpl);