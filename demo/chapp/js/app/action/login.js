
/**
 * Action login.js
 * @namespace App.Action.Login
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var login = App.namespace('Action.Login');

    login.form = null;
    login.info = null;

    /**
     * Construct for action
     */
    login.init = function() {
        login.form = Dom('form[name=login]').on('submit', function(event){

            event.preventDefault();

            Aj.form('form[name=login]', {method:'post', url: App.urlServer},
                submitLogin,
                submitLoginError
            );

        }).one();

        login.info = Dom(login.form).find('.info');
    };

    function submitLogin (status, response){
        if(status == 200 && !!response){
            try{
                response = JSON.parse(response);
                if(typeof response === 'object' && typeof response.user === 'object'){
                    var info = 'Hello ' + response.user.fullname + ', auth is success' +
                        ', <a href="/ns.app/demo/chapp/">redirected</a>';

                    login.info.html('<span class="txt_def">'+info+'</span>');

                    setTimeout(function(){App.redirect('/')},1000);
                    //var timer = new Timer(2000, 1).oncomplete = function(){App.redirect('/')};
                    //timer.start();

                }else
                    login.info.html('<span class="txt_red">Wrong username or password</span>');

            }catch(error){
                login.info.html('<span class="txt_red">Internal server error</span>');
            }
        }
    }

    function submitLoginError (){
        console.error('Request to server fail ',event);
    }

    login.out = function(event){
        console.log('out: ',event);
        Util.Cookie.remove('auth', {path: '/'});
        Util.Cookie.remove('user', {path: '/'});

        App.redirect('/');

    };

})(App, Dom, Tpl);