

var App = new NamespaceApplication({
    // application configs
    path: '/ns.app/demo/',
    debug: true,
    constructsType: false,

    // custom configs
    name: 'Developer NamespaceApplication.JS Framework',
    token: null
});


//App.path          /ns.app/demo/
//App.uri('/page')  /ns.app/demo/page



App.require('libs', [
    '/ns.app/js/aj.js',
    '/ns.app/js/dom.js',
    '/ns.app/js/util.js',
    '/ns.app/js/linker.js'
], initLibrary, initError);


App.require('dependence', [
    App.path + 'js.app/extension/tool.js',
    App.path + 'js.app/action/navigate.js',
    App.path + 'js.app/action/sidebar.js',
    App.path + 'js.app/controller/page.js',
    App.path + 'js.app/controller/login.js'
], initDependence, initError);



App.requireStart('libs');



function initError(error){
    console.error('initError' , error);
}



function initLibrary(list){
    App.requireStart('dependence');
}


// start
function initDependence(list){
    console.log('Application start!');

    //App.route(App.uri(), App.Controller.Page.construct, true);
    //App.route(App.uri('#login'), App.Controller.Login.construct, true);


    //console.log(App.routePath());
    //console.log(NamespaceApplication.routePath());
}


