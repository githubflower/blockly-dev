'use strict'

Blockly.Blocks['netclient_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('New NetClient')
        this.appendDummyInput()
            .appendField('Style : NetClient [clientName]=[IP,port]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('NetClient')
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('=')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'ip1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'ip2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(0, 0, 255, 1), 'ip3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'ip4')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 65535, 1), 'port')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}
Blockly.Blocks['netclient_change'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Change NetClient')
        this.appendDummyInput()
            .appendField('Style : [clientName]=[IP,port]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('=')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'ip1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'ip2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(0, 0, 255, 1), 'ip3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'ip4')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 65535, 1), 'port')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}
Blockly.Blocks['netclient_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.Connect')
        this.appendDummyInput()
            .appendField('Style : [clientName].Connnet')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.Connect')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netclient_send'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.Send')
        this.appendDummyInput()
            .appendField('Style : [clientName].Send [value]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.Send')
            .appendField(new Blockly.FieldTextInput('value1'), 'value')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netclient_receive'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.Receive')
        this.appendDummyInput()
            .appendField('Style : [clientName].Receive [timeout]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.Recvive')
            .appendField(new Blockly.FieldNumber(1000, 0, 0xFFFFFFFF, 1), 'time')
            .appendField('ms')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netclient_disconnect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.Disconnect')
        this.appendDummyInput()
            .appendField('Style : [clientName].Disconnnet')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.Disconnnet')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netclient_getstatus'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.GetStatus')
        this.appendDummyInput()
            .appendField('Style : [clientName].GetStatus')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.GetStatus')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netclient_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.Delete')
        this.appendDummyInput()
            .appendField('Style : [clientName].Delete')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.Delete')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netclient_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetClient.Print')
        this.appendDummyInput()
            .appendField('Style : [clientName].Print')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('clientName1'), 'name')
            .appendField('.Print')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}