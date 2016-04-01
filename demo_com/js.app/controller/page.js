if(App.namespace){App.namespace('Controller.Page', function(App){

    /**
     * @namespace App.Controller.Page
     */
    var
        ns = {
            cache:{}
        }
        , node = {}
        , User = App.Action.User
        , Popup = App.Action.Popup
        , Navigate = App.Action.Navigate
        , Linker = App.Module.Linker
        ;
            
    ns.construct = function(){

        App.domLoaded(build);

    };

    function build (){

        // query base HTML elements in the page
        node = App.node({
              tips:           App.query('#app-tips')
            , help:           App.query('#app-help')
            , popup:          App.query('#app-popup')
            , page:           App.query('#app-page')
            , content:        App.query('#app-content')
            , sidebar:        App.query('#app-sidebar')
        });

        var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eum officia recusandae? Ad, aspernatur autem consectetur culpa dolorem error eum laborum libero maiores officia pariatur perferendis saepe sed soluta voluptatum!';

        // Linker run
        Linker.search();
        
        // Popup run
        Popup.init(node.popup, Linker);
        //Popup.open(str);
        /*if(User.isAuth()) {
            App.file(App.urlTemplates + 'content.home.html', function(data){
               
            });
        }else{
            App.file(App.urlTemplates + 'content.login.html', function(data){
                //App.inject(node.content, data);
            });
        }*/
        //var c = ns.render('content', 'content.home.html');
        //console.log(c);

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
        
        
        



    }

    ns.render = function(name, file, reload) {
        if(Util.Storage.get(name) === null && file || !!reload) {
            App.file(App.urlTemplates + file, function(data) {
                Util.Storage.set(name, data); //ns.cache[name] = data;
                ns.render(name, file);
            });
        } else
            return node[name].innerHTML = Util.Storage.get(name); //node[name].innerHTML = ns.cache[name];
    };

    ns.api = function(){};

    return ns;

})}
