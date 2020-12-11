<?php
// 接收前面的id
$id = $_GET['shop_id'];

// 连接数据库进行查找
$link = mysqli_connect('127.0.0.1','root','root','shop');
$sql = "SELECT * FROM `goods` WHERE `id`=$id";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "message" => "商品获取成功",
    "code" => 1,
    "shop" => $data[0]
));



?>