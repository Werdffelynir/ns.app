<?php

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>


<form name="upload">
    <input type="file" name="myfile">
    <input type="submit" value="Загрузить">
</form>

<script>
    document.forms.upload.onsubmit = function() {
        var input = this.elements.myfile;
        var file = input.files[0];
        if (file) {
            upload(file);
        }
        return false;
    };

    function upload(file) {

        var xhr = new XMLHttpRequest();

        // обработчик для закачки
        xhr.upload.onprogress = function(event) {
            console.log(event.loaded + ' / ' + event.total);
        };

        // обработчики успеха и ошибки
        // если status == 200, то это успех, иначе ошибка
        xhr.onload = xhr.onerror = function(event) {
            if (this.status == 200) {
                console.log("success: ", xhr.responseText);
            } else {
                console.log("error: " + this.status);
            }
        };

        xhr.open("POST", "demo_upload_file.php", true);
        xhr.send(file);

    }


</script>
</body>
</html>