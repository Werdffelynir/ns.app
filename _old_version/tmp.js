
=============================

=============================


if (inst.isInit && path.length >= 1) {

    var a = path[0].trim();

    if (typeof inst.namespaces[a] !== 'object' || !!reload)
        inst.namespaces[a] = {has: inst.has(a)};
    if (typeof inst[a] !== 'object' || !!reload)
        inst[a] = inst.namespaces[a];

    if(path.length == 1)
        return inst.namespaces[a];

}

if (inst.isInit && path.length >= 2) {

    var b = path[1].trim();

    if (typeof inst.namespaces[a][b] !== 'object' || !!reload)
        inst.namespaces[a][b] = inst.label(b, {_app_: {name: b, permission: 1}});
    inst[a][b] = inst.namespaces[a][b];

    if (a === 'Controller' && inst.namespaces[a][b].construct) {
        inst.namespaces[a][b].construct.call(inst.namespaces[a][b])
    }else if (a === 'Action' && inst.namespaces[a][b].init) {
        inst.namespaces[a][b].init.call(inst.namespaces[a][b])
    }

    if(path.length == 2)
        return inst.namespaces[a][b];
}

if (inst.isInit && path.length >= 3) {

    var c = path[2].trim();

    if (typeof inst.namespaces[a][b][c] !== 'object' || !!reload)
        inst.namespaces[a][b][c] = inst.label(c, {_app_: {name: c, permission: 1}});
    inst[a][b][c] = inst.namespaces[a][b][c];

    if(path.length == 3)
        return inst.namespaces[a][b][c];
}

if (inst.isInit && path.length >= 4) {

    var d = path[3].trim();

    if (typeof inst.namespaces[a][b][c][d] !== 'object' || !!reload)
        inst.namespaces[a][b][c][d] = inst.label(d, {_app_: {name: d, permission: 1}});
    inst[a][b][c][d] = inst.namespaces[a][b][c][d];

    if(path.length == 4)
        return inst.namespaces[a][b][c][d];

}

if (inst.isInit && path.length >= 5) {

    var e = path[4].trim();

    if (typeof inst.namespaces[a][b][c][d][e] !== 'object' || !!reload)
        inst.namespaces[a][b][c][d][e] = inst.label(e, {_app_: {name: e, permission: 1}});
    inst[a][b][c][d][e] = inst.namespaces[a][b][c][d][e];

    return inst.namespaces[a][b][c][d][e];
}












=============================================================================
        if(i === 0 && typeof source === 'object'){
            this.require.loadScriptsRecursive(i, source.src, source.oncomplete, source.onerror, this);

        }else if (Array.isArray(source)){
            self.require.loadScript(
                source[i],
                function(){
                    self.require.loadScriptsRecursive(++i, source, onload, onerror, self)
                },
                function(error){
                    console.error("Script element loading is fail. src: " + source[self.require.loadScriptsRecursive.i++]);
                }
            );
        }



        /*if(typeof source === 'object'){
            this.require.loadScriptsRecursive.i = 0;
            this.require.loadScriptsRecursive(source.src, onload, onerror);

        }else if (Array.isArray(source)){
            var self = this;
            this.require.loadScript(
                source[this.require.loadScriptsRecursive.i++],
                function(){
                    self.require.loadScriptsRecursive(source, onload, onerror)
                },
                function(error){
                    console.error("Script element loading is fail. src: " + source[self.require.loadScriptsRecursive.i++]);
                }
            );
        }*/


        /*/var
            _onload = function(){
                //this.require.loadScriptsRecursive(i++, source[iter], oncomplete, onerror);
            },
            _onerror = function(){
                console.error("Require source not found! Key: " + key + " not exist!");
            };

        if(Array.isArray(source)){


        }else if (typeof source === 'string'){
            this.require.loadScript(source, _onload, _onerror);
        }/*/








=============================================================================



/*
        var  customerData = [
            { id: 1, name: "Bill", age: 35, email: "bill@company.com" },
            { id: 2, name: "Donna", age: 32, email: "donna@home.org" },
            { id: 3, name: "Donna", age: 32, email: "donna@home.org" },
            { id: 4, name: "Donna", age: 32, email: "donna@home.org" },
            { id: 5, name: "Donna", age: 32, email: "donna@home.org" },
            { id: 6, name: "Donna", age: 32, email: "donna@home.org" }
        ];

        
        var request = new Idb({
              name:'test'
            , version: 5
            , onerror: function(event) {
                console.log("error: ", event);
            }
            , onsuccess: function(event) {
                console.log("onsuccess this: ", this);
                console.log("onsuccess: ", event);
            }
            , onblocked: function(event) {
                console.log("onblocked: ", event);
            }
            , onupgradeneeded: function(event) {
                console.log("onupgradeneeded: ", event);
                
                var db = event.target.result;
                var objectStore = db.createObjectStore("customers5", {keyPath: "id"});
                for (var i in customerData) {
                        objectStore.add(customerData[i]);      
                }
                
            }
        });
*/
        /*
        console.log(request);

        request.openRequest.onerror = function(event) {
          console.log("error: ", event);
        };

        request.openRequest.onsuccess = function(event) {
          //db = request.result;
          console.log("onsuccess this: ", this);
          console.log("onsuccess event: ", event);
          console.log("onsuccess success: ", request.openRequest.result);
        };

        request.openRequest.onupgradeneeded = function(event) {
          console.log("onupgradeneeded event: ", event);
        }
        */
        







=============================================================================

<<<<<<< HEAD:tmp.js
C:\py\Scripts\;C:\py\;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;C:\ProgramData\Oracle\Java\javapath;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\Git\cmd;E:\server\modules\php\PHP-5.4;E:\server\modules\php\PHP-5.5;%AppData%/npm;%PROGRAMFILES(x86)%\nodejs\node_modules\.bin;%PROGRAMFILES(x86)%\nodejs;C:\Windows\Microsoft.NET\Framework\v4.0.30319;%USERPROFILE%\.dnx\bin;C:\Program Files\Microsoft DNX\Dnvm\;d:\programs\server sql utl\sqlite;C:\Program Files (x86)\Skype\Phone\;C:\Program Files (x86)\nodejs\;C:\Program Files (x86)\Brackets\command


Паттерны масштаб. JS приложений
=======
function extend(destination, source) {
    var property;
    for (property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
}


function extend(destination, source){
    for(var key in source.prototype){
        if(source.prototype.hasOwnProperty(key) && key !== 'constructor'){
            destination.prototype[key] = source.prototype[key];
        }
    }
    return destination;
}


>>>>>>> b1bbfd7f2801be936bae4f93ef9fc2fa878da060:_old_version/tmp.js




=============================================================================





/*    var inherit = function(destination, source) {
 var constructor = source.hasOwnProperty('constructor')
 ? source.constructor
 : function(){destination.apply(this,arguments)};
 var F = function() {};
 F.prototype = destination.prototype;
 constructor.prototype = new F();
 constructor.superclass = source.prototype;
 constructor.prototype.constructor = constructor;
 return constructor;
 };*/

function _extend(destination, source){
    /*        var property;
     for (property in source) {
     if (source[property] && source[property].constructor && source[property].constructor === Object) {
     destination[property] = destination[property] || {};
     extend(destination[property], source[property]);
     } else {
     destination[property] = source[property];
     }
     }
     return destination;*/

    //console.log(source.prototype);

//        for(var key in source) {
//            if(source.hasOwnProperty(key)){
//                destination[key] = source[key];
//            }
//        }
//        var _constructor = destination.prototype.constructor;
//        destination.prototype = Object.create(source.prototype);
//        console.log(_constructor);
//        destination.prototype.constructor = _constructor;
}







=============================================================================






    /*
     function Shape(x, y){
     this.x = x;
     this.y = y;
     }
     Shape.prototype.x = 0;
     Shape.prototype.y = 0;
     Shape.prototype.getPosition = function(){
     return {x:this.x, y:this.y};
     };

     function Rectangle(x, y, width, height){
     Shape.call(this, x, y);
     this.height = height;
     this.width = width;
     }

     Rectangle.prototype = Object.create(Shape.prototype);
     Rectangle.prototype.constructor = Rectangle;

     Rectangle.prototype.width = 0;
     Rectangle.prototype.height = 0;

     var rec = new Rectangle(10,10,100,200);
     */




    //




=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================









=============================================================================