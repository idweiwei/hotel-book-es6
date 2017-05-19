import {Swiper} from '../../lib/swiper';
import {ajax, jsonp} from './tools';
import {City} from '../component/city';
import {Calendar} from '../component/calendar';


let [banner,str] = [document.querySelector('.banner ul'), ''];

let promise = new Promise(function (resolve, reject) {
    //请求banner图片地址
    ajax({
        url: "../../server/banner.json",
        callback: function (data) {
            resolve(data);
        }
    });

});

promise.then(function (data) {
    //渲染banner结构
    data.forEach((item, index) => {
        str += `<li class="swiper-slide" style="background: url(${item.url});background-size: cover;">
                <a href="" title="${item.title}"></a>
              </li>`;
    });

    banner.innerHTML = str;

    //实例化swiper
    let banner_swipe = new Swiper('.banner', {
        autoplay: 3000,
        loop: true
    })

});

let city_data = new Promise(function(resolve,reject){
    //请求城市数据
    ajax({
        url: '../../server/cities.json',
        callback: function (data) {
            resolve(data)
            
        }
    });    
})


let checkIn = document.querySelector('.check-in-hotel'),city_module;
city_data.then(function(data){
    //实例化城市组件
    city_module = new City({
        data: data,
        callback:function(city){
            //在组件的回调中处理选择的数据
            checkIn.querySelector('.main-item-massage').innerHTML = city;
        }
    });
    
})

//显示城市组件，绑定事件
checkIn.addEventListener('click',function(){
    //触发城市组件的显示
    city_module.show();
},false);
//使用腾讯地理定位api实现定位
checkIn.querySelector('.location').onclick=function(e){
    e.stopPropagation();
    //实现定位功能
    let glt = navigator.geolocation;

    /*jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location='+20+','+110+'&key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp',function(data){
        console.log(data)
    })*/

    if (glt) {//watchPosition
        glt.getCurrentPosition(function(postion){
            let coords = position.coords;

            jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location='+coords.latitude+','+coords.longitude+'&key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp',function(data){
                console.log(data)
            })
            
            //alert(coords.latitude,coords.longitude);
        }, function(error){

            switch(error.code) {
                case error.TIMEOUT:
                    console.log("A timeout occured! Please try again!");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log('We can\'t detect your location. Sorry!');
                    break;
                case error.PERMISSION_DENIED:
                    console.log('Please allow geolocation access for this to work.');
                    break;
                case error.UNKNOWN_ERROR:
                    console.log('An unknown error occured!');
                    break;
            }


            //跨域请求腾讯地图api，通过ip获取地址信息
            jsonp('http://apis.map.qq.com/ws/location/v1/ip?key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp',function(data){
                
            }) 

        },{
            // 指示浏览器获取高精度的位置，默认为false
            enableHighAccuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            timeout: 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
            maximumAge: 3000
        });
    }else{


        alert("Your browser does not support Geolocation!");

    }
    
}


//初始化首页默认入住日期
let checkInDate = document.querySelector('.check-in-date .main-item-massage');
let current_date = new Date();
let cYear = current_date.getFullYear();
let cMonth = current_date.getMonth()+1;
let cDay = current_date.getDate();
let cTime = current_date.getHours();

if(cTime>16){
    current_date = new Date(cYear+'-'+cMonth+'-'+(cDay+1));
    cYear = current_date.getFullYear();
    cMonth = current_date.getMonth()+1;
    cDay = current_date.getDate();    
}
checkInDate.innerHTML = cYear+'-'+cMonth+'-'+cDay;

let checkOutDate = document.querySelector('.check-out-date .main-item-massage');
let check_out_date = new Date(cYear+'-'+cMonth+'-'+(cDay+1));
let oYear = check_out_date.getFullYear();
let oMonth = check_out_date.getMonth()+1;
let oDay = check_out_date.getDate();
checkOutDate.innerHTML = oYear+'-'+oMonth+'-'+oDay;

//实例化日历组件
let calendar = new Calendar({
    initDate:new Date(),
    callback:function(y,m,d){
        //checkInDate.innerHTML = y+'-'+m+'-'+d;
        console.log(y+'-'+m+'-'+d);
    }
})
//给入住日dom元素绑定事件，触发日历组件
checkInDate.addEventListener('click',()=>{
    calendar.show(checkInDate);
},false);
//给离店日dom元素绑定事件，触发日历组件
checkOutDate.addEventListener('click',()=>{
    calendar.show(checkOutDate);
},false)

//搜索产品
//
document.querySelector('.search').onclick=function(){


let _city = checkIn.querySelector('.main-item-massage').innerHTML,
    _checkIn = checkInDate.innerHTML,
    _checkOut = checkOutDate.innerHTML,
    _hotel = document.querySelector('.hotel-name').value;

let str='?city='+_city+'&checkInDate='+_checkIn+'&checkOutDate='+_checkOut;

    if(_hotel){
        str+='hotelName='+_hotel
    }

    window.location.href = 'list.html'+encodeURI(str)

}
console.log('1234');

