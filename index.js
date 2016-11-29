	function $(a){
		return document.getElementById(a);
	}
	function add0(n){
		return  n<10 ? "0"+n : ""+n;
	}
	//功能函数
	var clock = $("clock");
	var week = $("week");
	var date = $("date");
	var pre = $("pre");
	var next = $("next");
	var good = $("good");
	var icon = $("icon");
	var set = $("set");
	var setBtn = $("setBtn");
	var YEAR = $("YEAR");
	var MONTH = $("MONTH");
	var DATE = $("DATE");
	var HOUR = $("HOUR");
	var MINUTE = $("MINUTE");
	var btn = setBtn.getElementsByTagName('span');
	var li = date.getElementsByTagName('li');
	var arr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var d = new Date();//
	//获取元素
	var timer =setInterval(function(){
		d = new Date(d.getTime() + 1000);
		clock.innerHTML =add0(d.getHours())+":"+add0(d.getMinutes())+":"+add0(d.getSeconds());
	},1000) //生成时钟

	var str = "";
	for (var i = 0; i < arr.length; i++) {
		str +="<li>"+arr[i]+"</li>"
	}
	week.innerHTML = str;//生成星期几

	function goodDay(year,month,theDay){
	    var time = new Date(year,month,1);
	    var week = time.getDay();
	    var month = time.getMonth();
	    time.setMonth(month+1);
	    time.setDate(0);
	    var len = time.getDate();
	    time.setMonth(month-1);
	    time.setDate(0);
	    var length= time.getDate();
	    var today = new Date().getDate();//获取week，今天日期，这个月总天数,上个月的总天数
	    var abc = "";
	    for (var i = 0; i < week; i++) {
	    	abc +="<li style='color:#66f57d;'>"+(length-week+i+1)+"</li>"
	    }
	    for (var i = 1; i < len+1; i++) {
	    	var a = new Date();
	    	if(M-1 != a.getMonth()){
	    		today = 1;
	    	}//当前的月份和变化的月份不一致时，日期指定为一号
	    	if(theDay){
	    		if (theDay==today) {//判断设置日期是否是当前日期
	        		if (i==today) {
	        		abc +="<li style='background:#fff558;color:#29396a;'>"+i+"</li>"
		        	}else{
		        		abc +="<li>"+i+"</li>"
		        	}
	        	}else{
	        		if (i==theDay) {
	        		abc +="<li style='background:#fff558;color:#29396a;'>"+i+"</li>"
		        	}else{
		        		abc +="<li>"+i+"</li>"
		        	}
	        	}
	    	}else{
	    		if (i==today) {
	    		abc +="<li style='background:#fff558;color:#29396a;'>"+i+"</li>"
	        	}else{
	        		abc +="<li>"+i+"</li>"
	        	}
	    	}
	    }
	    for (var i = len+week; i < 6*7; i++) {
	    	abc +="<li style='color:#66f57d;'>"+(i-len-week+1)+"</li>"
	    }
	    date.innerHTML=abc;//生成日历结构
	}
	var Y = d.getFullYear();
	var M = d.getMonth()+1;
	var D = d.getDate();
	var H = d.getHours();
	var m = d.getMinutes();
	good.innerHTML = Y+"年"+M+"月";
	goodDay(Y,M-1);//初始化页面
	pre.onclick = function(){
	    M--;
		if(M<1){
			d.setMonth(-1);//设置到上一年
			M=12;
		}
		good.innerHTML =d.getFullYear()+'年'+M+'月';
		goodDay(d.getFullYear(),M-1);//刷新页面
	}
	next.onclick= function(){
		M++;
		if(M>12){
			d.setMonth(M);//设置到下一年
			M=1;
		}
		good.innerHTML =d.getFullYear()+'年'+M+'月';
		goodDay(d.getFullYear(),M-1);//刷新页面
	}//跳转年月
	function list(start,end,now){
		var con = "";
		for( var i = start; i >= end; i-- ){
			if( i === now){
				con += "<option value='"+i+"' selected>"+i+"</option>";
			}else{
				con += "<option value='"+i+"'>"+i+"</option>";
			}
		}
		return con;
	}
	function content(){
		YEAR.innerHTML = list(2020,1970,Y);
		MONTH.innerHTML = list(12,1,M);
		DATE.innerHTML = list(31,1,D);
		HOUR.innerHTML = list(23,0,H);
		MINUTE.innerHTML = list(59,0,m);
	}
	content();
	//生成具体的下拉select列表,默认当前的时间
	btn[1].onclick = function(){
		icon.style.display ="block";
	    set.style.display ="none";
	    d.setFullYear(YEAR.value);
		d.setMonth(MONTH.value);
		d.setDate(DATE.value);
		d.setHours(HOUR.value);
		d.setMinutes(MINUTE.value);
		good.innerHTML =d.getFullYear()+'年'+d.getMonth()+'月';
		goodDay(d.getFullYear(),d.getMonth()-1,d.getDate());//更改年月日
	}
	//更改设置时间
	icon.onclick = function(){
	    icon.style.display ="none";
	    set.style.display ="block";
	}
	btn[0].onclick = function(){
		icon.style.display ="block";
	    set.style.display ="none";
	    content();//每次进入更新设置页面
	}
	//显示和隐藏设置框
