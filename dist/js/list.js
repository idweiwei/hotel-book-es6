/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//ajax请求函数
function ajax(options) {
	var defaults = {
		type: 'get',
		url: '',
		params: null,
		callback: function callback() {}
	};
	var obj = Object.assign({}, defaults, options);

	var xhr = new XMLHttpRequest();

	if (obj.type == 'get' && obj.params) {
		var param_str = '';
		for (var i in obj.params) {
			param_str += i + '=' + obj.params[i];
		}

		xhr.open(obj.type, obj.url + param_str, true);
		xhr.responseType = "json";
		xhr.setRequestHeader("Accept", "application/json");

		xhr.send();
	} else {
		xhr.open(obj.type, obj.url, true);
		xhr.responseType = "json";
		xhr.setRequestHeader("Accept", "application/json");

		xhr.send(obj.params);
	}

	xhr.onreadystatechange = function () {

		if (xhr.status == 200 && xhr.readyState == 4) {
			obj.callback(xhr.response);
		}
	};
}
//跨域请求封装
function jsonp(url, callback) {
	window.jsonp_callback = function (data) {
		callback(data);
	};
	var s = document.createElement('script');

	s.src = url + "&callback=jsonp_callback";
	document.querySelector('body').appendChild(s);
}
//获取url参数封装
function getUrlParams(str) {
	var tmp = decodeURI(location.search).split('?')[1];
	var arr = tmp.split('&');
	var obj = {};
	for (var i = 0; i < arr.length; i++) {
		var res = arr[i].split('=');
		obj[res[0]] = res[1];
	}

	return str ? obj[str] : obj;
}
//创建loading动画
var loadingAnimate = function loadingAnimate() {

	var tpl = '\n\t\t\t\t<div class="circle-wrap">\n\t\t\t\t\t<div class="circle circle-index1"></div>\n\t\t\t\t\t<div class="circle circle-index2"></div>\n\t\t\t\t\t<div class="circle circle-index3"></div>\n\t\t\t\t\t<div class="circle circle-index4"></div>\n\t\t\t\t\t<div class="circle circle-index5"></div>\n\t\t\t\t\t<div class="circle circle-index6"></div>\n\t\t\t\t\t<div class="circle circle-index7"></div>\n\t\t\t\t\t<div class="circle circle-index8"></div>\n\t\t\t\t</div>\n\t\t\t';

	var load = document.createElement('div');
	load.className = 'loading';
	load.innerHTML = tpl;

	this.startLoading = function (container) {
		var parentDom = void 0;
		if (typeof container == 'string') {
			parentDom = document.querySelector(container);
		} else if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) == 'object') {
			parentDom = container;
		} else {
			parentDom = document.querySelector('.container');
		}
		this.parentDom = parentDom;
		parentDom.appendChild(load);
	};

	this.stopLoading = function () {
		this.parentDom.removeChild(load);
	};
};
var loading = new loadingAnimate();

var element = function element(cls) {
	var ele = document.querySelectorAll(cls);
	if (!Node.prototype.bind) {
		Node.prototype.bind = function (event, ele, callback) {
			this.addEventListener('click', function (e) {
				if (e.target.tagName.toLowerCase() == ele) {
					callback(e, ele);
				}
			}, false);
		};
	}
	if (!NodeList.prototype.bind) {
		NodeList.prototype.bind = function (event, ele, callback) {
			this.forEach(function (ele, index) {
				ele.addEventListener('click', function () {
					callback(ele, index);
				}, false);
			});
		};
	}

	if (ele.length == 1) {
		return ele[0];
	} else {
		return ele;
	}
};

exports.ajax = ajax;
exports.jsonp = jsonp;
exports.getUrlParams = getUrlParams;
exports.loading = loading;
exports.element = element;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calendar = exports.Calendar = function () {
	function Calendar(options) {
		_classCallCheck(this, Calendar);

		var defaults = {
			initDate: new Date(),
			callback: function callback() {}
		};
		options = Object.assign({}, defaults, options);

		this.calendarPlugin = document.querySelector('#calendar-plugin');

		var year = options.initDate.getFullYear();
		var month = options.initDate.getMonth() + 1;

		this.year = year;
		this.month = month;

		this.callback = options.callback;
		//渲染初始月
		this.render(year, month);
		//更新标题年/月
		this.updateTitle(year, month);
		//绑定事件
		this.bindEvent();
	}

	_createClass(Calendar, [{
		key: 'updateTitle',
		value: function updateTitle(year, month) {
			this.calendarPlugin.querySelector('.calendar-title h3').innerHTML = year + '年' + month + '月';
		}
	}, {
		key: 'daysInOneMonth',
		value: function daysInOneMonth(year, month) {
			var d31 = [1, 3, 5, 7, 8, 10, 12],
			    d30 = [4, 6, 9, 11],
			    days = 31;

			month = month * 1;
			year = year * 1;

			if (month == 2) {
				if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
					days = 29;
				} else {
					days = 28;
				}
			} else {
				if (d31.indexOf(month) > -1) {
					days = 31;
				} else if (d30.indexOf(month) > -1) {
					days = 30;
				}
			}

			return days;
		}
	}, {
		key: 'startInOneMonth',
		value: function startInOneMonth(year, month) {
			var date = new Date(year + '/' + month + '/' + 1);
			//返回这个月1号对应的星期值[0,6]
			return date.getDay();
		}
	}, {
		key: 'renderPrevMonth',
		value: function renderPrevMonth(year, month) {
			var prevMonth = new Date(year + '/' + (month - 1));
			var prevMonthDays = this.daysInOneMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
			var leftDays = this.startInOneMonth(year, month);
			var str = '';
			leftDays -= 1;
			while (leftDays >= 0) {
				str += '<span class="calendar-day to-gray">' + (prevMonthDays - leftDays) + '</span>';
				leftDays--;
			}

			return str;
		}
	}, {
		key: 'renderCurrentMonth',
		value: function renderCurrentMonth(year, month) {
			var str = '',
			    start = 1;
			var days = this.daysInOneMonth(year, month);
			while (start <= days) {
				str += '<span class="calendar-day">' + start + '</span>';
				start++;
			}
			return str;
		}
	}, {
		key: 'render',
		value: function render(year, month) {
			var container = this.calendarPlugin.querySelector('.calendar-month');
			container.innerHTML = this.renderPrevMonth(year, month) + this.renderCurrentMonth(year, month);
		}
	}, {
		key: 'bindEvent',
		value: function bindEvent() {
			var _this = this;

			this.calendarPlugin.onclick = function (e) {
				var target = e.target;
				if (target.classList.contains('back')) {
					_this.hide();
				}
				if (target.classList.contains('to-gray')) {
					return;
				}
				if (target.classList.contains('calendar-day')) {
					_this.callback(_this.year, _this.month, target.innerHTML);
					_this.srcElement.innerHTML = _this.year + '-' + _this.month + '-' + target.innerHTML;
					_this.hide();
				}
				if (target.classList.contains('prev')) {
					var date = new Date(_this.year, _this.month - 1 - 1);
					var prevYear = date.getFullYear();
					var prevMonth = date.getMonth() + 1;
					_this.render(prevYear, prevMonth);
					_this.year = prevYear;
					_this.month = prevMonth;
					_this.updateTitle(prevYear, prevMonth);
				}
				if (target.classList.contains('next')) {
					var _date = new Date(_this.year, _this.month - 1 + 1);
					var nextYear = _date.getFullYear();
					var nextMonth = _date.getMonth() + 1;
					_this.render(nextYear, nextMonth);
					_this.year = nextYear;
					_this.month = nextMonth;
					_this.updateTitle(nextYear, nextMonth);
				}
			};
		}
	}, {
		key: 'show',
		value: function show(element) {
			this.srcElement = element;
			this.calendarPlugin.classList.add('plugin-active');
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.calendarPlugin.classList.remove('plugin-active');
		}
	}]);

	return Calendar;
}();

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Calendar = __webpack_require__(2);

var _tools = __webpack_require__(0);

//初始化日历组件
var calendar = new _Calendar.Calendar({
	callback: function callback(data) {
		console.log(data);
	}
});
//渲染日期
var cid = document.querySelector('.check-in-date');
var cod = document.querySelector('.check-out-date');

cid.innerHTML = (0, _tools.getUrlParams)('checkInDate');
cod.innerHTML = (0, _tools.getUrlParams)('checkOutDate');

document.querySelector('.modify-date').onclick = function () {
	calendar.show(document.querySelector('.check-in-date'));
};

//启动loading动画

_tools.loading.startLoading('.container');

//请求列表数据
var wait = new Promise(function (resolve, reject) {
	(0, _tools.ajax)({
		url: '../../server/hotel.json',
		callback: function callback(data) {
			var star = [0, 2, 3, 4, 5];
			function random(max, min) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			data.data = data.data.map(function (value, index) {
				value.rank = star[random(4, 0)];
				return value;
			});

			resolve(data);
		}
	});
});

//列表模板
function tpl(type, name, price, addr, district, rank, index) {
	if (type == 'string') {

		return '<dl data-id="' + (index + 1) + '" data-region="' + district + '" data-rank="' + rank + '" data-price="' + price + '">\n\t\t\t\t<dt><img src="../img/fullimage1.jpg" alt=""></dt>\n\t\t\t\t<dd>\n\t\t\t\t\t<h4>' + name + '</h4>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class="point">4.7\u5206</span>\n\t\t\t\t\t\t<span class="price"><em>\uFFE5' + price + '</em><small>\u8D77</small></span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class="rank">' + rank + '\u661F</span>\n\t\t\t\t\t\t<span class="icon iconfont icon-wifi"></span>\n\t\t\t\t\t\t<span class="icon iconfont icon-p"></span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class="location">' + addr + '</span>\n\t\t\t\t\t\t<span class="distance"> </span>\n\t\t\t\t\t</p>\n\t\t\t\t</dd>\n\t\t\t\t\t</dl>';
	}
	if (type == 'dom') {
		var ele = document.createElement('dl');
		ele.setAttribute('data-rank', rank);
		ele.setAttribute('data-price', price);
		ele.setAttribute('data-region', district);
		ele.setAttribute('data-id', index + 1);
		ele.innerHTML = '<dt><img src="../img/fullimage1.jpg" alt=""></dt>\n\t\t\t\t<dd>\n\t\t\t\t\t<h4>' + name + '</h4>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class="point">4.7\u5206</span>\n\t\t\t\t\t\t<span class="price"><em>\uFFE5' + price + '</em><small>\u8D77</small></span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class="rank">' + rank + '\u661F</span>\n\t\t\t\t\t\t<span class="icon iconfont icon-wifi"></span>\n\t\t\t\t\t\t<span class="icon iconfont icon-p"></span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class="location">' + addr + '</span>\n\t\t\t\t\t\t<span class="distance"> </span>\n\t\t\t\t\t</p>\n\t\t\t\t</dd>';
		return ele;
	}
}
//根据模板渲染数据
wait.then(function (data) {

	var data_list = data.data;

	data_list = data_list.map(function (value, index) {
		return tpl('string', value.name, value.price, value.addr, value.district, value.rank, index);
	});
	//数据返回停止加载动画
	_tools.loading.stopLoading();
	//将渲染完成的list数据添加至列表
	document.querySelector('.hotel-list').innerHTML = data_list.join('');

	hl_height = document.querySelector('.hotel-list').offsetHeight;
});
//滚动加载更多

var hl_height = 0;
var pd_height = document.querySelector('.pick-date').offsetHeight;
var list_main = document.querySelector('.list-main');
var view_height = list_main.offsetHeight;
list_main.onscroll = loadMore;
function loadMore() {
	if (hl_height + pd_height - (this.scrollTop + view_height) < 200) {
		list_main.onscroll = null;
		(0, _tools.ajax)({
			url: '../../server/hotel.json',
			callback: function callback(data) {
				var star = [0, 2, 3, 4, 5];
				function random(max, min) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
				var data_list = data.data;

				data_list = data_list.map(function (value, index) {
					value.rank = star[random(4, 0)];
					document.querySelector('.hotel-list').appendChild(tpl('dom', value.name, value.price, value.addr, value.district, value.rank));
					return tpl('dom', value.name, value.price, value.addr, value.district, value.rank);
				});
				hl_height = document.querySelector('.hotel-list').offsetHeight;

				list_main.onscroll = loadMore;
				//重新排序
				//arrangeFn('up');
			}
		});
	}
}

//filter区域的显示和隐藏
var filterWrap = document.querySelector('.filter');
var filter_area = document.querySelector('.filter-area');
var filter_nav = document.querySelector('.filter-nav');
var filter_nav_li = filter_nav.querySelectorAll('li');
var masker = document.querySelector('.masker');
function resetArrow(target) {

	if (target && target.classList.contains('icon-icon05-copy-copy')) return;
	for (var i = 0; i < filter_nav_li.length; i++) {
		filter_nav_li[i].classList.add('icon-icon05-copy-copy-copy');

		filter_nav_li[i].classList.remove('icon-icon05-copy-copy');
	}
}
//点击底部筛选导航
filter_nav.addEventListener('click', function (e) {

	var target = e.target;

	if (target.tagName == 'LI') {
		resetArrow(target);
		if (target.classList.contains('icon-icon05-copy-copy-copy')) {

			target.classList.remove('icon-icon05-copy-copy-copy');
			target.classList.add('icon-icon05-copy-copy');
			masker.classList.add('masker-show');
		} else {
			target.classList.remove('icon-icon05-copy-copy');
			target.classList.add('icon-icon05-copy-copy-copy');
			masker.classList.remove('masker-show');
		}

		filter_area.style.transform = 'translateX(' + -(target.getAttribute('index') * 25) + '%)';
	}
}, false);
//点击筛选区域，获取具体的筛选信息
masker.addEventListener('click', function (e) {
	var target = e.target;
	//控制CheckBox的功能
	switch (target.tagName) {
		case "SPAN":
			target = target.parentNode;
			break;
		case "DIV":
			if (target.classList.contains('masker')) {
				masker.classList.remove('masker-show');
				resetArrow();
			}

			return; //不再执行后面语句
			break;
		case "P":
			break;
		default:
			console.log('我不知你点哪里了...');
	}

	if (target.parentNode.classList.contains('arrange')) {
		if (target.classList.contains('checkbox')) {
			var siblings = target.parentNode.childNodes;
			for (var i = 0; i < siblings.length; i++) {
				if (siblings[i].nodeType != 3) {
					siblings[i].className = 'checkbox';
				}
			}
			target.className = 'checkbox-checked';
			var arrange = target.getAttribute('arrange');
			//排序
			arrangeFn(arrange);
		}
	} else {
		if (target.classList.contains('checkbox')) {
			target.className = 'checkbox-checked';
		} else {
			target.className = 'checkbox';
		}
	}

	//collector()收集所有CheckBox选中的信息,返回筛选信息
	//调用过滤逻辑
	screen(collector());
}, false);

//收集信息函数
function collector() {
	var region = document.querySelector('.masker .region').querySelectorAll('p.checkbox-checked');
	var rank = document.querySelector('.masker .rank').querySelectorAll('p.checkbox-checked');
	var screenItems = {
		region: [],
		rank: []
	};
	for (var i = 0; i < region.length; i++) {
		screenItems.region.push(region[i].getAttribute('region'));
	}
	for (var _i = 0; _i < rank.length; _i++) {
		screenItems.rank.push(rank[_i].getAttribute('rank'));
	}

	for (var j in screenItems) {
		if (screenItems[j].length == 0) {
			delete screenItems[j];
		}
	}

	return screenItems;
}
//排序函数
function arrangeFn(direction) {
	var wrap = document.querySelector('.hotel-list');
	var dls = Array.from(wrap.querySelectorAll('dl'));

	dls = dls.sort(function (a, b) {
		if (direction == 'up') {
			return a.getAttribute('data-price') - b.getAttribute('data-price');
		} else {
			return b.getAttribute('data-price') - a.getAttribute('data-price');
		}
	});

	dls.forEach(function (ele, index) {
		wrap.appendChild(ele);
	});
}

//筛选逻辑的实现
function screen(obj) {

	//Object {region: Array[1], rank: Array[1]}
	var wrap = document.querySelector('.hotel-list');
	var dls = wrap.querySelectorAll('dl');
	for (var i = 0; i < dls.length; i++) {
		dls[i].classList.remove('none');
	}

	//把符合条件的项筛选出来;
	for (var _i2 = 0; _i2 < dls.length; _i2++) {
		for (var k in obj) {
			if (obj[k].indexOf(dls[_i2].getAttribute('data-' + k)) == -1) {
				dls[_i2].classList.add('none');
			}
		}
	}
}

//去详情页
document.querySelector('.hotel-list').onclick = function (e) {
	var target = e.target;
	while (target.tagName != 'DL') {
		target = target.parentNode;
	}
	var hotel_id = target.getAttribute('data-id');
	window.location.href = 'detail.html?hotel_id=' + hotel_id;
};

/***/ })

/******/ });