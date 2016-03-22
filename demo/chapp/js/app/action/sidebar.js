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

    /**
     * Construct for action
     */
    o.init = function () {

        Dom('#sb-open').on('click', function () {
            if (this.classList.contains('sb-opened')) {
                this.classList.remove('sb-opened');
                App.node.content.classList.remove('sb-opened');
                App.node.sidebar.classList.remove('sb-opened');
            } else {
                this.classList.add('sb-opened');
                App.node.content.classList.add('sb-opened');
                App.node.sidebar.classList.add('sb-opened');
            }
            App.Action.Dialog.scroll();
        });

        o.renderUsersList(App.data.users);

    };

    o.renderUsersList = function (users) {
        for (var i in users)
            App.node.sidebar.appendChild(o.createUserBox(users[i]));
    };

    o.getUsers = function () {

    };


    o.createUserBox = function (user) {
        var _online = user['lastactive']
                ? App.timeToDate(user['lastactive'] + '000').getTime() > (new Date()).setTime(-60000 * 1)
                : '',
            _box = '';
        _box += '<div class="tbl_cell"> <img src="/ns.app/demo/chapp/images/' + user['photo'] + '" alt=""></div>';
        _box += '<div class="tbl_cell"> <p>' + user['fullname'] + '</p><p>' + user['email'] + '</p> </div>';
        _box += '';
        _box += '';
        return Dom.createElement('div', {
                'class': 'usrbox tbl linker' + (_online ? ' online' : ''),
                'data-id': user['id']
            }
            , _box);

        //'<div class="usrbox tbl linker" data-id="'+user['id']+'">' + _box + '</div>';
    };

    o.setUsersStatus = function (users) {

    };


})(App, Dom, Tpl);

