
/**
 * Action dialog.js
 * @namespace App.Action.Dialog
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Dialog');

    o.linker = App.Module.Linker;

    /**
     * Construct for action
     */
    o.init = function() {

        App.node.dialog.innerHTML = '';
        App.node.dialogMessages = Dom.createElement('div',{id:'msg_list'});
        App.node.dialog.appendChild(App.node.dialogMessages);
        o.loadMessages();

    };

    o.loadMessages = function() {
        if(Array.isArray(App.data['messages'])){
            App.data['messages'].map(function (item) {
                if(Util.isObj(item)){
                    var _user = App.data['users'][item['user_id']]
                        ? App.data['users'][item['user_id']]
                        : {fullname:'User Name',photo:'user.png'},
                        _message = o.createMessage(_user['photo'], _user['fullname'], item['time'], item['text']);
                    App.node.dialogMessages.appendChild(_message);
                }
            })
        }
        //Aj.post(App.urlServer, {command:'get_messages'}, function(status, response, xhr, event){
        //    try{
        //        var ms = JSON.parse(response);
        //    }catch(error){}
        //})
    };

    o.putMessage = function(text){
        // console.log('putMessage: ', text);
        Aj.post(App.urlServer,
            {
                command:'put_message',
                text:text,
                user_id: App.data['user'].id
            },
            function(status, response, xhr, event){
                try{
                    var res = JSON.parse(response);
                    if(status == 200 && typeof res === 'object' && parseInt(res.result) > 0){
                        o.updateMessages();
                    }
                }catch(error){}
            }
        );

    };

    // {"error":null,"messages":null}
    o.updateMessages = function(){
        var id = App.data.messages[App.data.messages.length-1]
            ?   App.data.messages[App.data.messages.length-1].id
            :   0;

        Aj.post(App.urlServer, {command:'update_messages', last_id:id}, function(status, response, xhr, event){

            //App.node.dialogMessages.innerHTML = response;
            try{
                var res = JSON.parse(response);
                if(status == 200 && typeof res === 'object'){
                    if( Util.isArr(res['messages']) ){

                        res['messages'].map(function(item){

                            var _user = App.data['users'][item['user_id']]
                                    ? App.data['users'][item['user_id']]
                                    : {fullname:'User Name',photo:'user.png'},
                                _message = o.createMessage(_user['photo'], _user['fullname'], item['time'], item['text']);
                            App.data['messages'].push(item);
                            App.node.dialogMessages.appendChild(_message);

                        });

                    }
                }
            }catch(error){}
        })
    };

























    o.createMessage = function (ico, name, time, text) {

        var elem_nav = '';
        elem_nav += '<div class="btn btn_min">pit</div>';
        elem_nav += '<div class="btn btn_min">hide</div>';

        elem_nav = '<div class="tbl_cell mbox_nav">' + elem_nav + '</div>';

        var elem_ico = '<img src="/ns.app/demo/chapp/images/' + ico + '" alt="">';
        var elem_timename = '<div class="mbox_head tbl">'+
            '<div class="tbl_cell">'+
                '<i class="mbox_time">'+time+'</i>@<i class="mbox_name">'+name+'</i>'+
            '</div>' +
            elem_nav +
            '</div>';
        var elem_msg = '<div class="mbox_msg">' + text + '</div>';
        var elem_mbox_ico = Dom.createElement('div', {class:'tbl_cell mbox_ico'}, elem_ico);
        var elem_mbox_ctx = Dom.createElement('div', {class:'tbl_cell mbox_ctx'}, elem_timename + elem_msg);


        var mbox = Dom.createElement('div', {class:'mbox tbl'});
        mbox.appendChild(elem_mbox_ico);
        mbox.appendChild(elem_mbox_ctx);
        return mbox;
    }


})(App, Dom, Tpl);