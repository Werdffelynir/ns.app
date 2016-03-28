
var property = {
    urlServer: '/server.php',
    urlLibs: '/ns.app/',
    url: '/ns.app/demo_com/',
    urlTemplates: '/ns.app/demo_com/js/app/templates/',
    name: 'Developer',
    debug: true
};

window.App = new NamespaceApplication(property);

// loadings styles
App.loadCSSLink(App.url + 'css/desktop.css',null,onRequireError);
App.loadCSSLink(App.url + 'css/mobile.css',null,onRequireError);
App.loadScript(App.url + 'js/test.js',null,onRequireError);


App.require('libs',
    [
        App.urlLibs + 'src/applibrary/aj.js',
        App.urlLibs + 'src/applibrary/dom.js',
        App.urlLibs + 'src/applibrary/util.js',
        App.urlLibs + 'src/applibrary/timer.js'
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

// start loading resources 'libs'
App.requireStart('libs');


function onRequireError(error){
    console.error('onRequireError' , error);
}
function onLibraryLoaded(list){
    App.requireStart('dependence');
}
function onDependenceLoaded(list){
    console.log('Application start!');

    App.loadFile(App.urlTemplates + 'popup.html', function(data) {
        App.render('#app-content', data);
    } , function(error){
        console.error('File loading error!', error);
    })

}





//console.log('App: ', App);
