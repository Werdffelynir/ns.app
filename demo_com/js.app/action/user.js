if(App.namespace){App.namespace('Action.User', function(App){

    /**
     * @namespace App.Action.User
     */
    var o = {};

    o.init = function(){};

    o.login = function(){};
    o.logout = function(){};
    o.register = function(){};

    o.isAuth = function(){return Util.Cookie('auth') == 1 && Util.Cookie('user')};
    o.isAdmin = function(){return o.isAuth() && Util.Cookie('user').permission > 3};

    return o;
})}