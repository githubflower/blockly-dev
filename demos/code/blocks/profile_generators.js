'use strict';

Blockly.Lua['new_profile'] = function (block) {
    var text_profile_name = block.getFieldValue('profile_name');
    var value_profile_speed = Blockly.Lua.valueToCode(block, 'profile_speed', Blockly.Lua.ORDER_ATOMIC);
    var value_profile_speed2 = Blockly.Lua.valueToCode(block, 'profile_speed2', Blockly.Lua.ORDER_ATOMIC);
    var value_profile_accel = Blockly.Lua.valueToCode(block, 'profile_accel', Blockly.Lua.ORDER_ATOMIC);
    var value_profile_decel = Blockly.Lua.valueToCode(block, 'profile_decel', Blockly.Lua.ORDER_ATOMIC);
    var value_profile_accel_ramp = Blockly.Lua.valueToCode(block, 'profile_accel_ramp', Blockly.Lua.ORDER_ATOMIC);
    var value_profile_decel_ramp = Blockly.Lua.valueToCode(block, 'profile_decel_ramp', Blockly.Lua.ORDER_ATOMIC);
    var value_profile_inrange = Blockly.Lua.valueToCode(block, 'profile_inrange', Blockly.Lua.ORDER_ATOMIC);
    //var value_profile_type = Blockly.Lua.valueToCode(block, 'profile_type', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'local ' + text_profile_name + ' = ' + 'Profile.newByMacro(' +
        '"' + text_profile_name + '"' + ',' +
        value_profile_speed + ',' +
        value_profile_speed2 + ',' +
        value_profile_accel + ',' +
        value_profile_decel + ',' +
        value_profile_accel_ramp + ',' +
        value_profile_decel_ramp + ',' +
        value_profile_inrange + ')' + '\n';
    return code;
};

Blockly.Lua['get_profile'] = function (block) {
    var text_profile_name = block.getFieldValue('profile_name');
    // TODO: Assemble Lua into code variable.
    var code = text_profile_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['get_profile_member'] = function (block) {
    var dropdown_profile_member = block.getFieldValue('profile_member');
    var text_profile_name = block.getFieldValue('profile_name');
    // TODO: Assemble Lua into code variable.
    var code = text_profile_name + '.' + dropdown_profile_member;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['change_profile'] = function (block) {
    var text_profile_name = block.getFieldValue('profile_name');
    var value_profile_value = Blockly.Lua.valueToCode(block, 'profile_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = text_profile_name + '.speed' + ' = ' + value_profile_value + '.speed\n' +
        text_profile_name + '.speed2' + ' = ' + value_profile_value + '.speed2\n' +
        text_profile_name + '.accel' + ' = ' + value_profile_value + '.accel\n' +
        text_profile_name + '.decel' + ' = ' + value_profile_value + '.decel\n' +
        text_profile_name + '.accelramp' + ' = ' + value_profile_value + '.accelramp\n' +
        text_profile_name + '.decelramp' + ' = ' + value_profile_value + '.decelramp\n' +
        text_profile_name + '.inrange' + ' = ' + value_profile_value + '.inrange\n' +
        text_profile_name + '.type' + ' = ' + value_profile_value + '.type\n';
    return code;
};

Blockly.Lua['change_profile_member'] = function (block) {
    var dropdown_profile_member = block.getFieldValue('profile_member');
    var text_profile_name = block.getFieldValue('profile_name');
    var value_profile_member_value = Blockly.Lua.valueToCode(block, 'profile_member_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = text_profile_name + '.' + dropdown_profile_member + ' = ' + value_profile_member_value + '\n';
    return code;
};