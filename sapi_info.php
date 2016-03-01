#!/usr/local/bin/php
<?php
/**
 * Example: "php sapi command opt1 opt2 opt3 opt4"
 * $argc - 6 (args num)
 * $argv - [sapi, command, op...] array input words
 */



//if(@mkdir('./sapidir/')){
//    print_r("dir 'sapi' created");
//}

//exec('');
//
//print_r("\n-------------------\n");
//echo exec('sudo /etc/init.d/apache2 reload');
//print_r("\n-------------------\n");


//$command = 'git --help';
//system(escapeshellcmd($command));

//$dir = "/var/www";
//system('ls -ls '.escapeshellarg($dir));

/*
ob_start();

system("echo 'Ill catch the buffer'", $retval);
print_r("$retval\n-------------------\n");

system("ls -ls /var/www", $retval);
print_r("$retval\n-------------------\n");

$return = ob_get_contents();
ob_end_clean();
print_r($return);*/

//system("sudo -i", $retval);
//print_r("$retval\n-------------------\n");

// Эта функция недоступна в безопасном режиме.
//$output = shell_exec('ls -lart');
//echo "$output";

// выводит имя пользователя, от имени которого запущен процесс php/httpd
// (применимо к системам с командой "whoami" в системном пути)
//echo exec('whoami')."\n";


//header("Content-Type: application/octet-stream");
//header("Content-Disposition: attachment; filename=\"myfile.zip\"");
//header("Content-Length: 11111");
//passthru("cat myfile.zip",$err);
//echo $err."\n";


//passthru ('echo $PATH');

//function my_exec($cmd, $input='')
//{$proc=proc_open($cmd, array(0=>array('pipe', 'r'), 1=>array('pipe', 'w'), 2=>array('pipe', 'w')), $pipes);
//    fwrite($pipes[0], $input);fclose($pipes[0]);
//    $stdout=stream_get_contents($pipes[1]);fclose($pipes[1]);
//    $stderr=stream_get_contents($pipes[2]);fclose($pipes[2]);
//    $rtn=proc_close($proc);
//    return array('stdout'=>$stdout,
//        'stderr'=>$stderr,
//        'return'=>$rtn
//    );
//}
//var_export(my_exec('echo -e $(</dev/stdin) | wc -l', 'h\\nel\\nlo'));
//var_export(my_exec('echo $PATH'));


//$handle = popen("tail -f /var/log/apache2/access.log 2>&1", 'r');
//while(!feof($handle)) {
//    $buffer = fgets($handle);
//    echo "$buffer<br/>\n";
//    ob_flush();
//    flush();
//}
//pclose($handle);


//define('RUNCMDPATH', 'c:\\htdocs\\nonwebspace\\runcmd.bat');
//function runCmd($cmd) {
//    $externalProcess=popen(RUNCMDPATH.' '.$cmd, 'r');
//    pclose($externalProcess);
//}









/*
// Выводит весь результат шелл-команды "ls", и возвращает
// последнюю строку вывода в переменной $last_line. Сохраняет код возврата
// шелл-команды в $retval.
$last_line = system('ls', $retval);

escapeshellcmd() чистит весь текст команды
escapeshellarg() чистит аргумент

string exec ( string $command [, array &$output [, int &$return_var ]] )
exec() исполняет команду command.
Если параметр output указан, то массив будет заполнен строками вывода программы.
Если заданы оба параметра return_var и output, то при выходе эта переменная будет
содержать статус завершения внешней программы.
Возвращаемые значения Последняя строка вывода при исполнении заданной команды.

// Alternative to $last_line = system('ls', $retval);
$result = array();
exec( $cmd, &$result);
foreach ( $result as $v ){// parse, or do cool stuff}


To have system output from both the STDERR and STDOUT, I\'ve modified the function posted above by lowery@craiglowery.com

function mysystem($command) {
  if (!($p=popen("($command)2>&1","r"))) {
    return 126;
  }

  while (!feof($p)) {
    $line=fgets($p,1000);
    $out .= $line;
  }
  pclose($p);
  return $out;
}

Now you can use mysystem() like;

$var = "cat ".$file;
echo mysystem($var);



function syscall($command){
    if ($proc = popen("($command)2>&1","r")){
        while (!feof($proc)) $result .= fgets($proc, 1000);
        pclose($proc);
        return $result;
        }
    }










 If you can't see any output or error from system(), shell_exec() etc, you could try this:

<?php
function my_exec($cmd, $input='')
         {$proc=proc_open($cmd, array(0=>array('pipe', 'r'), 1=>array('pipe', 'w'), 2=>array('pipe', 'w')), $pipes);
          fwrite($pipes[0], $input);fclose($pipes[0]);
          $stdout=stream_get_contents($pipes[1]);fclose($pipes[1]);
          $stderr=stream_get_contents($pipes[2]);fclose($pipes[2]);
          $rtn=proc_close($proc);
          return array('stdout'=>$stdout,
                       'stderr'=>$stderr,
                       'return'=>$rtn
                      );
         }
var_export(my_exec('echo -e $(</dev/stdin) | wc -l', 'h\\nel\\nlo'));
?>

For example, "echo shell_exec('ls');" will get nothing output,
"my_exec('ls');" will get "sh: ls: command not found",
"my_exec('/bin/ls');" will maybe get "sh: /bin/ls: Permission denied",
and the permission may be caused by selinux.

another reason to use shell_exec instead of system is when the result is multiple lines such as grep or ls

<?php

// this correctly sets answer string to all lines found
//$answer = shell_exec ("grep 'set of color names' *.php ");
//echo "answer = $answer";

// this passes all lines to output (they  show on page)
// and sets answer string to the final line
$sys = system ("grep 'set of color names' *.php ");
echo "sys =(($sys))";

?>

here is view/source resulting from system call

setprefs.php:// The standard set of color names is:
setprefs.php:// Most browsers accept a wider set of color names
silly.php:  //$answer = shell_exec ("grep 'set of color names' *.php ");
silly.php: $sys = system ("grep 'set of color names' *.php ");
sys =((silly.php: $sys = system ("grep 'set of color names' *.php ");))

and here is view source from using shell_exec instead

answer = setprefs.php:// The standard set of color names is:
setprefs.php:// Most browsers accept a wider set of color names
silly.php:  $answer = shell_exec ("grep 'set of color names' *.php ");
silly.php:// $sys = system ("grep 'set of color names' *.php ");































print_r($argv);
print_r($argc);


start:

print("Введите номер записи и нажмите Enter. \n Номер записи: ");
$stdin = fopen("php://stdin", "r");
$record_num = fgets($stdin);
fclose($stdin);
print_r("Введите номер: " . $record_num);

goto start;
*/


?>