'use strict';

Blockly.Lua['new_location'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    var value_location_x = Blockly.Lua.valueToCode(block, 'location_x', Blockly.Lua.ORDER_ATOMIC);
    var value_location_y = Blockly.Lua.valueToCode(block, 'location_y', Blockly.Lua.ORDER_ATOMIC);
    var value_location_z = Blockly.Lua.valueToCode(block, 'location_z', Blockly.Lua.ORDER_ATOMIC);
    var value_location_yaw = Blockly.Lua.valueToCode(block, 'location_yaw', Blockly.Lua.ORDER_ATOMIC);
    var value_location_pitch = Blockly.Lua.valueToCode(block, 'location_pitch', Blockly.Lua.ORDER_ATOMIC);
    var value_location_roll = Blockly.Lua.valueToCode(block, 'location_roll', Blockly.Lua.ORDER_ATOMIC);
    var value_location_config = Blockly.Lua.valueToCode(block, 'location_config', Blockly.Lua.ORDER_ATOMIC);
    var value_location_ex1 = Blockly.Lua.valueToCode(block, 'location_ex1', Blockly.Lua.ORDER_ATOMIC);
    var value_location_ex2 = Blockly.Lua.valueToCode(block, 'location_ex2', Blockly.Lua.ORDER_ATOMIC);
    var value_location_ex3 = Blockly.Lua.valueToCode(block, 'location_ex3', Blockly.Lua.ORDER_ATOMIC);
    var value_location_zclearance = Blockly.Lua.valueToCode(block, 'location_zclearance', Blockly.Lua.ORDER_ATOMIC);
    var value_location_zworld = Blockly.Lua.valueToCode(block, 'location_zworld', Blockly.Lua.ORDER_ATOMIC);
     //TODO: Assemble Lua into code variable.
    var code = 'local ' + text_location_name + ' = ' + 'Location.newByMacro(' +
        '"' + text_location_name + '"' + ',' +
        value_location_x + ',' +
        value_location_y + ',' +
        value_location_z + ',' +
        value_location_yaw + ',' +
        value_location_pitch + ',' +
        value_location_roll + ',' +
        value_location_config + ',' +
        value_location_ex1 + ',' +
        value_location_ex2 + ',' +
        value_location_ex3 + ',' +
        value_location_zclearance + ',' +
        value_location_zworld + ')' + '\n';
    return code;
};

Blockly.Lua['get_location'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = text_location_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['get_location_member'] = function (block) {
    var dropdown_location_member = block.getFieldValue('location_member');
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = text_location_name + '.' + dropdown_location_member;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['change_location'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    var value_location_value = Blockly.Lua.valueToCode(block, 'location_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = text_location_name + '.x ' + ' = ' + value_location_value + '.x\n' +
        text_location_name + '.y' + ' = ' + value_location_value + '.y\n' +
        text_location_name + '.z' + ' = ' + value_location_value + '.z\n' +
        text_location_name + '.yaw' + ' = ' + value_location_value + '.yaw\n' +
        text_location_name + '.pitch' + ' = ' + value_location_value + '.pitch\n' +
        text_location_name + '.roll' + ' = ' + value_location_value + '.roll\n' +
        text_location_name + '.config' + ' = ' + value_location_value + '.config\n' +
        text_location_name + '.ext1' + ' = ' + value_location_value + '.ext1\n' +
        text_location_name + '.ext2' + ' = ' + value_location_value + '.ext2\n' +
        text_location_name + '.ext3' + ' = ' + value_location_value + '.ext3\n' +
        text_location_name + '.zclearance' + ' = ' + value_location_value + '.zclearance\n' +
        text_location_name + '.zworld' + ' = ' + value_location_value + '.zworld\n';
    return code;
};

Blockly.Lua['change_location_member'] = function (block) {
    var dropdown_location_member = block.getFieldValue('location_member');
    var text_location_name = block.getFieldValue('location_name');
    var value_location_member_value = Blockly.Lua.valueToCode(block, 'location_member_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = text_location_name + '.' + dropdown_location_member + ' = ' + value_location_member_value + '\n';
    return code;
};

Blockly.Lua['location_to_joint'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'Location.toJoint(' + text_location_name + ',' + value_robot_index + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.Lua['location_delete'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = 'Location.deleteByMacro(' + text_location_name + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.Lua['location_print'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = 'Location.__tostring(' + text_location_name + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};