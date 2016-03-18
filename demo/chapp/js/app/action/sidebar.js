
/**
 * Action sidebar.js
 * @namespace App.Action.Sidebar
 */

(function(App, Dom, Tpl){

    /**
     * Register action namespace
     * Using depending on the base application
     */
    var o = App.namespace('Action.Sidebar');

    /**
     * Construct for action
     */
    o.init = function() {

        Dom('#sb-open').on('click',function(){
            if(this.classList.contains('sb-opened')){
                this.classList.remove('sb-opened');
                App.node.content.classList.remove('sb-opened');
                App.node.sidebar.classList.remove('sb-opened');
            }else{
                this.classList.add('sb-opened');
                App.node.content.classList.add('sb-opened');
                App.node.sidebar.classList.add('sb-opened');
            }
        });

        loadActiveUsers();

    };

    function loadActiveUsers(){

    }

})(App, Dom, Tpl);