if(App.namespace){App.namespace('Action.Content', function(App){

    /**
     * @namespace App.Action.Content
     */
    var act = {
            cache:{},
            content:null
        };

    act.init = function(content){
        this.content = content;
    };



    return act;
})}