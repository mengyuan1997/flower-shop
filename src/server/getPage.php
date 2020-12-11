<?php
// 接受参数
$one = $_GET['class_one'];
$two = $_GET['class_two'];
$pagesize = $_GET['pagesize'];

// 设置sql语句
$sql = "SELECT * FROM `goods` WHeRE `class_one`='$one'";
if($two != 'all')$sql .= " AND `class_two`='$two'";
$link = mysqli_connect('127.0.0.1','root','root','shop');
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

$number = ceil(count($data) / $pagesize);

echo json_encode(array(
    "message" => "获取数据成功",
    "code" => 1,
    "number" => $number
));


?>