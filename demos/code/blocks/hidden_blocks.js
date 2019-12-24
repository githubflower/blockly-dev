'use strict'

Blockly.Blocks['hidden_on'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Hidden On')
        this.appendDummyInput()
            .appendField('Style : Hidden.On [keyObject]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Hidden.On')
            .appendField(new Blockly.FieldDropdown([['ALL', 'ALL'], ['Location', 'Location'], ['LocationJ', 'LocationJ'], ['DIN', 'DIN'], ['DOUT', 'DOUT'], ['RobotState', 'RobotState']]), 'key_type')
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('digital output set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['hidden_off'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Hidden Off')
        this.appendDummyInput()
            .appendField('Style : Hidden.Off [keyObject]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Hidden.Off')
            .appendField(new Blockly.FieldDropdown([['ALL', 'ALL'], ['Location', 'Location'], ['LocationJ', 'LocationJ'], ['DIN', 'DIN'], ['DOUT', 'DOUT'], ['RobotState', 'RobotState']]), 'key_type')
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('digital output set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['hidden_period_one'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Hidden Period')
        this.appendDummyInput()
            .appendField('Style : Hidden.Period [key],[value]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Hidden.Period')
            .appendField(new Blockly.FieldDropdown([['Location', 'Location'], ['LocationJ', 'LocationJ'], ['DIN', 'DIN'], ['DOUT', 'DOUT'], ['RobotState', 'RobotState']]), 'key_type')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(200, 8, 0xFFFFFFFF, 1), 'time')
            .appendField('ms')
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('digital output set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['hidden_period_all'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Hidden Period')
        this.appendDummyInput()
            .appendField('Style : Hidden.Period [value]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Hidden.Period')
            .appendField(new Blockly.FieldNumber(200, 8, 0xFFFFFFFF, 1), 'time')
            .appendField('ms')
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('digital output set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};