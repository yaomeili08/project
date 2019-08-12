<?php  header("Content-Type:text/html; charset=utf8");
    $link = mysqli_connect("127.0.0.1", "root", "", "guomei");
	$data = file_get_contents("../json/lou01.json");
	$arr = json_decode($data,true);
    //print_r($arr);
	//echo json_encode($arr[0]["hideli"]);
	for($i= 0 ; $i < count($arr);$i++){
		 $title= $arr[$i]["title"];
         $nav = implode(",",($arr[$i]["nav"])); 
      //数组作为字段存入数据库先转为json数据 渲染是时再解码
         $imgl = $arr[$i]["imgl"];
         $ptex = implode(",",$arr[$i]["ptex"]); 
         $ulleft = json_encode(urlencode($arr[$i]["ulleft"])); 
         print_r($ulleft);      
         $banner = json_encode($arr[$i]["banner"]);
         $showli = json_encode($arr[$i]["showli"]);
         $hideli = json_encode($arr[0]["hideli"]);
        
        $sql = "INSERT INTO `guomei`.`lou01` (`title`, `nav`, `imgl`, `ptex`, `ulleft`, `banner`, `showli`, `hideli`) VALUES ('$title', '$nav', '$imgl', '$ptex', '$ulleft', '$banner', '$showli','$hideli')";
        //mysqli_query($link, $sql);
	}
?>