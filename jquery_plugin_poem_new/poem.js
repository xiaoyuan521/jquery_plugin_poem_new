(function($){

	var Poem = function($dom,options){
		this.baseDom = $dom;
		this.options = options;

		this.parseTemplate();
		this.startup();
	}

	Poem.prototype = {

		constructor: Poem,

		// 解析模板，构建dom
		parseTemplate: function(){
			var $template = $($(".poemTemplate").html());

			$template.insertBefore(this.baseDom);
			this.containerDom = $template;
			this.baseDom.detach().appendTo($template.find(".body"));
			$template.find(".header").text(this.options.title);
		},

	//事件绑定等处理
	startup:function(){

	},
	destroy:function(){
		this.containerDom.find(".body >div").detach().insertBefore(this.containerDom);
		this.containerDom.remove();
		this.baseDom.removeData("poem");

	},
	//暴漏的api
	api:{
		setTitle: function(title){

			this.options.title=title;
			$(".header",this.containerDom).text(title);
		},
		destroy:function(){
			this.destroy();
		}
	}	
}


$.fn.poem=function(options){

	var _arguments=arguments;
	return this.each(function(_,dom){
		var $dom =$(dom);
		var poemObj =$dom.data("poem");

			// 调用组件的api方法
			if(typeof options=='String'){
				var args= Array.prototype.slice.call(_arguments);
				var  methodName=args.shift();
				poemObj.api[methodName].call(poemObj,args);
			}
			if(poemObj){
				// 组件已经创建，无需二次创建
				
				return;
			}else{
				//创建组件

				options=$.extend({},$.fn.poem.default,options);
				poemObj =new Poem($dom,options);
				$dom.data("poem",poemObj);
			}
			
		});
}
$.fn.poem.default ={
	"title":"题目"
}


})(window.jQuery);





