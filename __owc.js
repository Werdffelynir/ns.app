


    /**
     * Use: app.action.chart.getTaskProject()
     * @returns {null|*}

    o.getTaskProject = function(){
        var i, tasks = gantt._get_tasks_data();
        if(o.taskProjectData == null){
            for (i = 0; i < tasks.length; i ++){
                if(tasks[i]['type'] == 'project'){
                    o.taskProjectData = tasks[i];
                    continue;
                }
            }
        }
        return o.taskProjectData;
    } */


 (function(modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        if(installedModules[moduleId])
            return installedModules[moduleId].exports;

        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.loaded = true;

        // Return the exports of the module
        return module.exports;
    }


    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // __webpack_public_path__
    __webpack_require__.p = "";

    // Load entry module and return exports
    return __webpack_require__(0);
 })

 ([
/* 0 */
 function(module, exports, __webpack_require__) {

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * 
     */
    'use strict';

    var installGlobalHook = __webpack_require__(1);
    var installRelayHook = __webpack_require__(3);

    var js = ';(' + installGlobalHook.toString() + '(window))' + ';(' + installRelayHook.toString() + '(window))';

    var script = document.createElement('script');
    script.textContent = js;
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);

 },
/* 1 */
 function(module, exports, __webpack_require__) {

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * 
     */
    'use strict';

    var _types = __webpack_require__(2);

    /**
     * NOTE: This file cannot `require` any other modules. We `.toString()` the
     *       function in some places and inject the source into the page.
     */
    function installGlobalHook(window) {
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        return;
      }
      Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
        value: {
          _renderers: {},
          helpers: {},
          inject: function inject(renderer) {
            var id = Math.random().toString(16).slice(2);
            this._renderers[id] = renderer;
            this.emit('renderer', { id: id, renderer: renderer });
          },
          _listeners: {},
          sub: function sub(evt, fn) {
            var _this = this;

            this.on(evt, fn);
            return function () {
              return _this.off(evt, fn);
            };
          },
          on: function on(evt, fn) {
            if (!this._listeners[evt]) {
              this._listeners[evt] = [];
            }
            this._listeners[evt].push(fn);
          },
          off: function off(evt, fn) {
            if (!this._listeners[evt]) {
              return;
            }
            var ix = this._listeners[evt].indexOf(fn);
            if (ix !== -1) {
              this._listeners[evt].splice(ix, 1);
            }
            if (!this._listeners[evt].length) {
              this._listeners[evt] = null;
            }
          },
          emit: function emit(evt, data) {
            if (this._listeners[evt]) {
              this._listeners[evt].map(function (fn) {
                return fn(data);
              });
            }
          }
        }
      });
    }

    module.exports = installGlobalHook;

 },
/* 2 */
 function(module, exports) {

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * 
     */
    'use strict';

 },
/* 3 */
 function(module, exports) {

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * 
     */
    'use strict';

    /**
     * NOTE: This file cannot `require` any other modules. We `.toString()` the
     *       function in some places and inject the source into the page.
     */

    function installRelayHook(window) {
      var TEXT_CHUNK_LENGTH = 500;

      var hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!hook) {
        return;
      }

      function decorate(obj, attr, fn) {
        var old = obj[attr];
        obj[attr] = function () {
          var res = old.apply(this, arguments);
          fn.apply(this, arguments);
          return res;
        };
      }

      var _eventQueue = [];
      var _listener = null;
      function emit(name, data) {
        _eventQueue.push({ name: name, data: data });
        if (_listener) {
          _listener(name, data);
        }
      }

      function setRequestListener(listener) {
        if (_listener) {
          throw new Error('Relay Devtools: Called only call setRequestListener once.');
        }
        _listener = listener;
        _eventQueue.forEach(function (_ref) {
          var name = _ref.name;
          var data = _ref.data;

          listener(name, data);
        });

        return function () {
          _listener = null;
        };
      }

      function recordRequest(type, start, request, requestNumber) {
        var id = Math.random().toString(16).substr(2);
        request.then(function (response) {
          emit('relay:success', {
            id: id,
            end: performance.now(),
            response: response.response
          });
        }, function (error) {
          emit('relay:failure', {
            id: id,
            end: performance.now(),
            error: error
          });
        });
        var textChunks = [];
        var text = request.getQueryString();
        while (text.length > 0) {
          textChunks.push(text.substr(0, TEXT_CHUNK_LENGTH));
          text = text.substr(TEXT_CHUNK_LENGTH);
        }
        return {
          id: id,
          name: request.getDebugName(),
          requestNumber: requestNumber,
          start: start,
          text: textChunks,
          type: type,
          variables: request.getVariables()
        };
      }

      var requestNumber = 0;

      function instrumentRelayRequests(relayInternals) {
        var NetworkLayer = relayInternals.NetworkLayer;

        decorate(NetworkLayer, 'sendMutation', function (mutation) {
          requestNumber++;
          emit('relay:pending', [recordRequest('mutation', performance.now(), mutation, requestNumber)]);
        });

        decorate(NetworkLayer, 'sendQueries', function (queries) {
          requestNumber++;
          var start = performance.now();
          emit('relay:pending', queries.map(function (query) {
            return recordRequest('query', start, query, requestNumber);
          }));
        });

        var instrumented = {};
        for (var key in relayInternals) {
          if (relayInternals.hasOwnProperty(key)) {
            instrumented[key] = relayInternals[key];
          }
        }
        instrumented.setRequestListener = setRequestListener;
        return instrumented;
      }

      var _relayInternals = null;
      Object.defineProperty(hook, '_relayInternals', {
        set: function set(relayInternals) {
          _relayInternals = instrumentRelayRequests(relayInternals);
        },
        get: function get() {
          return _relayInternals;
        }
      });
    }

    module.exports = installRelayHook;

 }
 ]);






    module.exports = installRelayHook;


==========================================================================



        /*gantt.$click.advanced_details_button=function(e, id, trg){
            alert("These are advanced details");
            return false; //blocks the default behavior
        };*/

        /*gantt.attachEvent("onBeforeParse", function(){
            //any custom logic here
        });*/

        /*(function(){
            app.data.tasks
        })()*/




        //console.log(o.taskProjectData);
        //console.log(dataTaskFiltering);
        //console.log(app.data.tasks);

==========================================================================



        /* on_task_edit
        gantt.attachEvent("onBeforeTaskUpdate", eventBeforeTaskUpdate);
        gantt.attachEvent("onAfterTaskUpdate", eventAfterTaskUpdate);
        gantt.attachEvent("onAfterTaskDelete", eventAfterTaskDelete);
        gantt.attachEvent("onBeforeTaskAdd", eventBeforeTaskAdd);
        */

        //

        //gantt.attachEvent("onBeforeTaskDisplay", onBeforeTaskDisplayDateFixer);




==========================================================================

function array_diff (array) {   // Computes the difference of arrays
    // 
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    var arr_dif = [], i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false;

    // loop through 1st array
    for ( key in array ){
        // loop over other arrays
        for (i = 1; i< argc; i++){
            // find in the compare array
            found = false;
            for (key_c in argv[i]) {
                if (argv[i][key_c] == array[key]) {
                    found = true;
                    break;
                }
            }

            if(!found){
                arr_dif[key] = array[key];
            }
        }
    }

    return arr_dif;
}

// ---------------------------------

function getArrayDiff(a, b) {
  var ret = [],
      merged = [];

  merged = a.concat(b);

  for (var i = 0; i < merged.length; i++) {
    // When the element is contained ONLY
    //   one time then the search from
    //   left returns the same value as
    //   the search from the right.
    if (merged.indexOf(merged[i]) ==
        merged.lastIndexOf(merged[i])) {
      // ... in that case the element
      // is pushed to the result array.
      ret.push(merged[i]);
    }
  }

  return ret;
}


// ---------------------------------

function array_diff(array1, array2) {
  return array1.slice(0).filter(function(elm) {
    return array2.indexOf(elm) === -1;
  })
}

// ---------------------------------

(function() {
    Array.prototype.array_diff = function( arr ) {
        var arr_dif = [], i = 1, that = this, argv = arguments, key, key_c, found = false;                    
        Array.prototype.unshift.call(argv, that);
        var argc = argv.length;
        for (key in that) {
            // Loop over other array
            found = false;
            founder:
                for (i = 1; i < argc; i++) {                            
                    for (key_c in argv[i]) {
                        if ( argv[i][key_c] == that[ key ] ) {
                            found = true;
                            break founder;
                        }
                    }
                }
            if(!found) {
                arr_dif[key] = that[key];
            }   
        } 
        return arr_dif;                   
    }
})();


// ---------------------------------



// ---------------------------------



// ---------------------------------



// ---------------------------------




==========================================================================
















        die;
        if(!empty($_POST)){
            return new DataResponse($_POST);
/**/
            unset($project['is_share']);
            unset($project['share_password']);

            return new TemplateResponse($this->appName, 'public', [
                'json' => [
                    'project' => $project,
                    'tasks' => $this->connect->task()->get(),
                    'links' => $this->connect->link()->get()
                ]
            ]);

        }
        //else return new DataResponse($_POST);
        $link = $project['share_link'];
        $password = $project['share_password'];

        return  new TemplateResponse($this->appName, 'authenticate', [
            'wrongpw' => true,
            'requesttoken' => $password.md5($link)
        ], 'guest');





        $project = $this->connect->project()->getShare($share);
        $params = [
            'access' => 'deny'
        ];

        if($project){

            if($project['share_is_protected'] == 1){

                $link = $project['share_link'];
                $password = $project['share_password'];
                $publickey = (isset($_SESSION['publickey'])) ? trim($_SESSION['publickey']) : false;

                if($publickey === md5($password.$link)){

                    $params['project']      = $project;
                    $params['tasks']        = $this->connect->task()->get();
                    $params['links']        = $this->connect->link()->get();

                    $response = new TemplateResponse($this->appName, 'public', $params);
                }
                else if( isset($_POST['requesttoken']) && isset($_POST['password']) ){

                    if(trim($_POST['requesttoken']) === md5(trim($_POST['password']).$link)){
                        Helper::session('publickey', $_POST['requesttoken']);
                        return new RedirectResponse($link);
                    }else{
                        $response =  new TemplateResponse($this->appName, 'authenticate', [
                            'wrongpw' => true,
                            'requesttoken' => md5($password.$link)
                        ], 'guest');
                    }

                } else{

                    $response =  new TemplateResponse($this->appName, 'authenticate', ['requesttoken' => md5($password.$link)], 'guest');
                }

                if($project['share_is_expire'] == 1 && time() > strtotime($project['share_expire_time'])){
                    $template = new \OCP\Template('', '404', 'guest');
                    $template->printPage();
                }else
                    return $response;
            }

            $params['access'] = 'allow';

            if($params['access'] == 'allow'){

                if($project['share_is_expire'] == 1 && time() > strtotime($project['share_expire_time'])){
                    $template = new \OCP\Template('', '404', 'guest');
                    $template->printPage();
                }else {
                    unset($project['is_share']);
                    unset($project['share_password']);
                    return new TemplateResponse($this->appName, 'public', [
                        'json' => [
                            'project' => $project,
                            'tasks' => $this->connect->task()->get(),
                            'links' => $this->connect->link()->get()
                        ]
                    ]);
                }
            }
        }
        else {
            $template = new \OCP\Template('', '404', 'guest');
            $template->printPage();
        }



==========================================================================



if($project['open'] == 1 && $project['is_share'] == 1){

            $templateResponse = new DataResponse([null]);

            // Project is opened and shared
            if($project['share_is_protected'] != 1){
                unset($project['is_share']);
                unset($project['share_password']);
                $templateResponse = new TemplateResponse($this->appName, 'public', [
                    'json' => [
                        'project' => $project,
                        'tasks' => $this->connect->task()->get(),
                        'links' => $this->connect->link()->get()
                    ]
                ]);
            }
            // Project is opened and shared but is protected
            else{
                $wrongpw = false;

                if(!empty($_POST) && !empty($_POST['requesttoken']) && !empty($_POST['password'])) {

                    // error user input
                    if($project['share_password'].md5($project['share_link']) !== $_POST['requesttoken'] && md5($_POST['password']) !== $project['share_password']){

                        $wrongpw = true;

                    }
                    else {

                    }



                }





                $templateResponse = new TemplateResponse($this->appName, 'authenticate', [
                    'wrongpw' => $wrongpw,
                    'requesttoken' => $project['share_password'].md5($project['share_link'])
                ], 'guest');



                if(!empty($_POST))
                    $templateResponse = new DataResponse($_POST);


            }







            return $templateResponse;

        }

        // Project not opened or not share
        else{
            $template = new \OCP\Template('', '404', 'guest');
            $template->printPage();
        }




==========================================================================



owc_email_autocomplete

$(document).on('focus', "#event-location:not(.ui-autocomplete-input)", function (event) {
    $(this).autocomplete({
        source: OC.linkTo('calendar', 'ajax/search-location.php'),
        minLength: 2
    });
});

$(document).on('focus', "#owc_email_autocomplete", function (event) {
    $(this).autocomplete({
        source: [
          "ActionScript",
          "AppleScript",
          "Asp",
          "BASIC",
          "C",
          "C++",
          "Clojure",
          "COBOL",
          "ColdFusion",
          "Erlang",
          "Fortran",
          "Groovy",
          "Haskell",
          "Java",
          "JavaScript",
          "Lisp",
          "Perl",
          "PHP",
          "Python",
          "Ruby",
          "Scala",
          "Scheme"
        ],
        minLength: 2
    });
});



==========================================================================





        /*var usersEmails = (function(){
            var group, userIter = 0, user, list = [], all = app.data.groupsusers;
            for(group in all){
                //list.push(group);
                for(userIter = 0; userIter < all[group].length; userIter ++){
                    user = all[group][userIter]['uid'];
                    list.push(user);
                }
            }
            return list;
        })();

        console.log(usersEmails)

        // emails autocomplete
        $(document).on('focus', "#owc_email_autocomplete", function (event) {
            $(this).autocomplete({
                source: usersEmails,
                minLength: 2
            });
        });*/


==========================================================================







==========================================================================

if(filter_var($parameters['_put']['value'], FILTER_VALIDATE_EMAIL))



var myDate = new Date();
myDate.setDate(myDate.getDate() + 25);



var d1 = new Date();
var d2 = new Date();
d2.setDate(d1.getDate() + 7);



var date = new Date();
date.setTime( date.getTime() + days * 86400000 );
date.setTime( date.getTime() + hour * 3600000 );
date.setTime( date.getTime() + minutes * 60000 );



function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addDays(days) {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + days);
    return tomorrow;
}



==========================================================================

Fields in the lightbox, 
task with type "project" and "milestone" - which fields should be included in his
lightbox?  

gantt.attachEvent("onTaskLoading", function(task){
    task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
    task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
    return true;
});

==========================================================================



Dom('#page ul>li:nth-child(odd)').css('display','block')
Dom('#page').find('li.simple');



==========================================================================



// объявляем конструктор
function ArrayMaker(arg1, arg2) {
  this.someProperty = 'неважно';
  this.theArray = [ this, arg1, arg2 ];
}
// объявляем методы
ArrayMaker.prototype = {
  someMethod: function () {
    alert('Вызван someMethod');
  },
  getArray: function () {
    return this.theArray;
  }
};

var am = new ArrayMaker( 'one', 'two' );
var other = new ArrayMaker( 'first', 'second' );

am.getArray(); // => [ am, 'one', 'two' ]



==========================================================================

overflow-y: auto;
margin: 20px 0px 10px 10px;

padding-top: 10px;
max-height: 200px;
overflow-y: auto;

gantt_btn_set gantt_left_btn_set gantt_save_btn_set
gantt_btn_set gantt_left_btn_set gantt_cancel_btn_set
gantt_btn_set gantt_right_btn_set gantt_delete_btn_set

.gantt_save_btn_set{}
.gantt_cancel_btn_set{}
.gantt_delete_btn_set{}

==========================================================================
.gantt_btn_set.gantt_save_btn_set

.gantt_btn_set{
  padding: 0px 15px 0px 10px;
  float: left;
  background-color: #c3c3c3 !important;
  border: 3px solid #c3c3c3 !important;
}

curl --request POST "http://owncloud.loc/index.php/apps/shares" --data "path=ownCloudDeveloperManual.pdf&shareType=3"
curl --request POST "http://owncloud.loc/index.php/shares" --data "path=ownCloudDeveloperManual.pdf&shareType=3"
curl --request POST "https://admin:admin@owncloud.loc/ocs/shares" --data "path=ownCloudDeveloperManual.pdf&shareType=3"

curl --request POST "http://owncloud.loc/ocs/v1.php/apps/files_sharing/api/v1/shares" --data "path=ownCloudDeveloperManual.pdf&shareType=3"



curl http://<ip>/ocs/v1.php/apps/files_sharing/api/v1/shares -k -u user:password -X POST –data “path=<file>&shareType=0&shareWith=<user>”
curl "http://owncloud.loc/ocs/v1.php/apps/files_sharing/api/v1/shares"  -k -u admin:admin -X POST --data "path=work_to_day.txt&shareType=3"
curl "http://owncloud.loc/ocs/v1.php/apps/files_sharing/api/v1/shares"  -k -u admin:admin -X POST --data "path=work_to_day.txt&shareWith=dev2&shareType=0"



==========================================================================



cd /var/www/owncloud/apps/owncollab_chart/
chown -R www-data:www-data owncollab_chart
ettind1.
git clone https://github.com/Werdffelynir/owncollab_chart
rm -R owncollab_chart
nano apicontroller.php




-----------------------------------------------------------------------------------

On Ubuntu, you can start the ssh server on the VPS by typing:

sudo service ssh start


-----------------------------------------------------------------------------------

array_pop   Извлекает последний элемент массива
array_push    Добавляет один или несколько элементов в конец массива
array_shift   Извлекает первый элемент массива
array_unshift   Добавляет один или несколько элементов в начало массива

    function defaults(obj, std){
        for (var key in std)
            if (!obj[key])
                obj[key] = std[key];
        return obj;
    }





==========================================================================

почта по типу team@project1.owncollab.com - это только внутренний email в owncollab приложкниях? и распространяется только внутри ownCloud?

или например с gmail так же можно отправить письмо на team@project1.owncollab.com?




XSD схема

8. Переговоры

Переговоры будет главной особенностью приложения. Возможно дополнительное кодирование, чтобы ссылаться на MTA для настройки приема и отправки электронной почты необходимо.

Настройка экземпляра OwnCloud с активированным приложением создаст псевдоним электронной почты, например, team@project1.owncollab.com (см часть 9подпрограмм настройки) - все письма, отправленные в этот псевдоним будет направлен всем пользователям проекта по электронной почте без вложений (ссылка на вложения будут размещены в верхней части сообщения электронной почты)

Создание группы создаст псевдоним электронной почты, например, подрядчик 1@project1.owncollab.com

- Все электронные письма, отправленные на этот псевдоним будет направлен всем членам группы по электронной почте без навесного оборудования (ссылка на вложения будут размещены в верхней части сообщения электронной почты)

Receiving emails is only allowed from users and their specific email address, all other senders will be rejected
Прием сообщений электронной почты разрешен только от пользователей и их конкретный адрес электронной почты, все остальные отправители будут отклонены

Вложения будут сохранены в каталоге данных пользователей и акций всем пользователям (В зависимости от принимающего псевдонима), созданного

Переговоры также могут быть проведены с помощью веб-интерфейса

Переговоры будут показаны в разделенном зрения - левая сторона: начать разговор, выберите получателя (как к югу ссылке от старта разговора), ваши начали переговоры, переговоры вы принимаете участие, все переговоры

Начните разговор: заголовок, сообщение (с светом редактор WYSIWYG), добавлять файлы, выбрать получателей (все контакты, группы и / или отдельные контакты), кнопку отправки Ваши начали переговоры: раскол в представлении содержимого со списком всех начал переговоры пользователем на левая сторона и весь разговор с правой стороны, выбрав одно название

Переговоры вы принимаете участие: такой же, как с начала переговоры

Все разговоры: такие же, как и раньше, но со всеми переговоров





==========================================================================

/*

Andy: e.g. if there is a link between ID 10 and 11 as Finish-Start link. ID 10 ends on 01.03.2016 16:00. At the moment task 11 would start at 01.03.2016 16:00. A buffer is a time space between these tasks. If in this link would be a buffer of 8 hours, 11 would start at 02.03.2016 00:00.

Энди: например, если существует связь между ID 10 и 11, как Finish-Start ссылку. ID 10 заканчивается на 01.03.2016 16:00. На данный момент задача 11 начнется в 16:00 01.03.2016. Буфер это время пространство между этими задачами. Если в этой связи будет буфер 8 часов, 11 начнется в 02.03.2016 00:00.

*/


==========================================================================
https://yiiframework.com.ua/ru/doc/guide/2/



composer global require "fxp/composer-asset-plugin:~1.1.1"
composer create-project --prefer-dist yiisoft/yii2-app-basic folderName
composer create-project --prefer-dist yiisoft/yii2-app-advanced folderName

composer create-project --prefer-dist --stability=dev yiisoft/yii2-app-basic basic



sudo gedit /etc/apache2/sites-available/banking.loc.conf
sudo mv /etc/apache2/sites-available/banking.loc /etc/apache2/sites-available/banking.loc.conf

<VirtualHost *:80>
    ServerName banking.loc
    DocumentRoot "/var/www/banking.loc/frontend/web"
    <Directory "/var/www/banking.loc/frontend/web">
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted

        RewriteEngine on
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . index.php
    </Directory>
</VirtualHost>


127.0.0.1     banking.loc    www.banking.loc


sudo a2ensite banking.loc.conf

sudo /etc/init.d/apache2 restart

sudo service apache2 reload



==========================================================================







==========================================================================







==========================================================================







==========================================================================



 
I updated the ToDo List. Please check Number 9, it seems, that you are on the wrong page. This is what we discussed in our last skype call. Let's take the same email template like sharing a file via link.
 
Regarding the Talks part, please keep following in your mind.
 
The email adresses should be created with the the user groups. An email adress should look like usergroup@domain or usergroup@subdomain.domain (if the owncloud is running on a subdomain). If an email is sent to this adress from "outside" this mail should be forwarded to every user in the group (who has entered his email adress in his profile). The sender adress of this forwarded email should be the groups email adress.



==========================================================================



    o.domLoaded = function(func){
        if(o.query('body')){
            console.log('loaded');
        }else{
            console.log('not loaded');

        }
    };


==========================================================================


Будет доступен
http://banking.loc/index.php?r=gii

Добавить 

    'modules' => [

        'gii' => [
            'class' => 'yii\gii\Module',
            'allowedIPs' => ['127.0.0.1', '::1'/*, '192.168.0.*', '192.168.178.20'*/] // adjust this to your needs
        ],

    ],






Michael Nguyens answer did not work for me, but updating to dev-master did:


php composer.phar global require "fxp/composer-asset-plugin:dev-master"
One may also need to update composer itself:

php composer.phar self-update


php composer.phar global require "fxp/composer-asset-plugin:1.0.1"

composer global require "fxp/composer-asset-plugin:1.0.1"



It helped for me

composer self-update
composer global update
==========================================================================

Remove composer

Then simply:
Delete the file composer.phar.
Delete the Cache Folder: /home/<user>/.composer

curl -s https://getcomposer.org/installer | php

==========================================================================

How to remove globally a package from Composer?

composer global require 'phpunit/phpunit=3.7.*'

composer global remove phpunit/phpunit


==========================================================================

Remove composer
  
The command you are using is not to remove composer itself but to remove packages installed with composer.
In this case you try to remove the package phpunit for all sites running on the system but since there is no dependency for phpunit it is unable to remove this.

To remove composer itself it depends on how you installed it, if it was installed systemwide by apt you can remove it with the command:

sudo apt-get purge composer

If it was installed else-way you can remove single composer installs by removing the composer.phar:

sudo find / -iname composer.phar -exec rm {} \+;

and then remove the cache:

rm -rf /home/<user>/.composer

or try to find out with which packager it was installed to do a clean uninstall using the uninstall from this packager.





==========================================================================
Install Composer:
curl -sS https://getcomposer.org/installer | sudo php sudo mv composer.phar /usr/local/bin/composer export PATH="$HOME/.composer/vendor/bin:$PATH" reload (terminal).

Uninstall
Delete composer.phar from where youve putted it.

Note: There is no need to delete the exported path.

Reinstall
Than when you reinstall just do the two first stages and the last stage (because the third stage - Exporting the path was already made and I did not reverted it in any way).






==========================================================================
Update Composer itself

composer self-update
Run a diagnostic

composer diagnose
Update your dependencies (note: The -v is the verbose parameter which shows additional info)

composer update -v
If still problems: reinstall the dependencies. Remove the vendor folder (manually) or via rm command (if you are in the project folder, sure) on linux before:

rm -rf vendor/
composer update -v
 

If it’s still not working, Jordi Boggiano recommends you to send a full bug report (containg full debug output, make it with -vvv) to the Composer crew.






==========================================================================
Но стало ясно что проблема в плагине "composer-asset-plugin". Решил так:

1. Откатил обновление composer:

$ composer self-update --rollback
2. Обновил плагин:

$ composer global require "fxp/composer-asset-plugin:~1.0.3"
3. Обновил composer:

$ composer self-update
Всё заработало как надо.






==========================================================================
Download Composer

[Official resource getcomposer.org](https://getcomposer.org/download/)
Run this in your terminal to get the latest Composer version:

php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
php -r "if (hash('SHA384', file_get_contents('composer-setup.php')) === 'fd26ce67e3b237fffd5e5544b45b0d92c41a4afe3e3f778e942e43ce6be197b9cdc7c251dcde6e2a52297ea269370680') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); }"
php composer-setup.php
php -r "unlink('composer-setup.php');"




(Official Documentation getcomposer.org)[https://getcomposer.org/doc/]

Globally
mv composer.phar /usr/local/bin/composer
mv composer.phar /usr/bin/composer

mv /usr/local/bin/composer /usr/bin/composer

==========================================================================


which composer
/usr/local/bin/composer
/usr/bin/composer


which php
/usr/bin/php


whereis /usr/bin/php
whereis /usr/bin/env


==========================================================================





---
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/jvm/java-7-oracle/bin:/usr/lib/jvm/java-7-oracle/db/bin:/usr/lib/jvm/java-7-oracle/jre/bin


/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
/usr/lib/jvm/java-7-oracle/bin
/usr/lib/jvm/java-7-oracle/db/bin
/usr/lib/jvm/java-7-oracle/jre/bin


which php
/usr/bin/php

whereis php
php: /usr/bin/php /usr/share/php /usr/share/man/man1/php.1.gz


----------------
The error message:

/usr/bin/env: php: No such file or directory
tells you that php is not found, i.e. php-cli is not installed or php command is not in your PATH environment variable.

So you need to install (sudo apt-get install php5-cli) or put it in you PATH:

vim ~/.bashrc

PATH=$PATH:/path/to/php-cli/bin
export PATH
UPDATE

Accordingly to Composer with XAMPP for Linux issue symlinking php executable should solve your problem:

ln -s /opt/lampp/bin/php /usr/local/bin/php

==========================================================================



composer self-update --rollback





==========================================================================
Интерактивная консоль

Начиная с версии PHP 5.1.0, модуль CLI SAPI предоставляет интерактивную консоль, доступную с помощью опции -a , если PHP был скомпилирован с опцией --with-readline .
Интерактивная консоль позволяет непосредственно набирать и одновременно выполнять PHP-код.


$ php -a
Interactive mode enabled

php > echo 5+8;
13


Встроенный web-сервер

Начиная с версии PHP 5.4.0 модуль CLI SAPI содержит встроенный web-сервер.

$ cd /var/www/html
$ php -S localhost:8000


Запуск с указанием корневой директории (Document root)
$ cd /var/www/html
$ php -S localhost:8000 -t foo/



Использование скрипта маршрутизации

В этом примере, запросы изображений будут возвращать их, но запросы HTML файлов будут возвращать "Welcome to PHP".

```
<?php
// router.php
if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
    return false;    // сервер возвращает файлы напрямую.
} else { 
    echo "<p>Welcome to PHP</p>";
}
```

$ php -S localhost:8000 router.php


Проверка использования CLI web-сервера

Для совместного использования скрипта маршрутизации при разработке с CLI web-сервером и в дальнейшем с боевым web-сервером:

<?php
// router.php
if (php_sapi_name() == 'cli-server') {
    /* Маршрутизация с заданными правилами и выход с возвращением false */
}
/* продолжение с обычными операциями index.php */

php -S localhost:8000 router.php




Поддержка неподдерживаемых типов файлов

Если вам нужно обслуживать статические ресурсы с MIME типами неподдерживаемыми CLI web-сервером:

<?php
// router.php
$path = pathinfo($_SERVER["SCRIPT_FILENAME"]);
if ($path["extension"] == "el") {
    header("Content-Type: text/x-script.elisp");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else {
    return FALSE;
}


$ php -S localhost:8000 router.php





Доступ к CLI web-серверу с удаленных машин

Вы можете сделать web-сервер доступным на 8000 порту для всех сетевых интерфейсов:
$ php -S 0.0.0.0:8000




==========================================================================

потоки ввода-вывода




Любые данные, которые поступают от вебсервера к php передаются через поток ввода STDIN. 
К примеру данные в формате POST, GET неявно сериализуются и преобразуются в суперглобальные массивы. 
Но если вам понадобится прочитать данные в формате PUT , вам придется проделать тоже самое вручную:

$put = array();
parse_str(file_get_contents('php://input'), $put);




Например, при написании CLI-скриптов для ввода-вывода.
Абстрактный код:

$stdout = fopen('php://stdout', 'w');
$stderr = fopen('php://stderr', 'w');

fwrite($stdout, 'Выполняем действие: ...');

$result = someAction($params);

if ($result === false) {
    fwrite($stderr, 'При выполнении действия произошла ошибка: ...');
}
При запуске содержащего этот код скрипта из консоли сообщения будут выведены в соответствующие стандартные потоки.

-------------------------------

fclose(STDIN);
print("Файл успешно обработан. Было распознано ".$i." записей. Введите номер записи и нажмите Enter. \n Номер записи: ");
$stdin = fopen("php://stdin", "r");
$record_num = fgets($stdin);
fclose($stdin);
print_r($record[$record_num]);







-------------------------------








-------------------------------








-------------------------------








-------------------------------








-------------------------------








-------------------------------








-------------------------------








-------------------------------
















==========================================================================

CLI SAPI.

#!/usr/local/bin/php
<?php
    print "$argc arguments were passed. In order: \n";

    for ($i = 0; $i <= $argc -1; ++$i) {
        print "$i: $argv[$i]\n";
    }
?>



Your first CLI script

Writing CLI scripts is, for the most part, similar to writing PHP scripts for web use - you have all the same functionality available to you as you would when writing for the web. As such, the scripts we're going to look at will specifically highlight special functionality and clever possibilities for the CLI SAPI.
To begin with, we are going to look at argc and argv - two variables oft overlooked in recent times. These two combined allow you to iterate through parameters passed to your script, with parameter 0 being the script itself.

#!/usr/local/bin/php
<?php
    print "$argc arguments were passed. In order: \n";

    for ($i = 0; $i <= $argc -1; ++$i) {
        print "$i: $argv[$i]\n";
    }
?>

Save that in your public HTML directory as cli1.php. Note that you may need to amend the first line depending on where your CLI SAPI resides.
Line one is simply a shebang line (contraction of "sharp" (#) and "bang" (how else could you pronounce an exclamation mark?)) that points to where the CLI SAPI is on your system.
Line three prints the value of $argc out to the system. The usage of this becomes clear in lines four and five; it correlates directly to "the number of parameters passed to the script minus 1". It is minus one because $argv, the values of the parameters that were passed, is a zero-based array like all others in PHP.
In lines four and five, we use $argc to iterate through $argv and output each element as we go. So, with the script saved as cli1.php, run chmod like this:

chmod +x cli1.php

You should now be able to run the script by itself by typing:

./cli1.php
For output, you should see:

1 arguments were passed. In order:
0: ./cli1.php

Try running the script again - this time, pass in random arguments. For example:

./cli1.php --foo --bar baz=wombat
This time, your output should be:

4 arguments were passed. In order:
0: ./cli1.php
1: --foo
2: --bar
3: baz=wombat
And so, as you can see, you have a building block upon which you can base your first shell application.





==========================================================================
 CLI script Python


#!/usr/bin/python3.5
# EASY-INSTALL-ENTRY-SCRIPT: 'ocdev==0.1.8','console_scripts','ocdev'
__requires__ = 'ocdev==0.1.8'
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.exit(
        load_entry_point('ocdev==0.1.8', 'console_scripts', 'ocdev')()
    )












==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================













==========================================================================



