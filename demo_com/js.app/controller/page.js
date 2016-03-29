if(App.namespace){App.namespace('Controller.Page', function(App){

    /**
     * @namespace App.Controller.Page
     */
    var
        ns = {
            cache:{}
        },

        node = {},

        User = App.Action.User,

        Popup = App.Action.Popup,

        Navigate = App.Action.linker,

        Navigate = App.Action.Navigate;

    ns.construct = function(){

        App.domLoaded(build);

    };

    function build (){

        // query base HTML elements in the page
        node = App.node({
            tips:           App.query('#app-tips'),
            help:           App.query('#app-help'),
            popup:          App.query('#app-popup'),
            page:           App.query('#app-page'),
            content:        App.query('#app-content'),
            sidebar:        App.query('#app-sidebar')
        });

        var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eum officia recusandae? Ad, aspernatur autem consectetur culpa dolorem error eum laborum libero maiores officia pariatur perferendis saepe sed soluta voluptatum!';

        Popup.init(node.popup);
        Popup.open(str);


        if(User.isAuth()) {
            App.file(App.urlTemplates + 'content.home.html', function(data){
                App.inject(node.content, data);
            });
        }else{
            App.file(App.urlTemplates + 'content.login.html', function(data){
                //App.inject(node.content, data);
            });
        }





    }





    ns.api = function(){};

    return ns;

})}
