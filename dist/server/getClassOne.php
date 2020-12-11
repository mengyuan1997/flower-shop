<?php
// 一级分类直接查询数据库进行返回
$link = mysqli_connect('127.0.0.1','root','root','shop');
$sql = "SELECT `class_one` FROM `goods` GROUP BY `class_one` ";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "message" => "一级分类获取成功",
    "code" => 1,
    "list" => $data
))

?>