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

        //console.log(App.node);
        var processLogin = App.Module.Process.create('login'),
            processDialog = App.Module.Process.create('dialog');

        if(Util.cookie('auth') != 1 && !Util.cookie('username')){
            processLogin.render(App.node.dialog, 'login', false, callLoginPage);
        }else{
            processDialog.render(App.node.dialog, 'dialog', false, callDialogPage);
        }


    }

    function callLoginPage(page){
        App.node['input'].style.display = 'none';
        App.node['topnav'].textContent = '';
        App.Action.FormAuth.init(this.id);
    }

    function callDialogPage(page){

        App.Action.Dialog.init();

        Tpl.include([
            'topnav',
            'sidebar',
            'input'
        ], function(list){
            //console.log(list)

            Tpl.inject(App.node.input, list.input.response);
            Tpl.inject(App.node.topnav, list.topnav.response);
            Tpl.inject(App.node.sidebar, list.sidebar.response);


            App.Action.Sidebar.init();

        })
    }


})(App, Dom);