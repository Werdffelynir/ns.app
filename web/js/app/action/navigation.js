
/**
 * Action navigation.js
 * @namespace App.Action.Navigation
 */

(function(App, Dom, Tpl){

    "use strict";


    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Navigation');
    o.init();


    /**
     * Construct for action
     */
    o.init = function() {

        Tpl.loadHTML('navigation.html', function(data){
            App.log(data);

        }, function(error){
            App.logError(error);
        })
    };



})(Application, Dom, Tpl);