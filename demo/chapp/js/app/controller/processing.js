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

    o.Linker = App.Module.Linker;
    o.Dialog = App.Action.Dialog;
    o.Sidebar = App.Action.Sidebar;
    o.FormAuth = App.Action.FormAuth;

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
        App.node['inputLoader'] = Dom('#input_loader').one();
        App.node['inputLoaderIco'] = Dom('.input_loader_ico').one();

        //console.log(App.node);
        var processLogin = App.Module.Process.create('login'),
            processDialog = App.Module.Process.create('dialog');

        if(Util.Cookie('auth') != 1 || !Util.Cookie('user')){
            processLogin.render(App.node.dialog, 'login', false, callLoginPage);
        }else{
            // load base data
            Aj.post(App.urlServer, {command:'get_base_date'}, function(status, response){
                try {
                    var _data = JSON.parse(response);
                    //console.log(_data);

                    App.data['user'] = JSON.parse(Util.Cookie('user'));
                    App.data['config'] = _data['config'];
                    App.data['users'] = _data['users'];
                    App.data['messages'] = _data['messages'];
                    processDialog.render(App.node.dialog, 'dialog', false, callDialogPage);

                }catch(error){
                    App.logError('Error in time loading base data');
                }
            });
        }

    }

    function callLoginPage(page){
        App.node['input'].style.display = 'none';
        App.node['topnav'].textContent = '';

        o.FormAuth.init(this.id);
    }

    function callDialogPage(page){

        o.Dialog.init();

        Tpl.include([
            'sidebar',
            'topnav'
        ], function(list){

            Tpl.inject(App.node.topnav, list.topnav.response);
            Tpl.inject(App.node.sidebar, list.sidebar.response);

            o.Sidebar.init();

            // Назначение действий на основные кнопки интерфейса
            o.Linker.search();
            o.Linker.click('logout', click_logout);
            o.Linker.click('profile', click_profile);
            o.Linker.click('settings', click_settings);
            o.Linker.click('enter', click_enter);
            o.Linker.click('attach', click_attach);
            Dom(App.node.area).on('keyup', click_enter);

            // auto updates
            var timer = new Timer(5000);
            timer.onprogress = function(event){
                console.log('update...');
            };
            timer.oncomplete = function(event){
                console.log('oncomplete');
            };
            timer.start();

        })
    }

    function click_logout (event){
        Util.Cookie.remove('auth', {path: '/'});
        Util.Cookie.remove('user', {path: '/'});
        App.redirect('/');
    }
    function click_profile (event){
        "use strict";
        App.log('profile: ', this, event);
    }
    function click_settings (event){}
    function click_enter (event){
        if(App.node['area'].textContent.length == 0) return;
        if(event.type === 'keyup' && (event.code !== 'Enter' || event.shiftKey !== true) ) return;

        var textArea = App.node['area'].innerHTML;
        App.node['area'].innerHTML = '';

        o.Dialog.putMessage(textArea);
    }
    function click_attach (event){}


})(App, Dom);