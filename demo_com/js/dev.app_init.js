
var property = {
    urlServer: '/server.php',
    url: '/',
    name: 'Developer',
    debug: true
};

window.App = new NamespaceApplication(property);

App.require('libs',
    [
        'http://js.dev.loc/ns.app/src/applibrary/aj.js',
        'http://js.dev.loc/ns.app/src/applibrary/dom.js',
        'http://js.dev.loc/ns.app/src/applibrary/tpl.js',
        'http://js.dev.loc/ns.app/src/applibrary/util.js',
        'http://js.dev.loc/ns.app/src/applibrary/timer.js'
    ],
    onLibraryLoaded);


App.require('dependences',
    [
        // Modules
        'js/app/module/api.js',

        // Actions
        'js/app/action/sidebar.js',

        // Controllers
        'js/app/controller/login.js'

    ],
    onDependenceLoaded);




App.requireStart('libs');

function onLibraryLoaded(list){


    console.log('onLibraryLoaded' , this);
    console.log('list' , list);

    App.requireStart('dependences');

}


function onDependenceLoaded(list){


    console.log('onDependenceLoaded' , this);
    console.log('list' , list);

}





console.log('App: ', App);
