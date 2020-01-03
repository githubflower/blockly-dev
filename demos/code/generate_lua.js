
/*---------------------------------------分割线以下----------------------------add by zjie----------------------------*/

Blockly.Lua['line'] = function(block) {
  return '';
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
  if(varName && varValue){
    return `${varName} = ${varValue}\n`;
  }else{
    return '';
  }
}

Blockly.Lua['threads_def'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Lua.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Threads.NAME_TYPE);
  var xfix1 = '';
  if (Blockly.Lua.STATEMENT_PREFIX) {
    xfix1 += Blockly.Lua.injectId(Blockly.Lua.STATEMENT_PREFIX, block);
  }
  if (Blockly.Lua.STATEMENT_SUFFIX) {
    xfix1 += Blockly.Lua.injectId(Blockly.Lua.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Blockly.Lua.prefixLines(xfix1, Blockly.Lua.INDENT);
  }
  var loopTrap = '';
  if (Blockly.Lua.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.Lua.prefixLines(
        Blockly.Lua.injectId(Blockly.Lua.INFINITE_LOOP_TRAP, block),
        Blockly.Lua.INDENT);
  }
  var branch = Blockly.Lua.statementToCode(block, 'STACK');
  var returnValue = Blockly.Lua.valueToCode(block, 'RETURN',
      Blockly.Lua.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.Lua.INDENT + 'return ' + returnValue + '\n';
  } else if (!branch) {
    branch = '';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Lua.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = funcName + ' = coroutine.create(' + 'function '  + '(' + args.join(', ') + ')\n' +
      xfix1 + loopTrap + branch + xfix2 + returnValue + 'end\n)';
  code = Blockly.Lua.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Lua.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Lua['threads_start'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Lua.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Threads.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Lua.valueToCode(block, 'ARG' + i,
        Blockly.Lua.ORDER_NONE) || 'nil';
  }
  var code = 'coroutine.resume(' + funcName + ', ' + args.join(', ') + ')';
  return code;
};

Blockly.Lua['threads_end'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Lua.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Threads.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Lua.valueToCode(block, 'ARG' + i,
        Blockly.Lua.ORDER_NONE) || 'nil';
  }
  var code = 'coroutine.yield()';
  return code;
};


Blockly.Lua['lists_create_obj'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] =  block.getFieldValue('item_key' + i) + ' = ' + Blockly.Lua.valueToCode(block, 'item_value' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
  }
  var code = '{' + elements.join(', ') + '}';
  return [code, Blockly.Lua.ORDER_ATOMIC];
};  