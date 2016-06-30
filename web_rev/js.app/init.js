

window.App = new NamespaceApplication({
    debug: true,
    constructsType: false,
    url: '/ns.app/web_rev/',
    name: 'Developer NamespaceApplication.JS Framework',
    token: null,
    _fromApp: true
});



App.require('libs', [
    '/ns.app/js/aj.js',
    '/ns.app/js/dom.js',
    '/ns.app/js/util.js',
    '/ns.app/js/linker.js'
], initLibrary, initError);


App.require('dependence', [
    App.url + 'js.app/extension/tool.js',
    App.url + 'js.app/action/navigate.js',
    App.url + 'js.app/action/sidebar.js',
    App.url + 'js.app/controller/page.js',
    App.url + 'js.app/controller/login.js'
], initDependence, initError);



App.requireStart('libs');



function initError(error){
    console.error('initError' , error);
}



function initLibrary(list){
    App.requireStart('dependence');
}



function initDependence(list){
    console.log('Application start!');
    App.Controller.Page.construct();
}


