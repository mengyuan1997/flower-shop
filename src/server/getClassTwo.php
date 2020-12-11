<?php
// $one = $_GET['class_one']
$one = $_GET['classOne'];
// echo json_encode('$one')
// 一级分类直接查询数据库进行返回
$link = mysqli_connect('127.0.0.1','root','root','shop');
$sql = "SELECT `class_two` FROM `goods` WHERE `class_one`='$one' GROUP BY `class_two` ";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "message" => "二级分类获取成功",
    "code" => 1,
    "list" => $data
))

?>