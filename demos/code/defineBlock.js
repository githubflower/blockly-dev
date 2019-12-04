var setNameJson = {
  "message0": "set FirstName to %1%2",
  "message1": "set LastName to %1%2",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR0",
      "variable": "First Name"
    },
    {"type": "input_value", "name": "VALUE0", "check": "String"}
  ],
  "args1": [
    {
      "type": "field_variable",
      "name": "VAR1",
      "variable": "Last Name"
    },
    {"type": "input_value", "name": "VALUE1", "check": "String"}
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
          thisBlock.getFieldValue('VAR0'));
    });
  }
};


var lineJson = {
  "previousStatement": true,
  "nextStatement": true,
  "colour": '#ff00cc'
}
Blockly.Blocks['line'] = {
  init: function() {
    this.jsonInit(lineJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'a block connection two blocks.'
    });
  }
};

var threadJson = {
  message0: 'test %1',
  args0: [
    {
      "type": "input_statement",
      "name": "thread"
    }
  ],
};
Blockly.Blocks.thread = {
  init: function() {
    this.jsonInit(threadJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'a thread block that contains any blocks but thread block.'
    });
  }
}

Blockly.Blocks.thread2 = {
  init: function() {
    var nameField = new Blockly.FieldTextInput('',
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'])
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
 /*   this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);*/
  
    this.setStyle('procedure_blocks');
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  // mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  // domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this {Blockly.Block}
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
  renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
  updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
  displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  callType_: 'procedures_callreturn'
}






Blockly.Blocks['set_local2'] = {
  init: function() {
    this.appendValueInput("location_x")
        .setCheck("Number")
        .appendField("set location")
        .appendField(new Blockly.FieldTextInput("name"), "location_name")
        .appendField("with")
        .appendField("X");
    this.appendValueInput("location_y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.appendValueInput("location_z")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Z");
    this.appendValueInput("location_yaw")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Yaw");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setColour(290);
 this.setTooltip("set location function");
 this.setHelpUrl("https://www.qkmtech.com");
  }
};



Blockly.Blocks['set_local'] = {
  init: function() {
  
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'item_key')
        .appendField(":")
        .appendField(new Blockly.FieldTextInput(''), 'item_value');
   /* this.appendValueInput("location_y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");*/
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(290);
 this.setTooltip("set location function");
 this.setHelpUrl("https://www.qkmtech.com");
  }
};




Blockly.Blocks['block_var'] = {
  init: function() {
    this.appendDummyInput('BLOCK_VAR_INPUT')
        .appendField("变量")
        .appendField(new Blockly.FieldVariable("item"), "VAR_NAME")
        .appendField(new Blockly.FieldLabelSerializableQkm("赋值"), "CODE_VALUE");
    this.appendDummyInput('ASSIST_INPUT')
        .appendField(new Blockly.Field('1', false, {
            needShowThisField: false
        }), 'ASSIST_TYPE')
        .appendField(new Blockly.Field('', false, {
            needShowThisField: false
        }), 'ASSIST_VALUE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);

    this.setTooltip("define object");
    this.setHelpUrl("test_url");
  }
};
