'use strict'

Blockly.Blocks['netudp_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('New NetUDP')
        this.appendDummyInput()
            .appendField('Style : NetUDP [udpName]=[remoteIP,remotePort,localPort]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('NetUDP')
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('=')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'ip1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'ip2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'ip3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(1, 0, 255, 1), 'ip4')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 65535, 1), 'remotePort')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 65535, 1), 'localPort')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}
Blockly.Blocks['netudp_change'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Change NetUDP')
        this.appendDummyInput()
            .appendField('Style : [udpName]=[remoteIP,remotePort,localPort]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('=')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'ip1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'ip2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'ip3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(1, 0, 255, 1), 'ip4')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 65535, 1), 'remotePort')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 65535, 1), 'localPort')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netudp_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetUDP.Start')
        this.appendDummyInput()
            .appendField('Style : [udpName].Start')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('.Start')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netudp_send'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetUDP.Send')
        this.appendDummyInput()
            .appendField('Style : [udpName].Send [value]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('.Send')
            .appendField(new Blockly.FieldTextInput('value1'), 'value')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netudp_receive'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetUDP.Receive')
        this.appendDummyInput()
            .appendField('Style : [udpName].Receive [timeout]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('.Recvive')
            .appendField(new Blockly.FieldNumber(1000, 0, 0xFFFFFFFF, 1), 'time')
            .appendField('ms')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netudp_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetUDP.Stop')
        this.appendDummyInput()
            .appendField('Style : [udpName].Stop')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('.Stop')
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

Blockly.Blocks['netudp_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetUDP.Delete')
        this.appendDummyInput()
            .appendField('Style : [udpName].Delete')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('.Delete')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['netudp_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NetUDP.Print')
        this.appendDummyInput()
            .appendField('Style : [udpName].Print')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput('udpName1'), 'name')
            .appendField('.Print')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}