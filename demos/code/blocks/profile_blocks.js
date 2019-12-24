'use strict';

Blockly.Blocks['new_profile'] = {
    init: function () {
        this.appendValueInput("profile_speed")
            .setCheck("Number")
            .appendField("new profile")
            .appendField(new Blockly.FieldTextInput("name"), "profile_name")
            .appendField("with")
            .appendField("speed");
        this.appendValueInput("profile_speed2")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("speed2");
        this.appendValueInput("profile_accel")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("accel");
        this.appendValueInput("profile_decel")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("decel");
        this.appendValueInput("profile_accel_ramp")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("accel ramp");
        this.appendValueInput("profile_decel_ramp")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("decel ramp");
        this.appendValueInput("profile_inrange")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("in range");
        this.appendValueInput("profile_type")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("type");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("set profile function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_profile'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get profile")
            .appendField(new Blockly.FieldTextInput("name"), "profile_name");
        this.setOutput(true, "profile");
        this.setColour(60);
        this.setTooltip("get profile function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_profile_member'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get member")
            .appendField(new Blockly.FieldDropdown([["speed", "speed"], ["speed2", "speed2"], ["accel", "accel"], ["decel", "decel"], ["accel ramp", "accelramp"], ["decel ramp", "decelramp"], ["in range", "inrange"], ["type", "type"]]), "profile_member")
            .appendField("of profile")
            .appendField(new Blockly.FieldTextInput("name"), "profile_name");
        this.setOutput(true, "Number");
        this.setColour(60);
        this.setTooltip("get profile member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_profile'] = {
    init: function () {
        this.appendValueInput("profile_value")
            .setCheck("profile")
            .appendField("change profile")
            .appendField(new Blockly.FieldTextInput("name"), "profile_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("change profile function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_profile_member'] = {
    init: function () {
        this.appendValueInput("profile_member_value")
            .setCheck("Number")
            .appendField("change member")
            .appendField(new Blockly.FieldDropdown([["speed", "speed"], ["speed2", "speed2"], ["accel", "accel"], ["decel", "decel"], ["accel ramp", "accelramp"], ["decel ramp", "decelramp"], ["in range", "inrange"], ["type", "type"]]), "profile_member")
            .appendField("of profile")
            .appendField(new Blockly.FieldTextInput("name"), "profile_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("change profile member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
}

Blockly.Blocks['profile_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Profile Set')
        this.appendDummyInput()
            .appendField('Style : Profile.Set [robotIndex] ,[profileName]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('profileName1'), 'name')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['profile_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Profile Get')
        this.appendDummyInput()
            .appendField('Style : Profile.Get [robotIndex]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['profile_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Profile Delete')
        this.appendDummyInput()
            .appendField('Style : [profileName].Delete')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('profileName1'), 'name')
            .appendField('.Delete')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['profile_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Profile Print')
        this.appendDummyInput()
            .appendField('Style : [profileName].Print')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('profileName1'), 'name')
            .appendField('.Print')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}