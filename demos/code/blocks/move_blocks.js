'use strict';

Blockly.Blocks['move_joint'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move joint with:');
        this.appendValueInput('point_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move joint function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_line'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move line with:');
        this.appendValueInput('point_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move line function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_axis'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move axis with:');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '3'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']]), 'axis_index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('angle')
            .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), 'angle_value')
            .appendField('deg');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move axis function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_joint_offset'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('move joint offset with:');
        this.appendValueInput('x_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest x');
        this.appendValueInput('y_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest y');
        this.appendValueInput('z_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest z');
        this.appendValueInput('yaw_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest yaw');
        this.appendValueInput('pitch_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest pitch');
        this.appendValueInput('roll_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest roll');
        this.appendValueInput('piont_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move joint offset function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_line_offset'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('move line offset with:');
        this.appendValueInput('x_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest x');
        this.appendValueInput('y_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest y');
        this.appendValueInput('z_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest z');
        this.appendValueInput('yaw_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest yaw');
        this.appendValueInput('pitch_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest pitch');
        this.appendValueInput('roll_offest')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('offest roll');
        this.appendValueInput('piont_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move line offset function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_arc'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move arc');
        this.appendValueInput('piont1_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point1');
        this.appendValueInput('piont2_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point2');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move arc function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_circle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move circle');
        this.appendValueInput('piont1_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point1');
        this.appendValueInput('piont2_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point2');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move circle function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_jog'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move jog');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('axis index')
            .appendField(new Blockly.FieldDropdown([['X', 'X'], ['Y', 'Y'], ['Z', 'Z'], ['Yaw', 'Yaw'], ['Pitch', 'Pitch'], ['Roll', 'Roll'], ['J1', 'J1'], ['J2', 'J2'], ['J3', 'J3'], ['J4', 'J4'], ['J5', 'J5'], ['J6', 'J6'], ['J7', 'J7'], ['J8', 'J8'], ['J9', 'J9']]), 'axis_index');
        this.appendValueInput('speed_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('jog speed');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move jog function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_stop_jog'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move stop jog');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move stop jog function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_trigger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move trigger with:');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('type')
            .appendField(new Blockly.FieldDropdown([['time percentage', 'type_t_p'], ['time', 'type_t'], ['distance percentage', 'type_d_p'], ['distance', 'type_d']]), 'type_value');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('reference position')
            .appendField(new Blockly.FieldDropdown([['start', 'r_p_start'], ['end', 'r_p_end'], ['specific', 'r_p_specific']]), 'reference_position_value');
        this.appendValueInput('distance_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('distance');
        this.appendValueInput('do_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('DO index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('DO status')
            .appendField(new Blockly.FieldDropdown([['on', 'status_on'], ['off', 'status_off']]), 'do_status');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move trigger function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_jump'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('move jump with:');
        this.appendValueInput('point_value')
            .setCheck(['location', 'location_joint'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('point');
        this.appendValueInput('height_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('height');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('trigger ID1')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]), 'trigger_id1_value');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('trigger ID2')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]), 'trigger_id2_value');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('trigger ID3')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]), 'trigger_id3_value');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('trigger ID4')
            .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]), 'trigger_id4_value');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move jump function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_blend'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move blend with:');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('blending mode')
            .appendField(new Blockly.FieldDropdown([['percentage', 'mode_1'], ['distance', 'mode_2'], ['null', 'mode_3']]), 'mode_value');
        this.appendValueInput('blending_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('value');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move blend function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['move_wait_for_eom'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('move wait for EOM');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_TEXTS_HUE}');
        this.setTooltip('move wait for EOM function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};