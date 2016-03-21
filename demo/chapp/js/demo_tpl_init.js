/**
 * Created by ProStation on 21.02.2016.
 */

var ChApp = {};

document.addEventListener('DOMContentLoaded', isLoaded);

function isLoaded(e){

    ChApp.title = '';
    ChApp.value = {};
    ChApp.dom = {
        head: Tpl.query('.tplHead'),
        dialog: Tpl.query('.tplDialog'),
        sidebar: Tpl.query('.tplSidebar'),
        input: Tpl.query('.tplInput'),
        navigation: Tpl.query('.tplNavigation')
    };

    Tpl.include(['head','dialog','sidebar','input','navigation'], function(view){

        var viewSidebar = (function(){
            var v = '';
            for(var i=0;i<10;i++){v+=view['sidebar'].response}
            return v;
        })();

        Tpl.inject(ChApp.dom.head, view['head'].response, ChApp.value);
        Tpl.inject(ChApp.dom.dialog, view['dialog'].response, ChApp.value);
        Tpl.inject(ChApp.dom.sidebar, viewSidebar, ChApp.value);
        Tpl.inject(ChApp.dom.input, view['input'].response, ChApp.value);
        Tpl.inject(ChApp.dom.navigation, view['navigation'].response, ChApp.value);

    });

}

