<?php
$show = $_GET['show'];
// echo json_encode($classOne);
$link = mysqli_connect('127.0.0.1','root','root','shop');
$sql = "SELECT * FROM `goods` WHERE  `show`='$show' ";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "message" => "信息获取成功",
    "code" => 1,
    "list" => $data
  ));
?>