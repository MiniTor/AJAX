<?php
  header("Content-Type:text/plain;charset=utf-8");
  //获取参数  uid 用户编号 pid 产品编号
  @$uid = $_REQUEST['uid']or die("-1");
  @$pid = $_REQUEST['pid']or die("-2");
  require('init.php');
  //第一步:查询指定用户和商品是否存在
  //       购物车中
  $sql = "SELECT * FROM jd_cart";
  $sql .=" WHERE uid=$uid AND productid=$pid";
  $result = mysqli_query($conn,$sql);
  $row = mysqli_fetch_assoc($result);
  $count = 0;
  if($row===null){
    $sql = "INSERT INTO jd_cart ";
	$sql .= "VALUES(null,$uid,$pid,1)";
    $result = mysqli_query($conn,$sql);
	$count = 1;
  }else{
    $sql = "UPDATE jd_cart SET count=count+1";
	$sql .= " WHERE uid=$uid AND productid=$pid";
	$result = mysqli_query($conn,$sql);
	$count = $row['count']+1;
  }
  echo $count;
  //第二步:如果不存在 添加记录
  //第三步:如果存在   更新记录
  //第四步:输出购买数量
?>