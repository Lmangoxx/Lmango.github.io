require.config({
	paths: {
		jquery : "lib/jquery-1.11.1.min",
		Lmango : "lib/Lmango",
		model : "model/model",
		let_it_snow : "lib/jquery.let_it_snow"
	},
	shim : {
		"jquery" : { exports: 'jquery'},
		"let_it_snow" : { exports: 'jquery'}
	}
});
require(['jquery','Lmango','model','let_it_snow'],function($,Lmango,model){
	/**
	 * city动画代码实现(根据实时城市天气情况更新页面动画效果)
	 * @ 太阳、云朵运动、下雨、下雪等天气
	 * @ 热气球漂浮（晴天时显示）
	 * @ 房屋平地而起
	 * @ 汽车行驶等等
	 */
	"use strict";  //符合ES5标准

	var skyFun = {
		init : function(type){
			"use strict";  //符合ES5标准
			$("#city-cell").addClass(type);
			var _model = model[type];
			if(_model[0][0] == 'canvas'){
				$('#canvas').let_it_snow(_model[0][1]);
			}else if(_model.length > 0){
				for(var i = 0, length = _model.length; i < length; i++ ){
					var m = _model[i],
						div = $('<div style="opacity:0;" class="'+m[0]+'" id="'+m[0]+'" top="'+m[1].top+'" min-move="'+m[1].minMove+'" max-move="'+m[1].maxMove+'">');
					$("#sky-box").append(div);
				}
				this.upData();
			}
		},
		upData : function(){
			"use strict";  //符合ES5标准
			var myTime = [];  //定义天空物体运动时间数组
			$("#sky-box div").each(function(index, el) {   //遍历每朵云朵
				var $this = $(this),     //获取云朵对应的参数
					top = $this.attr("top") * 1,
					min = $this.attr("min-move") * 1,
					max = $this.attr("max-move") * 1,
					time = (max - min) < 0 ? -(max - min) * 20 : (max - min) * 20;
				$this.css({
					"top" : top,
					"left" : Lmango.rand(min,max)
				}).delay((index + 1) * 500).animate({
					"opacity": 1
				}, 1000, function(){ 
					$this.animate({
						"left" : Lmango.rand(min,max)
					}, time);
				});   //初始化云朵位置
				myTime[index] = setInterval(function(){
					$this.stop(true).animate({
						"left": Lmango.rand(min,max)
					},time);
				}, time);
			});
			$("#sky-box").delay(3500).animate({
				opacity: 1
			}, 1000);
		}
	};

	skyFun.init('qing');
	
	$("#build-box div").each(function(index, el) {   //遍历建筑物
		"use strict";  //符合ES5标准
		var $this = $(this);     //获取当前建筑物
		$this.css({
			"-webkit-animation-delay" : (index*0.1) + "s",
			"animation-delay" : (index*0.1) + "s"
		});
	});
});
//
