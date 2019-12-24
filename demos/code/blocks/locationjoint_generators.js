'use strict';

Blockly.Lua['new_location_joint'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    var value_location_angle1 = Blockly.Lua.valueToCode(block, 'location_angle1', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle2 = Blockly.Lua.valueToCode(block, 'location_angle2', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle3 = Blockly.Lua.valueToCode(block, 'location_angle3', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle4 = Blockly.Lua.valueToCode(block, 'location_angle4', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle5 = Blockly.Lua.valueToCode(block, 'location_angle5', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle6 = Blockly.Lua.valueToCode(block, 'location_angle6', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle7 = Blockly.Lua.valueToCode(block, 'location_angle7', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle8 = Blockly.Lua.valueToCode(block, 'location_angle8', Blockly.Lua.ORDER_ATOMIC);
    var value_location_angle9 = Blockly.Lua.valueToCode(block, 'location_angle9', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'local ' + text_location_name + ' = ' + 'LocationJoint.newByMacro(' +
        '"' + text_location_name + '"' + ',' +
        value_location_angle1 + ',' +
        value_location_angle2 + ',' +
        value_location_angle3 + ',' +
        value_location_angle4 + ',' +
        value_location_angle5 + ',' +
        value_location_angle6 + ',' +
        value_location_angle7 + ',' +
        value_location_angle8 + ',' +
        value_location_angle9 + ')' + '\n';
    return code;
};

Blockly.Lua['get_location_joint'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = text_location_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['change_location_joint'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    var value_location_value = Blockly.Lua.valueToCode(block, 'location_value', Blockly.Lua.ORDER_NONE);
    // TODO: Assemble Lua into code variable.
    var code = text_location_name + '.j1' + ' = ' + value_location_value + '.j1\n' +
        text_location_name + '.j2' + ' = ' + value_location_value + '.j2\n' +
        text_location_name + '.j3' + ' = ' + value_location_value + '.j3\n' +
        text_location_name + '.j4' + ' = ' + value_location_value + '.j4\n' +
        text_location_name + '.j5' + ' = ' + value_location_value + '.j5\n' +
        text_location_name + '.j6' + ' = ' + value_location_value + '.j6\n' +
        text_location_name + '.j7' + ' = ' + value_location_value + '.j7\n' +
        text_location_name + '.j8' + ' = ' + value_location_value + '.j8\n' +
        text_location_name + '.j9' + ' = ' + value_location_value + '.j9\n';
    return code;
};

Blockly.Lua['change_location_joint_member'] = function (block) {
    var dropdown_location_member = block.getFieldValue('location_member');
    var text_location_name = block.getFieldValue('location_name');
    var value_location_member_value = Blockly.Lua.valueToCode(block, 'location_member_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = text_location_name + '.' + dropdown_location_member + ' = ' + value_location_member_value + '\n';
    return code;
};

Blockly.Lua['get_location_joint_member'] = function (block) {
    var dropdown_location_member = block.getFieldValue('location_member');
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = text_location_name + '.' + dropdown_location_member;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['location_joint_to_farme'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'LocationJoint.toframe(' + text_location_name + ',' + value_robot_index + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.Lua['location_joint_delete'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = 'LocationJoint.deleteByMacro(' + text_location_name + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.Lua['location_joint_print'] = function (block) {
    var text_location_name = block.getFieldValue('location_name');
    // TODO: Assemble Lua into code variable.
    var code = 'LocationJoint.__tostring(' + text_location_name + ')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};