
/**
 * Action settings.js
 * @namespace App.Action.Settings
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Settings');

    o.node = {};
    o.nodeToggle = null;
    o.data = {};
    o.template = null;

    o.Error = App.Module.Error;
    o.linker = App.Module.Linker;

    /**
     * Construct for action
     */
    o.init = function(nodes, data) {

        o.node = nodes;
        o.data = data;
        o.nodeToggle = o.node.contentAbove;

        Tpl.loadHTML('settings.html',loadedTemplate,loadedTemplateError)

    };

    function loadedTemplateError(error){
        console.log(error)
    }
    function loadedTemplate(response, conf){
        //console.log(response, conf);
        //Tpl.inject(o.nodeToggle, response)
        o.template = response;
    }

    o.open = function(event) {
        event.preventDefault();

        if(o.nodeToggle.style.display == 'block') {

            o.nodeToggle.style.display = 'none'
        } else {
            Tpl.inject(o.nodeToggle, o.template);
            o.nodeToggle.style.display = 'block'


            var linker = App.Module.Linker;
            linker.search();
            var f = linker.on('input','set-field', function(e){
                console.log(this, e);

            });
            console.log(f);
        }


        //console.log()
    };



})(App, Dom, Tpl);