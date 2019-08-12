<?php   header("Content-Type:text/html; charset=utf8");
   $goodgit1 = $_REQUEST["goodgit"];
   $com = mysqli_connect("127.0.0.1","root","","guomei");
   //通过查找用户名
   $sql = "SELECT * FROM  `goodlist` WHERE  `git`  LIKE '$goodgit1'";
   //执行命令
  $result = mysqli_query($com,$sql); 
  echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC), true);
 
 

?>