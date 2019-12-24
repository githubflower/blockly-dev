'use strict';

Blockly.Lua['new_tool'] = function (block) {
    var text_tool_name = block.getFieldValue('tool_name');
    var value_tool_x = Blockly.Lua.valueToCode(block, 'tool_x', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_y = Blockly.Lua.valueToCode(block, 'tool_y', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_z = Blockly.Lua.valueToCode(block, 'tool_z', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_yaw = Blockly.Lua.valueToCode(block, 'tool_yaw', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_pitch = Blockly.Lua.valueToCode(block, 'tool_pitch', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_roll = Blockly.Lua.valueToCode(block, 'tool_roll', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_mass = Blockly.Lua.valueToCode(block, 'tool_mass', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_tool_direct = block.getFieldValue('tool_direct');
    // TODO: Assemble Lua into code variable.
    if (dropdown_tool_direct == 'Positive') {
        var value_tool_direct = '0';
    } else {
        var value_tool_direct = '1';
    }
    var code = text_tool_name + ' = ' + 'Tool.newByMacro(' +
        '"' + text_tool_name + '"' + ',' +
        value_tool_x + ',' +
        value_tool_y + ',' +
        value_tool_z + ',' +
        value_tool_yaw + ',' +
        value_tool_pitch + ',' +
        value_tool_roll + ',' +
        value_tool_mass + ',' +
        value_tool_direct + ')' + '\n';
    return code;
};

Blockly.Lua['get_tool'] = function (block) {
    var text_tool_name = block.getFieldValue('tool_name');
    // TODO: Assemble Lua into code variable.
    var code = text_tool_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['change_tool_member'] = function (block) {
    var dropdown_tool_member = block.getFieldValue('tool_member');
    var text_tool_name = block.getFieldValue('tool_name');
    var value_tool_member_value = Blockly.Lua.valueToCode(block, 'tool_member_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = text_tool_name + '.' + dropdown_tool_member + ' = ' + value_tool_member_value + '\n';
    return code;
};

Blockly.Lua['get_tool_member'] = function (block) {
    var dropdown_tool_member = block.getFieldValue('tool_member');
    var text_tool_name = block.getFieldValue('tool_name');
    // TODO: Assemble Lua into code variable.
    var code = text_tool_name + '.' + dropdown_tool_member;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['tool_delete'] = function (block) {
    var text_tool_name = block.getFieldValue('tool_name');
    // TODO: Assemble Lua into code variable.
    var code = 'Tool.deleteByMacro(' + text_tool_name + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.Lua['tool_print'] = function (block) {
    var text_tool_name = block.getFieldValue('tool_name');
    // TODO: Assemble Lua into code variable.
    var code = 'Tool.__tostring(' + text_tool_name + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};