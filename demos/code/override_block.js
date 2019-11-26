/**
 * @param  {[type]} 根据点击的按钮和block的类型去分发执行这个block的私有方法
 * @return {[type]}
 */
Blockly.Block.prototype.doSthWithFieldBtnClick = function(btn){
  if(this.type === 'controls_if'){
    if(btn.eventType === 'toggleIF0'){
      print('this.sourceBlock_.inputList[0].connection.hidden_: ' + btn.sourceBlock_.inputList[0].connection.hidden_)
      var bool = btn.sourceBlock_.inputList[0].connection.hidden_;
      var connection = btn.sourceBlock_.inputList[0].connection;
      var targetBlock;
      var inputSvgGroup_;
      if(connection){
        targetBlock = btn.sourceBlock_.inputList[0].connection.targetBlock();
        if(targetBlock){
          inputSvgGroup_ = targetBlock.svgGroup_;
          jQuery(inputSvgGroup_)[bool ? 'show' : 'hide']();
          btn.sourceBlock_.inputList[0].connection.setHidden(!bool);
        }
      }
    }
  }
}