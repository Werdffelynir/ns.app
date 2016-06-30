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

    o.node = {};
    o.data = {};

    o.Linker = App.Module.Linker;
    o.Error = App.Module.Error;

    /**
     * Construct for action
     */
    o.init = function (nodes, data) {

        o.node = nodes;
        o.data = data;

        // Show message loader (block|none)
        o.node.inputLoaderIco.style.display = 'block';
        o.node.dialog.innerHTML = '';
        o.node.dialogMessages = Dom.createElement('div', {id: 'dialog_messages'});
        o.node.dialog.appendChild(o.node.dialogMessages);

        o.addMessages(o.data.messages, o.data.users);
    };


    o.send = function (event) {

        if (o.node['area'].textContent.length == 0) return;
        if (event.type === 'keyup' && (event.code !== 'Enter' || event.shiftKey !== true)) return;

        var textArea = o.node['area'].innerHTML;
        o.node['area'].innerHTML = '';

        o.update({message_text: textArea});
    };

    o.addMessages = function (messages, users) {
        messages.map(function (item) {
            var list = o.getMessagesReadyList();
            if(list.indexOf(item['id']) === -1){

                var user = users[item['user_id']]
                        ? users[item['user_id']] : {fullname:'Undefined', photo:'user.png'},

                    message = o.createMessage(user, item);

                o.node.dialogMessages.appendChild(message);
                o.scroll();
            }
        });
    };


    o.getMessagesReadyList = function () {
        var result = [],
            elems = Dom('#dialog_messages div[id*=message_]').each(function(item){
                result.push(item.id.split('_')[1])
            });
        return result;
    };

    o.scroll = function () {
        if( o.node.dialogMessages.scrollTo )
            o.node.dialogMessages.scrollTo(0, o.node.dialogMessages.scrollHeight);
        else
            o.node.dialogMessages.scrollTop = o.node.dialogMessages.scrollHeight
    };


    o.createMessage = function (user, item) {

        var timeDate = App.dataToStr(App.timeToDate(item['time'])),
            curUser = o.data.user,
            nav = '';

        nav += '<div class="btn btn_min">Pit</div>';
        nav += '<div class="btn btn_min">Hide</div>';

        // 30 min for delete own message
        if (item.user_id == curUser.id && (new Date).getTime() - (60000 * 5) < (parseInt(item.time + '000')))
            nav += '<div class="btn btn_min">Delete</div>';

        nav = '<div class="tbl_cell mbox_nav">' + nav + '</div>';

        var ico = '<img src="/ns.app/demo_chapp/images/' + user.photo + '" alt="">';
        var time_name = '<div class="mbox_head tbl">' +
            '<div class="tbl_cell">' +
            '<i class="mbox_time">' + timeDate + '</i> @ <i class="mbox_name">' + user.fullname + '</i>' +
            '</div>' +
            nav +
            '</div>';
        var msg = '<div class="mbox_msg">' + item.text + '</div>';
        var mbox_ico = Dom.createElement('div', {class: 'tbl_cell mbox_ico'}, ico);
        var mbox_ctx = Dom.createElement('div', {class: 'tbl_cell mbox_ctx'}, time_name + msg);


        var mbox = Dom.createElement('div', {id:'message_'+item.id, class: 'mbox tbl'});
        mbox.appendChild(mbox_ico);
        mbox.appendChild(mbox_ctx);
        return mbox;
    };

    o.autoupdate = function () {
        var timer = new Timer(5000);
        timer.onprogress = function (event) {
            o.update();
        };
        timer.start();
    };

    /**
     *
     * @param {*} sendData  command,
     *                      uid,
     *                      last_message_id,
     *                      delete_message_id,
     */
    o.update = function (sendData) {

        var id = o.data.messages[o.data.messages.length - 1]
            ? o.data.messages[o.data.messages.length - 1].id
            : 0;

        if (!Util.isObj(sendData)) sendData = {};

        sendData.command = 'update';
        sendData.uid = o.data.user.id;
        sendData.last_message_id = id;

        Aj.post(App.urlServer, sendData, o.updateComplete, o.updateError);

    };
    o.updateError = function (error) {};
    o.updateComplete = function (status, response, xhr, event) {
        var data = JSON.parse(response);
        if(typeof data.messages === 'object') {
            data.messages.map(function(m){o.data.messages.push(m)});
            o.addMessages(data.messages, data.users);
        }
        if(typeof data.users === 'object') App.Action.Sidebar.addUsers(data.users);
    };


    o.openAttach = function (e) {};

})(App, Dom, Tpl);