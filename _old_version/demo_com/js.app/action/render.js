App.namespace('Action.Render', function (App) {

    /**
     * @namespace App.Action.Render
     * @param {Object} params   keys: {name:'', file:'', reload:false, callback:function(){}}
     * @returns {*}
     */
    var acr = function render(params) {
        if (Util.Storage.get(params.name) === null && params.file || !!params.reload) {
            App.file(App.urlTemplates + params.file, function (data) {
                Util.Storage.set(params.name, data);
                acr({
                    name: params.name, file: params.file, reload: false, callback: params.callback
                });
            });
        } else {
            var data = Util.Storage.get(params.name)
                , node = App.node(params.name);

            if(Util.isNodeType(node, 1))
            {
                node.innerHTML = data;
                params.callback.call(App.Controller, node, data);
                return node;
            }else{
                console.error('Node ['+params.name+'] not find in: ', App.node())
            }
        }
    };

    acr.prototype.nodes = {};

    return acr;

});