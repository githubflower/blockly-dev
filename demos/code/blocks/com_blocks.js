'use strict';

Blockly.Blocks['com'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com');
        this.appendDummyInput()
            .appendField('Com')
            .appendField(new Blockly.FieldTextInput('comName1'), 'com_name')
            .appendField('=')
            .appendField(new Blockly.FieldDropdown([['COM1', 'COM1'], ['COM2', 'COM2']]), 'com_type')
            .appendField(',')
            .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['38400', '38400'], ['19200', '19200'], ['9600', '9600'], ['4800', '4800']]), 'baudrate_type')
            .appendField(',8,1,')
            .appendField(new Blockly.FieldDropdown([['None', '0'], ['Odd', '1'], ['Even', '2']]), 'parity_type');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('digital output set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_open'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com open');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('.Open');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_send'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com send');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('.Send')
            .appendField(new Blockly.FieldTextInput('stringData'), 'data');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_receive'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com receive');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Com Name')
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('Receive timeout')
            .appendField(new Blockly.FieldNumber(1000, 0, 0xFFFFFFFF, 1), 'data')
            .appendField('ms');
        this.setOutput(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_flush'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com flush');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Com Name')
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('Flush');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_close'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com close');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Com Name')
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('Close');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com flush');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Com Name')
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('Delete');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['com_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('com print');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Com Name')
            .appendField(new Blockly.FieldTextInput('comName1'), 'name')
            .appendField('Close');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LISTS_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};