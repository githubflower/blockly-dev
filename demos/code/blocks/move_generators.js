'use strict';

Blockly.Lua['move_joint'] = function (block) {
    var value_point_value = Blockly.Lua.valueToCode(block, 'point_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Joint(' + value_point_value + ')\n';
    return code;
};

Blockly.Lua['move_line'] = function (block) {
    var value_point_value = Blockly.Lua.valueToCode(block, 'point_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Line(' + value_point_value + ')\n';
    return code;
};

Blockly.Lua['move_axis'] = function (block) {
    var dropdown_axis_index = block.getFieldValue('axis_index');
    var number_angle_value = block.getFieldValue('angle_value');
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Axis(' + dropdown_axis_index + ',' + number_angle_value + ')\n';
    return code;
};

Blockly.Lua['move_joint_offset'] = function (block) {
    var value_x_value = Blockly.Lua.valueToCode(block, 'x_value', Blockly.Lua.ORDER_ATOMIC);
    var value_y_value = Blockly.Lua.valueToCode(block, 'y_value', Blockly.Lua.ORDER_ATOMIC);
    var value_z_value = Blockly.Lua.valueToCode(block, 'z_value', Blockly.Lua.ORDER_ATOMIC);
    var value_piont_value = Blockly.Lua.valueToCode(block, 'piont_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    if (value_piont_value == '') {
        var code = 'Move.JOffset(' + value_x_value + ',' + value_y_value + ',' + value_z_value + ')\n';
    } else {
        var code = 'Move.JOffset(' + value_x_value + ',' + value_y_value + ',' + value_z_value + ',' + value_piont_value + ')\n';
    }
    return code;
};

Blockly.Lua['move_line_offset'] = function (block) {
    var value_x_value = Blockly.Lua.valueToCode(block, 'x_value', Blockly.Lua.ORDER_ATOMIC);
    var value_y_value = Blockly.Lua.valueToCode(block, 'y_value', Blockly.Lua.ORDER_ATOMIC);
    var value_z_value = Blockly.Lua.valueToCode(block, 'z_value', Blockly.Lua.ORDER_ATOMIC);
    var value_piont_value = Blockly.Lua.valueToCode(block, 'piont_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    if (value_piont_value == '') {
        var code = 'Move.LOffset(' + value_x_value + ',' + value_y_value + ',' + value_z_value + ')\n';
    } else {
        var code = 'Move.LOffset(' + value_x_value + ',' + value_y_value + ',' + value_z_value + ',' + value_piont_value + ')\n';
    }
    return code;
};

Blockly.Lua['move_arc'] = function (block) {
    var value_piont1_value = Blockly.Lua.valueToCode(block, 'piont1_value', Blockly.Lua.ORDER_NONE);
    var value_piont2_value = Blockly.Lua.valueToCode(block, 'piont2_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Arc(' + value_piont1_value + ',' + value_piont2_value + ')\n';
    return code;
};

Blockly.Lua['move_circle'] = function (block) {
    var value_piont1_value = Blockly.Lua.valueToCode(block, 'piont1_value', Blockly.Lua.ORDER_NONE);
    var value_piont2_value = Blockly.Lua.valueToCode(block, 'piont2_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Circle(' + value_piont1_value + ',' + value_piont2_value + ')\n';
    return code;
};

Blockly.Lua['move_jog'] = function (block) {
    var dropdown_axis_index = block.getFieldValue('axis_index');
    var value_speed_value = Blockly.Lua.valueToCode(block, 'speed_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Jog(' + '"' + dropdown_axis_index + '"' + ',' + value_speed_value + ')\n';
    return code;
};

Blockly.Lua['move_stop_jog'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'Move.StopJog()\n';
    return code;
};

Blockly.Lua['move_trigger'] = function (block) {
    var dropdown_type_value = block.getFieldValue('type_value');
    var dropdown_reference_position_value = block.getFieldValue('reference_position_value');
    var value_distance_value = Blockly.Lua.valueToCode(block, 'distance_value', Blockly.Lua.ORDER_ATOMIC);
    var value_do_index = Blockly.Lua.valueToCode(block, 'do_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_do_status = block.getFieldValue('do_status');
    // TODO: Assemble Lua into code variable.
    switch (dropdown_type_value) {
        case 'type_t_p':
            var type = '1';
            break;
        case 'type_t':
            var type = '2';
            break;
        case 'type_d_p':
            var type = '3';
            break;
        case 'type_d':
            var type = '4';
    }
    switch (dropdown_reference_position_value) {
        case 'r_p_start':
            var reference_position = '1';
            break;
        case 'r_p_end':
            var reference_position = '2';
            break;
        case 'r_p_specific':
            var reference_position = '3';
    }
    if (dropdown_do_status == 'status_on') {
        var do_status = 1;
    } else {
        var do_status = 0;
    }
    var code = 'Move.Trigger(' + type + ',' + reference_position + ',' + value_distance_value + ',' + 'DOUT[' + value_do_index + '],' + do_status + ')\n';
    return code;
};

Blockly.Lua['move_jump'] = function (block) {
    var value_point_value = Blockly.Lua.valueToCode(block, 'point_value', Blockly.Lua.ORDER_NONE);
    var value_height_value = Blockly.Lua.valueToCode(block, 'height_value', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_trigger_id1_value = block.getFieldValue('trigger_id1_value');
    var dropdown_trigger_id2_value = block.getFieldValue('trigger_id2_value');
    var dropdown_trigger_id3_value = block.getFieldValue('trigger_id3_value');
    var dropdown_trigger_id4_value = block.getFieldValue('trigger_id4_value');
    // TODO: Assemble Lua into code variable.
    var code = 'Move.Jump(' + value_point_value + ',' +
        value_height_value + ',' +
        dropdown_trigger_id1_value + ',' +
        dropdown_trigger_id2_value + ',' +
        dropdown_trigger_id3_value + ',' +
        dropdown_trigger_id4_value + ')\n';
    return code;
};

Blockly.Lua['move_blend'] = function (block) {
    var dropdown_mode_value = block.getFieldValue('mode_value');
    var value_blending_value = Blockly.Lua.valueToCode(block, 'blending_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    switch (dropdown_mode_value) {
        case 'mode_1':
            var mode_value = '1';
            break;
        case 'mode_2':
            var mode_value = '2';
            break;
        case 'mode_3':
            var mode_value = '3';
    }
    var code = 'Move.Blend(' + mode_value + ',' + value_blending_value + ')\n';
    return code;
};

Blockly.Lua['move_wait_for_eom'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'Move.WaitForEOM()\n';
    return code;
};