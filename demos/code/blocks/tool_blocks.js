'use strict';

Blockly.Blocks['new_tool'] = {
    init: function () {
        this.appendValueInput("tool_x")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("new tool")
            .appendField(new Blockly.FieldTextInput("name"), "tool_name")
            .appendField("with")
            .appendField("x");
        this.appendValueInput("tool_y")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("y");
        this.appendValueInput("tool_z")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("z");
        this.appendValueInput("tool_yaw")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("yaw");
        this.appendValueInput("tool_pitch")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("pitch");
        this.appendValueInput("tool_roll")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("roll");
        this.appendValueInput("tool_mass")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("mass");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("direct")
            .appendField(new Blockly.FieldDropdown([["Positive", "Positive"], ["Negative", "Negative"]]), "tool_direct");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(150);
        this.setTooltip("set tool function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_tool'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("get tool")
            .appendField(new Blockly.FieldTextInput("name"), "tool_name");
        this.setOutput(true, "tool");
        this.setColour(150);
        this.setTooltip("get tool function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_tool_member'] = {
    init: function () {
        this.appendValueInput("tool_member_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("change member")
            .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["z", "z"], ["yaw", "yaw"], ["pitch", "pitch"], ["roll", "roll"], ["mass", "mass"], ["direct", "direct"]]), "tool_member")
            .appendField("of tool")
            .appendField(new Blockly.FieldTextInput("name"), "tool_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(150);
        this.setTooltip("change tool member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_tool_member'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("get member")
            .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["z", "z"], ["yaw", "yaw"], ["pitch", "pitch"], ["roll", "roll"], ["mass", "mass"], ["direct", "direct"]]), "tool_member")
            .appendField("of tool")
            .appendField(new Blockly.FieldTextInput("name"), "tool_name");
        this.setOutput(true, "Number");
        this.setColour(150);
        this.setTooltip("get tool member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['tool_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("delete tool")
            .appendField(new Blockly.FieldTextInput("name"), "tool_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(150);
        this.setTooltip("delete tool function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['tool_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("print tool")
            .appendField(new Blockly.FieldTextInput("name"), "tool_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(150);
        this.setTooltip("print tool function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};