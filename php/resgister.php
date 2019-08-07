<?php 	
 //连接服务器
   $com = mysqli_connect("127.0.0.1","root","","guomei");
   $username = isset($_POST["username"])? $_POST["username"] : "" ;
   $password = isset($_POST["password"])? $_POST["password"] : "" ;
   $phone = isset($_POST["phone"])? $_POST["phone"] : "" ;
   $email = isset($_POST["email"])? $_POST["email"] : "" ;
   $sql = "INSERT INTO  `guomei`.`resgister` (
`uesrname` ,
`password` ,
`phone` ,
`email`
)
VALUES (
'$username',  '$password',  '$phone',  '  $email'
)";
//插入数据库
$result = mysqli_query($com,$sql);
$data = array("status"=>"", "msg"=>"", "data"=>"");
if($result)
{
  $data["status"] = "success";
  $data["msg"] = "恭喜你，注册成功！";
}else{
  $data["status"] = "error";
  $data["msg"] = "抱歉，用户名或者手机号码已经被注册了！";
}
echo json_encode($data,true);

 
    
?> 