
export class City{
    constructor(options){
        const defaults = {
            data:[]
        };
        const opt = Object.assign({},defaults,options);

        this.opt = opt;

        this.cityPlugin = document.querySelector('#city-plugin');

        this.alphabetWrap = this.cityPlugin.querySelector('.alphabet');

        this.citiesFrame = document.querySelector('.city .cities-frame');

        this.render(opt.data);

        this.collectCityHeight();
        //bind event
        this.bindEvent();

    }

    render(cityList){

        //render alphabet
        let alphabetWrap = this.alphabetWrap;
        let citiesFrame = this.citiesFrame;
        let empty_str = '',city_str='';
        cityList.forEach((value,index)=>{
            empty_str+=`<span alpha="${value.alpha}">${value.alpha}</span>`;

            city_str+=`<div>
                <div class="split-line" alpha="${value.alpha}">${value.alpha}</div>
                <ul class="list">
                ${
                    value.data.map((item,idx)=>{
                        return `<li>${item[0]}</li>`
                    }).join('')
                }
                </ul>
            </div>`;

        });
        alphabetWrap.innerHTML = empty_str;
        citiesFrame.innerHTML = city_str;
    }

    collectCityHeight(){
        let alphaDom = document.querySelectorAll('[alpha]');
        let height_info = {};
        Array.from(alphaDom).forEach((dom,index)=>{
            height_info[dom.getAttribute('alpha')] = dom.offsetTop;
        });    
        this.heightInfo = height_info;
    }

    bindEvent(){

        this.cityPlugin.addEventListener('click',(e)=>{
            let target = e.target;
            if(target.tagName == 'SPAN'){
                this.cityPlugin.scrollTop = this.heightInfo[target.getAttribute('alpha')];
            }
            if(target.tagName == 'LI'){
                
                this.hide();
                this.opt.callback(target.innerHTML);
            }
            
            if(target.tagName == 'SPAN' && target.classList.contains('back')){
                this.hide();
            }
        },false);
    }

    show(){
        this.cityPlugin.classList.add('plugin-active');
        this.cityPlugin.scrollTop=0;
    }

    hide(){
        this.cityPlugin.classList.remove('plugin-active');   
    }
}


