if(App.namespace){App.namespace('Action.Popup', function(App){
    /**
     * @namespace App.Action.Popup
     */
    var o = {};

    o.node = {};

    o.init = function(wrapper){
        this.node.wrapper = wrapper;

        //o.createPopup(this.node.wrapper);
        this.node.win = App.query('#app-popup-win',wrapper);
        this.node.top = App.query('#app-popup-top',wrapper);
        this.node.content = App.query('#app-popup-content',wrapper);
        this.node.bottom = App.query('#app-popup-bottom',wrapper);
    };

    o.open = function(content){
        this.node.wrapper.className = 'active';
        this.node.content.innerHTML = content||'';

        o.positionCenter();
    };

    o.close = function(){
        this.node.popup.className = '';
    };

    o.clear = function(){
        this.node.content.textContent = '';
    };

    o.positionCenter = function(){
        var
            win = this.node.win,
            top = (window.innerHeight - win.clientHeight) / 2,
            left = (window.innerWidth - win.clientWidth) / 2;
        win.style.top = top+'px';
        win.style.left = left+'px';
    };

    o.createPopup = function(wrapper){
        var
            top = Dom.createElement('div',{id:'app-popup-top'}),
            content = Dom.createElement('div',{id:'app-popup-content'}),
            bottom = Dom.createElement('div',{id:'app-popup-bottom'});
        Dom(wrapper).append([top,content,bottom]);
    };

    return o;
})}