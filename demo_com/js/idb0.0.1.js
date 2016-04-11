
var idb = {
    name: 'megastore',
    version: 1,
    openType: IDBTransaction.READ_WRITE,
    schema: { keyPath: "id", autoIncrement: true },
    onerror:function(event){console.error('Database error:',event.target.error.message)},
    db: null,
    _store: null,
    request: null,
    _transaction: null,
    _objectStore: null
};

//baseName 	  = "filesBase",
//storeName 	  = "filesStore";

idb.openIndexedDB = function(callback){
    var db, request = idb.request = indexedDB.open(idb.name, idb.version);
    request.onerror = idb.onerror;
    request.onsuccess = function(event){
        db = idb.db = event.target.result;
        callback.call(event, db);
    };
    request.onupgradeneeded = function(event){
        event.currentTarget.result.createObjectStore(idb.name, idb.schema);
        idb.openIndexedDB(callback);
    };
};

idb.getAll = function(store, callback){
    idb.openIndexedDB(function(db){
        var rows = [], request = db.transaction([store], idb.openType).objectStore(store);
        request.openCursor().onerror = idb.onerror;
        request.openCursor().onsuccess = function(event){
            var cursor = event.target.result;
            if(cursor){
                rows.push(cursor.value);
                cursor.continue();
            }else{
                callback.call(idb.request, rows);
            }
        };
    });
};

idb.get = function(id, store, callback){
    idb.openIndexedDB(function(db){
        var request = db.transaction([store], idb.openType).objectStore(store).get(id);
        request.onerror = idb.onError;
        request.onsuccess = function(event) {
            var cursor = event.target.result;
            console.log(cursor);
            console.log( event.target );
            callback.call(event, request);

        };
    });
};


idb.clear = function(id, store, callback){
    idb.openIndexedDB(function(db){
        var request = db.transaction([store], idb.openType);
        var objectStore = request.objectStore(store);
        objectStore.clear();
        objectStore.onerror = idb.onError;
        objectStore.onsuccess = function(event) {
            callback.call(event, request);
        };
    });
};







idb.getAll('item', function(data){
    console.log(data);
});

idb.get('Bill', 'item', function(data){
    console.log(data);
});





















