<?php
  header("Content-Type:application/json;charset=utf-8");
  //1:获取用户编号 uid  11:30--11:40
  @$uid = $_REQUEST['uid']or die("-1");
  //2:连接数据库
  require('init.php');
  //3:发送sql
    $sql = "SELECT c.id,p.pname,p.pic,p.price,c.count
	FROM  jd_cart c,jd_product p
	WHERE c.productid=p.pid
	AND   c.uid = $uid";
	$result = mysqli_query($conn,$sql);
  //4:抓取所有记录行并且转换json
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
  //5:发送json字符串
    $str = json_encode($rows);
	echo $str;
	?>