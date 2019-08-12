<?php  header("Content-Type:text/html; charset=utf8");
     $com = mysqli_connect("127.0.0.1","root","","guomei");
     $sql = "SELECT * FROM `lou01`";
     $result = mysqli_query($com,$sql);
     $arr = mysqli_fetch_all($result, MYSQLI_ASSOC);
    // print_r($arr);
     echo json_encode($arr,true);
?>