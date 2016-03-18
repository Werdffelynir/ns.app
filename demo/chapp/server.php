<?php

$DB = [
    'users' => [
        [
            'fullname' => 'Administrator',
            'username' => 'admin',
            'password' => 'admin',
        ],
        [
            'fullname' => 'Werdffelynir',
            'username' => 'werd',
            'password' => 'werd',
        ],
    ]
];


if(!empty($_POST['username']) && !empty($_POST['password'])){
    $response['result'] = '0';
    foreach($DB['users'] as $user){
        if($user['username'] == $_POST['username'] && $user['password'] == $_POST['password']){
            $response['result'] = $user;
            unset($response['result']['password']);
            setcookie('auth', '1');
            setcookie('user', json_encode($response['result']));
            break;
        }
    }
    echo json_encode($response);
}