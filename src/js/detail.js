import { loading, ajax } from "./tools";
import { Swiper } from '../../lib/swiper';


//查看图集绑定事件
let checkImg = document.querySelector('.check-all-img');
let allImg = document.querySelector('.all-img');
let imgWrap = document.querySelector('.all-img-wrap');
checkImg.onclick = function(){
	allImg.classList.remove('none');

	if(imgWrap.querySelector('ul')) return;

	loading.startLoading(imgWrap);

	//请求数据
	
	ajax({
		url:'../../server/banner.json',
		callback:function(data){
			
			loading.stopLoading();

			let str='';
			data.forEach(function(value,index){
				str+=`<li class="swiper-slide"><img src="${value.url}" alt="" /></li>`
			})
			imgWrap.innerHTML = `<ul class="swiper-wrapper">${str}</ul>`;

			setTimeout(() => {
				new Swiper(imgWrap,{

				})
			},10)
			

		}
	})
}

allImg.onclick = function(){
	allImg.classList.add('none');
}


document.querySelector('.book').onclick = function(){
	window.location.href = 'order.html';
}

