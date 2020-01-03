Blockly.JavaScript['set_name'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE0',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE1',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var firstName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR0'), Blockly.Variables.NAME_TYPE);
  var lastName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
  return `${firstName} = ${argument0};\n${lastName} = ${argument1};\n`;
};


Blockly.JavaScript['line'] = function(block) {
  return '';
};


Blockly.JavaScript['block_var'] = (block)=>{
  var input = block.inputList.find((item)=>{
    return item.name === 'BLOCK_VAR_INPUT'
  });
  /*var customValueField = input.fieldRow.find(item => {
    return item.name === "CODE_VALUE";
  });*/

  //assistValueField  用于生成XML以及将XML转为图形界面
  var assistValueField = block.inputList.find(item => {
    return item.name === "ASSIST_INPUT";
  });
  var assistType = assistValueField.fieldRow.find(item => {
    return item.name === "ASSIST_TYPE";
  });
  var assistValue = assistValueField.fieldRow.find(item => {
    return item.name === "ASSIST_VALUE";
  });
  // customValue = customValueField._getCustomValue();

  var var_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Variables.NAME_TYPE)
  return `${var_name} = ${assistValue.value_};\n`;
}


Blockly.JavaScript['set_local'] = ()=>{
  return 'todo: set_local';
}

Blockly.JavaScript['threads_def'] = ()=>{
  return 'todo: threads_def';
}

Blockly.JavaScript['threads_start'] = ()=>{
  return 'todo: threads_start';
}

Blockly.JavaScript['threads_end'] = ()=>{
  return 'todo: threads_end';
}

Blockly.JavaScript['lists_create_obj'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = block.getFieldValue('item_key' + i) + ':' + Blockly.JavaScript.valueToCode(block, 'item_value' + i,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }

  var code = '{' + elements.join(', ') + '}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_set_hidden'] = function(block) {
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
  if(varName && varValue){
    return `${varName} = ${varValue};\n`;
  }else{
    return '';
  }
}

