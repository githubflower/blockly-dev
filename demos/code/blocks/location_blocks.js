'use strict';

Blockly.Blocks['new_location'] = {
    init: function () {
        this.appendValueInput("location_x")
            .setCheck("Number")
            .appendField("new location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("with")
            .appendField("X");
        this.appendValueInput("location_y")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Y");
        this.appendValueInput("location_z")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Z");
        this.appendValueInput("location_yaw")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Yaw");
        this.appendValueInput("location_pitch")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Pitch");
        this.appendValueInput("location_roll")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Roll");
        this.appendValueInput("location_config")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Config");
        this.appendValueInput("location_ex1")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Ex1");
        this.appendValueInput("location_ex2")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Ex2");
        this.appendValueInput("location_ex3")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Ex3");
        this.appendValueInput("location_zclearance")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("ZClearance");
        this.appendValueInput("location_zworld")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("ZWorld");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("new location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_location'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setOutput(true, "location");
        this.setColour(290);
        this.setTooltip("get location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_location_member'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get member")
            .appendField(new Blockly.FieldDropdown([["X", "x"], ["Y", "y"], ["Z", "z"], ["Yaw", "yaw"], ["Pitch", "pitch"], ["Roll", "roll"], ["Config", "config"], ["Ext1", "ext1"], ["Ext2", "ext2"], ["Ext3", "ext3"], ["ZClearance", "zclearance"], ["ZWorld", "zworld"]]), "location_member")
            .appendField("of location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("get location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_location'] = {
    init: function () {
        this.appendValueInput("location_value")
            .setCheck("location")
            .appendField("change location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("change location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_location_member'] = {
    init: function () {
        this.appendValueInput("location_member_value")
            .setCheck("Number")
            .appendField("change member")
            .appendField(new Blockly.FieldDropdown([["X", "x"], ["Y", "y"], ["Z", "z"], ["Yaw", "yaw"], ["Pitch", "pitch"], ["Roll", "roll"], ["Config", "config"], ["Ext1", "ext1"], ["Ext2", "ext2"], ["Ext3", "ext3"], ["ZClearance", "zclearance"], ["ZWorld", "zworld"]]), "location_member")
            .appendField("of location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("change location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['location_tojoint'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("to joint");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("robot index");
        this.setOutput(true, "location");
        this.setColour(290);
        this.setTooltip("location to joint function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['location_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("delete location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("delete location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['location_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("print location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("print location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};