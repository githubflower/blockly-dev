'use strict';

Blockly.Lua['digital_output_set'] = function (block) {
    var value_io_index = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_io_state = block.getFieldValue('io_state');
    // TODO: Assemble Lua into code variable.
    if (dropdown_io_state == 'state_on') {
        var code = 'IO.set(' + 'DOUT[' + value_io_index + '],' + '1)\n';
    } else {
        var code = 'IO.set(' + 'DOUT[' + value_io_index + '],' + '0)\n';
    }
    return code;
};

Blockly.Lua['digital_iostate_get'] = function (block) {
    var value_io_index = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    var text_io_mode = block.getFieldValue("io_mode");
    // TODO: Assemble Lua into code variable.
    var code = 'IO.get(' + text_io_mode + '[' + value_io_index + '])';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['analog_output_set'] = function (block) {
    var value_io_index = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    var value_io_value = Blockly.Lua.valueToCode(block, 'io_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'IO.set(' + 'AOUT[' + value_io_index + '],' + value_io_value + ')\n';
    return code;
};

Blockly.Lua['analog_input_get'] = function (block) {
    var value_io_index = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'IO.get(' + 'AIN[' + value_io_index + '])';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};