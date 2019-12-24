'use strict';

Blockly.Blocks['wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Wait');
        this.appendDummyInput()
            .appendField('Style : Wait DOUT/DIN([index]), [value], [timeout]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Wait')
            .appendField(new Blockly.FieldDropdown([['DOUT', 'DOUT'], ['DIN', 'DIN']]), 'io_type')
            .appendField('(')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index')
            .appendField(',)')
            .appendField(new Blockly.FieldDropdown([['Off', '0'], ['On', '1']]), 'value_type')
            .appendField(',<Finite Mode:')
            .appendField(new Blockly.FieldNumber(0, 0, 0xFFFFFFFF, 1), 'time')
            .appendField('/Infinite Mode:')
            .appendField(new Blockly.FieldCheckbox(false), 'infinite')
            .appendField('>');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#99CCCE');
        this.setTooltip('wait function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['waittime'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Wait');
        this.appendDummyInput()
            .appendField('Style : WaitTime [value]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('WaitTime')
            .appendField(new Blockly.FieldNumber(0, 0, 0xFFFFFFFF, 1), 'time')
            .appendField('ms');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#99CCCE');
        this.setTooltip('waittime function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};