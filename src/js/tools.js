//ajax请求函数
function ajax(options){
	let defaults = {
		type:'get',
		url:'',
		params:null,
		callback:function(){}
	};
	let obj = Object.assign({},defaults,options);

	let xhr = new XMLHttpRequest();

	if(obj.type=='get'&&obj.params){
		let param_str = '';
		for(let i in obj.params){
			param_str+=i+'='+obj.params[i];
		}

		xhr.open(obj.type,obj.url+param_str,true);	
		xhr.responseType = "json";
 	    xhr.setRequestHeader("Accept", "application/json");

		xhr.send();
	}else{
		xhr.open(obj.type,obj.url,true);
		xhr.responseType = "json";
 	    xhr.setRequestHeader("Accept", "application/json");

		xhr.send(obj.params)
	}
	
	xhr.onreadystatechange = function(){

		if(xhr.status == 200 && xhr.readyState == 4){
			obj.callback(xhr.response)
		}

	}
}
//跨域请求封装
function jsonp(url,callback){
	window.jsonp_callback = function(data){
		callback(data);
	}
	let s = document.createElement('script');
	
	s.src = url+"&callback=jsonp_callback";
	document.querySelector('body').appendChild(s);
}
//获取url参数封装
function getUrlParams(str){
	let tmp = decodeURI(location.search).split('?')[1];
	let arr = tmp.split('&');
	let obj = {};
	for(let i=0; i<arr.length; i++){
		let res = arr[i].split('=');
		obj[res[0]] = res[1];
	}

	return str?obj[str]:obj;
	
}
//创建loading动画
let loadingAnimate = function(){

	let tpl=`
				<div class="circle-wrap">
					<div class="circle circle-index1"></div>
					<div class="circle circle-index2"></div>
					<div class="circle circle-index3"></div>
					<div class="circle circle-index4"></div>
					<div class="circle circle-index5"></div>
					<div class="circle circle-index6"></div>
					<div class="circle circle-index7"></div>
					<div class="circle circle-index8"></div>
				</div>
			`;

	let load = document.createElement('div');
		load.className = 'loading';
		load.innerHTML = tpl;
		
	this.startLoading = function (container){
		let parentDom;
		if(typeof container=='string'){
			parentDom = document.querySelector(container)
		}else if(typeof container == 'object'){
			parentDom = container;
		}else{
			parentDom = document.querySelector('.container')
		}	
		this.parentDom = parentDom;
		parentDom.appendChild(load);
	};

	this.stopLoading = function(){
		this.parentDom.removeChild(load)
	}
};
let loading = new loadingAnimate();

let element = function (cls) {
	let ele = document.querySelectorAll(cls);
	if(!Node.prototype.bind){
        Node.prototype.bind = function (event,ele,callback) {
            this.addEventListener('click',(e)=>{
            	if(e.target.tagName.toLowerCase()==ele){
                    callback(e,ele);
				}
            },false);
        };
	}
    if(!NodeList.prototype.bind){
        NodeList.prototype.bind = function (event,ele,callback) {
            this.forEach((ele,index) =>{
                ele.addEventListener('click',()=>{
                    callback(ele,index);
                },false);
            });

        };
    }

    if(ele.length==1){
        return ele[0]
    }else{
        return ele
    }
};

export { ajax, jsonp, getUrlParams, loading, element }