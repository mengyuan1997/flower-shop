<?php
$one = $_GET['class_one'];
$two = $_GET['class_two'];
$method = $_GET['sort_method'];
$price = $_GET['sort_price'];
$current = $_GET['current'];
$pagesize = $_GET['pagesize']; 

// 组装sql语句
$sql = "SELECT * FROM `goods` WHeRE `class_one`='$one'";
if($two != 'all')$sql .= " AND `class_two`='$two'";
if($method == '价格')$sql .= " ORDER BY `price` $price";


$start = ($current - 1) * $pagesize;
$sql .= " LIMIT $start, $pagesize";

$link = mysqli_connect('127.0.0.1','root','root','shop');
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "message" => "获取商品成功",
    "code" => 1,
    "list" => $data
));
?>