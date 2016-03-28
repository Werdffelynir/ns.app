
var property = {
    url: '/ns.app/demo_com/',
    urlServer: '/server.php',
    urlLibs: '/ns.app/src/applibrary/',
    urlTemplates: '/ns.app/demo_com/templates/',
    name: 'Developer',
    debug: true,
    constructsType: 'gather'
};

//console.dir(NamespaceApplication);

window.App = new NamespaceApplication(property);

// loadings styles
App.style(App.url + 'css/desktop.css', null,initError);
App.style(App.url + 'css/mobile.css',null,initError);
App.script(App.url + 'js/test.js',null,initError);


App.require('libs',
    [
        App.urlLibs + 'aj.js',
        App.urlLibs + 'dom.js',
        App.urlLibs + 'util.js',
        App.urlLibs + 'timer.js'
    ],
    initLibrary, initError);


App.require('dependence',
    [
        // Modules
        'js/app/module/api.js',

        // Actions
        'js/app/action/sidebar.js',

        // Controllers
        'js/app/controller/login.js',
        'js/app/controller/front.js',
        'js/app/controller/back.js'

    ],
    initDependence, initError);

// start loading resources 'libs'
App.requireStart('libs');


function initError(error){
    console.error('onRequireError' , error);
}
function initLibrary(list){
    App.requireStart('dependence');
}
function initDependence(list){
    console.log('Application start!');

    //App.Controller.Login.isAuth();
    //var args = [1,'one','I'];
    //App.constructsStart(args);
}





//console.log('App: ', App);
