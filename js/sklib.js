/**
 * Script Aj
 * AJAX request
 */

(function (window) {

    "use strict";

    var internal = {},
        util = {},
        aj = {
            version: '0.1.0'
        };

    /**************************************| Internal |**************************************/

    internal.configDefault = {
        url: document.location,
        data: '',
        async: true,
        method: 'GET',
        timeout: 0,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        username: '',
        password: '',
        credentials: false,
        response: 'text',
        contentType: '',
        onComplete: function (e) {
        },
        onProgress: function (e) {
        },
        onTimeout: function (e) {
        },
        onSuccess: function (e) {
        },
        onBefore: function (e) {
        },
        onChange: function (e) {
        },
        onError: function (e) {
        },
        onAbort: function (e) {
        },
        onStart: function (e) {
        }
    };

    internal.addConfigHeader = function (type, value) {
        internal.configDefault.headers[type] = value;
    };

    internal.removeConfigHeader = function (type) {
        if (internal.configDefault.headers[type])
            delete internal.configDefault.headers[type];
    };

    /**************************************| Util |**************************************/

    util.encode = function (object) {
        if (typeof object === 'string') return object;
        if (typeof object !== 'object') return '';
        var key, convert = [];
        for (key in object)
            convert.push(key + '=' + encodeURIComponent(object[key]));
        return convert.join('&');
    };
    util.decode = function (string) {
        return util.parse(string);
    };
    util.parse = function (url) {
        url = url || document.location;
        var params = {}, parser = document.createElement('a');
        parser.href = url;
        if (parser.search.length > 1) {
            parser.search.substr(1).split('&').forEach(function (part) {
                var item = part.split('=');
                params[item[0]] = decodeURIComponent(item[1]);
            });
        }
        return params;
    };
    util.parseUrl = function (url) {
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
        params.get = util.parse(parser.search);
        return params;
    };
    util.merge = function (object, source) {
        if (typeof source !== 'object') return {};
        if (typeof object !== 'object') return source;
        var key, result = {};
        for (key in source) {
            if (object[key] !== undefined)
                result[key] = object[key];
            else
                result[key] = source[key];
        }
        return result;
    };
    util.parseForm = function (formElement, asObject) {
        var obj = {}, str = '';
        for (var i = 0; i < formElement.length; i++) {
            var f = formElement[i], fName = f.nodeName.toLowerCase();
            if (f.type == 'submit' || f.type == 'button') continue;
            if ((f.type == 'radio' || f.type == 'checkbox') && f.checked == false) continue;
            if (fName == 'input' || fName == 'select' || fName == 'textarea') {
                obj[f.name] = f.value;
                str += ((str == '') ? '' : '&') + f.name + '=' + encodeURIComponent(f.value);
            }
        }
        return (asObject == true) ? obj : str;
    };
    util.jsonToObj = function (string) {
        var res = false;
        try {
            res = JSON.parse(string);
        } catch (error) {
        }
        return res;
    };
    util.objToJson = function (object) {
        var res = false;
        try {
            res = JSON.stringify(object);
        } catch (error) {
        }
        return res;
    };

    /**************************************| Aj |**************************************/


    /**
     * Base method for requests operations
     * @param config
     * @returns {{xhr: (XMLHttpRequest|*), send: (aj.send|*), abort: *}}
     */
    aj.open = function (config) {

        if (typeof config !== 'object') {
        }

        config = typeof config !== 'object' ? internal.configDefault : config;
        aj.xhr = new XMLHttpRequest();
        aj.config = util.merge(config, internal.configDefault);

        // internal object, as prototype it`is
        var o = {
            xhr: aj.xhr,
            send: aj.send,
            abort: aj.xhr.abort
        };

        return aj.self = o;
    };

    /**
     * Непосредственная отправка запроса.
     * @param config
     * @returns {XMLHttpRequest|*}
     */
    aj.send = function (config) {

        var sendData = null,
            sendStr = '',
            conf = typeof config === 'object' ? util.merge(config, aj.config) : aj.config,
            self = aj.self,
            method = conf.method.toUpperCase(),
            xhr = aj.xhr;

        /*if((method == 'GET' || method == 'HEAD') && conf.data) {*/
        if (typeof conf.data === 'string' && conf.data.length > 2 && method != 'POST') {
            sendStr = (conf.url.indexOf('?') === -1 ? '?' : '&') + util.encode(conf.data);
        } else {
            if (typeof conf.data === 'object' && conf.data instanceof FormData)
                sendData = conf.data;
            else if (typeof conf.data === 'object' && conf.data instanceof File) {
                sendData = conf.data;
            }
            else
                sendData = util.encode(conf.data);
        }

        xhr.open(
            method,
            conf.url + sendStr,
            conf.async,
            conf.username,
            conf.password);

        if (conf.timeout > 0) {
            xhr.timeout = conf.timeout;
        }

        if (conf.credentials || (conf.username.length > 2 && conf.password.length > 2)) {
            xhr.withCredentials = conf.credentials;
        }

        if (!(conf.data instanceof FormData) && typeof conf.headers === 'object') {

            if (typeof conf.headers !== 'object') conf.headers = {};
            if (conf.contentType) conf.headers['Content-Type'] = conf.contentType;

            for (var key in conf.headers)
                xhr.setRequestHeader(key, conf.headers[key]);
        }

        /* callbacks handlers */

        if (typeof conf.onBefore === 'function')
            conf.onBefore.call(self, xhr);

        xhr.onreadystatechange = function (event) {
            if (typeof conf.onChange === 'function')
                conf.onChange.call(self, xhr.readyState, xhr.status, xhr, event);
        };
        xhr.onloadstart = function (event) {
            if (typeof conf.onStart === 'function')
                conf.onStart.call(self, xhr, event);
        };
        xhr.onprogress = function (event) {
            if (typeof conf.onProgress === 'function')
                conf.onProgress.call(self, xhr, event);
        };
        xhr.onabort = function (event) {
            if (typeof conf.onAbort === 'function')
                conf.onAbort.call(self, xhr, event);
        };
        xhr.onerror = function (event) {
            if (typeof conf.onError === 'function')
                conf.onError.call(self, xhr.statusText, xhr, event);
        };
        xhr.onload = function (event) {
            if (xhr.status > 400) {
                if (typeof conf.onError === 'function')
                    conf.onError.call(self, xhr.statusText, xhr, event);
            }
            else {
                var response = xhr.responseText;
                if (conf.response == 'xml') response = xhr.responseXML;
                if (conf.response == 'json') response = JSON.parse(response);
                if (typeof conf.onSuccess === 'function')
                    conf.onSuccess.call(self, response, xhr.status, xhr, event);
            }
        };
        xhr.ontimeout = function (event) {
            if (typeof conf.onTimeout === 'function')
                conf.onTimeout.call(self, xhr, event);
        };
        xhr.onloadend = function (event) {
            var response = xhr.responseText;
            if (conf.response == 'xml') response = xhr.responseXML;
            if (conf.response == 'json') response = JSON.parse(response);

            if (typeof conf.onComplete === 'function')
                conf.onComplete.call(self, xhr.status, response, xhr, event);
        };

        xhr.send(sendData);
        return xhr;
    };

    aj.consoleError = function (message) {
        console.error('Aj throw error: ' + message)
    };
    aj.consoleLog = function (message) {
        console.log('Aj info: ' + message)
    };

    /**
     * Простой GET запрос
     *
     * @param url       :String             Адрес запроса
     * @param data      :String|FormData    Передаваемые данные
     * @param callback  :Function           Выполняет по окончании операции при любом результате
     * @param response  :String             Тип данных ответа
     * @returns {*}
     */
    aj.get = function (url, data, callback, response) {
        var params = {
            url: url,
            data: data || '',
            method: 'GET',
            response: response || 'html',
            contentType: 'text/html; charset=utf-8',
            onComplete: callback
        };
        var ajax = aj.open(params);
        return ajax.send();
    };
    aj.post = function (url, data, callback, response) {
        var params = {
            url: url,
            data: data || '',
            method: 'POST',
            response: response || 'html',
            onComplete: callback
        };
        var ajax = aj.open(params);
        return ajax.send();
    };

    /**
     * Запросы на уровне заголовков
     * @param url       Адрес запроса
     * @param headers   Объект заголовков
     * @param callback  Выполняет по окончании операции при любом результате
     * @returns {*}
     */
    aj.head = function (url, headers, callback) {
        var callbackResult = function (status, response, xhr, event) {
            callback.call(aj.self, status, xhr, event);
        };
        var params = {
            url: url,
            data: '',
            method: 'HEAD',
            headers: headers || false,
            onComplete: callbackResult
        };
        var ajax = aj.open(params);
        return ajax.send();
    };
    aj.load = function (url, data, callback, contentType) {
        var params = {
            url: url,
            data: data || '',
            method: aj.load.method,
            contentType: contentType || 'text/html; charset=utf-8',
            onComplete: callback
        };
        var ajax = aj.open(params);
        return ajax.send();
    };
    aj.load.method = 'GET';
    aj.request = function (method, url, data, callback, contentType) {
        var params = {
            url: url,
            data: data || '',
            method: method || 'GET',
            contentType: contentType || 'text/html; charset=utf-8',
            onComplete: callback
        };
        var ajax = aj.open(params);
        return ajax.send();
    };

    /**
     * Запрос на основе данных HTML формы
     * @param form
     * @param config
     * @param callback
     * @returns {*}
     */
    aj.form = function (form, config, callback) {

        if (typeof form === 'object' && form.nodeName == 'FORM') {

            config = config || {};
            var appendData = config.data || false;

            config.url = config.url || form.action || document.location;
            config.method = config.method || form.method || 'POST';
            config.contentType = config.contentType || form.enctype || 'application/x-www-form-urlencoded; charset=utf-8';
            config.data = new FormData(form);

            if (typeof appendData === 'object') {
                for (var key in appendData)
                    config.data.append(key, appendData[key]);
            }

            config.onComplete = callback;

            var ajax = aj.open(config);
            return ajax.send();
        }
        else
            aj.consoleError('ERROR! Element not nodeName = FORM!');
    };

    /**
     * Web Worker
     * @param file              worker file
     * @param callback          handler function, first argument it`is worker
     * @param callbackError     handler error
     */
    aj.worker = function (file, callback, callbackError) {
        if (!!window.Worker) {
            var worker = new Worker(file);
            if (typeof callbackError === 'function')
                worker.onerror = callbackError;
            if (worker)
                callback.call(aj.self, worker);
            else
                callbackError.call(aj.self, worker);
        } else {
            var errorMessage = 'Browser does not support workers';
            callbackError.call(aj.self, errorMessage);
            aj.consoleError('ERROR! ' + errorMessage);
        }
    };

    /**
     * Запрос для приема и передачи данных в формате JSON
     * @param url
     * @param data
     * @param callback
     * @param callbackError
     * @returns {*}
     */
    aj.json = function (url, data, callback, callbackError) {
        if (typeof data === 'object') data = util.objToJson(data);
        var params = {
            url: url,
            data: data || '',
            method: aj.json.method,
            contentType: 'application/json; charset=utf-8',
            onComplete: function (status, response) {
                if (status < 400) {
                    if (typeof response === 'string') {
                        var _response = util.jsonToObj(response);
                        if (_response)
                            response = _response;
                    }
                } else {
                    callbackError.call(aj.self, status, response);
                    return;
                }
                callback.call(aj.self, status, response);
            },
            onError: callbackError
        };
        var ajax = aj.open(params);
        return ajax.send();
    };
    aj.json.method = 'GET';

    /**
     * Подключения по url JavaScript скриптов, в конец элемента body
     * @param url
     * @param callbackSuccess
     * @param callbackError
     */
    aj.script = function (url, callbackSuccess, callbackError) {
        var script = document.querySelector('script[src="' + url + '"]');
        if (script)
            document.body.removeChild(script);

        script = document.createElement('script');
        script.setAttribute('type', 'application/javascript');
        script.setAttribute('src', url);

        script.onload = function (event) {
            callbackSuccess.call(event);
        };
        script.onerror = function (event) {
            callbackError.call(event)
        };

        document.body.appendChild(script);
    };

    /**
     * Протокол JSONP обмена данными
     * @param url
     * @param callback
     */
    aj.jsonp = function (url, callback) {
        var registry = aj.jsonp.registry;

        function jsonpResponse() {
            try {
                delete registry[src]
            } catch (e) {
                registry[src] = null
            }
            document.head.removeChild(script);
            callback.apply(this, arguments);
        }

        var src = 'cb' + String(Math.random()).slice(-10),
            script = document.createElement("script");
        registry[src] = jsonpResponse;
        document.head.insertBefore(script, document.head.lastChild).src = url + "=AjJsonp.registry." + src;
    };
    aj.jsonp.registry = {}; // реестр

    /**
     * Загрузчик файлов.
     * Предназначен для загрузки только одного файла, но процессы могут быть параллельны
     * @param url           путь до скрипта обработчика загрузки
     * @param inputFile     елемент input | FileList | File
     * @param onProgress
     * @param onComplete
     * @returns {*}
     */
    aj.upload = function (url, inputFile, onProgress, onComplete) {

        var ajax = new aj.open();

        if (inputFile instanceof HTMLInputElement) {
            inputFile = inputFile.files[0];
        } else if (inputFile instanceof FileList) {
            inputFile = inputFile[0];
        } else if (inputFile instanceof File) {
        } else {
            onComplete.call(aj.self, 1000);
            aj.consoleError('ERROR! input file is not e file. Must have type - HTMLInputElement or FileList or File');
            return false;
        }

        ajax.xhr.upload.onprogress = function (event) {
            onProgress.call(aj.self, ajax.xhr, event);
        };

        var formData = new FormData();
        formData.append(inputFile.name, inputFile);
        var configs = {
            url: url,
            data: formData,
            method: 'POST',
            contentType: false,
            headers: false,
            onComplete: onComplete
        };

        return ajax.send(configs);
    };


    /**
     * Import to global
     */

    window.Aj = aj.open;
    window.AjGet = aj.get;
    window.AjPost = aj.post;
    window.AjHead = aj.head;
    window.AjLoad = aj.load;
    window.AjRequest = aj.request;
    window.AjForm = aj.form;
    window.AjJson = aj.json;
    window.AjJsonp = aj.jsonp;
    window.AjScript = aj.script;
    window.AjWorker = aj.worker;
    window.AjUpload = aj.upload;
    window.AjUtil = util;

})(window);

/**
 * Script Inc
 * Include scripts into project application
 */

(function (window) {

    var Inc = function () {
        if (!(this instanceof Inc)) return new Inc();

        this.options = {
            sources: [],
            handler: {onload: null, onerror: null},
            error: false,
            current: 0
        };
    };

    Inc.prototype.onload = null;

    Inc.prototype.onerror = null;

    Inc.prototype.init = function () {
        this.options.handler.onload = this.onload;
        this.options.handler.onerror = this.onerror;
        this.load(this.options.sources[0]);
    };

    Inc.prototype.require = function (src) {
        this.options.sources.push(src);
    };

    Inc.prototype.load = function (src) {

        if (this.scriptExists(src)) {
            var index = this.options.sources.indexOf(src);
            this.options.sources.splice(index, 1);
            if (this.options.sources[index + 1] !== undefined)
                return this.load(this.options.sources[index++]);
            return;
        }
        ;

        var self = this,
            script = this.createScriptElement(src);

        script.onload = function (event) {
            self.options.current++;
            if (!self.options.error && self.options.current < self.options.sources.length) {
                self.load(self.options.sources[self.options.current]);
            }
            if (!self.options.error && self.options.current === self.options.sources.length && typeof self.options.handler['onload'] === 'function') {
                self.options.handler['onload'].call(script, self.options.sources);
            }
        };

        script.onerror = function (error) {
            self.options.error = true;
            if (typeof self.options.handler['onerror'] === 'function')
                self.options.handler['onerror'].call(script, error);
        };

        document.head.appendChild(script);
    };

    Inc.prototype.createScriptElement = function (src) {
        var script = document.createElement('script');
        script.setAttribute('data-inc', src);
        script.src = (src.substr(-3).toLowerCase() === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        return script;
    };

    Inc.prototype.scriptExists = function (src) {
        var result = false;
        Array.prototype.slice.call(document.scripts, 0).forEach(function (item) {
            if (!result && item.getAttribute('data-inc') === src)
                result = true;
        });
        return result;
    };

    window.Inc = Inc;

})(window);

/**
 * Script Tpl
 * Templates builder
 */

(function (window) {


    /**
     * Глобальный обект скрипта.
     * Точка оперирования с документами.
     *
     *  @var object Tpl
     */
    var o = {

        /**
         * Самообновляющаяся ссылка на динамическую библиотеку internal.data
         *
         * @var object data
         */
        data: {},

        /**
         * версия скрипта
         */
        version: '0.0.1',

        /**
         * путь к директории с шаблонами/видами. должен быть относительным,
         * нужно учесть что он используется для как часть строки запроса.
         * возможно нужно настроить индивидуально под роутер, выделив ему API
         */
        templates: 'templates/',

        /**
         * доступные расширения файлов шаблона
         */
        templatesExtensions: ['.html', '.php', '.tpl', '.txt', '.text']

    };
    /**
     * Приватный обект
     *
     * @var {{*}} internal
     */
    var internal = {

        /**
         * Динамическая библиотека
         * Выполнять роль провайдера данных.
         * Накаплевает все результаты ответов что были выполненны, за всю жизнь скрипта
         *
         *  @var object data
         */
        data: {},

        /**
         * Merge two objects into one - 'obj'
         */
        merge: function (src, obj) {
            if (typeof src === 'object' && typeof obj === 'object') {
                for (var key in src)
                    if (src.hasOwnProperty(key)) obj[key] = src[key];

                return obj;

            } else
                return false;
        },

        fileExtension: function (file) {
            var p = String(file).split('.');
            return (p[p.length - 1] !== undefined) ? p[p.length - 1] : false;
        }

    };


    o.merge = function (src, obj) {
        return internal.merge(src, obj);
    };


    /**
     * Сборка конфигурации
     *
     * @param conf
     */
    o.config = function (conf) {
        o.templates = conf.templates ? conf.templates : o.templates;
    };


    /**
     * Базовый подзапрос.
     *
     * @param url
     * @param callback
     * @param callbackError
     */
    o.request = function (url, callback, callbackError) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (typeof callback === 'function')
            xhr.onload = callback;
        if (typeof callbackError === 'function')
            xhr.onerror = callbackError;
        xhr.send();
    };


    /**
     * Загружает templates файл
     * Результат вернется как аргумент в функцию обратного вызова callback,
     * так-же результат сохраняется в динамической библиотеке internal.data[FILE_NAME].response
     *
     * @param fileName      имя файла html, без указания расширения
     * @param callback      функция обратного вызова. В функцию приходит аргумент
     *                          с ответом запроса
     * @param callbackError
     */
    o.loadHTML = function (fileName, callback, callbackError) {

        var ext = '';
        if (fileName.lastIndexOf('.') !== -1) {
            var index = fileName.lastIndexOf('.'),
                _ext = fileName.substr(index);
            if (o.templatesExtensions.indexOf(_ext) === -1) {
                ext = o.templatesExtensions[0];
            }
        } else ext = o.templatesExtensions[0];

        // generate url to template
        var url = o.templates + fileName + ext,

            onload = function (event) {

                if (event.target instanceof XMLHttpRequest) {
                    var xhr = event.target;
                    if (xhr.status === 200 && typeof callback === 'function') {
                        internal.data[fileName] = {
                            source: o.templates + fileName + '.html',
                            response: xhr.responseText
                        };
                        callback.call(o, xhr.responseText);
                    }
                } else {
                    callbackError.call(o, xhr);
                }
            },

            onerror = function (event) {
                f(typeof callbackError === 'function')
                callbackError.call(o, event.target);
            };
        console.log(url);
        o.request(url, onload, onerror);
    };


    /**
     * Загружает JSON данные
     */
    o.loadJSON = function (url, callback, callbackError) {
        var result, onload = function (event) {
            if (event.target instanceof XMLHttpRequest) {
                var xhr = event.target;
                if (xhr.status === 200 && typeof callback === 'function') {
                    result = JSON.parse(xhr.responseText);
                    callback.call(o, result);
                }
            } else {
                callbackError.call(o, xhr);
            }
        };

        o.request(url, onload, callbackError);
    };


    /**
     * Загружает один или несколько файлв, имена - параметры принимает в виде масива.
     * функция обратного вызова callback может получить в аргумент два различных типа ответа:
     *  - если передано в filesNamesArray всего одно значение, аргумент будет содержать прямой ответ загрузки этого файла.
     *  - но если передано на загрузку больше чем один файл - аргумент будет содержать все ответы
     *          запросов в объекте - динамической библиотеки internal.data
     *          (internal.data['FILE_NAME'] содержи все результаты ответов что были выполненны до этого, за всю жизнь скрипта)
     *
     * @param filesNamesArray   имена / url файлов в массиве
     * @param callback          выполняется когда все файлы будут загружены
     * @param callbackError     выполняется при возникновении ошибки.
     */
    o.include = function (filesNamesArray, callback, callbackError) {
        if (typeof filesNamesArray === 'string') filesNamesArray = [filesNamesArray];
        if (Object.prototype.toString.call(filesNamesArray) === '[object Array]') {

            o.include.iter = 0;
            o.include.amount = filesNamesArray.length;
            o.include.callBack = function (response) {
                o.include.iter++;
                if (o.include.iter === o.include.amount) {
                    // обновляет ссылка на результаты с частного объекта internal.data
                    o.data = internal.merge(internal.data, o.data);
                    // если переда один файл на загрузку
                    var arg = o.include.amount === 1 ? response : internal.data;
                    // вызов пользовательской функции
                    callback.call(o, arg);
                }
            };

            filesNamesArray.map(function (file) {
                o.loadHTML(String(file).trim(), o.include.callBack, callbackError);
            });

        }
    };


    /**
     * Внедряет в переданый объект selector данные с dataSource, но перед этим
     * рендерит переменные params в dataSource
     *
     * @param selector      селектор для выборки, или объект в который будет внедрены данные
     * @param dataSource    данные
     * @param params        параметры для шаблона в dataSource
     * @returns {*}         если selector успешно выбран, функция вернет Node.ELEMENT_NODE
     *                          в этот объект будет добавлены свойства:
     *                              .dataSource         исходная строка
     *                              .dataImplemented    результат щаблонизации
     */
    o.inject = function (selector, dataSource, params) {
        if (typeof selector === 'string') {
            selector = o.query(selector);
        }

        if (typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE) {
            selector.dataSource = dataSource;
            selector.innerHTML = selector.dataImplemented = o.renderString(dataSource, params);
            return selector;
        }
    };


    /**
     * Сводит шаблон с переменными
     *
     * @param stringData    строка с шаблонами
     * @param params        переменные
     * @returns {*}         вернет строку результата
     */
    o.renderString = function (stringData, params) {
        if (typeof params === 'object')
            for (var k in params)
                stringData = stringData.replace(new RegExp('{{' + k + '}}', 'gi'), params[k]);

        return stringData;
    };


    /**
     * Отдаст результат запроса, или если не указан параметр объект
     *
     * @param name          имя загруженного файла
     * @returns {*}
     */
    o.data = function (name) {
        if (name === undefined)
            return internal.data;
        else if (internal.data[name] !== undefined)
            return internal.data[name];
    };


    /**
     * Выберает DOM елемент с страницы, или вернет
     *
     * @param selector      имя загруженного файла
     * @returns {*}
     */
    o.query = function (selector) {
        var elem = document.querySelector(selector);
        if (!elem) {
            console.error("Can`t query DOM Element by selector: " + selector);
            return false;
        }
        else return elem;
    };

    /**
     * Execute callback function if DOM is loaded
     * @param callback
     */
    o.domLoaded = function (callback) {
        if (o.domIsLoaded) {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
    };

    /**
     * Check an DOM is loaded
     * @returns {boolean}
     */
    o.domIsLoaded = function () {
        return !!o.query('body');
    };

    /**
     * Сохранение данных на стороне пользователя.
     *
     * @var function localGet
     * @var function localSet
     * @var function localKey
     * @var function localRemove
     */

    o.localGet = function (name, value) {
        var result = window.localStorage.getItem(name);
        if (result === undefined) return value;
        try {
            return JSON.parse(result)
        }
        catch (e) {
            return result
        }
    };

    o.localSet = function (name, value) {
        if (typeof value !== 'string') value = JSON.stringify(value);
        return window.localStorage.setItem(name, value);
    };

    o.localKey = function (index, value) {
        var result = window.localStorage.key(index);
        if (result === undefined) return value;
        try {
            return JSON.parse(result)
        }
        catch (e) {
            return result
        }
    };

    o.localRemove = window.localStorage.removeItem;

    window.Tpl = o;

})(window);

/**
 * Script Util
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
     * @param obj       main object of merge
     * @param src       the elements of this object will be added/replaced to main object `obj`
     * @returns {*}     object result
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
            for (var key in prop)
                elem.setAttribute(key, prop[key]);
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

    window.Util = o;

})(window);

/**
 * Script Dom
 *
 */

(function () {

    'use strict';

    /**
     *
     * @param selector
     * @returns {*}
     */
    var dom = function(selector){

        if (!(this instanceof Dom)) return new Dom(selector);

        if(selector === 'body' && document.body){
            this._elementsOptions('body', document.body);

        }
        else if(selector === 'head' && document.head){
            this._elementsOptions('head', document.head);

        }
        else if(typeof selector === 'string'){
            this.query(selector);

        }else if(typeof selector === 'object' && (selector instanceof HTMLCollection || selector instanceof NodeList)){
            this._elementsOptions(null, selector);

        }
        else if(typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE){
            this._elementsOptions(null, selector);

        }else
            return this;
    };

    var internal = {}, proto = {
        selector:null,
        elements:[],
        length:0
    };
    internal.merge = function(obj, src){
        for (var key in src)
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        return obj;
    };

    /**
     * Вернет один выбраный объект, первый если выбранно большн одного.
     * Не изменяет экземпляр
     * @param index
     * @returns {*}
     */
    proto.one = function(index){
        index = index || 0;
        if(this.elements.length == 0) return;
        return this.elements[index];
    };

    /**
     * Вернет все выбраные объекты
     * Не изменяет экземпляр
     * @returns {Array}
     */
    proto.all = function (){
        if(this.elements.length == 0) return;
        return this.elements;
    };

    /**
     * Вернет первый дочерний елемент firstChild
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.first = function (){
        if(this.elements.length == 0) return this;
        var elem = [];
        try{
            this.elements.map(function(item){
                var finds = item.firstChild;
                if(finds) {
                    while(finds && finds.nodeType !== Node.ELEMENT_NODE)
                        finds = finds.nextSibling;
                }
                elem.push(finds);
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };


    /**
     * Вернет последний дочерний елемент lastChild
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.last = function (){
        if(this.elements.length == 0) return this;
        var elem = [];
        try{
            this.elements.map(function(item){
                var finds = item.lastChild;
                if(finds) {
                    while(finds && finds.nodeType !== Node.ELEMENT_NODE)
                        finds = finds.previousSibling;
                }
                elem.push(finds);
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };


    /**
     * Вернет последующий елемент nextSibling
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.next = function (){
        if(this.elements.length == 0) return this;
        var elem = [];
        try{
            this.elements.map(function(item){
                var find = item.nextSibling;
                if(find) {
                    while(find.nodeType !== Node.ELEMENT_NODE)
                        find = find.nextSibling;
                }
                elem.push(find);
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };


    /**
     * Вернет предведущий елемент previousSibling
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.prev = function (){
        if(this.elements.length == 0) return this;
        var elem = [];
        try{
            this.elements.map(function(item){
                var find = item.previousSibling;
                if(find) {
                    while(find.nodeType !== Node.ELEMENT_NODE)
                        find = find.previousSibling;
                }
                elem.push(find);
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };

    proto.children = function (){
        if(this.elements.length == 0) return this;
        var elem = [];
        try{
            this.elements.map(function(item){
                var finds = item.children;
                if(finds) {
                    elem = elem.concat([].slice.call(finds));
                }
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };

    proto.parent = function (){
        if(this.elements.length == 0) return;
        var elem = [];
        try{
            this.elements.map(function(item){
                var finds = item.parentNode;
                elem.push(finds);
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };

    proto.find = function (selector){
        if(this.elements.length == 0) return;
        var elem = [];
        try{
            this.elements.map(function(item){
                var finds = proto.query(selector,item);
                if(finds) {
                    elem = elem.concat([].slice.call(finds));
                }
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };


    proto.text = function (param){
        if(this.elements.length == 0) return;
        if(param == undefined)
            return this.elements[0].textContent;
        else{
            try{
                this.elements.map(function(elem){
                    elem.textContent = param;
                });
            }catch(e){}
        }


        return this;
    };

    proto.html = function (param){
        if(this.elements.length == 0) return;
        if(param == undefined)
            return this.elements[0].innerHTML;
        else{
            try{
                this.elements.map(function(elem){
                    elem.innerHTML = param;
                });
            }catch(e){}
        }


        return this;
    };

    proto.css = function (param, value){
        if(this.elements.length == 0) return;
        try{
            this.elements.map(function(elem){
                elem.style[param] = value;
            });
        }catch(e){}
        return this;
    };

    proto.on = function (eventName, eventFunc, bubble){
        if(this.elements.length == 0) return;
        try{
            this.elements.map(function(elem){
                elem.addEventListener(eventName, eventFunc, bubble);
            });
        }catch(e){}
        return this;
    };


    proto.each = function (func){
        if(this.elements.length == 0) return;
        var self = this;
        try{
            this.elements.map(function(elem, index){
                func.call(self, elem, index);
            });
        }catch(e){}
        return this;
    };


    /**
     * Назначение параметров для обрабюотчиков.
     * Приватный метод
     * @param selector
     * @param elements
     * @private
     */
    proto._elementsOptions = function(selector, elements) {
        this.selector = (typeof selector === 'string') ? selector : null;
        if(elements){
            if(typeof elements === 'object' && (elements instanceof HTMLCollection || elements instanceof NodeList))
                elements = [].slice.call(elements);
            else if(typeof elements === 'object' && elements.nodeType === Node.ELEMENT_NODE)
                elements = [elements];
        }
        this.elements = (elements instanceof Array) ? elements : [];
        this.length = this.elements.length;
    };

    /**
     * Базовый метод выборки элементов с DOM дерева
     * @param selector
     * @param from
     * @returns {*}
     */
    proto.query = function (selector, from){
        from = (from && from.nodeType === Node.ELEMENT_NODE) ? from : window.document;
        var find = from.querySelectorAll(selector),
            elem = (find) ? [].slice.call(find) : [];
        this._elementsOptions(selector, elem);
        return elem;
    };

    dom.prototype = proto;
    dom.prototype.constructor = dom;
    window.Dom = dom;

})();