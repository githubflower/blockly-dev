window.print = window.console.log; //方便调试
const myDebugger = true;

const donotDebugger = !myDebugger;
window.CUSTOM_CFG_OUTLINE = {
  leftRoundedCorner: donotDebugger, //是否绘制左上角圆角
  topNotch: donotDebugger, //是否绘制顶部的凹槽
  rightNotch: false, //是否绘制右边的凹槽
  bottomHump: donotDebugger, //是否绘制下面的（凸起）
  leftHump: false, //是否绘制左边的凸起
}
window.zjie = ()=>{
  debugger;
}
jQuery(function(){
	jQuery('#loadXml').on('change', function(e){
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = (fe)=>{
			Code.loadBlocks(fe.target.result);
		};
		reader.readAsText(file);
	})



	if(!window.localStorage || !window.localStorage.getItem){
		window.localStorage = {
			getItem: (key)=>{return window['_' + key]},
			setItem: (key, value)=>{window['_' + key] = value;}
		};
	}
	var theme = window.localStorage.getItem('qkm.theme');
	jQuery('body').attr('data-theme', theme && theme.toLowerCase() || 'light');
	jQuery('[data-theme=' + theme + ']').addClass('active');

	jQuery('#content_blocks').on('click', '.theme-wrap li', function(e){
		jQuery(e.target).addClass('active').siblings().removeClass('active');
		var theme = jQuery(e.target).data('theme');
		window.localStorage.setItem('qkm.theme', theme);
		window.location.reload();
	})
	jQuery('#content_blocks').on('click', '.icon-theme', function(e){
		jQuery('.theme-wrap > ul').toggleClass('active');
	})

})