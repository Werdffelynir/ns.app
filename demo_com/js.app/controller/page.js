if(App.namespace){App.namespace('Controller.Page', function(App){

    /**
     * @namespace App.Controller.Page
     */
    var
        ns = {
            cache:{}
        },

        User = App.Action.User,

        Navigate = App.Action.Navigate;

    ns.construct = function(){

        App.domLoaded(build);

    };

    function build (){
        // query base HTML elements in the page
        App.node({
            tips:       App.query('#app-tips'),
            help:       App.query('#app-help'),
            popup:      App.query('#app-popup'),
            page:       App.query('#app-page'),
            content:    App.query('#app-content'),
            sidebar:    App.query('#app-sidebar')
        });

        if(User.isAuth()) {
            App.render()
        }else{

        }
    }





    ns.api = function(){};

    return ns;

})}
