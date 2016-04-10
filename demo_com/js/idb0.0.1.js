//
//var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

var testData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];



/**
 *
 * @type {{db: null|IDBDatabase, request: null|IDBOpenDBRequest}}
 */
var idb = {
    name: 'megastore',
    version: 1,
    db: null,
    request: null
};

idb.request = indexedDB.open(idb.name, idb.version);
idb.request.onerror = function(event){
    console.error('Database error: ', event);
    console.error('Database error: ', event.target.error.message);
};

idb.request.onupgradeneeded = function(event){
    idb.db = event.target.result;
    console.log('onupgradeneeded:',event);


    var objectStore = idb.db.createObjectStore("item", { keyPath: "id", autoIncrement: true });

    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", { unique: false });

    for (var i in testData) {
        objectStore.add(testData[i]);
    }

};

idb.request.onsuccess = function(event){
    idb.db = event.target.result;
    console.log('onsuccess:', idb.db);

    var transaction = idb.db.transaction(["item"], IDBTransaction.READ_WRITE);
    var objectStore = transaction.objectStore("item");
    console.log('objectStore:', objectStore);
};

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