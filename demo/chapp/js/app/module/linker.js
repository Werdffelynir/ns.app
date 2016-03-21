
/**
 * module linker.js
 * Выполнитель действий для кнопок.
 *
 * o.search();
 * Соберает все елементы с классом .linker
 *
 * Елементы собраны в стек по индификатору
 * Нидификатор - назначается по атрибутам по проиоритету data-id, id, href#hash
 *
 * o.get( id )
 * Выбирает элемент по индификатору
 *
 * o.click( id )
 * Назначает событие клика для элемента по индификатору
 *
 * @namespace App.Module.Linker
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Module.Linker');

    o.stack = {};

    /**
     * Construct for action
     */
    o.search = function(where, refresh) {
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
            if(id) if(!o.stack[ id ] || refresh)
                o.stack[ id ] = elems[i];
        }
        return o.stack;
    };


    o.click = function(id, callback, useCapture) {
        return o.on('click', id,  callback, useCapture);
    };

    o.on = function(event, id, callback, useCapture) {
        if(o.stack[id]) {
            o.stack[id].addEventListener(event, callback, useCapture);
            return o.stack[id];
        }
        return false;
    };

    o.refresh = function() {
        o.search();
        return o;
    };

    /**
     *
     * @param id
     * @returns {{}|*}
     */
    o.get = function(id){return (id)?o.stack[id]:o.stack};


})(App, Dom, Tpl);