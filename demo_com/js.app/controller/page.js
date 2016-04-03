if(App.namespace){App.namespace('Controller.Page', function(App){

    /**
     * @namespace App.Controller.Page
     */
    var
        ns = {}
        , node = {}
        , User = App.Action.User
        , Popup = App.Action.Popup
        , Content = App.Action.Content
        , Navigate = App.Action.Navigate
        , Linker = App.Extension.Linker
        ;
            
    ns.construct = function(){

        App.domLoaded(build);

    };

    function build (){

        // query base HTML elements in the page
        node = App.node({
              tips:           App.query('#app-tips')
            , help:           App.query('#app-help')
            , popup:          App.query('#app-popup')
            , page:           App.query('#app-page')
            , content:        App.query('#app-content')
            , sidebar:        App.query('#app-sidebar')
        });

        var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eum officia recusandae? Ad, aspernatur autem consectetur culpa dolorem error eum laborum libero maiores officia pariatur perferendis saepe sed soluta voluptatum!';

        // Linker run
        Linker.search();
        
        // Popup run
        Popup.init(node.popup, Linker);
        //Popup.open(str);




        if(!User.isAuth()) {
            actionLogin();
        }else{

            App.route('\/', actionIndex);
            App.route('\/login', actionLogin);

        }

        //console.log(c);

    }

    function actionIndex(){

        App.Action.Render({name:'content', file:'content.home.html', reload:true, callback:function(node, data){
            Content.init(data);
        }});


    }

    function actionLogin(){

        App.Action.Render({name:'content', file:'content.login.html', reload:true, callback:function(node, data){
            User.init(node, data);
        }});

    }

















    return ns;

})}
