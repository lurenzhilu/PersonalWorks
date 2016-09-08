/**
  * @Time: 2016-09-06
  * @Author: Who am I ?
  * @Theme: calculator
  */
  
// param:ele,eventType,callback
function bindEvent(ele,eventType,callback) {
    if (typeof ele.addEventListener==='function') {
        ele.addEventListener(eventType,callback,false);
    } else if (typeof ele.attachEvent==='function') {
        ele.attachEvent('on'+eventType,callback);
    } else {
        ele['on'+eventType]=callback;
    }
}
// param:str,eq
function getDom() {
    var str="",eq=0;
    str=arguments[0];
    eq=arguments[1];
    if (arguments.length===1) {
        return document.querySelector(str);
    } else if (arguments.length===2) {
        if (eq==="all") {
            return document.querySelectorAll(str);
        } else {
            return document.querySelectorAll(str)[eq];
        }
    } else {
        alert("格式不对或不支持querySelectorAll/querySelector");
    }
}
// 浮点运算
function calc(str) {
    var n=0,
        m=0,
        maxLen=0;
    var arrMatch=[];
    var arrLen=[];
    var res;

    str.replace(/(\d*[\.]?\d+)/g,function (match,p1) {
        arrMatch.push(p1);
        n=p1.indexOf(".");
        m=n===-1?0:p1.substring(n+1).length;
        arrLen.push(m);
        maxLen=Math.max.apply(null,arrLen);
    });
    try {
        res=eval(str).toFixed(maxLen);
    } catch(er) {
        res=er;
    }
    return res;
}

function init() {
    var operatorBox=getDom(".operatorbox",0);
    var screen=getDom(".screen",0);
    var screenAC=getDom(".screenbox .clear",0);
    var screenInput=getDom(".result",0);
    var scrollBox=getDom(".scrollbox",0);
    var eles=getDom(".operatorbox>div","all");
    var AC=getDom(".operatorbox .clear",0);
    var result;
    var expression;
    var str;
    var n=1;
    
    for (var i=0,len=eles.length;i<len;i++) {
        // ontouchstart
        	bindEvent(eles[i],'touchstart',function (ev) {
            ev.preventDefault();           
            this.className+=" active";
            var lenTouch=ev.touches.length;
            window.document.title="touchstart"+lenTouch+"个指头";
        });
        // ontouchend
        bindEvent(eles[i],'touchend',function () {
            this.className=this.className.replace(" active","");
            window.document.title="touchend";
        });
        	
    }
    
    
    bindEvent(operatorBox,'touchend',function (ev) {
        scrollBox.appendChild(screenAC);
        scrollBox.appendChild(screenInput);
        screen.scrollTop=scrollBox.offsetHeight-screen.offsetHeight;
        screenAC.style.cssText=";display:none;";
        screenInput.style.cssText=";display:block;";
        var ev=ev?ev:window.event;
        var target=ev.target || ev.srcElement;    
        if (target.nodeName==="DIV") {
        	screenInput.innerHTML+=target.innerHTML;
        	expression=screenInput.innerHTML.replace(/×/g,"*").replace(/÷/g,"/+").replace(/=/g,"").replace(/％/g,"*0.01").replace(/del/g,"").replace(/<br>/g,"").replace(/AC|C/g,"");
        	str=screenInput.innerHTML.replace(/del/g,"").replace(/<br>/g,"").replace(/AC|C/g,"")+"";
        	if (target.className==="equal") {
        			AC.innerHTML="AC";
        		 result=calc(expression);
        			var screenOutput=document.createElement("p");
        			screenOutput.className="output";
        			screenOutput.innerHTML=screenInput.innerHTML+"<br>"+result;
        			scrollBox.appendChild(screenOutput);
        			screenInput.innerHTML="";
        			screen.scrollTop=scrollBox.offsetHeight-screen.offsetHeight;
        		
        		
        	}
        	if ((/\d/g).test(target.innerHTML)) {
        	    AC.innerHTML="C";
        	} 
        	if (target.innerHTML==="C") {
        		screenInput.innerHTML="";
        		screenAC.style.cssText=";display:block;";
        		screenInput.style.cssText=";display:none;";
        		screen.scrollTop=scrollBox.offsetHeight-screen.offsetHeight;
        	}
        	if (target.innerHTML==="AC") {
        	   screenInput.innerHTML="";
        	            		scrollBox.innerHTML='<p class="clear"></p><p class="result" style="display:none;"></p>';
        	}
        	if (target.innerHTML==="del") {
        		console.log(str);
        		screenInput.innerHTML=str.substring(0,str.length-1);
        		screenAC.style.cssText=screenInput.innerHTML===""?"display:block":"display:none";
        		screenInput.style.cssText=screenInput.innerHTML===""?"display:none":"display:block";
        	}
        }

    });

}

bindEvent(window,'load',init);