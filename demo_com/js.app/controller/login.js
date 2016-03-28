App.namespace('Controller.Login', function(App){
    /**
     * @namespace App.Controller.Login
     */
    var o = {
        node: {},
        cache: {}
    };

    o.construct = function(){
        //console.log('Controller.Login is construct!');
        //console.log('Controller.Login args:', arguments);
    };

    /*o.init = function(){

        Dom.loaded(domLoaded);
    };

    function domLoaded(){
        o.node[] = App.query();

    }

    o.page = function(){

        if(o.cache['page']) {
            var html = App.file(App.urlTemplates + 'content.login.html', function(html){
                o.cache['page'] = html;
                o.page();
            });

        }else{
            console.log(o.cache['page']);
        }

    };

    o.check = function(useremail, password){
        Aj.post(App.urlServer, data, function(status, data){
            if(status==200) {
                console.log(data);
            }
        });
    };

    o.isAuth = function(){
        return Util.Cookie('auth') == 1 && Util.Cookie('user');
    };*/

    return o;
});