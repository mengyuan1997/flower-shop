<?php
$username = $_POST['username'];
$password = $_POST['password'];
// echo json_encode($username);
// 连接数据库进行查询
$link = mysqli_connect('127.0.0.1','root','root','shop');
$sql = "INSERT INTO `user`(`username`,`password`) VALUE($username,$password)";
$res = mysqli_query($link,$sql);

echo json_encode(array(
    "message" => "注册成功",
    "username" => $username
    
));


?>