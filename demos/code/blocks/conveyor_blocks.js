'use strict'

Blockly.Blocks['conveyor_setframe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor SetFrame')
        this.appendDummyInput()
            .appendField('Style : Conveyor.SetFrame [conveyorID] ,[pointName1],[pointName2],[pointName3]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.SetFrame')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('pointName1'), 'name1')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('pointName2'), 'name2')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('pointName3'), 'name3')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_setscale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor SetsCale')
        this.appendDummyInput()
            .appendField('Style : Conveyor.SetScale [conveyorID] ,[pointName1],[encoder1],[pointName2],[encoder2]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.SetFrame')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('pointName1'), 'name1')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(0, -0x7FFFFFFF, 0x7FFFFFFF, 1), 'encoder1')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('pointName2'), 'name2')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(0, -0x7FFFFFFF, 0x7FFFFFFF, 1), 'encoder2')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_setscale_factor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor SetScale')
        this.appendDummyInput()
            .appendField('Style : Conveyor.SetScale [conveyorID] ,[factor]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.SetFrame')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(0, -0x7FFFFFFF, 0x7FFFFFFF, 1), 'factor')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_setlimit'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor SetLimit')
        this.appendDummyInput()
            .appendField('Style : Conveyor.SetLimit [conveyorID] ,[limitID],[mode]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.SetLimit')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
            .appendField(',')
            .appendField(new Blockly.FieldDropdown([['TrackUpLine', '-2'], ['PickUpLine', '-1'], ['StopLine', '0'], ['TrackDownLine', '1'], ['PickDownLine', '2']]), 'limit_type')
            .appendField(',')
            .appendField(new Blockly.FieldDropdown([['GetMode', '1'], ['SetMode', '0']]), 'mode_type')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_insertlimit'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor InsertLimit')
        this.appendDummyInput()
            .appendField('Style : Conveyor.InsertItem [conveyorID] ,[frame],[pointName]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.InsertItem')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'index')
            .appendField(',')
            .appendField(new Blockly.FieldDropdown([['RobotFrame', '0'], ['TrackFrame', '1']]), 'frame_type')
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('pointName1'), 'name1')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_removeitem'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor RemoveItem')
        this.appendDummyInput()
            .appendField('Style : Conveyor.RemoveItem [conveyorID] ,[partID]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.RemoveItem')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'conveyor_id')
            .appendField(',(single mode')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'part_id')
            .appendField('/All mode')
            .appendField(new Blockly.FieldCheckbox(false), 'is_all')
            .appendField(')')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_trackitem'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor TrackItem')
        this.appendDummyInput()
            .appendField('Style : Conveyor.TrackItem [conveyorID] ,[partID]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.TrackItem')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'conveyor_id')
            .appendField(',(single mode')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'part_id')
            .appendField('/All mode')
            .appendField(new Blockly.FieldCheckbox(false), 'is_all')
            .appendField(')')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_infoitempos'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor InfoItemPos')
        this.appendDummyInput()
            .appendField('Style : Conveyor.InfoItemPos [conveyorID] ,[partID]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.InfoItemPos')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'conveyor_id')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'part_id')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_getitem'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor GetItem')
        this.appendDummyInput()
            .appendField('Style : Conveyor.GetItem [conveyorID]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.GetItem')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'conveyor_id')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_depart'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor Depart')
        this.appendDummyInput()
            .appendField('Style : Conveyor.Depart [hight]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.GetItem')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 0.1), 'hight')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_infoconveyor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor InfoConveyor')
        this.appendDummyInput()
            .appendField('Style : Conveyor.InfoConveyor [ID]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.InfoConveyor')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'hight')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_pickoffset_point'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor PickOffset')
        this.appendDummyInput()
            .appendField('Style : Conveyor.PickOffset [pointName]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.PickOffset')
            .appendField(new Blockly.FieldTextInput('pointName1'), 'name1')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_pickoffset_value'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor PickOffset')
        this.appendDummyInput()
            .appendField('Style : Conveyor.PickOffset [value]')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.PickOffset')
            .appendField(new Blockly.FieldNumber(2, -0x7FFFFFFF, 0x7FFFFFFF, 1), 'value')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}

Blockly.Blocks['conveyor_pickoffset'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Conveyor PickOffset')
        this.appendDummyInput()
            .appendField('Style : Conveyor.PickOffset')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Conveyor.PickOffset')
        this.setOutput(true, null)
        this.setColour('%{BKY_VARIABLES_HUE}')
        this.setTooltip('io name index function')
        this.setHelpUrl('https://www.qkmtech.com')
    }
}