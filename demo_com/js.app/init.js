//# sourceMappingURL=http://example.com/path/to/your/sourcemap.map

window.App = new NamespaceApplication({
    //url: '/',
    //urlLibs: '//js.dev.loc/ns.app/src/applibrary/',
    //urlServer: '/server/api.php',
    //urlTemplates: '/templates/',
    url: '/ns.app/demo_com/',
    urlLibs: '/ns.app/src/applibrary/',
    urlServer: '/ns.app/demo_com/server/api.php',
    urlTemplates: '/ns.app/demo_com/templates/',

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
        App.urlLibs + 'idb.js',
        App.urlLibs + 'dom.js',
        App.urlLibs + 'util.js',
        App.urlLibs + 'timer.js'
    ],
    initLibrary, initError);


App.require('dependence',
    [
        // App Extensions
        'js.app/extension/common.js',
        'js.app/extension/linker.js',
        //'js.app/extension/api.js',
        //'js.app/extension/error.js',

        // Actions
        'js.app/action/user.js',
        'js.app/action/popup.js',
        'js.app/action/render.js',
        'js.app/action/content.js',
        'js.app/action/sidebar.js',
        'js.app/action/navigate.js',

        // Controllers
        'js.app/controller/page.js',
        'js.app/controller/back.js'

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

    App.Controller.Page.construct();
}



