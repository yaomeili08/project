<?php
    $com = mysqli_connect("127.0.0.1","root","","guomei");
    $sql = "SELECT * FROM `youlike`";
    $result = mysqli_query($com,$sql);
    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC),true);
?>