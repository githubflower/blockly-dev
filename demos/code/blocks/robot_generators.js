'use strict';

Blockly.Lua['robot_power_enable'] = function (block) {
    var dropdown_robot_power_enable_state = block.getFieldValue('power_enable_state');
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    if (dropdown_robot_power_enable_state == 'power_enable_on') {
        var power_enable_sate = '1';
    } else {
        var power_enable_sate = '0';
    }
    var code = 'Robot.PowerEnable(' + value_robot_index + ',' + power_enable_sate + ')\n';
    return code;
};

Blockly.Lua['robot_home'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Home(' + value_robot_index + ')\n';
    return code;
};

Blockly.Lua['robot_auto_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_auto_type = block.getFieldValue('mode_type');
    // TODO: Assemble Lua into code variable.
    if (dropdown_auto_type == 'type_0') {
        var type = '0';
    } else {
        var type = '1';
    }
    var code = 'Robot.Auto(' + value_robot_index + ',' + type + ')\n';
    return code;
};

Blockly.Lua['robot_auto_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Auto(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_brake_set'] = function (block) {
    var dropdown_brake_state = block.getFieldValue('brake_state');
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_axis_index = block.getFieldValue('axis_index');
    // TODO: Assemble Lua into code variable.
    if (dropdown_brake_state == 'brake_free') {
        var brake_state = '1';
    } else {
        var brake_state = '0';
    }
    var code = 'Robot.Brake(' + value_robot_index + ',' + dropdown_axis_index + ',' + brake_state + ')\n';
    return code;
};

Blockly.Lua['robot_brake_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Brake(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_where'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Where(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_where_angle'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.WhereAngle(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_limit_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_axis_index = block.getFieldValue('axis_index');
    var angle_angle_p = block.getFieldValue('angle_p');
    var angle_angle_n = block.getFieldValue('angle_n');
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Limit(' + value_robot_index + ',' + dropdown_axis_index + ',' + angle_angle_p + ',' + angle_angle_n + ')\n';
    return code;
};

Blockly.Lua['robot_limit_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_axis_index = block.getFieldValue('axis_index');
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Limit(' + value_robot_index + ',' + dropdown_axis_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_frame_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_frame_type = block.getFieldValue('frame_type');
    // TODO: Assemble Lua into code variable.
    switch (dropdown_frame_type) {
        case 'type_1':
            var frame_type = '1'
            break;
        case 'type_2':
            var frame_type = '2'
            break;
        case 'type_3':
            var frame_type = '3'
            break;
        case 'type_4':
            var frame_type = '4'
    }
    var code = 'Robot.Frame(' + value_robot_index + ',' + frame_type + ')\n';
    return code;
};

Blockly.Lua['robot_frame_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Frame(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_axis_number_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.NAxes(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_speed_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var number_speed_value = block.getFieldValue('speed_value');
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Speed(' + value_robot_index + ',' + number_speed_value + ')\n';
    return code;
};

Blockly.Lua['robot_speed_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Speed(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_state_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.State(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_jog_mode_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_mode_type = block.getFieldValue('mode_type');
    var dropdown_switch_type = block.getFieldValue('switch_type');
    // TODO: Assemble Lua into code variable.
    if (dropdown_mode_type == 'type_0') {
        var mode_type = '0';
    } else {
        var mode_type = '1';
    }
    if (dropdown_switch_type == 'type_0') {
        var switch_type = '0';
    } else {
        var switch_type = '1';
    }
    var code = 'Robot.JogMode(' + value_robot_index + ',' + mode_type + ',' + switch_type + ')\n';
    return code;
};

Blockly.Lua['robot_jog_mode_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.JogMode(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_jog_distance_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var value_distance_value = Blockly.Lua.valueToCode(block, 'distance_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.JogDistance(' + value_robot_index + ',' + value_distance_value + ')\n';
    return code;
};

Blockly.Lua['robot_jog_distance_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.JogDistance(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_calibrate_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_axis_index = block.getFieldValue('axis_index');
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Calib(' + value_robot_index + ',' + dropdown_axis_index + ')\n';
    return code;
};

Blockly.Lua['robot_tool_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var value_tool_name = Blockly.Lua.valueToCode(block, 'tool_name', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Tool(' + value_robot_index + ',' + value_tool_name + ')\n';
    return code;
};

Blockly.Lua['robot_tool_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.Tool(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['robot_user_frame_set'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    var value_user_frame_name = Blockly.Lua.valueToCode(block, 'user_frame_name', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.UserFrame(' + value_robot_index + ',' + value_user_frame_name + ')\n';
    return code;
};

Blockly.Lua['robot_user_frame_get'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Robot.UserFrame(' + value_robot_index + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};