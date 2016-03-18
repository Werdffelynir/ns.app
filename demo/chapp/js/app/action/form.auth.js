
/**
 * Action form.auth.js
 * @namespace App.Action.FormAuth
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.FormAuth');

    o.form = null;
    /**
     * Construct for action
     */
    o.init = function(process) {

        o.form = Dom('form[name=login]').on('submit', function(event){
            event.preventDefault();

            Aj.form('form[name=login]', {
                method:'post',
                url: App.urlServer,
                data: {process:process}
            },
                submitLogin,
                submitLoginError
            );
        }).one();
    };

    function submitLogin (status, response){
        if(status == 200 && !!response){
//            console.log(!!response);
            response = JSON.parse(response);
            if(typeof response === 'object' && typeof response.result === 'object'){
                Dom(o.form).find('.info').html('<span class="txt_def">Auth is success, <a href="/ns.app/demo/chapp/">redirected</a></span>');
            }else{
                Dom(o.form).find('.info').html('<span class="txt_red">Wrong username or password</span>');
            }
        }
    }

    function submitLoginError (){
        console.error('Request to server fail ',event);
    }

    /**
     * Uses: App.Action.FormAuth.submitLogout()
     */
    o.submitLogout = function (){
        Util.Cookie.delete('auth');
        Util.Cookie.delete('user');
        window.location = App.url;
    }


})(App, Dom, Tpl);