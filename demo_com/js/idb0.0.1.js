
(function(window){

    /**
     *
     * @param options
     */
    var proto = {
            name: null,
            version: null,
            db: null,
            indexedDB: null,
            request: null,
            onerror: null
        },
        idb = function(options){
            if(!(this instanceof Idb)) return new Idb(options);
            if(!options.name) return console.log('');
            this.name = options.name;
            this.version = options.version || 1;
            this.stores = options.stores || null;
            this.onerror = options.onerror || function(event){console.error('Database error:',event.target.error.message)};
        };

    proto.open = function(callback){
        this.indexedDB = window.indexedDB;// || window.webkitIndexedDB || window.mozIndexedDB;

        console.log(this.indexedDB)

        var request = this.indexedDB.open();
        request.onerror = this.onerror;
        request.onsuccess = function(event){
            proto.db = event.target.result;
            callback.call(request, proto.db);
        };
        request.onupgradeneeded = function(event){};
    };

    proto.get = function(ido, callback){

    };
    proto.del = function(){};
    proto.pull = function(){};
    proto.push = function(){};
    proto.clear = function(){};



    idb.prototype = proto;
    idb.prototype.constructor = idb;
    window.Idb = idb;
})(window);



var db = Idb({
    name: 'mega',
    version: 1,
    stores: {
        tasks: {
            name: 'tasks',
            schema: { keyPath: 'id', autoIncrement: false },
            indexes: [
                ['id', 'id', { unique: true }],
                ['text', 'text', { unique: false }]
            ],
            data:[]
        },
        links: {
            name: 'links',
            schema: { keyPath: 'id', autoIncrement: false },
            data:[]
        }
    }
});

db.open(function(db){console.log(db)});



//db.get({id:1},function(){});
//db.get(1,function(){});
//db.all(function(data){});
//db.push(function(data){});






