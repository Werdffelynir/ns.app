/**
 * Action sidebar.js
 * @namespace App.Action.Sidebar
 */

(function (App, Dom, Tpl) {

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Sidebar');

    o.node = {};

    o.Linker = App.Module.Linker;
    o.Error = App.Module.Error;

    /**
     * Construct for action
     */
    o.init = function (nodes, data) {

        o.node = nodes;
        o.data = data;

        Dom('#sb-open').on('click', function () {
            if (this.classList.contains('sb-opened')) {
                this.classList.remove('sb-opened');
                o.node.content.classList.remove('sb-opened');
                o.node.sidebar.classList.remove('sb-opened');
            } else {
                this.classList.add('sb-opened');
                o.node.content.classList.add('sb-opened');
                o.node.sidebar.classList.add('sb-opened');
            }
            App.Action.Dialog.scroll();
        });

        o.addUsers(o.data.users);

    };


    /**
     * Construct for action
     */
    o.addUsers = function (users) {
        if(!users) return;
        var list = o.getUsersReadyList();

        for (var i in users){
            if( list.indexOf(users[i].id) === -1 )
                o.node.sidebar.appendChild(o.createUser(users[i]));
        }

        //if (!Dom('#sb-open').one().classList.contains('sb-opened'))
        //    Dom('#sb-open').one().dispatchEvent(new MouseEvent('click'));
    };

    o.getUsersReadyList = function () {
        var result = [],
            elems = Dom('#sidebar div[id*=user_]').each(function(item){
                result.push(item.id.split('_')[1])
            });
        return result;
    };

    o.createUser = function (user) {
        var _online = user['id'] == o.data.user['id'] ? true :
                (user['lastactive']
                    ? App.timeToDate(user['lastactive']).getTime() > (new Date()).getTime() - 60000 * 5
                    : false
                ),
            _box = '';

        _box += '<div class="tbl_cell"> <img src="' + App.url + 'images/' + user['photo'] + '" alt=""></div>';
        _box += '<div class="tbl_cell"> <p>' + user['fullname'] + '</p><p>' + user['email'] + '</p> </div>';
        _box += '';
        _box += '';

        return Dom.createElement('div', {
                'class': 'usrbox tbl linker' + (_online?' online':''),
                'id': 'user_' + user['id']
            }, _box);
    };

   /* o.updateStatusOnline = function(user, status){
        Dom(o.node.sidebar).find('.usrbox[id*=user_'+user.id+']').one(function(elem){
            if(status.online) elem.classList.add('online');
            else elem.classList.remove('online');
        });
    };*/

})(App, Dom, Tpl);

