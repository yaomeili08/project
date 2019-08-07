<?php  header("Content-Type:text/html; charset=utf8");
	
// $uesrname = isset($_POST["username"])? $_POST["username"] : "" ;
// $password = isset($_POST["password"])? $_POST["password"] : "" ;
   
   // username=56566&password=jjhjjk
   $usernameA = $_REQUEST["username"];
   $passwordA = $_REQUEST["password"];
// echo $usernameA;
// echo $passwordA;
 
//连接数据库并进行查找
$com = mysqli_connect("127.0.0.1","root","","guomei");

//通过查找用户名
$sql = "SELECT * FROM  `resgister` WHERE  `uesrname`  LIKE '$usernameA'";
//执行命令
$result = mysqli_query($com,$sql); 
//
$data = array("status"=>"", "msg"=>"", "data"=>"");
$psw = mysqli_fetch_array($result);
 //数据是否存在
if(mysqli_num_rows($result) == "0"){
	 $data["status"] = "error";
     $data["msg"] = "登录失败：该用户不存在";
}else{
   /*密码是否正确 */
  if($psw["password"] != $passwordA)
  {
    $data["status"] = "error";
    $data["msg"] = "密码不正确！";
  }else{
    $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
  }
}
echo json_encode($data,true);
?>