'use strict';

Blockly.Blocks['netserver'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('netserver');
        this.appendValueInput('port')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('New NetServer: NetServer')
            .appendField(new Blockly.FieldTextInput('netserver1'), 'name')
            .appendField('=');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_port'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('netserver');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Change NetServer Port:')
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('=')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFF, 1), 'port');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('netserver start');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('NetServer Start:')
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.Start');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_add_client'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('netserver add client');
        this.appendDummyInput()
            .appendField('NetServer Add Client:');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.AddClient "')
            .appendField(new Blockly.FieldTextInput('clientTag1'), 'tag')
            .appendField('",')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'ip1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'ip2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'ip3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(1, 0, 255, 1), 'ip4');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_send'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetServer.Send');
        this.appendDummyInput()
            .appendField('[netServerName].Send [clientTag],[value]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.Send "')
            .appendField(new Blockly.FieldTextInput('clientTag1'), 'tag')
            .appendField('",')
            .appendField(new Blockly.FieldTextInput('value1'), 'value');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_receive'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetServer.Recvive');
        this.appendDummyInput()
            .appendField('[netServerName].Receive [clientTag],[timeOut]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.Recvive "')
            .appendField(new Blockly.FieldTextInput('clientTag1'), 'tag')
            .appendField('",')
            .appendField(new Blockly.FieldNumber(1000, 0, 0xFFFFFFFF, 1), 'time')
            .appendField('ms');
        this.setOutput(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetServer.Stop');
        this.appendDummyInput()
            .appendField('Style : [netServerName].Stop');
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.Stop');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_getstatus'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetServer.GetStatus');
        this.appendDummyInput()
            .appendField('Style : [netServerName].GetStatus [clientTag]');
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.GetStatus "')
            .appendField(new Blockly.FieldTextInput('clientTag1'), 'tag')
            .appendField('"')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetServer.Delete');
        this.appendDummyInput()
            .appendField('Style : [netServerName].Delete');
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.Delete');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['netserver_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetServer.Print');
        this.appendDummyInput()
            .appendField('Style : [netServerName].Print');
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('netServerName1'), 'name')
            .appendField('.Print');
        this.setOutput(true, null);
        this.setColour('%{BKY_VARIABLES_HUE}');
        this.setTooltip('io name index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};