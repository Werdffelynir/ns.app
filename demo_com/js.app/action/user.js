if(App.namespace){App.namespace('Action.User', function(App){

    /**
     * @namespace App.Action.User
     */
    var act = {
            node:null
            , content:null
        };

    act.init = function(node, content){
        this.node = node;
        this.content = content;

        // style fixed
        this.node.style.verticalAlign = 'middle';
    };

    act.login = function(){};

    act.logout = function(){};
    act.register = function(){};

    act.isAuth = function(){return Util.Cookie('auth') == 1 && Util.Cookie('user')};
    act.isAdmin = function(){return act.isAuth() && Util.Cookie('user').permission > 3};

    return act;
})}