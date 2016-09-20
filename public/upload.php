<?php

if(isset($_FILES["file"])){
    $dir = 'assets/';
    $blob = file_get_contents($_FILES["file"]["tmp_name"]);
    var_dump($blob);
    file_put_contents($dir.$_FILES["file"]["name"], $blob);
}