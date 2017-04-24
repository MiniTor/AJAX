<?php
header("Content-Type:application/json;charset=utf-8");
//a:获取删除购物项id值 14:25---14:30
@$id = $_REQUEST['id']or 
die('{"code":-1,"msg":"删除编号不能为空"}');
//b:连接数据
require('init.php');
//c:发送sql删除 
$sql = "DELETE FROM jd_cart WHERE id=$id";
$result = mysqli_query($conn,$sql);
echo '{"code":1,"msg":"删除成功"}';
?>