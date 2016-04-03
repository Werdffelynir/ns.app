if(App.namespace){App.namespace('Action.Popup', function(App){
    
    var Linker;
    
    /**
     * @namespace App.Action.Popup
     */
    var o = {};

    o.node = {};

    o.init = function(wrapper, linker){
        Linker = linker;
        
        o.node.wrapper = wrapper;
        o.node.win = App.query('#app-popup-win',wrapper);
        o.node.top = App.query('#app-popup-top',wrapper);
        o.node.content = App.query('#app-popup-content',wrapper);
        o.node.bottom = App.query('#app-popup-bottom',wrapper);
        
        Linker.click('popup_wrapper', o.close);
        Linker.click('popup_cancel', o.close);
        Linker.click('popup_close', o.close);
    };

    o.open = function(content){
        o.node.wrapper.className = 'active';
        o.node.content.innerHTML = content||'';

        o.positionCenter();
    };

    o.close = function(event){
        if(this.id === 'app-popup' && event.target.id !== 'app-popup') return;
        
        o.node.wrapper.className = '';
        o.node.content.innerHTML = '';
    };

    o.clear = function(){
        o.node.content.textContent = '';
    };

    o.positionCenter = function(){
        var
            win = o.node.win,
            top = (window.innerHeight - win.clientHeight) / 2,
            left = (window.innerWidth - win.clientWidth) / 2;
        win.style.top = top+'px';
        win.style.left = left+'px';
    };

    return o;
})}