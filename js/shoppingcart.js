$(function(){

   //1:加载头和尾内容
   //加载头文件 header.php
   //加载脚文件 footer.php
   $("#header").load("data/header.php");
   $("#footer").load("data/footer.php");
 
   //模块四:页面加载后，异步请求当前
   //登录用户购物车中商品信息.
   $.ajax({
      url:"data/cart_list.php",
	  data:{uid:getCookieVal("uid")},
	  success:function(data){
       var html = "";
	   for(var i=0;i<data.length;i++){
		   var obj = data[i];
	   html += `
              <tr>
                    <td>
                        <input type="checkbox"/>
                        <input type="hidden" value="${obj.pid}" />
                        <div><img src="${obj.pic}" alt=""/></div>
                    </td>
                    <td><a href="">${obj.pname}</a></td>
                    <td>${obj.price}</td>
                    <td>
                        <button>-</button>
		                <input type="text" value="${obj.count}"/>
		                <button>+</button>
                    </td>
                    <td><span>￥${obj.price*obj.count}</span></td>
                    <td><a href="${obj.id}">删除</a></td>
                </tr>
	   `;
	   }
	   $("#cart tbody").html(html);
	  },
	  error:function(){
	  }
   
   });

    


   //模块五:为删除按钮绑定事件监听,
   //实现删除购物车选项功能
   $("#cart tbody").on("click",
	   "a:contains('删除')",
       function(e){//14:37--14:47
	   //1:阻止事件默认行为
	   e.preventDefault();
	   //2:获取当前购物项id
	   var did = $(this).attr("href");
	   //3:留存this<-->a
       var that = this;   //that<--->a
	   //4:发送ajax请求 cart_del.php 14:58--15:10
	   $.ajax({
	      type:"POST",
		  url:"data/cart_del.php",
		  data:{id:did},
		  success:function(data){
               if(data.code<0){
				   alert("删除失败:原因"+data.msg);
			   }else{
			       alert("删除成功");
                   $(that).parent().parent().remove();
			   }
		  },
		  error:function(){
			  alert('删除失败,请检查网络');
		  }
	   });
	   //5:data.code<0
	   //6:data.msg 错误信息
	   //7:data.code>0 删除当前元素a->td->tr
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