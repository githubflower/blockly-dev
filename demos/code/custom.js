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


	var svg = document.querySelector('svg.blocklySvg');
	var defs = Blockly.utils.dom.createSvgElement('defs', {}, svg);
	var shadowGrey = Blockly.utils.dom.createSvgElement('filter', {
		id: 'shadowGrey',
		x: "0", 
		y: "0",
		width: "200%",
		height: "200%"
	}, defs);
	Blockly.utils.dom.createSvgElement('feOffset', {
		in: 'SourceGraphic', 
		result: 'offOut',
		dx: 5,
		dy: 5
	}, shadowGrey);
	Blockly.utils.dom.createSvgElement('feGaussianBlur', {
		in: 'offOut', 
		stdDeviation: 5, 
		result: 'blurOut',
	}, shadowGrey);
	Blockly.utils.dom.createSvgElement('feBlend', {
		in: 'SourceGraphic', 
		in2: "blurOut",
		mode: "normal"
	}, shadowGrey);

})

//添加滤镜等定义
/*  var embossFilter = Blockly.utils.dom.createSvgElement('filter',
      {'id': 'blocklyEmbossFilter' + rnd}, defs);
  Blockly.utils.dom.createSvgElement('feGaussianBlur',
      {'in': 'SourceAlpha', 'stdDeviation': 1, 'result': 'blur'}, embossFilter);
  var feSpecularLighting = Blockly.utils.dom.createSvgElement('feSpecularLighting',
      {
        'in': 'blur',
        'surfaceScale': 1,
        'specularConstant': 0.5,
        'specularExponent': 10,
        'lighting-color': 'white',
        'result': 'specOut'
      },
      embossFilter);*/

