<?php   header("Content-Type:text/html; charset=utf8");
    $link = mysqli_connect("127.0.0.1", "root", "", "guomei");
	$data = file_get_contents("../json/youlike.json");
	$arr = json_decode($data,true);
	print_r($arr);
	for($i = 0; $i < count($arr);$i++){
		$img = $arr[$i]["img"];
		$title = $arr[$i]["title"];
		$price = $arr[$i]["price"];
		$sql = "INSERT INTO `guomei`.`youlike` (`git`, `img`, `price`, `title`) VALUES ('$i', '$img', '$title', '$price')";
	   mysqli_query($link, $sql);
	}
?>