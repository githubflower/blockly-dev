'use strict';

Blockly.Blocks['new_location_joint'] = {
    init: function () {
        this.appendValueInput("location_angle1")
            .setCheck("Number")
            .appendField("new location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("with")
            .appendField("angle1");
        this.appendValueInput("location_angle2")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle2");
        this.appendValueInput("location_angle3")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle3");
        this.appendValueInput("location_angle4")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle4");
        this.appendValueInput("location_angle5")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle5");
        this.appendValueInput("location_angle6")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle6");
        this.appendValueInput("location_angle7")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle7");
        this.appendValueInput("location_angle8")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle8");
        this.appendValueInput("location_angle9")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle9");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("set location joint function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_location_joint'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setOutput(true, "location_joint");
        this.setColour(30);
        this.setTooltip("get location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_location_joint'] = {
    init: function () {
        this.appendValueInput("location_value")
            .setCheck("location_joint")
            .appendField("change location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("change location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_location_joint_member'] = {
    init: function () {
        this.appendValueInput("location_member_value")
            .setCheck("Number")
            .appendField("change member")
            .appendField(new Blockly.FieldDropdown([["angle1", "j1"], ["angle2", "j2"], ["angle3", "j3"], ["angle4", "j4"], ["angle5", "j5"], ["angle6", "j6"], ["angle7", "j7"], ["angle8", "j8"], ["angle9", "j9"]]), "location_member")
            .appendField("of location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("change location joint function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_location_joint_member'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get member")
            .appendField(new Blockly.FieldDropdown([["angle1", "j1"], ["angle2", "j2"], ["angle3", "j3"], ["angle4", "j4"], ["angle5", "j5"], ["angle6", "j6"], ["angle7", "j7"], ["angle8", "j8"], ["angle9", "j9"]]), "location_member")
            .appendField("of location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setOutput(true, "Number");
        this.setColour(30);
        this.setTooltip("get location joint member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['locationj_tofarme'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("to joint");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("robot index");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("locationJ to farme function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['locationj_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("delete location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("delete locationJ function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['locationj_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("print location joint")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("delete locationJ function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};