import { SlideSelector } from '../component/slideSelector';
import { element as getEle } from './tools';
let selector = new SlideSelector();

getEle('.room-count').addEventListener('click',function () {
	let ele = this.querySelector('.icon');
    selector.show({
	    list:[1,2,3,4,5,6],
	    callback:function (data) {
	        ele.innerHTML = data;
	        let info_list = getEle('.fill-order-info-box');
	        let str ='';

            for(let i=0;i<data*1;i++){    	
		        str+= `<div class="fill-order-info"><p class="ks-clear">
                    <span class="left">姓名</span>
                    <span class="right"><input type="text" /></span></p>
                <p class="ks-clear">
                    <span class="left">证件号码</span>
                    <span class="right"><input type="number" /></span></p></div>`;
            }        	
			info_list.innerHTML=str;
	    }
	});
});


getEle('.check-in-time').onclick = function(){
	let ele = this.querySelector('.icon');
	selector.show({
		list:['16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
		callback:function(data){
			ele.innerHTML = data;
		}
	})
}

