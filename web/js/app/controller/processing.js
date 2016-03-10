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

        var node = App.namespace('node');

        node.tips = Dom('#tips').one();
        node.help = Dom('#help').one();
        node.popup = Dom('#popup').one();
        node.page = Dom('#page').one();
        node.header = Dom('#header').one();
        node.navigation = Dom('#navigation').one();
        node.content = Dom('#content').one();
        node.sidebar = Dom('#sidebar').one();
        node.footer = Dom('#footer').one();



        console.log( node );


        //console.log('Controller main.js is Loaded');

    }

    o.putContent = function() {

    };

})(App, Dom, Tpl);