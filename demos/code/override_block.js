/**
 * @param  {[type]} 根据点击的按钮和block的类型去分发执行这个block的私有方法
 * @return {[type]}
 */
Blockly.Block.prototype.doSthWithFieldBtnClick = function(btn){
  if(this.type === 'controls_if'){
    if(btn.eventType === 'toggleIF'){
      var input = btn.sourceBlock_.inputList.find(item => {
        return item.name === btn.name;
      }); 
      print('connection.hidden_: ' + btn.name + '---' + input.connection.hidden_)
      var connection = input.connection;
      if(connection){
        var bool = input.connection.hidden_;
        var targetBlock = connection.targetBlock();
        if(targetBlock){
          // jQuery(targetBlock.svgGroup_)[bool ? 'show' : 'hide']();
          targetBlock.svgGroup_.setAttribute('display', bool ? 'block' : 'none');

          input.connection.setHidden(!bool);
        }
      }
    }
  }
  if(this.type === 'controls_for'){
    if(btn.eventType === 'toggleInput'){
      var inputs = btn.sourceBlock_.inputList.filter(item => {
        return item.name !== 'DO';
      }); 
      
      inputs.forEach(input => {
        var connection = input && input.connection;
        if(connection){
          var bool = input.connection.hidden_;
          var targetBlock = connection.targetBlock();
          if(targetBlock){
            // jQuery(targetBlock.svgGroup_)[bool ? 'show' : 'hide']();
            // targetBlock.svgGroup_.setAttribute('display', bool ? 'block' : 'none');
            jQuery(targetBlock.svgGroup_).css('display', bool ? 'block' : 'none');
            input.connection.setHidden(!bool);
          }
        }
      })
      var loopNodeFlag = jQuery(btn.sourceBlock_.svgGroup_).find('> .loop').css('display') === 'none';
      jQuery(btn.sourceBlock_.svgGroup_).find('> .loop')[loopNodeFlag ? 'show' : 'hide']();
      jQuery(btn.sourceBlock_.svgGroup_).find('> .conditionLayerRect')[loopNodeFlag ? 'show' : 'hide']();


      // print('controls_for.hidden_: ' + btn.name + '---' + input.connection.hidden_)
    }
  }
}