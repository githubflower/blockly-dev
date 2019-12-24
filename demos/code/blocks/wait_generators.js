'use strict';

Blockly.Lua['wait'] = function (block) {
    var field_io_type = block.getFieldValue('io_type');
    var value_io_index = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    var field_value_type = block.getFieldValue('value_type');
    var value_time = Blockly.Lua.valueToCode(block, 'time', Blockly.Lua.ORDER_ATOMIC);
    var field_infinite = block.getFieldValue('infinite');



    // TODO: Assemble Lua into code variable.
    if (field_infinite == 'true') {
        if (true) {
            var code = 'Wait.DOUT(' + 'DOUT[' + value_io_index + '],' + '1)\n';
        }
        else {
            var code = 'IO.set(' + 'DOUT[' + value_io_index + '],' + '0)\n';

        }
    } else {
        if (true) {
            var code = 'Wait.set(' + 'DOUT[' + value_io_index + '],' + '1)\n';
        }
        else {
            var code = 'IO.set(' + 'DOUT[' + value_io_index + '],' + '0)\n';
        }
    }
    return code;
};

Blockly.Lua['waittime'] = function (block) {
    var field_infinite = block.getFieldValue('infinite');
    var value_io_index = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    var field_ = Blockly.Lua.valueToCode(block, 'io_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    if (dropdown_io_state == 'state_on') {
        var code = 'IO.set(' + 'DOUT[' + value_io_index + '],' + '1)\n';
    } else {
        var code = 'IO.set(' + 'DOUT[' + value_io_index + '],' + '0)\n';
    }
    return code;
};