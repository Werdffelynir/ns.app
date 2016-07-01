if(App.namespace){App.namespace('Controller.Page', function(App){

    /**
     * @namespace App.Controller.Page
     */
    var _ = {}
        , node = {}
        ;
            
    _.construct = function(){
        console.log('App.Controller.Page.construct');
        App.domLoaded(afterDOMLoaded);

    };

    function afterDOMLoaded () {

    }

    return _;

})}
