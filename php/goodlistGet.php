<?php   header("Content-Type:text/html; charset=utf8");

$con = mysqli_connect("127.0.0.1", "root", "", "guomei");
# 查询获取表中的所有内容
// $sql = "SELECT * FROM goods";

// 查询表中的前20条数据
$page = $_REQUEST["page"] * 24;
$type=  $_REQUEST["type"];

if($type == "default")
{
  $sql = "SELECT * FROM `goodlist` order by `git` limit $page,24";

}else if($type == "low")
{
  // 按照价格从高到低排序
  $sql = "SELECT * FROM `goodlist` ORDER BY `price` DESC limit $page,24";

} else if ($type == "hight") {

  // 按照价格从低到高进行排序
  $sql = "SELECT * FROM `goodlist` ORDER BY `price` ASC limit $page,24";
}

// 查询表中的数据(按照某个字段排序)
$result = mysqli_query($con,$sql);

// 把数组中的数组转换为数组
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC), true);




?>