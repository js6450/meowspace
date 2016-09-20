<?php
//
//if(isset($_FILES["file"])){
//    $dir = 'assets/';
//    $blob = file_get_contents($_FILES["file"]["tmp_name"]);
//    var_dump($blob);
//    file_put_contents($dir.$_FILES["file"]["name"], $blob);
//}

$target_dir = "assets/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

echo $imageFileType;
