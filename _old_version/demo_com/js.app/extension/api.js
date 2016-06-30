App.namespace('Static.Api', function(App){

    /**
     * @namespace App.Static.Api
     * @type {*}
     */
    var o = {};
    /**
     * The method send requests to the server.
     * The application should use this method for asynchronous requests
     *
     * @use Aj Dependence
     * @param key  Its execute method on server
     * @param func After request, a run function
     * @param args Arguments to key method
     * @namespace App.Static.Api.request
     */
    o.request = function(key, func, args){

        Aj.post(
              App.urlServer
            , { token:App.token, func:func, args:args }
            , function (status, response) {
            if(status == 200)
                func.call(Object.create(func.prototype), response);
            else {
                if(App.debug)
                    console.error('Api request fail, status code: ' + status);
            }
        });

    };

    return o;
});
