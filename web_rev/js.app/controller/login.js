if(App.namespace){App.namespace('Controller.Login', function(App){

    /**
     * @namespace App.Controller.Login
     */
    var _ = {}
        , node = {}
        ;

    /**
     * @namespace App.Controller.Login.construct
     */
    _.construct = function(){

        App.domLoaded(afterDOMLoaded);

    };

    function afterDOMLoaded () {

    }

    return _;

})}
