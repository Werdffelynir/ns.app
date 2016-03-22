
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

        // Show message loader (block|none), uid: App.data.user['id']
        //App.node.inputLoaderIco.style.display = 'block';

        Aj.post(App.urlServer, {command:'update_messages', last_id:id}, function(status, response, xhr, event){

            console.log(status, response);
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

                        });
                        o.scroll();

                        // Show message loader (block|none)
                        //App.node.inputLoaderIco.style.display = 'none';
                    }
                }
            }catch(error){
                console.log(error);
            }

        })
    };

