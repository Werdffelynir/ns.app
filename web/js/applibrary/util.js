/**
 * Module util.js
 * Its static common helpers methods
 */

(function (window) {

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    var o = {};

    /**
     * Clone object
     * @param obj
     * @returns {*}
     */
    o.objClone = function (obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        var temp = obj.constructor();
        for (var key in obj)
            temp[key] = o.objClone(obj[key]);
        return temp;
    };

    /**
     * Count object length
     * @param obj
     * @returns {number}
     */
    o.objLen = function (obj) {
        var it = 0;
        for (var k in obj) it++;
        return it;
    };

    /**
     * Merge an object `src` into the object `objectBase`
     * @param objectBase    main object of merge
     * @param src           the elements of this object will be added/replaced to main object `obj`
     * @returns {*}         object result
     */
    o.objMerge = function (objectBase, src) {
        if (typeof objectBase !== 'object' || typeof src !== 'object')
            return false;

        if (Object.key) {
            Object.keys(src).forEach(function (key) {
                objectBase[key] = src[key];
            });
            return objectBase;
        } else {
            for (var key in src)
                if (src.hasOwnProperty(key)) objectBase[key] = src[key];
            return objectBase;
        }
    };

    /**
     * Merge objects if `objectBase` key not exists
     * @param objectBase
     * @param src
     * @returns {*}
     */
    o.objMergeNotExists = function (objectBase, src) {
        for (var key in src)
            if (objectBase[key] === undefined)
                objectBase[key] = src[key];
        return objectBase;
    };

    /**
     * Merge objects if `objectBase` key is exists
     * @param objectBase
     * @param src
     * @returns {*}
     */
    o.objMergeOnlyExists = function (objectBase, src) {
        for (var key in src)
            if (objectBase[key] !== undefined)
                objectBase[key] = src[key];
        return objectBase;
    };

    /**
     * Computes the difference of arrays
     * Compares arr1 against one or more other arrays and returns the values in arr1
     * that are not present in any of the other arrays.
     * @param arr1
     * @param arr2
     * @returns {*}
     */
    o.arrDiff = function (arr1, arr2) {
        if (o.isArr(arr1) && o.isArr(arr2)) {
            return arr1.slice(0).filter(function (item) {
                return arr2.indexOf(item) === -1;
            })
        }
        return false;
    };

    /**
     * Check on typeof is string a param
     * @param param
     * @returns {boolean}
     */
    o.isStr = function (param) {
        return typeof param === 'string';
    };

    /**
     * Check on typeof is array a param
     * @param param
     * @returns {boolean}
     */
    o.isArr = function (param) {
        return Array.isArray(param);
    };

    /**
     * Check on typeof is object a param
     * @param param
     * @returns {boolean}
     */
    o.isObj = function (param) {
        return (param !== null && typeof param == 'object');
    };

    /**
     * Determine param is a number or a numeric string
     * @param param
     * @returns {boolean}
     */
    o.isNum = function (param) {
        return !isNaN(param);
    };

    /**
     * Determine param to undefined type
     * @param param
     * @returns {boolean}
     */
    o.defined = function (param) {
        return typeof(param) != 'undefined';
    };

    // Determine whether a variable is empty
    o.isEmpty = function (param) {
        return (param === "" || param === 0 || param === "0" || param === null || param === undefined || param === false || (o.isArr(param) && param.length === 0));
    };

    /**
     * Javascript object to JSON data
     * @param data
     */
    o.objToJson = function (data) {
        return JSON.stringify(data);
    };

    /**
     * JSON data to Javascript object
     * @param data
     */
    o.jsonToObj = function (data) {
        return JSON.parse(data);
    };

    /**
     * Cleans the array of empty elements
     * @param src
     * @returns {Array}
     */
    o.cleanArr = function (src) {
        var arr = [];
        for (var i = 0; i < src.length; i++)
            if (src[i]) arr.push(src[i]);
        return arr;
    };

    /**
     * Return type of data as name object "Array", "Object", "String", "Number", "Function"
     * @param data
     * @returns {string}
     */
    o.typeOf = function (data) {
        return Object.prototype.toString.call(data).slice(8, -1);
    };

    /**
     * Convert HTML form to encode URI string
     * @param form
     * @param asObject
     * @returns {*}
     */
    o.formData = function (form, asObject) {
        var obj = {}, str = '';
        for (var i = 0; i < form.length; i++) {
            var f = form[i];
            if (f.type == 'submit' || f.type == 'button') continue;
            if ((f.type == 'radio' || f.type == 'checkbox') && f.checked == false) continue;
            var fName = f.nodeName.toLowerCase();
            if (fName == 'input' || fName == 'select' || fName == 'textarea') {
                obj[f.name] = f.value;
                str += ((str == '') ? '' : '&') + f.name + '=' + encodeURIComponent(f.value);
            }
        }
        return (asObject === true) ? obj : str;
    };

    /**
     * HTML string convert to DOM Elements Object
     * @param data
     * @returns {*}
     */
    o.toNode = function (data) {
        var parser = new DOMParser();
        var node = parser.parseFromString(data, "text/xml");
        console.log(node);
        if (typeof node == 'object' && node.firstChild.nodeType == Node.ELEMENT_NODE)
            return node.firstChild;
        else return false;
    };

    /**
     * Removes duplicate values from an array
     * @param arr
     * @returns {Array}
     */
    o.uniqueArr = function (arr) {
        var tmp = [];
        for (var i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) == "-1") tmp.push(arr[i]);
        }
        return tmp;
    };

    /**
     * Reads entire file into a string, synchronously
     * This function uses XmlHttpRequest and cannot retrieve resource from different domain.
     * @param url
     * @returns {*|string|null|string}
     */
    o.fileGetContents = function (url) {
        var req = null;
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    req = new XMLHttpRequest();
                } catch (e) {
                }
            }
        }
        if (req == null) throw new Error('XMLHttpRequest not supported');
        req.open("GET", url, false);
        req.send(null);
        return req.responseText;
    };

    /**
     * Calculates the position and size of elements.
     *
     * @param elem
     * @returns {{y: number, x: number, width: number, height: number}}
     */
    o.getPosition = function (elem) {
        var top = 0, left = 0;
        if (elem.getBoundingClientRect) {
            var box = elem.getBoundingClientRect();
            var body = document.body;
            var docElem = document.documentElement;
            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
            var clientTop = docElem.clientTop || body.clientTop || 0;
            var clientLeft = docElem.clientLeft || body.clientLeft || 0;
            top = box.top + scrollTop - clientTop;
            left = box.left + scrollLeft - clientLeft;
            return {y: Math.round(top), x: Math.round(left), width: elem.offsetWidth, height: elem.offsetHeight};
        } else { //fallback to naive approach
            while (elem) {
                top = top + parseInt(elem.offsetTop, 10);
                left = left + parseInt(elem.offsetLeft, 10);
                elem = elem.offsetParent;
            }
            return {y: top, x: left, width: elem.offsetWidth, height: elem.offsetHeight};
        }
    };

    /**
     * Returns the coordinates of the mouse on any element
     * @param element
     * @param event
     * @returns {{x: number, y: number}}
     */
    o.getMouseElement = function (element, event) {
        if(element instanceof HTMLElement && event instanceof MouseEvent) {
            var x = event.pageX - element.offsetLeft;
            var y = event.pageY - element.offsetTop;
            return {x: x, y: y};
        }else
            return false;
    };

    /**
     * Returns the coordinates of the mouse on the canvas element
     * @param canvas
     * @param event
     * @returns {{x: number, y: number}}
     */
    o.getMouseCanvas = function (canvas, event) {
        if((canvas instanceof HTMLCanvasElement || canvas.getBoundingClientRect) && event instanceof MouseEvent){
            var rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }else
            return false;
    };

    /**
     * Creator of styles, return style-element or style-text.
     *
     * <pre>var style = createStyle('body','font-size:10px');
     *style.add('body','font-size:10px')       // added style
     *style.add( {'background-color':'red'} )  // added style
     *style.getString()                        // style-text
     *style.getObject()                        // style-element</pre>
     *
     * @param selector      name of selector styles
     * @param property      string "display:object" or object {'background-color':'red'}
     * @returns {*}         return object with methods : getString(), getObject(), add()
     */
    o.createStyle = function (selector, property) {
        var o = {
            content: '',
            getString: function () {
                return '<style rel="stylesheet">' + "\n" + o.content + "\n" + '</style>';
            },
            getObject: function () {
                var st = document.createElement('style');
                st.setAttribute('rel', 'stylesheet');
                st.textContent = o.content;
                return st;
            },
            add: function (select, prop) {
                if (typeof prop === 'string') {
                    o.content += select + "{" + ( (prop.substr(-1) == ';') ? prop : prop + ';' ) + "}";
                } else if (typeof prop === 'object') {
                    o.content += select + "{";
                    for (var key in prop)
                        o.content += key + ':' + prop[key] + ';';
                    o.content += "}";
                }
                return this;
            }
        };
        return o.add(selector, property);
    };

    /**
     * Create new NodeElement
     * @param tag       element tag name 'p, div, h3 ... other'
     * @param attrs     object with attributes key=value
     * @param inner     text, html or NodeElement
     * @returns {Element}
     */
    o.createElement = function (tag, attrs, inner) {
        var elem = document.createElement(tag);
        if (typeof attrs === 'object') {
            for (var key in attrs)
                elem.setAttribute(key, attrs[key]);
        }

        if (typeof inner === 'string') {
            elem.innerHTML = inner;
        } else if (typeof inner === 'object') {
            elem.appendChild(elem);
        }
        return elem;
    };


    /**
     * Returns a random integer between min, max, if not specified the default of 0 to 100
     * @param min
     * @param max
     * @returns {number}
     */
    o.rand = function (min, max) {
        min = min || 0;
        max = max || 100;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    /**
     * Returns random string color, HEX format
     * @returns {string}
     */
    o.randColor = function () {
        var letters = '0123456789ABCDEF'.split(''),
            color = '#';
        for (var i = 0; i < 6; i++)
            color += letters[Math.floor(Math.random() * 16)];
        return color;
    };

    /**
     * Converts degrees to radians
     * @param deg
     * @returns {number}
     */
    o.degreesToRadians = function (deg) {
        return (deg * Math.PI) / 180;
    };

    /**
     * Converts radians to degrees
     * @param rad
     * @returns {number}
     */
    o.radiansToDegrees = function (rad) {
        return (rad * 180) / Math.PI;
    };

    /**
     * The calculation of the distance between points
     * The point is an object with properties `x` and `y` {x:100,y:100}
     * @param point1
     * @param point2
     * @returns {number}
     */
    o.distanceBetween = function (point1, point2) {
        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    /**
     * Encode URI params
     * @param data      Object key=value
     * @returns {*}     query string
     */
    o.encodeData = function(data){
        if(typeof data === 'string') return data;
        if(typeof data !== 'object') return '';
        var convertData = [];
        Object.keys(data).forEach(function(key){
            convertData.push(key+'='+encodeURIComponent(data[key]));
        });
        return convertData.join('&');
    };

    /**
     * Parse URI Request data into object
     * @param url
     * @returns {{}}
     */
    o.parseGet = function(url){
        url = url || document.location;
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        if(parser.search.length > 1){
            parser.search.substr(1).split('&').forEach(function(part){
                var item = part.split('=');
                params[item[0]] = decodeURIComponent(item[1]);
            });
        }
        return params;
    };

    /**
     * Parse Url string/location into object
     * @param url
     * @returns {{}}
     */
    o.parseUrl = function(url){
        url = url || document.location;
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        params.protocol = parser.protocol;
        params.host = parser.host;
        params.hostname = parser.hostname;
        params.port = parser.port;
        params.pathname = parser.pathname;
        params.hash = parser.hash;
        params.search = parser.search;
        params.get = o.parseGet(parser.search);
        return params;
    };

    o.Storage = function(name, value){
        if(!name){
            return false;
        }else if(value === undefined){
            return o.Storage.get(name);
        }else if(!value){
            return o.Storage.remove(name);
        }else{
            return o.Storage.set(name, value);
        }
    };
    o.Storage.set = function (name, value) {
        try{value = JSON.stringify(value)}catch(error){}
        return window.localStorage.setItem(name, value);
    };
    o.Storage.get = function (name) {
        var value = window.localStorage.getItem(name);
        if(value)
            try{value = JSON.parse(value)}catch(error){}
        return value;
    };
    o.Storage.remove = function (name) {
        return window.localStorage.removeItem(name);
    };
    o.Storage.key = function (name) {
        return window.localStorage.key(key);
    };

    o.each = function (data, callback) {
        if(o.isArr(data)){
            for(var i = 0; i < data.length; i ++) callback.call(null, data[i]);
        }else if(o.isObj(data)){
            for(var k in data) callback.call(null, k, data[k]);
        }else return false;
    };

    o.ucfirst = function (string){
        return string && string[0].toUpperCase() + string.slice(1);
    };

    o.node2html = function (element){
        var container = document.createElement("div");
        container.appendChild(element.cloneNode(true));
        return container.innerHTML;
    };


    o.base64encode = function (str){
        var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var b64encoded = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        for (var i=0; i<str.length;) {
            chr1 = str.charCodeAt(i++);
            chr2 = str.charCodeAt(i++);
            chr3 = str.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = isNaN(chr2) ? 64:(((chr2 & 15) << 2) | (chr3 >> 6));
            enc4 = isNaN(chr3) ? 64:(chr3 & 63);
            b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) +
                b64chars.charAt(enc3) + b64chars.charAt(enc4);
        }
        return b64encoded;
    };


    o.base64decode = function (str) {
        var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var b64decoded = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        str = str.replace(/[^a-z0-9\+\/\=]/gi, '');
        for (var i=0; i<str.length;) {
            enc1 = b64chars.indexOf(str.charAt(i++));
            enc2 = b64chars.indexOf(str.charAt(i++));
            enc3 = b64chars.indexOf(str.charAt(i++));
            enc4 = b64chars.indexOf(str.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            b64decoded = b64decoded + String.fromCharCode(chr1);
            if (enc3 < 64) {
                b64decoded += String.fromCharCode(chr2);
            }
            if (enc4 < 64) {
                b64decoded += String.fromCharCode(chr3);
            }
        }
        return b64decoded;
    };


    /**
     * Cross-browser function for the character of the event keypress:
     * @param event     event.type must keypress
     * @returns {*}
     */
    o.getChar = function (event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode)
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which);
        }
        return null;
    };






    window.Util = o;

})(window);
