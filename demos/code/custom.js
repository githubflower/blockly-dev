var setNameJson = {
  "message0": "setName to %1 %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "First Name"
    },
    {"type": "input_value", "name": "VALUE", "check": "String"}
  ],
  "args1": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "Last Name"
    },
    {"type": "input_value", "name": "VALUE", "check": "String"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['set_name'] = {
  init: function() {
    this.jsonInit(setNameJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a string to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};