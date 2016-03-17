/**
 * Controller processing.js
 * @namespace App.Controller.Processing
 */

(function(App, Dom, Tpl){

    "use strict";

    /**
     * Register controller
     * Using depending on the base application
     */
    var o = App.namespace('Controller.Processing');

    o.cacheData = {};

    /**
     * Construct call first when this controller run
     */
    o.construct = function() {
        
        Tpl.callbackError = App.logError;

        Tpl.loadHTML('navigation.html', function(htmlData, conf){
            addCacheData(htmlData, conf.id);
            var nav = Tpl.inject('#navigation', htmlData);
            Dom(nav).find('a').each(navigationLinkHandler);
        });

        Tpl.loadHTML('topnav.html', function(htmlData, conf){
            addCacheData(htmlData, conf.id);
            Tpl.inject(App.node.topnav, htmlData);
        });

        Tpl.include([
            'content.home',
            'content.docs',
            'content.load',
            'content.exmp',
            'content.bugs'
        ], function(confs){
            //console.log(confs);
            addCacheData(confs['content.home']['response'], 'content.home');
            addCacheData(confs['content.docs']['response'], 'content.docs');
            addCacheData(confs['content.load']['response'], 'content.load');
            addCacheData(confs['content.exmp']['response'], 'content.exmp');
            addCacheData(confs['content.bugs']['response'], 'content.bugs');

            App.Action.Sidebar.init();
        });

        o.action();
        /**
         * First we need to select all the elements necessary for work.
         * But after the DOM is loaded
         */
        Dom.loaded(function(){});
    };

    o.putContent = function(htmlData) {
        //return Tpl.inject(App.node.content, htmlData);

        if(typeof htmlData === 'object') {
            App.node.content.innerHTML = '';
            App.node.content.appendChild(htmlData);
        }
        else App.node.content.innerHTML = htmlData;

        return App.node.content;
    };


    /**
     * * * * * * * * * * *    S T A T I C    * * * * * * * * * * *
     */
    function addCacheData(data, id) {
        o.cacheData[id] = data;
    }

    function getCacheData(id) {
        return o.cacheData[id] ? o.cacheData[id] : false;
    }

    function navigationLinkHandler(item,index) {
        item.onclick = function(e){
            e.preventDefault();
            var method = this.getAttribute('data-action');
            if(typeof o.action[method] === 'function'){
                o.action[method].call(o, this);
            }
        };
    }


    /**
     * * * * * * * * * * *    M E T H O D S    * * * * * * * * * * *
     * * * * * * * * * * *    A C T I O N S    * * * * * * * * * * *
     */


    o.action = function() {
        //console.log(App.Action.Sidebar);
        o.action.home();
    };

    o.action.home = function(link) {
        var htmlData = getCacheData('content.home');
        if(!htmlData) {
            Tpl.loadHTML('content.home', function(html, conf){
                addCacheData(html, conf.id);
                o.action.home();
            });
            return;
        }
        o.putContent(htmlData);

        testDate0.innerHTML = '0 day: ' + Util.date.addDays(0);
        testDate1.innerHTML = '1 day: ' + Util.date.addDays(1);
        testDate2.innerHTML = '0.5 day: ' + Util.date.addDays(0.5);
        testDate3.innerHTML = '1 hour: ' + Util.date.addDays(0.04);
    };
    
    o.action.docs = function(link) {
        var htmlData = getCacheData('content.docs');
        if(!htmlData) {
            Tpl.loadHTML('content.docs', function(html, conf){
                addCacheData(html, conf.id);
                o.action.docs();
            });
            return;
        }
        o.putContent(htmlData);
    };

    o.action.load = function(link) {
        var htmlData = getCacheData('content.load');
        if(!htmlData) {
            Tpl.loadHTML('content.load', function(html, conf){
                addCacheData(html, conf.id);
                o.action.load();
            });
            return;
        }
        o.putContent(htmlData);
    };
    
    o.action.exmp = function(link) {
        var htmlData = getCacheData('content.exmp');
        if(!htmlData) {
            Tpl.loadHTML('content.exmp', function(html, conf){
                addCacheData(html, conf.id);
                o.action.exmp();
            });
            return;
        }
        o.putContent(htmlData);
    };
    
    o.action.bugs = function(link) {
        var htmlData = getCacheData('content.bugs');
        if(!htmlData) {
            Tpl.loadHTML('content.bugs', function(html, conf){
                addCacheData(html, conf.id);
                o.action.bugs();
            });
            return;
        }
        o.putContent(htmlData);
    };

})(App, Dom, Tpl);