App.namespace('Controller.Login', function(App){
    /**
     * @namespace App.Controller.Login
     */
    var o = {};

    o.construct = function(){
        console.log('Controller.Login is construct!');
        console.log('Controller.Login args:', arguments);
    };

    o.login = function(useremail, password){
        Aj.post(App.urlServer, data, function(status, data){
            if(status==200) {
                console.log(data);
            }
        });
    };

    o.isAuth = function(){
        return Util.Cookie('auth') != 1 && !Util.Cookie('user');
    };

    return o;
});