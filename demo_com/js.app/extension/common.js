App.namespace('Extension.Common', function(App){


    App.redirect = function(url){
        window.location = App.url + url;
    };


    App.route = function(urlReg, callback){
        var result = String(window.location.pathname).match(new RegExp('^'+urlReg+'$'));
        App.route.cache.push({reg:urlReg,result:result});
        if(Array.isArray(result)){
            callback.call(Object.create(callback.prototype), result);
        }
    };
    App.route.cache = [];


    App.__common__ = function(){};

});
