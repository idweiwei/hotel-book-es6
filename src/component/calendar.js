export class Calendar{
	constructor(options){
		let defaults = {
			initDate:new Date(),
			callback:function(){

			}
		};
		options = Object.assign({},defaults,options);

		this.calendarPlugin = document.querySelector('#calendar-plugin');

		let year = options.initDate.getFullYear();
		let month = options.initDate.getMonth()+1;

		this.year = year;
		this.month = month;

		this.callback = options.callback;
		//渲染初始月
		this.render(year,month);
		//更新标题年/月
		this.updateTitle(year,month);
		//绑定事件
		this.bindEvent();
	}

	updateTitle(year,month){
		this.calendarPlugin.querySelector('.calendar-title h3').innerHTML=
		year+'年'+month+'月'
	}

	daysInOneMonth(year,month){
		let d31 = [1,3,5,7,8,10,12],
			d30 = [4,6,9,11],
			days = 31;

		month = month*1;
        year = year*1;  

		if(month == 2){
			if( year%4==0 && year%100!=0 || year%400==0 ){
				days = 29
			}else{
				days = 28
			}		
		}else{
			if(d31.indexOf(month)>-1){
				days = 31;	
			}else if(d30.indexOf(month)>-1){
				days = 30
			}
		}	
		
		return days;
	}

	startInOneMonth(year,month){
		let date = new Date(year+'/'+month+'/'+1);
		//返回这个月1号对应的星期值[0,6]
		return date.getDay();
	}

	renderPrevMonth(year,month){
		let prevMonth = new Date(year+'/'+(month-1));
		let prevMonthDays = this.daysInOneMonth(prevMonth.getFullYear(),prevMonth.getMonth()+1);
		let leftDays = this.startInOneMonth(year,month)
		let str = '';
		leftDays-=1;
		while(leftDays>=0){
			str+=`<span class="calendar-day to-gray">${prevMonthDays-leftDays}</span>`;
			leftDays--;	
		}
		
		return str;
	}

	renderCurrentMonth(year,month){
		let str='',start=1;
		let days = this.daysInOneMonth(year,month);
		while(start<=days){
			str+=`<span class="calendar-day">${start}</span>`;
			start++;	
		}
		return str;
	}

	render(year,month){
		let container = this.calendarPlugin.querySelector('.calendar-month');
		container.innerHTML= this.renderPrevMonth(year,month)+this.renderCurrentMonth(year,month);
	}

	bindEvent(){
		this.calendarPlugin.onclick = (e)=>{
			let target = e.target;
			if(target.classList.contains('back')){
				this.hide();	
			}
			if(target.classList.contains('to-gray')){
				return; 
			}
			if(target.classList.contains('calendar-day')){
				this.callback(this.year,this.month,target.innerHTML)	
				this.srcElement.innerHTML = this.year+'-'+this.month+'-'+target.innerHTML
				this.hide();
			}
			if(target.classList.contains('prev')){
				let date = new Date(this.year,(this.month-1-1));
				let prevYear = date.getFullYear();
				let prevMonth = date.getMonth()+1;
				this.render(prevYear,prevMonth);
				this.year = prevYear;
				this.month = prevMonth;
				this.updateTitle(prevYear,prevMonth);
			}
			if(target.classList.contains('next')){
				let date = new Date(this.year,(this.month-1+1));
				let nextYear = date.getFullYear();
				let nextMonth = date.getMonth()+1;
				this.render(nextYear,nextMonth);
				this.year = nextYear;
				this.month = nextMonth;			
				this.updateTitle(nextYear,nextMonth);
			}
			
		}
	}

	show(element){
		this.srcElement= element;
        this.calendarPlugin.classList.add('plugin-active');        
    }

    hide(){
        this.calendarPlugin.classList.remove('plugin-active');   
    }

}