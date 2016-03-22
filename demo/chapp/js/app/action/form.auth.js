
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
    o.init = function() {

        o.form = Dom('form[name=login]').on('submit', function(event){
            event.preventDefault();
            Aj.form('form[name=login]', {method:'post', url: App.urlServer},
                submitLogin,
                submitLoginError
            );
        }).one();
    };

    function submitLogin (status, response){
        if(status == 200 && !!response){
            try{
                response = JSON.parse(response);
                if(typeof response === 'object' && typeof response.user === 'object'){
                    var info = 'Hello ' + response.user.fullname + ', auth is success' +
                        ', <a href="/ns.app/demo/chapp/">redirected</a>';
                    Dom(o.form).find('.info').html('<span class="txt_def">'+info+'</span>');
                    setTimeout(function(){App.redirect('/')},1000);
                }else{
                    Dom(o.form).find('.info').html('<span class="txt_red">Wrong username or password</span>');
                }
            }catch(error){
                Dom(o.form).find('.info').html('<span class="txt_red">Internal server error</span>');
            }
        }
    }

    function submitLoginError (){
        console.error('Request to server fail ',event);
    }


})(App, Dom, Tpl);