window.print = window.console.log; //方便调试
const myDebugger = true;

const donotDebugger = !myDebugger;
window.CUSTOM_CFG_OUTLINE = {
  leftRoundedCorner: donotDebugger, //是否绘制左上角圆角
  topNotch: donotDebugger, //是否绘制顶部的凹槽
  rightNotch: true, //是否绘制右边的凹槽
  bottomHump: donotDebugger, //是否绘制下面的（凸起）
  leftHump: true, //是否绘制左边的凸起
}
window.zjie = ()=>{
  debugger;
}

