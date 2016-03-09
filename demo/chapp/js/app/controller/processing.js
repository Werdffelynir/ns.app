/**
 * Controller processing.js
 * processes pear processing
 * @namespace App.Controller.Processing
 */

(function(App, Dom){

    /**
     * Register controller
     * Using depending on the base application
     */
    var o = App.namespace('Controller.Processing'),
        process = {};

    /**
     * Construct call first when this controller run
     */
    o.construct = function(id) {

        process = {
            id: id || (new Date()).getTime()
        };

        /**
         * First we need to select all the elements necessary for work.
         * But after the DOM is loaded
         */
        Dom.loaded(documentLoaded);
    };

    function documentLoaded(){

        console.log(process);

    }


})(Application, Dom);