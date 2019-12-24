'use strict';

Blockly.Blocks['io_name'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io name');
        this.appendDummyInput()
            .appendField('io type')
            .appendField(new Blockly.FieldDropdown([['Din', 'DIN'], ['Dout', 'DOUT'], ['Ain', 'AIN'], ['Aout', 'AOUT']]), 'io_type');
        this.appendValueInput('io_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io name')
            .appendField(new Blockly.FieldTextInput('io1'), 'name');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('digital output set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['io_index'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('io1'), 'name')
            .appendField('.Index');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['io_name_pulse'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io pulse');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io name')
            .appendField(new Blockly.FieldTextInput('io1'), 'name')
            .appendField('.Pulse On')
            .appendField(new Blockly.FieldNumber(0, 0, 0xFFFFFFFF, 0.1), 'pulse_time')
            .appendField('ms Off');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['io_pulse'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io pulse');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('IO.Pulse [DOUT]')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index')
            .appendField('On')
            .appendField(new Blockly.FieldNumber(0, 0, 0xFFFFFFFF, 0.1), 'pulse_time')
            .appendField('ms Off');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['io_set_dout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io set');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('IO.Set DOUT(')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index')
            .appendField('),')
            .appendField(new Blockly.FieldDropdown([['On', '1'], ['Off', '0']]), 'io_type');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['io_set_aout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io set');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('IO.Set AOUT(')
            .appendField(new Blockly.FieldNumber(1, 1, 0x7FFFFFFF, 1), 'io_index')
            .appendField('),')
            .appendField(new Blockly.FieldNumber(0, -0x7FFFFFFF, 0x7FFFFFFF, 1), 'io_value');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['io_set_dout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io set');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('IO.Set DOUT(')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index')
            .appendField('),')
            .appendField(new Blockly.FieldDropdown([['On', '1'], ['Off', '0']]), 'io_type');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['io_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io get');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('IO.Get ')
            .appendField(new Blockly.FieldDropdown([['DIN', 'DIN'], ['DOUT', 'DOUT'], ['AIN', 'AIN'], ['AOUT', 'AOUT']]), 'io_type')
            .appendField('(')
            .appendField(new Blockly.FieldNumber(1, 1, 0x7FFFFFFF, 1), 'io_index')
            .appendField(')');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['io_get_name'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io get');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io name')
            .appendField(new Blockly.FieldTextInput('io1'), 'name')
            .appendField('.Get');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};


Blockly.Blocks['io_default'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io default');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('IO.Default DOUT')
            .appendField('(')
            .appendField(new Blockly.FieldNumber(1, 1, 0x7FFFFFFF, 1), 'io_index')
            .appendField(')');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['io_default_name'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io default');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io name')
            .appendField(new Blockly.FieldTextInput('io1'), 'name')
            .appendField('.Default');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['io_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io delete');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io name')
            .appendField(new Blockly.FieldTextInput('io1'), 'name')
            .appendField('.Delete');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['io_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('io print');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('io name')
            .appendField(new Blockly.FieldTextInput('io1'), 'name')
            .appendField('.Print');
        this.setOutput(true, null);
        this.setColour('%{BKY_COLOUR_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};