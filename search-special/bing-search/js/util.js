/**
  * @Author: Who am I ?
  * @Theme: 搜索框的Ajax应用-js实现
  * @Time: 2016-07-25
  * @Issue: 1. 键盘回车执行问题
  *			2. jsonp 学习
  */

alert("搜索框的Ajax应用-js实现");

// 获取DOM元素
var getId=function (id) {
	return document.getElementById(id);
};
// 事件绑定
var addHandler=function (ele,ev,fn) {
	
	if (ele.addEventListener) {
		ele.addEventListener(ev,fn,false);
	}
	else if (ele.attachEvent) {
		ele.attachEvent('on'+ev,fn);
	}
	else {
		ele['on'+ev]=fn;
	}
};
// 阻止冒泡
var stopBubble=function (ev) {
	if (ev.stopPropagation) {
		ev.stopPropagation();
	}
	else {
		ev.cancelBubble=true;
	}
};
// Ajax 应用
var addAjax=function (method,_url,callBack) {
	var xhr=null;
	if (window.XMLHttpRequest) {
		xhr=new XMLHttpRequest();
	}
	else {
		xhr=new ActiveXObject("Msxml2.XMLHTTP");
	}

	
	xhr.open(method,_url,true); // true 为 异步
	xhr.send(null); // send(string)
	addHandler(xhr,'readystatechange',function () {
		if (xhr.readyState==4 && xhr.status==200) {
		    console.log(xhr.responseText);
			callBack(JSON.parse(xhr.responseText)); //JSON.parse(xhr.responseText);
		}
	});
};

// 输入框获取焦点时，启动蒙版
var mask=getId("mask");
var search=getId("search-input");
var submit=getId("submit-input");
var list=getId("list-box");

// 触发事件
addHandler(search,'focus',function () {
	mask.className="mask";
});
// 失去焦点
addHandler(search,'blur',function () {
	mask.className="";
});



// 键盘事件
addHandler(search,'keyup',function (event) {
	var txt=search.value;
	var html="";
	var href="";
	var url='http://api.bing.com/qsonhs.aspx?q=';
	var cors='https://crossorigin.me/'; // 跨域
	var link='https://cn.bing.com/search?q='+txt+'&qs=HS&pq=1&sc=8-1&sp=1&cvid=F6806BBE659F449291BB6DDB847E1326&FORM=QBLH';
	// onKeyDown(event);
	addHandler(submit,'click',function () {
		window.location.href=link;
	});
	console.log(cors+url+txt);
	addAjax('get',cors+url+txt,function (d) {
		var json=d.AS.Results[0].Suggests;
		for (var i=0,len=json.length;i<len;i++) {
			href='https://cn.bing.com/search?q='+json[i].Txt+'&qs=HS&pq=1&sc=8-1&sp=1&cvid=F6806BBE659F449291BB6DDB847E1326&FORM=QBLH';
			html+="<li><a href="+href+">"+json[i].Txt+"</a></li>";
		}
		list.innerHTML=html;
		list.style.display='block';
	});
});



// enter
function onKeyDown(e){ //键盘监听器
	if (!e)  e = window.event;
    var keycode = e.which ? e.which : e.keyCode; console.log(keycode);
    switch (keycode){    
    	case 13://enter键
        	console.log(keycode);
            break;
        case 38://上键
            console.log(keycode);
            break;
        case 40://下键
            console.log(keycode);
            break;
        default:
            console.log("error");
            break;
    }
}           