<?php  header("Content-Type:text/html; charset=utf8");
  $con = mysqli_connect("127.0.0.1", "root", "", "guomei");
  
  $sql = " SELECT * FROM  `goodlist` ";
  
  $result = mysqli_query($con,$sql);
  if(!$result){
  	$data = array("status" => "error" , "msg" => "请求失败");
  	 echo json_encode($data, true);
  }
  else{
  $size = 24;
  $count = ceil(mysqli_num_rows($result) / $size);
  $data = array("status" => "success", "msg" => "请求成功","data"=>array("count"=>$count));
  echo json_encode($data, true);
 // echo '<br>';
  //echo $count;
}
?>