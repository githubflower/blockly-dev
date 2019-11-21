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