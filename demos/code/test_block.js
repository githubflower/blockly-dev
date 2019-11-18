
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
        .appendField(new Blockly.Field('', false, {
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

