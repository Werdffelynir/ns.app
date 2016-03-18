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
        App.node['body'] = Dom('body').one();
        App.node['page'] = Dom('#page').one();
        App.node['header'] = Dom('#header').one();
        App.node['logo'] = Dom('#logo').one();
        App.node['topnav'] = Dom('#topnav').one();
        App.node['content'] = Dom('#content').one();
        App.node['dialog'] = Dom('#dialog').one();
        App.node['sidebar'] = Dom('#sidebar').one();
        App.node['input'] = Dom('#input').one();
        App.node['area'] = Dom('#area').one();
        App.node['areanav'] = Dom('#areanav').one();
        App.node['footer'] = Dom('#footer').one();
        App.node['body'] = Dom('body').one();

        console.log(App.node);

        App.Module.Process.create();
        if(!Util.cookie('auth')){
            App.Action.FormAuth.init();
        }else{
            App.Action.Dialog.init();
        }


    }


})(App, Dom);