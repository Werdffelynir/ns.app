<?php

include 'db/SPDO.php';

use db\SPDO;


class Server {
    static private $_commands;
    static private $_spdo;
    static public function SPDO(){
        if(!(self::$_spdo instanceof SPDO)) self::$_spdo = new SPDO('sqlite:database/db.sqlite');
        return self::$_spdo;
    }
    static public function isAuth(){
        return isset($_COOKIE['auth']) && $_COOKIE['auth'] == 1 && isset($_COOKIE['user']) && is_string($_COOKIE['user']);
    }
    static public function getCommand($command = 'command'){
        return !empty($_POST[$command]) ? trim(strip_tags($_POST[$command])) : false;
    }
    static public function executeCommand($command, callable $callback){
        self::$_commands[trim($command)] = $callback;
    }
    static public function dbGetMessages(){
        return Server::SPDO()->select('*', 'messages', 'deleted != 1');
    }
    static public function dbGetUsers(){
        $result = [];
        $users = Server::SPDO()->select('*', 'users', 'active != 0');
        for($i=0;$i<count($users);$i ++)
            $result[$users[$i]['id'] ] = $users[$i];
        return $result;
    }
    static public function run(){
        $command = self::getCommand('command');
        $callback = isset(self::$_commands[$command]) ? self::$_commands[$command]: false;
        if($command && $callback){
            call_user_func_array($callback, [$_POST]);
        }

    }
}

Server::executeCommand('login', function(){
    $result['user'] = null;
    //$users = Server::dbGetUsers();
    foreach(Server::dbGetUsers() as $user){
        if($user['username'] == $_POST['username'] && $user['password'] == md5($_POST['password'])){
            $result['user'] = $user;
            unset($result['user']['password']);
            setcookie('auth', '1', time() + 3600 * 24, '/');
            setcookie('user', json_encode($result['user']), time() + 3600 * 24, '/');
            break;
        }
    }
    echo json_encode($result);
});

/*if(!empty($_POST['username']) && !empty($_POST['password'])){
    $response['result'] = '0';
    $users = Server::SPDO()->select('*', 'users', 'active = 1');
    foreach($users as $user){
        if($user['username'] == $_POST['username'] && $user['password'] == md5($_POST['password'])){
            $response['result'] = $user;
            unset($response['result']['password']);
            setcookie('auth', '1', time() + 3600 * 24, '/');
            setcookie('user', json_encode($response['result']), time() + 3600 * 24, '/');
            break;
        }
    }
    echo json_encode($response);
}
/*
if(Server::getCommand() ==  'put_message' && Server::isAuth()) {

    $response['result'] = '0';

    $text = Server::getCommand('text');
    $user_id = Server::getCommand('user_id');

    if(empty($text) || empty($user_id)) return null;

    $result['users'] = Server::SPDO()->select('*', 'users', 'active != 0');

    $response['result'] = Server::SPDO()->insert('messages', [
        'user_id' => $user_id,
        'time' => time(), //date("d.m.Y H:i:s"),
        'text' => trim(strip_tags($text)),
    ]);

    print_r(json_encode($response));
}
if(Server::getCommand() ==  'get_base_date' && Server::isAuth()) {
    $result['config'] = [
        'service_name' => 'Service Name',
        'service_description' => 'Service Description',
    ];
    $result['messages'] = Server::dbGetMessages();
    $result['users'] = Server::dbGetUsers();

    echo json_encode($result);
}
if(Server::getCommand() ==  'update_messages' && Server::isAuth()) {
    $user_id = (int) Server::getCommand('last_id');
    $result['messages'] = Server::SPDO()->select('*', 'messages', 'deleted != 1 AND id > ?', [$user_id] );
    echo json_encode($result);
}
Server::executeCommand('update_messages', function($values){
    $result['error'] = null;
    if(!empty($values['last_id']) && $values['last_id'] > 0){
        $result['messages'] = Server::SPDO()->select('*', 'messages', 'deleted != 1 AND id > ?', [(int) $values['last_id']]);
    }else
        $result['messages'] = null;
    echo json_encode($result);
});
*/

Server::executeCommand('base_date', function(){
    $result['config'] = [
        'name' => 'Service Name',
        'description' => 'Service Description',
    ];
    $result['messages'] = Server::dbGetMessages();
    $result['users'] = Server::dbGetUsers();
    echo json_encode($result);
});

Server::executeCommand('update', function($cmds) {

    $userId = Server::getCommand('uid');
    $lastMessageId = Server::getCommand('last_message_id');
    $deleteMessageId = Server::getCommand('delete_message_id');
    $messageText = Server::getCommand('message_text');

    $result['error'] = null;
    $result['messages'] = null;

    if($userId && $messageText){
        $result['message_update'] = Server::SPDO()->insert('messages', [
            'user_id' => $userId,
            'time' => time(),
            'text' => $messageText,
        ]);
        $result['message_update'] = $messageText;
    }

    if($userId && $lastMessageId){
        $_res = Server::SPDO()->update('users',['lastactive' => time()], 'id = ?', [$userId]);
        if(!$_res)
            $result['error'] = Server::SPDO()->getError();
        $result['messages'] = Server::SPDO()->select('*', 'messages', 'deleted != 1 AND id > ?', [$lastMessageId]);
    }

    if($userId && $deleteMessageId){
        $result['message_deleted'] = Server::SPDO()->update('messages',
            ['deleted' => 1],
            'id = ? AND user_id = ?',
            [$deleteMessageId,$userId]
        );
    }
    $result['users'] = Server::dbGetUsers();

    echo json_encode($result);

});














Server::run();