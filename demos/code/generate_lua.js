

Blockly.Lua['line'] = function(block) {
  return '';
};

Blockly.Lua['threads_def'] = ()=>{
  return 'todo: threads_def';
}

Blockly.Lua['threads_start'] = ()=>{
  return 'todo: threads_start';
}

Blockly.Lua['threads_end'] = ()=>{
  return 'todo: threads_end';
}

Blockly.Lua['lists_create_obj'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = block.getFieldValue('item_key' + i) + ' = ' + Blockly.Lua.valueToCode(block, 'item_value' + i,
        Blockly.Lua.ORDER_COMMA) || 'nil';
  }

  var code = '{' + elements.join(', ') + '}';
  return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua['variables_set_hidden'] = function(block) {
  var varName = '';
  //因为variables_set_hidden这个block中不是引用的变量，而是临时存储的变量id，所以转代码时需要先验证这个变脸是否有使用，在使用则转为相应代码，否则返回空字符串
  var varId = block.getInput('VAR_NAME').fieldRow[0].getValue();
  var usedVars = Blockly.Variables.allUsedVarModels(block.workspace);
  usedVars.forEach(item => {
    if(item.getId() === varId){
      varName = item.name;
      return false;
    }
  })
  var varValue = block.getInput('VAR_VALUE').fieldRow[0].getValue()
  if(varName){
    return `${varName} = ${varValue}\n`;
  }else{
    return '';
  }
}