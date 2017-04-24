$(function(){
	//15:40---15:55 练习
   //第一个模块用户登录
   //1:创建二个全局变量保存用户名和密码
   //  周一我们改cookie保存
   //var uname = null;
   //var upwd = null;
   //2:为登录信息按钮绑定点击事件
   $("#bt-login").click(function(){
     //3:获取用户名和密码
	 var u = $("#uname").val();
	 var p = $("#upwd").val(); 
     //4:发送ajax请求
	 $.ajax({
	      type:'GET',
		  url:'data/login_do_02.php',
          data:{uname:u,upwd:p},
		  success:function(data){
           var rs = parseInt(data);
		   if(rs<0){
		     $("p.alert").html("用户名或密码有误");
		   }else{
		     $(".modal").hide();
             //升级增加功能:!!!!!
			 //1:登录成功,将uid保存cookie
			 //2:         将uname保存cookie
             document.cookie = 'uid='+data;
			 document.cookie = 'uname='+u;
		   }
		  },
		  error:function(){
			  alert("响应消息有错！请检查网络");
		  }
	 });
     //5:成功隐藏登录框    欢迎回来??
     //6:将用户名和密码保存全局变量中
     //7:如果请求失败提示   
   });





   //模块二:产品列表
   loadPage(2);
   function loadPage(page){
   $.ajax({
      url:'data/product_list.php?pageNo='+page,
	  success:function(data){
		var html = "";
		for(var i=0;i<data.length;i++){
			var obj = data[i];
            html += `
			<li>
				<a href=""><img src="${obj.pic}" alt=""/></a>
				<p>￥${obj.price}</p>
				<h1><a href="">${obj.pname}</a></h1>
				<div>
					<a href="#" class="contrast"><i></i>对比</a>
					<a href="#" class="p-operate"><i></i>关注</a>
					<a href="${obj.pid}" class="addcart"><i></i>加入购物车</a>
				</div>
			</li>			 	
			`;
		}
        $("#plist ul").html(html);
	  },
	  error:function(){
	      alert("请求商品列表出错,请检查网络");
	  }
   });
   }



   //加载头文件 header.php
   //加载脚文件 footer.php
   $("#header").load("data/header.php");
   $("#footer").load("data/footer.php");
 




   //功能三模块:为每个商品下面"添加购物车"
   //按钮绑定点击事件
   //!!为什么要使用代理事件
   //所有元素动态通过AJAX添加
   $("#plist").on('click','a.addcart',function(e){
	   e.preventDefault();
	   var pid = $(this).attr("href");
	   //把当前登录用户编号+商品编号
	   //发送服务器,执行添加操作 10:30--10:35
	   $.ajax({
	     'type':'POST',
		 'url':'data/add_cart.php',
		 data:{uid:getCookieVal("uid"),pid:pid},
		 success:function(data){
           if(data>0){
		      alert("添加成功!该商品己购买"+data);
		   }else{
		      alert("添加失败");
		   }
		 },
	     error:function(){
			 alert("添加商品出错，请检查网络");
		 }
	   });
   });




 //功能3.1模块:点击"去购物车结束"
 //绑定事件监听
 //错误..
 //原因:事件绑定时，元素不存在
 //$("#settle_up").click(function(){
 //});
 $(document.body).on("click","#settle_up",function(){
   //跳转购物车详情页面
   location.href = 'shoppingcart.html';
 });




  //分页处理:
  //1:绑定点击事件 父pager
  //2:子元素a <a>1</a>  17:45---17:55代码
  //样式切换...
  $("ol.pager a").click(function(e){
      e.preventDefault();
	  //3:获取页数 1 2 3
      var p = $(this).html();
      //4:发送ajax loadPage(2);
	  loadPage(p);
  });







});



function getCookieVal(key){
//1:创建变量保存最终返回结果值
//  初始null;
var rs = null;
//2:按照;拆分cookie中字符串
//  ["uid=10","uname=qiangdong"]
var line = document.cookie;
var arr = line.split(";");
//3:循环数组中每一个键值
for(var i=0;i<arr.length;i++){
 var kv = arr[i];
 //4:按照=拆分  16:32--16:36
 var option = kv.split("=");
 //5:下标0 k   trim()去除字符串前后空格
 var k = option[0].trim();
 var v = option[1];
 //6:下标0 v
 //7:判断如果参数中指定key == k
 if(key===k){
  //8:返回v
	return v;
 }
}
 //9:否则返回 null
 return rs;
}