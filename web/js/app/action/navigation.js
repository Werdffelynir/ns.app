
/**
 * Action navigation.js
 * @namespace App.Action.Navigation
 */

(function(App, Dom, Tpl){
    
    "use strict";
    
    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Navigation');

    o.list = [
        'Итоги',
        'Лента',
        'Лиды',
        'Контрагенты',
        'Контакты',
        'Активности',
        'Продажи',
        'Заказы',
        'Договоры',
        'Счета',
        'Документы',
        'Продукты',
        'Проекты',
        'База знаний',
        'Планирование'
    ];

    /**
     * Construct for action
     */
    o.init = function() {
        Tpl.callbackError = App.logError;
        Tpl.loadHTML('navigation.html', function(data){
            //App.log(data);
            var nav = Tpl.inject('#navigation', data);
            var dom = Dom(nav).find('a').each(function(item,index){
                item.onclick = function(e){
                    e.preventDefault();
                    
                    var ctrl = App.ns('Controller.Processing'),
                        linksLoad = 'action_' + this.getAttribute('data-load');
                    
                    if(App.ns('Controller.Processing')[linksLoad]){
                        ctrl[linksLoad].call(ctrl, this);
                    }
                };
                //console.log(item,index);
            });
            
            //console.log(dom);
        })
        
    };
    
    o.createNavigation = function(list){
        var nav = '';
        if(!Array.isArray(list)) {
            App.logError('Navigation list is empty.');
            return;
        }
        list.map(function(item){
            nav += '<li class="navigation__item"><a href="/' + item + '" data-action="' + item + '">' + item + '</a></li>';
        });
        return '<ul>' + nav + '</ul>';
    };



})(Application, Dom, Tpl);