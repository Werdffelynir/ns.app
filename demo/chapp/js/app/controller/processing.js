/**
 * Controller processing.js
 * processes pear processing
 * @namespace App.Controller.Processing
 */

(function (App, Dom) {

    /**
     * Register controller
     * Using depending on the base application
     */
    var ps = App.namespace('Controller.Processing');

    ps.node = {};
    ps.data = {};

    ps.Error = App.Module.Error;
    ps.Linker = App.Module.Linker;
    ps.Process = App.Module.Process;

    ps.Login = App.Action.Login;
    ps.Dialog = App.Action.Dialog;
    ps.Sidebar = App.Action.Sidebar;
    ps.Register = App.Action.Register;

    /**
     * Construct call first when this controller run
     */
    ps.construct = function () {

        Dom.loaded(documentLoaded);
    };

    function documentLoaded() {

        ps.node['body'] = Dom('body').one();
        ps.node['page'] = Dom('#page').one();
        ps.node['header'] = Dom('#header').one();
        ps.node['logo'] = Dom('#logo').one();
        ps.node['topnav'] = Dom('#topnav').one();
        ps.node['content'] = Dom('#content').one();
        ps.node['dialog'] = Dom('#dialog').one();
        ps.node['sidebar'] = Dom('#sidebar').one();
        ps.node['input'] = Dom('#input').one();
        ps.node['area'] = Dom('#area').one();
        ps.node['areanav'] = Dom('#areanav').one();
        ps.node['footer'] = Dom('#footer').one();
        ps.node['inputLoader'] = Dom('#input_loader').one();
        ps.node['inputLoaderIco'] = Dom('.input_loader_ico').one();

        // Router
        var processLogin = ps.Process.create('login'),
            processDialog = ps.Process.create('dialog');

        if (Util.Cookie('auth') != 1 || !Util.Cookie('user')) {
            processLogin.render(ps.node['dialog'], 'login', false, showLoginPage);
        }
        else {
            // load base data
            Aj.post(App.urlServer, {command: 'base_date'}, function (status, response) {
                try {
                    var baseDate = JSON.parse(response);

                    console.log(baseDate);

                    ps.data['user'] = JSON.parse(Util.Cookie('user'));
                    ps.data['config'] = baseDate['config'];
                    ps.data['users'] = baseDate['users'];
                    ps.data['messages'] = baseDate['messages'];

                    processDialog.render(ps.node['dialog'], 'dialog', false, showDialogPage);

                } catch (error) {
                    App.logError('Error loading/parse base data');
                }
            });
        }



    }
    function showLoginPage() {

        ps.Login.init();

        ps.node['input'].style.display = 'none';
        ps.node['topnav'].textContent = '';

    }
    function showDialogPage() {

        ps.Dialog.init(ps.node, ps.data);

        Tpl.include([
            'sidebar',
            'topnav'
        ], function (list) {

            Tpl.inject(ps.node.topnav, list.topnav.response);
            Tpl.inject(ps.node.sidebar, list.sidebar.response);

            ps.Sidebar.init(ps.node, ps.data);

            // Назначение действий на основные кнопки интерфейса
            ps.Linker.search();
            ps.Linker.click('logout', ps.Login.out);

            //ps.Linker.click('profile', click_profile);
            //ps.Linker.click('settings', click_settings);
            //ps.Linker.click('attach', click_attach);
            ps.Linker.click('enter', ps.Dialog.send);

            Dom(ps.node.area).on('keyup', ps.Dialog.send);

            // start auto updates
            ps.Dialog.autoupdate();

        })
    }



})(App, Dom);