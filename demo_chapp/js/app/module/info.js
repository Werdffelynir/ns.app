
/**
 * Module info.js
 * @namespace App.Module.Info
 */

(function(App, Dom, Tpl){

    /**
     * Register namespace of module
     * Using depending on the base application
     */
    var o = App.namespace('Module.Info'),
        line = null,
        page = null;

    o.setOutputLine = function(elem) {
        line = typeof elem === 'object' && elem.nodeType === Node.ELEMENT_NODE ? elem : null;
    };

    o.setOutputPage = function(elem) {
        page = typeof elem === 'object' && elem.nodeType === Node.ELEMENT_NODE ? elem : null;
    };

    o.line = function(text) {
        if(line) line.innerHTML = '<div class="info_line">' +text+ '</div>';
    };

    o.page = function(text) {
        if(page) page.innerHTML = '<div class="info_page">' +text+ '</div>';
    };

})(App, Dom, Tpl);