<?php
  $username = isset($_POST["username"])? $_POST["username"] : "" ;
  $password = isset($_POST["password"])? $_POST["password"] : "" ;
  
  //连接数据库并进行查找
  $com = mysqli_connect("127.0.0.1","root","","guomei");
  
  //通过查找用户名
  $sql = "SELECT * FROM  `resgister` WHERE  `uesrname`  LIKE '$username'";
  //通过查找手机号
//$sql2 = "SELECT * FROM  `resgister` WHERE  `phone`  LIKE '$uesrname'  ";
   
  $data = array("status" => "", "msg" => "", "data" => "");
     
  //执行命令
  $result = mysqli_query($com,$sql);
   //数据是否存在
  if(mysqli_num_rows($result) == "0"){
  	 $data["status"] = "error";
     $data["msg"] = "登录失败：该用户不存在";
  }
  echo $data["msg"];
  //echo json_echode($data,true);
//else
//{
  	/* 检查密码是否正确 */
//if( mysqli_fetch_array($result)["password"] != $password)
// {
//  $data["status"] = "error";
//  $data["msg"] = "登录失败：密码不正确！";
//}
//else{
//  $data["status"] = "success";
//  $data["msg"] = "登录成功！";
// }
//}
//echo json_echode($data,true);
?>