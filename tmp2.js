
    o.loadMessages = function() {
        if(Array.isArray(App.data['messages'])){
            App.data['messages'].map(function (item) {
                if(Util.isObj(item)){

                    var _user = App.data['users'][item['user_id']]
                        ? App.data['users'][item['

                        user_id']]
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



================================================================


werd@ProUbuntu:/var/www/owncloud.loc/apps$ sudo gedit /etc/php5/apache2/php.ini
[sudo] пароль для werd: 

(gedit:28542): Gtk-WARNING **: Calling Inhibit failed: GDBus.Error:org.freedesktop.DBus.Error.ServiceUnknown: The name org.gnome.SessionManager was not provided by any .service files
werd@ProUbuntu:/var/www/owncloud.loc/apps$ sudo /etc/init.d/apache2 restart
[ ok ] Restarting apache2 (via systemctl): apache2.service.
werd@ProUbuntu:/var/www/owncloud.loc/apps$ 




        //gantt.autoSchedule(id);
        //console.log(task);
        app.eachLinksById(id, 'source', function(link){
            var predecessor = gantt.getTask(link.target);
            //predecessor.start_date =
            console.log(predecessor);
            //gantt.autoSchedule(predecessor.id);
            //console.log(id, link);
        });


================================================================



"error:An exception occurred while executing 'INSERT INTO oc_collab_tasks (type, text, users, start_date, end_date, duration, order, progress, sortorder, parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' with params ["task", "New Task", "", "2016-01-31 18:00:00", "2016-02-07 18:00:00", "7", 0, 0, 0, 1]: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'order, progress, sortorder, parent) VALUES ('task', 'New Task', '', '2016-01-31 ' at line 1"


================================================================
"error:An exception occurred while executing 'INSERT INTO oc_collab_tasks (type, text, users, start_date, end_date, duration, order, progress, sortorder, parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' with params ["task", "New Task", "", "2016-01-31 16:00:00", "2016-02-07 16:00:00", 7, 0, 0, 0, 1]: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'order, progress, sortorder, parent) VALUES ('task', 'New Task', '', '2016-01-31 ' at line 1"


NSERT INTO oc_collab_tasks (
    type, 
    text, 
    users, 
    start_date, 
    end_date, 
    duration,
    order, 
    progress, 
    sortorder, 
    parent
    ) 
VALUES (
    "task", 
    "New Task", 
    "", 
    "2016-01-31 16:00:00", 
    "2016-02-07 16:00:00", 
    7, 
    0, 
    0, 
    0, 
    1
    );

"error:An exception occurred while executing 'INSERT INTO oc_collab_tasks (type, text, users, start_date, end_date, duration, order, progress, sortorder, parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' with params ["task", "New Task", "", false, false, 7, 0, 0, 0, 1]: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'order, progress, sortorder, parent) VALUES ('task', 'New Task', '', '', '', '7',' at line 1"


"error:An exception occurred while executing 'INSERT INTO oc_collab_tasks (type, text, users, start_date, end_date, duration, order, progress, sortorder, parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' with params ["task", "New Task", "", 0, 0, 7, 0, 0, 0, 1]: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'order, progress, sortorder, parent) VALUES ('task', 'New Task', '', '0', '0', '7' at line 1"


================================================================

Тел здох. ночю увидел переписку все исправленно и настроено. проблема была с базой данных индификатор набрал макс значение. Подобная ошибка уже исключена, регистрация задачь в базе зафиксирована.
Новую логику на буфера как и обещал вчера сделал. Только что провел еще некоторые фиксы по стабильности.

График работает отлично или без лаг, к призентации готов. И еще стоит Енди упоменуть что некоторые тригеры (события) самого гантта иногда не страбатывают. например auto_scheduling а доб функционал на него опирается, это зависимость от гантта ничего не поделать.






================================================================



//
//var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

var testData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];



/*
 *
 * @type {{db: null|IDBDatabase, request: null|IDBOpenDBRequest}}
 */
var idb = {
    name: 'megastore',
    version: 1,
    db: null,
    request: null
};

/*idb.request.onerror = function(event){
    console.error('Database error: ', event.target.error.message)
};
idb.request.onsuccess = function(event){
    idb.db = event.target.result;
    console.error('Database onsuccess')
};
idb.request.onupgradeneeded = function(event){
    console.log('onupgradeneeded:',event)
};*/

idb.open = function(callback){

    idb.request = indexedDB.open(idb.name, idb.version);
    idb.request.onerror = function(event){
        console.error('Database error: ', event.target.error.message)
    };
    idb.request.onsuccess = function(event){
        idb.db = event.target.result;
        callback.call(idb.request, idb.db);
        console.log('Database onsuccess')
    };
    idb.request.onupgradeneeded = function(event){
        console.log('onupgradeneeded:',event)
    };
};



idb._transaction = null;
idb._storeName = null;
idb._objectStore = null;

idb.transaction = function(stores, type){
    type = type || IDBTransaction.READ_WRITE;
    stores = typeof stores === 'string' ? [stores] : stores;
    return idb._transaction = idb.db.transaction(stores, type);
};
idb.store = function(store, callback){
    idb.open(function(){
        idb.transaction([store]);
        idb._objectStore = idb._transaction.objectStore(store);
        callback.call(idb.request, idb.db);
        console.log('objectStore:', idb._objectStore);
    });
};

//idb.db = function(){};
idb.get = function(id){};

idb.getAll = function(store, callback, count){

    callback.call(idb.request, idb.db);

};
idb.put = function(data){};
idb.update = function(id, data){};
idb.remove = function(id){};
idb.count = function(){};
idb.lastId = function(){};

//idb.store('item');
idb.getAll('item', function(data){
    console.log('getAll');
});



/*    var objectStore = idb.db.createObjectStore("item", { keyPath: "id", autoIncrement: true });
 objectStore.createIndex("name", "name", { unique: false });
 objectStore.createIndex("email", "email", { unique: false });
 for (var i in testData) {
 objectStore.add(testData[i]);
 }*/
/*idb.callSuccess = function(callback){
    idb.request.onsuccess = function(event){
        idb.db = event.target.result;

        callback.call(idb.request, idb.db);
    };
};*/

/*idb.getAll = function(callback){
    idb.request.onsuccess = function(event){
        idb.db = event.target.result;

        var request = objectStore.getAll([query, count]);
        if()
        callback.call(idb.request, idb.db);
    };
};*/

/*idb.request.onsuccess = function(event){
    idb.db = event.target.result;
    console.log('onsuccess:', idb.db);

    var transaction = idb.db.transaction(["item"], IDBTransaction.READ_WRITE);
    var objectStore = transaction.objectStore("item");
    console.log('objectStore:', objectStore);
};*/

// IDBTransaction.READ_WRITE
//idb.request.transaction = function(stores, type){
//    type = type || IDBTransaction.READ_WRITE;
//};







/*
 error : null
 onblocked : null
 onerror : null
 onsuccess : null
 onupgradeneeded : null
 readyState : "done"
 result : IDBDatabase
 source : null
 transaction : null
*/



================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







================================================================







