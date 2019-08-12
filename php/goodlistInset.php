<?php header("Content-Type:text/html; charset=utf8");
	
	$link = mysqli_connect("127.0.0.1", "root", "", "guomei");
	$data = file_get_contents("../json/goodlistmi2.json");
	$arr = json_decode($data,true);
	//$num = Count($arr);
    //echo $num;
 for($i = 0; $i < count($arr);$i++){
	  $title= $arr[$i]["title"];
      $bigimg = $arr[$i]["bigimg"];
      //数组作为字段存入数据库先转为json数据 渲染是时再解码
      $imglist = json_encode($arr[$i]["imglist"]);
      $price = $arr[$i]["price"];
      $tex = $arr[$i]["tex"];
      $shop = $arr[$i]["shop"];
      $juan = $arr[$i]["juan"];
      
     $sql = "INSERT INTO `guomei`.`goodlist2` (`git`, `title`, `bigimg`, `imglist`, `price`, `tex`, `shop`, `juan`) VALUES ('$i', '$title', '$bigimg', '$imglist', '$price', '$tex', '$shop','$juan')";
    mysqli_query($link, $sql);
    }
?>
