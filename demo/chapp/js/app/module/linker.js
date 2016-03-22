
/**
 * module linker.js
 * Выполнитель действий для кнопок.
 *
 * linker.search();
 * Соберает все елементы с классом .linker
 *
 * Елементы собраны в стек по индификатору
 * Нидификатор - назначается по атрибутам по проиоритету data-id, id, href#hash
 *
 * linker.get( id )
 * Выбирает элемент по индификатору
 *
 * linker.click( id )
 * Назначает событие клика для элемента по индификатору
 *
 * @namespace App.Module.Linker
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var linker = App.namespace('Module.Linker');

    linker.stack = {};

    /**
     * Construct for action
     */
    linker.search = function(where, refresh) {
        where = typeof where === 'object' && where.nodeType === Node.ELEMENT_NODE ? where : document;
        refresh = refresh||false;
        var elems = where.querySelectorAll('.linker');
        for(var i = 0; i < elems.length; i ++ ){
            var id = elems[i].getAttribute('data-id')
                ? elems[i].getAttribute('data-id')
                : ( elems[i].id
                    ? elems[i].id
                    : ( elems[i].href && elems[i].hash.length > 1
                        ? elems[i].hash.slice(1)
                        : false
                    )
                );
            if(id) if(!linker.stack[ id ] || refresh)
                linker.stack[ id ] = elems[i];
        }
        return linker.stack;
    };


    linker.click = function(id, callback, useCapture) {
        return linker.on('click', id,  callback, useCapture);
    };

    linker.on = function(event, id, callback, useCapture) {
        if(typeof callback !== 'function') {
            console.error('typeof callback not a function');
            return false;
        }

        if(linker.stack[id]) {
            linker.stack[id].addEventListener(event, callback, useCapture);
            return linker.stack[id];
        }
        return false;
    };

    linker.refresh = function() {
        linker.search();
        return o;
    };

    linker.get = function(id){
        return (id)?linker.stack[id]:linker.stack
    };

})(App, Dom, Tpl);