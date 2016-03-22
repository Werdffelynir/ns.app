/**
 * Action dialog.js
 * @namespace App.Action.Dialog
 */

(function (App, Dom, Tpl) {

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Dialog');

    o.Linker = App.Module.Linker;

    /**
     * Construct for action
     */
    o.init = function () {
        // Show message loader (block|none)
        App.node.inputLoaderIco.style.display = 'block';
        App.node.dialog.innerHTML = '';
        App.node.dialogMessages = Dom.createElement('div', {id: 'dialog_messages'});
        App.node.dialog.appendChild(App.node.dialogMessages);

        o.addMessages(App.data.messages);

    };

    o.addMessages = function (messages) {
        var us = App.data['users'];
        messages.map(function (item) {
            if (!item.added) {
                item.added = true;

                var user = us[item['user_id']]
                        ? us[item['user_id']] : {fullname:'Undefined', photo:'user.png'},
                    message = o.createMessage(user, item);

                App.node.dialogMessages.appendChild(message);
            }
        });
        o.scroll();

    };

    /**
     *
     * @param {*} sendData  command,
     *                      uid,
     *                      last_message_id,
     *                      delete_message_id,
     */
    o.update = function (sendData) {
        var id = App.data.messages[App.data.messages.length - 1]
            ? App.data.messages[App.data.messages.length - 1].id
            : 0;

        if (!Util.isObj(sendData)) sendData = {};
        sendData.command = 'update';
        sendData.uid = App.data.user.id;
        sendData.last_message_id = id;

        //console.log(sendData);

        Aj.post(App.urlServer, sendData, o.updateComplete, o.updateError);

    };
    o.updateError = function (error) {
    };
    o.updateComplete = function (status, response, xhr, event) {
        //console.log(status, response);
        //App.node.dialogMessages.innerHTML = response;
        try {
            var data = JSON.parse(response);

            if(Util.isArr(data.messages)) o.addMessages(data.messages);
            if(Util.isObj(data.users)) {
                //console.log(o.Sidebar);
                App.data.users = data.users;

                App.node['sidebar'].innerHTML = '';
                App.Action.Sidebar.renderUsersList(App.data.users);

            }//o.Sidebar.setUsersStatus(data.users);

            //console.log(data);

            /*if(status == 200 && typeof res === 'object'){
             if( Util.isArr(res['messages']) ){

             res['messages'].map(function(item){

             var _user = App.data['users'][item['user_id']]
             ? App.data['users'][item['user_id']]
             : {fullname:'User Name',photo:'user.png'},
             _message = o.createMessage(_user, item);

             App.data.messages.push(item);
             App.node.dialogMessages.appendChild(_message);

             });
             o.scroll();

             // Show message loader (block|none)
             //App.node.inputLoaderIco.style.display = 'none';
             }
             }*/

        } catch (error) {
            App.error('After request, in response parse data some error.');
        }
    };


    o.scroll = function () {
        if( App.node.dialogMessages.scrollTo )
            App.node.dialogMessages.scrollTo(0, App.node.dialogMessages.scrollHeight);
        else
            App.node.dialogMessages.scrollTop = App.node.dialogMessages.scrollHeight
    };

    o.autoupdate = function () {
        var timer = new Timer(5000);
        timer.onprogress = function (event) {
            o.updateMessages();
        };
        timer.start();
    };

    o.createMessage = function (user, item, ico, name, time, text) {

        var timeDate = App.dataToStr(App.timeToDate(item['time'] + '000')),
            curUser = App.data.user,
            nav = '';
        nav += '<div class="btn btn_min">pit</div>';
        nav += '<div class="btn btn_min">hide</div>';

        // 30 min for delete own message
        if (item.user_id == curUser.id && (new Date).getTime() - (60000 * 30) < (parseInt(item['time'] + '000')))
            nav += '<div class="btn btn_min">delete</div>';

        nav = '<div class="tbl_cell mbox_nav">' + nav + '</div>';

        var ico = '<img src="/ns.app/demo/chapp/images/' + user['photo'] + '" alt="">';
        var time_name = '<div class="mbox_head tbl">' +
            '<div class="tbl_cell">' +
            '<i class="mbox_time">' + timeDate + '</i> @ <i class="mbox_name">' + user['fullname'] + '</i>' +
            '</div>' +
            nav +
            '</div>';
        var msg = '<div class="mbox_msg">' + item['text'] + '</div>';
        var mbox_ico = Dom.createElement('div', {class: 'tbl_cell mbox_ico'}, ico);
        var mbox_ctx = Dom.createElement('div', {class: 'tbl_cell mbox_ctx'}, time_name + msg);


        var mbox = Dom.createElement('div', {class: 'mbox tbl'});
        mbox.appendChild(mbox_ico);
        mbox.appendChild(mbox_ctx);
        return mbox;
    }

})(App, Dom, Tpl);