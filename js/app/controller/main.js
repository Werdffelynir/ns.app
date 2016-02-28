
/**
 * Controller main.js
 * ns:Main
 */

(function(App, Tpl){

    // Register controller
    // Using depending on the base application
    var o = App.registerController('Main');

    /**
     * Construct call first when this controller run
     */
    o.construct = function() {

        /**
         * First we need to select all the elements necessary for work.
         * But after the DOM is loaded
         */
        if(Tpl.domIsLoaded()){
            documentLoaded();
        }else{
            Tpl.domLoaded(documentLoaded);
        }
    };

    function documentLoaded(){


    }



})(App, Tpl);