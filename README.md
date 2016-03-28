# namespace Application


## config
```js
window.App = new NamespaceApplication({
    url: '/',
    name: true,
    debug: true
});
```

## methods
```js
App.setConfig(config:Object):App
App.namespace(namespace:String, callback:Function):Object
App.require(key:String, path:Array, oncomplete:Function, onerror:Function):App
App.requireStart(key:String):App
App.loadScript(src:String, onload:Function, onerror:Function):HTMLElement
App.loadCSSLink(src:String, onload:Function, onerror:Function):HTMLElement
App.loadFile(url:String, onload:Function, onerror:Function):void
App.request(method:String, url:String, callback:Function, callbackError:Function):XMLHttpRequest
App.assignValues(stringData:String, params:Object):String
App.route(urlPath:String, callback:Function):App
App.query(selector:String, callback:Function):HTMLElement
App.queryAll(selector:String, callback:Function):Array
App.each(list:Array|Object, callback:Function, tmp:Object):Array|Object
```


## start `init.js`
```js
(function(window, NamespaceApplication){

window.App = new NamespaceApplication({
                                          url: '/',
                                          name: true,
                                          debug: true
                                      });

// Loadings style
App.loadCSSLink(App.url + 'css/mobile.css', null, onRequireError);

// Loadings script
App.loadScript(App.url + 'js/script.js', null, onRequireError);

// assign scripts for loading
App.require('libs',
    [
        App.url + 'js/library/lib1.js',
        App.url + 'js/library/lib2.js',
        App.url + 'js/library/lib3.js'
    ],
    onLibraryLoaded, onRequireError);

App.require('dependence',
    [
        // Modules
        'js/app/module/api.js',

        // Actions
        'js/app/action/sidebar.js',

        // Controllers
        'js/app/controller/login.js'

    ],
    onDependenceLoaded, onRequireError);

// Start loading resources of scripts by key 
App.requireStart('libs');

// Loaging error handler
function onRequireError(error){
    console.error('onRequireError', error);
}

// Loaging complete handler
function onLibraryLoaded(list){

    // Start loading resources of scripts by key 
    App.requireStart('dependence');
}

// Loaging complete handler
function onDependenceLoaded(list){
    console.log('Application start!');

    // work starts here

}

})(window, NamespaceApplication);
```

