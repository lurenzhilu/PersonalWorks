/**
  * @Author: Who am I ?
  * @Theme: 搜索框的Ajax应用-js实现
  * @Time: 2016-07-25
  */

alert("搜索框的Ajax应用-jquery实现");

// 获得焦点
$("#search-input").bind('focus',function () {
	$("#mask").addClass("mask");
});
// 失去焦点
$("#search-input").bind('blur',function () {
	$("#mask").removeClass();
});


// 获取远程数据 json
$("#search-input").bind('keyup',function () {
	var $txt=$(this).val();
	var link='https://cn.bing.com/search?q='+$txt+'&qs=HS&pq=1&sc=8-1&sp=1&cvid=F6806BBE659F449291BB6DDB847E1326&FORM=QBLH';
	var url='https://crossorigin.me/http://api.bing.com/qsonhs.aspx?q=';
	var html='';
	var href='';

	$("#submit-input").bind('click',function () {
		window.location.href=link;
	});
	
	$.get(url+$txt,function (d) {
		//var t=JSON.parse(d);
		var d=d.AS.Results[0].Suggests;
		for (var i=0,len=d.length;i<len;i++) {
			href='https://cn.bing.com/search?q='+d[i].Txt+'&qs=HS&pq=1&sc=8-1&sp=1&cvid=F6806BBE659F449291BB6DDB847E1326&FORM=QBLH';
			html+='<li><a href='+href+'>'+d[i].Txt+'</a></li>';
			
		}
		console.log(html);
		$("#list-box").html(html);
		$("#list-box").css({"display":"block"});
	});
});