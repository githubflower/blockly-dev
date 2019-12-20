


var lineJson = {
  "previousStatement": true,
  "nextStatement": true,
  // "colour": '#ff00cc'  //可以单独给这个块指定颜色  如果不指定则采用大类的颜色
}
Blockly.Blocks['line'] = {
  init: function() {
    this.jsonInit(lineJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'a block connection two blocks.'
    });
    this.setStyle('connect_blocks');
  }
};

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

//参考创建数组的方式来创建一个Object
Blockly.Blocks['lists_create_obj'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true, 'Object');
    this.setMutator(new Blockly.Mutator(['lists_create_obj_item']));
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    console.log('---decompose');
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_obj_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    console.log('compose');
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('item_value' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'item_value' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('item_value' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('item_value' + i)) {
        var input = this.appendValueInput("item_value" + i)
        .appendField(new Blockly.FieldTextInput('key'), 'item_key' + i)
        .appendField(':')
        .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('item_value' + i)) {
      this.removeInput('item_value' + i);
      i++;
    }
  }
};

Blockly.Blocks['lists_create_obj_item'] = {
  /**
   * Mutator block for adding items.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setStyle('list_blocks');
    this.appendDummyInput()
        .appendField(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TITLE']);
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TOOLTIP']);
    this.contextMenu = false;
  }
};

Blockly.Blocks['variables_set_hidden'] = {
  init: function() {
    this.appendDummyInput('VAR_NAME')
        .appendField(new Blockly.FieldTextInput(''), "NAME_INPUT")
    this.appendDummyInput('VAR_VALUE')
        .appendField(new Blockly.FieldTextInput(''), 'VALUE_INPUT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);

    this.setTooltip("define object");
    this.setHelpUrl("test_url");
  }
}