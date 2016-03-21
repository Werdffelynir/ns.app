
/**
 * Action sidebar.js
 * @namespace App.Action.Sidebar
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Sidebar');

    /**
     * Construct for action
     */
    o.init = function() {

        Dom('#sb-open').on('click',function(){
            if(this.classList.contains('sb-opened')){
                this.classList.remove('sb-opened');
                App.node.content.classList.remove('sb-opened');
                App.node.sidebar.classList.remove('sb-opened');
            }else{
                this.classList.add('sb-opened');
                App.node.content.classList.add('sb-opened');
                App.node.sidebar.classList.add('sb-opened');
            }
            App.Action.Dialog.scroll();
        });

        loadActiveUsers();

    };

    function loadActiveUsers(){
        if(typeof App.data.users === 'object'){
            for (var i in App.data.users)
                App.node.sidebar.appendChild(o.createUserBox(App.data.users[i]));
        }
    }

    o.getUsers = function (){

    };


    o.createUserBox = function (user){
        var _box = '';
        _box += '<div class="tbl_cell"> <img src="/ns.app/demo/chapp/images/'+user['photo']+'" alt=""></div>';
        _box += '<div class="tbl_cell"> <p>'+user['fullname']+'</p><p>'+user['email']+'</p> </div>';
        _box += '';
        _box += '';
        return Dom.createElement('div',{'class':'usrbox tbl linker', 'data-id': user['id']}, _box);

        //'<div class="usrbox tbl linker" data-id="'+user['id']+'">' + _box + '</div>';
    }


})(App, Dom, Tpl);