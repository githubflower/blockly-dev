'use strict';

Blockly.Blocks['robot_power_enable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot power enable ');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('state')
            .appendField(new Blockly.FieldDropdown([['true', 'power_enable_on'], ['false', 'power_enable_off']]), 'power_enable_state');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot power enable function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_home'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot home: with');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot home function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_brake_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot brake set');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('state')
            .appendField(new Blockly.FieldDropdown([['free', 'brake_free'], ['unfree', 'brake_unfree']]), 'brake_state');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['All', '0']]), 'axis_index');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot brake set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_brake_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot brake get');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot brake set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_brake_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot brake state get with: ');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setOutput(true, 'Array');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot brake get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_where'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot where');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setOutput(true, 'location');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot where function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_where_angle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot where angle');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setOutput(true, 'location_joint');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot where angle function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_limit_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot limit set');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('positive')
            .appendField(new Blockly.FieldAngle(0), 'angle_p');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('nagetive')
            .appendField(new Blockly.FieldAngle(30), 'angle_n');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot limit set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_limit_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot limit get with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.setInputsInline(false);
        this.setOutput(true, 'Array');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot limit get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_frame_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot frame set with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('type')
            .appendField(new Blockly.FieldDropdown([['joint', 'type_1'], ['world', 'type_2'], ['tool', 'type_3'], ['user frame', 'type_4']]), 'frame_type');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_frame_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot frame get with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setOutput(true, 'Number');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot frame get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_axis_numbe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot axis number get');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, 'Number');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot axis number get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_speed_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot speed set with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('speed[0-100]')
            .appendField(new Blockly.FieldNumber(0, 0, 100, 0.01), 'speed_value')
            .appendField('%');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot speed set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_speed_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot speed get with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setOutput(true, 'Number');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot speed get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_state'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot state get');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot serve/home/running state get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_jog_mode_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot jog mode set with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('mode')
            .appendField(new Blockly.FieldDropdown([['continue', 'type_0'], ['step', 'type_1']]), 'mode_type');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('switch')
            .appendField(new Blockly.FieldDropdown([['on', 'type_0'], ['off', 'type_1']]), 'switch_type');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot jog mode set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_jog_mode_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot jog mode get with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setOutput(true, 'Array');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot jog mode get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_jog_distance_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot jog distance set with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendValueInput('distance_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('distance');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot jog distance set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_jog_distance_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot jog distance get with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setOutput(true, 'Number');
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot jog distance get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_calib_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot calib set');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.appendValueInput('encoder_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('encoder value');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot calibrate set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_calib_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot calib get');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot calibrate set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_tool_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot tool set with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendValueInput('tool_name')
            .setCheck('tool')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('tool');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot tool set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_user_frame_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot user frame set with:');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendValueInput('user_frame_name')
            .setCheck('user_frame')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('user frame name');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_payload_set_quality'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot payload set');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendValueInput('payload_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('quality mode  encoder value');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot calibrate set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_payload_set_inertia'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot payload set');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['Quality', '0'], ['Inertia', '1']]), 'payload_type');
        this.appendValueInput('payload_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('encoder value');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot calibrate set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['robot_payload_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot payload get');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot calibrate set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_encoder'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot encoder');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_target_location_joint'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot target location joint');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_target_location'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot target location');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_joint_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot joint speed');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_tcp_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot tcp speed');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_target_joint_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot target joint speed');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_target_tcp_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot target tcp speed');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_joint_torque'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot joint torque');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['All', '0']]), 'axis_index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['robot_joint_temperature'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('robot joint temperature');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['All', '0']]), 'axis_index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_MATH_HUE}');
        this.setTooltip('robot user frame set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};