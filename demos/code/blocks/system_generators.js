'use strict';

Blockly.Lua['system_info_robot_number'] = function (block) {
    var code = 'System.Info("NRobots")\n';
    return code;
};
Blockly.Lua['system_info_index'] = function (block) {
    var field_info_type = block.getFieldValue('io_type');
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var code = 'System.Info("' + field_info_type + '",' + value_robot_index + ')\n';
    return code;
};
Blockly.Lua['system_info_all'] = function (block) {
    var info_type = block.getFieldValue('io_type');
    var code = 'System.Info("' + info_type + '","ALL")\n';
    return code;
};
Blockly.Lua['system_info_din'] = function (block) {
    var field_enable_index1 = block.getFieldValue('enable_index1');
    var value_io_index1 = Blockly.Lua.valueToCode(block, 'io_index1', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index2 = block.getFieldValue('enable_index1');
    var value_io_index2 = Blockly.Lua.valueToCode(block, 'io_index2', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index3 = block.getFieldValue('enable_index2');
    var value_io_index3 = Blockly.Lua.valueToCode(block, 'io_index3', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index4 = block.getFieldValue('enable_index3');
    var value_io_index4 = Blockly.Lua.valueToCode(block, 'io_index4', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index4 = block.getFieldValue('enable_index4');
    var value_io_index5 = Blockly.Lua.valueToCode(block, 'io_index5', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index5 = block.getFieldValue('enable_index5');
    var value_io_index6 = Blockly.Lua.valueToCode(block, 'io_index6', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index6 = block.getFieldValue('enable_index6');
    var value_io_index7 = Blockly.Lua.valueToCode(block, 'io_index7', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index7 = block.getFieldValue('enable_index7');
    var value_io_index8 = Blockly.Lua.valueToCode(block, 'io_index8', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index8 = block.getFieldValue('enable_index8');
    var value_io_index9 = Blockly.Lua.valueToCode(block, 'io_index9', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index9 = block.getFieldValue('enable_index9');
    var value_io_index10 = Blockly.Lua.valueToCode(block, 'io_index1', Blockly.Lua.ORDER_ATOMIC);
    var field_enable_index1 = block.getFieldValue('enable_index10');
    var value_io_index10 = Blockly.Lua.valueToCode(block, 'io_index10', Blockly.Lua.ORDER_ATOMIC);
    var code = 'System.Info("DIN",';
    if (fieldfield_enable_index1 == 'true') {
        code + value_io_index1 + ',';
    }
    if (fieldfield_enable_index2 == 'true') {
        code + value_io_index2 + ',';
    }
    if (fieldfield_enable_index3 == 'true') {
        code + value_io_index3 + ',';
    }
    if (fieldfield_enable_index4 == 'true') {
        code + value_io_index4 + ',';
    }
    if (fieldfield_enable_index5 == 'true') {
        code + value_io_index5 + ',';
    }
    if (fieldfield_enable_index6 == 'true') {
        code + value_io_index6 + ',';
    }
    if (fieldfield_enable_index7 == 'true') {
        code + value_io_index7 + ',';
    }
    if (fieldfield_enable_index8 == 'true') {
        code + value_io_index8 + ',';
    }
    if (fieldfield_enable_index9 == 'true') {
        code + value_io_index9 + ',';
    }
    if (fieldfield_enable_index10 == 'true') {
        code + value_io_index10 + ',';
    }
    code
    return code;
};

Blockly.Lua['system_time_set'] = function (block) {
    var field_time = block.getFieldValue('time');
    var code = 'System.Time("' + field_time + '")\n';
    return code;
};
Blockly.Lua['system_time_set'] = function (block) {
    var code = 'System.Time()\n';
    return code;
};

Blockly.Lua['system_start'] = function (block) {
    var code = 'System.Start()\n';
    return code;
};

Blockly.Lua['system_abort'] = function (block) {
    var field_info_type = block.getFieldValue('io_type');
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var code = 'System.Abort("' + field_info_type + '",' + value_robot_index + ')\n';
    var code = 'System.Abort()\n';
    return code;
};

Blockly.Lua['system_stop'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Stop(' + value_robot_index + ')\n';
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['system_pause'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Continue(' + value_robot_index + ')\n';
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['system_continue'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Continue(' + value_robot_index + ')\n';
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['system_retry'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Continue(' + value_robot_index + ')\n';
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['system_speed_get'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.Speed()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['system_speed_set'] = function (block) {
    var number_speed_value = block.getFieldValue('speed_value');
    // TODO: Assemble Lua into code variable.
    var code = 'System.Speed(' + number_speed_value + ')\n';
    return code;
};

Blockly.Lua['system_login'] = function (block) {
    var dropdown_access_value = block.getFieldValue('access_value');
    // TODO: Assemble Lua into code variable.
    var code = 'System.Login(' + dropdown_access_value + ')\n';
    return code;
};

Blockly.Lua['system_logout'] = function (block) {
    var code = 'System.Logout()\n';
    return code;
};

Blockly.Lua['system_clear_variables'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.ClearVariables()\n';
    return code;
};

Blockly.Lua['system_clear_error'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.ClearError()\n';
    return code;
};

Blockly.Lua['system_auto_set'] = function (block) {
    var dropdown_auto_type = block.getFieldValue('mode_type');
    // TODO: Assemble Lua into code variable.
    if (dropdown_auto_type == 'type_0') {
        var type = '0';
    } else {
        var type = '1';
    }
    var code = 'System.Auto(' + type + ')\n';
    return code;
};

Blockly.Lua['system_auto_get'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.Auto()\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};