//# sourceMappingURL=http://example.com/path/to/your/sourcemap.map

window.App = new NamespaceApplication({
    url: '/ns.app/demo_base/',
    urlLibs: '/ns.app/src/applibrary/',
    urlServer: '/ns.app/demo_base/server/api.php',
    urlTemplates: '/ns.app/demo_base/templates/',

    name: 'Developer NS.JS Framework',
    environment: 'environment',
    debug: true,
    token: null,
    constructsType: false
});


// loadings styles
//App.style(App.url + 'css/desktop.css', null,initError);
//App.style(App.url + 'css/mobile.css',null,initError);
//App.script(App.url + 'js/test.js',null,initError);


App.require('libs',
    [
        App.urlLibs + 'aj.js',
        App.urlLibs + 'dom.js',
        App.urlLibs + 'util.js'
    ],
    initLibrary, initError);


App.require('dependence',
    [
        // App Extensions
        App.url + 'js.app/extension/message.js',
        App.url + 'js.app/extension/linker.js',

        // Actions
        App.url + 'js.app/action/popup.js',
        App.url + 'js.app/action/content.js',
        App.url + 'js.app/action/sidebar.js',
        App.url + 'js.app/action/navigate.js',

        // Controllers
        App.url + 'js.app/controller/page.js',
        App.url + 'js.app/controller/login.js'

    ],
    initDependence, initError);


// start loading resources 'libs'
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



