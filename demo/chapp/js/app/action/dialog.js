
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
        // Show message loader (block|none)
        App.node.inputLoaderIco.style.display = 'block';
        App.node.dialog.innerHTML = '';
        App.node.dialogMessages = Dom.createElement('div',{id:'dialog_messages'});
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
                        _message = o.createMessage(_user, item);

                    App.node.dialogMessages.appendChild(_message);
                }
            });
            o.scroll();

            // Show message loader (block|none)
            App.node.inputLoaderIco.style.display = 'none';
        }
    };

    o.putMessage = function(text){

        // Show message loader (block|none)
        App.node.inputLoaderIco.style.display = 'block';

        Aj.post(App.urlServer, {command:'put_message', text:text, user_id: App.data['user'].id},
            // request is complete
            function(status, response, xhr, event){
                try{
                    var res = JSON.parse(response);
                    if(status == 200 && typeof res === 'object'){

                        if(parseInt(res.result) > 0){
                            o.updateMessages();
                        }
                        else if(res.result === false) App.error('Response update result is false');

                        // Show message loader (block|none)
                        App.node.inputLoaderIco.style.display = 'none';

                    }else
                        App.error('Response data does not match to type.');

                }catch(error){
                    App.error('Response data fail on parse to object');
                }
            },
            // request is fail
            function(status, xhr, event){
                App.error('Response data fail on parse to object');
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
                                _message = o.createMessage(_user, item);

                            App.data.messages.push(item);
                            App.node.dialogMessages.appendChild(_message);

                            o.scroll();
                        });


                    }
                }
            }catch(error){}
        })
    };

    o.scroll = function(){
        App.node.dialogMessages.scrollTo(0,App.node.dialogMessages.scrollHeight);
    };


    o.createMessage = function (user, item, ico, name, time, text) {

        var timeDate = App.dataToStr(App.timeToDate(item['time']+'000')),
            curUser = App.data.user,
            nav = '';
        nav += '<div class="btn btn_min">pit</div>';
        nav += '<div class="btn btn_min">hide</div>';

        // 30 min for delete own message
        if(item.user_id == curUser.id && (new Date).getTime()-(60000*30) < (parseInt(item['time']+'000')) )
            nav += '<div class="btn btn_min">delete</div>';

        nav = '<div class="tbl_cell mbox_nav">' + nav + '</div>';

        var ico = '<img src="/ns.app/demo/chapp/images/' + user['photo'] + '" alt="">';
        var time_name = '<div class="mbox_head tbl">'+
            '<div class="tbl_cell">'+
                '<i class="mbox_time">'+timeDate+'</i> @ <i class="mbox_name">' + user['fullname'] + '</i>'+
            '</div>' +
            nav +
            '</div>';
        var msg = '<div class="mbox_msg">' + item['text'] + '</div>';
        var mbox_ico = Dom.createElement('div', {class:'tbl_cell mbox_ico'}, ico);
        var mbox_ctx = Dom.createElement('div', {class:'tbl_cell mbox_ctx'}, time_name + msg);


        var mbox = Dom.createElement('div', {class:'mbox tbl'});
        mbox.appendChild(mbox_ico);
        mbox.appendChild(mbox_ctx);
        return mbox;
    }

})(App, Dom, Tpl);