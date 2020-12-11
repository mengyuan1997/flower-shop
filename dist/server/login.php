<?php
// 先接受前端传输的信息，然后连接数据库，在进行查找，看数据库里面是否否该信息
$username = $_POST['username'];
$password = $_POST['password'];



// 连接数据库进行查询
$link = mysqli_connect('127.0.0.1','root','root','shop');
$sql = "SELECT * FROM `user` WHERE `username`='$username' AND `password`='$password'  ";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);

if(count($data)){
    echo json_encode(array(
        "message" => "登陆成功",
        "code" => 1,
        "nickname" => $data[0]['nickname']
    ));
}else{
    echo json_encode(array(
        "message" => "登陆失败",
        "code" => 0,
        
    ));
}


?>