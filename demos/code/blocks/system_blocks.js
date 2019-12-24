'use strict';

Blockly.Blocks['system_log_count'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Log');
        this.appendDummyInput()
            .appendField('Style : Syetem.Log [count], [level]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Log')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('system log count(1-2000)')
            .appendField(new Blockly.FieldNumber(1, 1, 2000, 1), 'count');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('log level')
            .appendField(new Blockly.FieldDropdown([['All', 'all'], ['Warning', 'warn'], ['Error', 'error'], ['Serious', 'serious'], ['Fatal', 'fatal']]), 'log_type');
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('system log function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_log'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Log');
        this.appendDummyInput()
            .appendField('Style : Syetem.Log [count]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Log')
            .appendField(new Blockly.FieldNumber(1, 1, 2000, 1), 'count');
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('system log function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_info_robot_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Info');
        this.appendDummyInput()
            .appendField('Style : System.Info [NRobots]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Info NRobots');
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('system info robot number function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_info_index'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Info');
        this.appendDummyInput()
            .appendField('Style : System.Info [CPU]/[Memory]/[Version]/[AuxEncoder], [index]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Info')
            .appendField(new Blockly.FieldDropdown([['CPU', 'CPU'], ['Version', 'Version'], ['Memory', 'Memory'], ['AuxEncoder', 'AuxEncoder']]), 'info_type')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'robot_index')
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('get one of system cpu/memory/version/auxencoder info form robot index function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_info_all'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Info');
        this.appendDummyInput()
            .appendField('Style : System.Info [CPU]/[Memory]/[Version]/[AuxEncoder], [ALL]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Info')
            .appendField(new Blockly.FieldDropdown([['CPU', 'CPU'], ['Version', 'Version'], ['Memory', 'Memory']]), 'info_type')
            .appendField(',')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'robot_index');
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('get one of system cpu/memory/version info function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_info_din'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Info');
        this.appendDummyInput()
            .appendField('Style : System.Info [DIN],[index1],...[index10]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Info')
            .appendField('index1')
            .appendField(new Blockly.FieldCheckbox(true), 'enable_index1')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index1')
            .appendField('index2')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index2')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index2')
            .appendField('index3')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index3')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index3');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index4')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index4')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index4')
            .appendField('index5')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index5')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index5')
            .appendField('index6')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index6')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index6');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index7')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index7')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index7')
            .appendField('index8')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index8')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index8')
            .appendField('index9')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index9')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index9')
            .appendField('index10')
            .appendField(new Blockly.FieldCheckbox(false), 'enable_index10')
            .appendField(new Blockly.FieldNumber(1, 1, 0xFFFFFFFF, 1), 'io_index10');
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('system info function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_time_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Time');
        this.appendDummyInput()
            .appendField('Style : System.Time [value]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Time')
            .appendField(new Blockly.FieldTextInput('2018-12-04 15:15:21.000'), 'time');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('set system time function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_time_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Time');
        this.appendDummyInput()
            .appendField('Style : System.Time');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Time')
        this.setOutput(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('get system time function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Start');
        this.appendDummyInput()
            .appendField('Style : System.Start');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('System.Start')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#CDDD9C');
        this.setTooltip('system start function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_abort'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('System.Abort');
        this.appendDummyInput()
            .appendField('Style : System.Abort [Now]/[MoveDone]');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([['Now', '0'], ['MoveDone', '1']]), 'abort_type');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system abort function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_stop'] = {
    init: function () {
        this.appendValueInput('robot_index')
            .appendField('system stop')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system stop function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_pause'] = {
    init: function () {
        this.appendValueInput('robot_index')
            .appendField('system pause')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system pause function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_continue'] = {
    init: function () {
        this.appendValueInput('robot_index')
            .appendField('system continue')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system continue function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_retry'] = {
    init: function () {
        this.appendValueInput('robot_index')
            .appendField('system retry')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('index');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system retry function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_speed_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system speed');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('set[0-100]')
            .appendField(new Blockly.FieldNumber(0, 0, 100, 0.01), 'speed_value')
            .appendField('%');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system speed set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_speed_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system speed get');
        this.setOutput(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system speed get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_login'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system login with:');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([['Admin', '0'], ['opertator', '1'], ['user', '2']]), 'access_value')
            .appendField('access');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system login function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_logout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system logout');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system logout function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_idnstring_set'] = {
    init: function () {
        this.appendValueInput('data_id')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('system idn string set data id')
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('device index')
            .appendField(new Blockly.FieldDropdown([['Comm', '1'], ['Cell', '2']]), 'device_type');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([['Cell1', '1'], ['Cell2', '2'], ['Cell3', '3'], ['Cell4', '4'], ['Cell5', '5'], ['Cell6', '6']]), 'unit_type')
        this.appendValueInput('idn_value')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('idnstring');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system idnstring set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_idnstring_get'] = {
    init: function () {
        this.appendValueInput('data_id')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('system idn string set data id')
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('device index')
            .appendField(new Blockly.FieldDropdown([['Comm', '1'], ['Cell', '2']]), 'device_type');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([['Cell1', '1'], ['Cell2', '2'], ['Cell3', '3'], ['Cell4', '4'], ['Cell5', '5'], ['Cell6', '6']]), 'unit_type');
        this.setInputsInline(false);
        this.setOutput(true, 'null');
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system idnstring set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_clear_error_list'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('system clear error list')
            .appendField(new Blockly.FieldDropdown([['One', ''], ['All', 'ALL']]), 'clear_type');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system clear error list function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_error_list'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('system error list')
            .appendField(new Blockly.FieldDropdown([['One', ''], ['All', 'ALL']]), 'clear_type');
        this.setOutput(true, null)
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system clear error list function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_clear_variables'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system clear variables');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system clear variables function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_set_ip'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system set ip')
        this.appendDummyInput()
            .appendField('comm linux ip address')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'ip1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'ip2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'ip3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(120, 0, 255, 1), 'ip4')
        this.appendDummyInput()
            .appendField('comm linux broadcast address')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'broadcast1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'broadcast2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'broadcast3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(255, 0, 255, 1), 'broadcast4')
        this.appendDummyInput()
            .appendField('comm linux mask address')
            .appendField(new Blockly.FieldNumber(255, 0, 255, 1), 'mask1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(255, 0, 255, 1), 'mask2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(255, 0, 255, 1), 'mask3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(0, 0, 255, 1), 'mask4')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system clear variables function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_save'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('system save');
        this.appendValueInput('robot_index')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('robot index');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('file index')
            .appendField(new Blockly.FieldDropdown([['File All', '0'], ['File One', '1'], ['File Two', '2']]), 'file_type');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('file index')
            .appendField(new Blockly.FieldDropdown([['Save', '0'], ['Save As', '1']]), 'save_type');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system auto set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_get_ip'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system get ip')
        this.setOutput(true, null)
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system get ip function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_set_gateway'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system set gateway')
            .appendField(new Blockly.FieldNumber(192, 0, 255, 1), 'gateway1')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(168, 0, 255, 1), 'gateway2')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(10, 0, 255, 1), 'gateway3')
            .appendField('.')
            .appendField(new Blockly.FieldNumber(1, 0, 255, 1), 'gateway4')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system get ip function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_get_gateway'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system get gateway')
        this.setOutput(true, null)
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system get ip function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};

Blockly.Blocks['system_auto_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system auto set');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('mode')
            .appendField(new Blockly.FieldDropdown([['manual', '0'], ['automatic', '1']]), 'mode_type');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system auto set function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};
Blockly.Blocks['system_auto_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('system auto get');
        this.setInputsInline(false);
        this.setOutput(true, 'Number');
        this.setColour('%{BKY_LOOPS_HUE}');
        this.setTooltip('system auto get function');
        this.setHelpUrl('https://www.qkmtech.com');
    }
};