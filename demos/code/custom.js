window.print = window.console.log; //方便调试
const myDebugger = false;

const donotDebugger = !myDebugger;
window.CUSTOM_CFG_OUTLINE = {
  leftRoundedCorner: donotDebugger, //是否绘制左上角圆角
  topNotch: donotDebugger, //是否绘制顶部的凹槽
  rightNotch: donotDebugger, //是否绘制右边的凹槽
  bottomHump: donotDebugger, //是否绘制下面的（凸起）
  leftHump: donotDebugger, //是否绘制左边的凸起
}
window.zjie = ()=>{
  debugger;
}
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

Blockly.JavaScript['set_name'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE0',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE1',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var firstName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR0'), Blockly.Variables.NAME_TYPE);
  var lastName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
  return `${firstName} = ${argument0};\n${lastName} = ${argument1};\n`;
};
Blockly.JavaScript['block_var'] = Blockly.JavaScript['set_local'] = (block)=>{
  var input = block.inputList.find((item)=>{return item.name === 'BLOCK_VAR_INPUT'});
  var customValueField = input.fieldRow.find(item => {
    return item.name === "CODE_VALUE";
  });
  customValue = customValueField._getCustomValue();

  var var_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Variables.NAME_TYPE)
  return `${var_name} = ${customValue.inputValue}`;
}

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

Blockly.JavaScript['line'] = function(block) {
  return '';
};


Blockly.blockRendering.Drawer.prototype.drawOutline_ = function() {
  const isDrawLineBlock = this.block_.type === 'line';
  if(isDrawLineBlock){
    /*this.drawTop_line();
    this.drawBottom_line();*/

    this.drawLineWithArrow()
  }else{
    this.drawTop_();
    this.drawRight_();
    this.drawBottom_();
    this.drawLeft_();
  }
};
Blockly.blockRendering.Drawer.prototype.positionPreviousConnection_ = function() {
  var topRow = this.info_.topRow;
  if(this.block_.type === 'line'){
    topRow.connection.connectionModel.setOffsetInBlock(0, 0);
  }else if (topRow.connection) {
    var x = topRow.xPos + topRow.notchOffset;
    var connX = (this.info_.RTL ? -x : x);
    // topRow.connection.connectionModel.setOffsetInBlock(connX, 0);
    topRow.connection.connectionModel.setOffsetInBlock(topRow.width / 2 - topRow.connection.width / 2, 0);
  }
};

Blockly.blockRendering.Drawer.prototype.drawRight_ = function() {
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
    if (row.hasJaggedEdge) { // 是否有锯齿 如果是收拢状态则有锯齿 默认无锯齿
      this.drawJaggedEdge_(row);
    } else if (row.hasStatement) { // 是否有块级代码输入 默认无
      this.drawStatementInput_(row);
    } else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
      this.drawValueInput_(row);
    } else {
      this.drawRightSideRow_(row);
    }
  }
}

Blockly.blockRendering.Drawer.prototype.drawTop_ = function() {
  var topRow = this.info_.topRow;
  var elements = topRow.elements;

  this.positionPreviousConnection_();
  this.outlinePath_ +=
      Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);
  for (var i = 0, elem; (elem = elements[i]); i++) {
    // console.log('elem.types: ' + elem.type.toString(2)) //debugger
    // 参考： \core\renderers\measurables\types.js
    if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
      //zjie 去掉所有block左上角圆弧
      if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner){
        this.outlinePath_ += ' h 8 '; //this.constants_.OUTSIDE_CORNERS.topLeft: m 0,8 a 8 8 0 0,1 8,-8 //zjie
      }else{
        this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topLeft;
      }
    } else if (Blockly.blockRendering.Types.isPreviousConnection(elem)) {// 是否是前置连接块 如果是 则说明顶部要有凹槽
      if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.topNotch){
        this.outlinePath_ += this.constants_.NOTCH_WIDTH; // elem.shape.pathLeft: l 6,4  3,0  6,-4  //zjie  画一条直线代替原来的折线
      }else{
        if(topRow.connection){
          this.outlinePath_ += ` H ${topRow.width / 2 - topRow.connection.width / 2} ${elem.shape.pathLeft}`;
        }else{
          this.outlinePath_ += elem.shape.pathLeft;
        }
      }
    } else if (Blockly.blockRendering.Types.isHat(elem)) {
      this.outlinePath_ += this.constants_.START_HAT.path;
      //zjie 始终不会进来？
    } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
      // this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
      if(topRow.connection){
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', (topRow.width / 2 - topRow.connection.width / 2) );
      }else{
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
      }
    }
    // No branch for a square corner, because it's a no-op.
  }
  this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('v', topRow.height);
};

Blockly.blockRendering.Drawer.prototype.drawBottom_ = function() {
  var bottomRow = this.info_.bottomRow;
  var elems = bottomRow.elements;
  this.positionNextConnection_();

  this.outlinePath_ +=
    Blockly.utils.svgPaths.lineOnAxis('V', bottomRow.baseline);

  for (var i = elems.length - 1, elem; (elem = elems[i]); i--) {
    if (Blockly.blockRendering.Types.isNextConnection(elem)) {
      if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.bottomHump){
        this.outlinePath_ += (this.constants_.NOTCH_WIDTH * -1); // elem.shape.pathLeft:  l -6,4  -3,0  -6,-4   //zjie
      }else{
        this.outlinePath_ += elem.shape.pathRight;
      }
    } else if (Blockly.blockRendering.Types.isLeftSquareCorner(elem)) {
      this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', bottomRow.xPos);
    } else if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
      if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner){
        // a 8 8 0 0,1 -8,-8 //zjie 虽然是画椭圆的写法，但是长半径和短半径相同，实际画的就是一个正圆
        this.outlinePath_ += ' h -8 ';
      }else{
        // this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.bottomLeft;
        let radius = this.constants_.CORNER_RADIUS;
        if(bottomRow.connection){
          this.outlinePath_ += `h ${radius} `;  
        }
        this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.bottomLeft;
      }
    } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
      // this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width * -1);
      if(bottomRow.connection){
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', (bottomRow.width / 2 - bottomRow.connection.width / 2) * -1);
      }else{
        // this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', (bottomRow.width / 2) * -1);
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width * -1);
      }
    }
  }
};
//zjie 画带箭头的线
Blockly.blockRendering.Drawer.prototype.drawLineWithArrow = function(){
  var topRow = this.info_.topRow;
  var elements = topRow.elements;
  var lineHeight = 50;
  var lineWidth = 2;
  var arrowWidth = 8;
  var arrowHeight = 16;
  this.positionPreviousConnection_();
  this.outlinePath_ +=
      Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);
      
      this.outlinePath_ += ` h ${ lineWidth / 2 } `;
  this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('v', lineHeight);    
  this.outlinePath_ += ` l ${arrowWidth / 2} -2 l ${(arrowWidth / 2 + lineWidth / 2) * -1} ${arrowHeight} l ${(arrowWidth / 2 + lineWidth / 2) * -1} ${arrowHeight * -1} l ${arrowWidth / 2} 2 v -50 z `;

  this.positionNextConnection_();
  /*for (var i = 0, elem; (elem = elements[i]); i++) {
    // console.log('elem.types: ' + elem.type.toString(2)) //debugger
    // 参考： \core\renderers\measurables\types.js
    if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
      //zjie 去掉所有block左上角圆弧
      if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner){
        this.outlinePath_ += ' h 8 '; //this.constants_.OUTSIDE_CORNERS.topLeft: m 0,8 a 8 8 0 0,1 8,-8 //zjie
      }else{
        this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topLeft;
      }
    } else if (Blockly.blockRendering.Types.isPreviousConnection(elem)) {// 是否是前置连接块 如果是 则说明顶部要有凹槽
      if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.topNotch){
        this.outlinePath_ += this.constants_.NOTCH_WIDTH; // elem.shape.pathLeft: l 6,4  3,0  6,-4  //zjie  画一条直线代替原来的折线
      }else{
        this.outlinePath_ += elem.shape.pathLeft;
      }
    } else if (Blockly.blockRendering.Types.isHat(elem)) {
      this.outlinePath_ += this.constants_.START_HAT.path;
      //zjie 始终不会进来？
    } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
      this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
    }
    // No branch for a square corner, because it's a no-op.
  }
  this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('v', topRow.height);*/
}



// Blockly.blockRendering.Drawer.prototype.positionNextConnection_ 
Blockly.geras.Drawer.prototype.positionNextConnection_ = function() {
  var bottomRow = this.info_.bottomRow;
  if (bottomRow.connection) {
    var connInfo = bottomRow.connection;
    var x = connInfo.xPos; // Already contains info about startX
    var connX = (this.info_.RTL ? -x : x);
    if(this.block_.type === 'line'){
      connInfo.connectionModel.setOffsetInBlock(0, (connInfo.centerline - connInfo.height / 2));
    }else{
      // connInfo.connectionModel.setOffsetInBlock(connX, (connInfo.centerline - connInfo.height / 2));
      //zjie 将nextConnection移到这个block中间  同时需要修改block的outlinePath
      connInfo.connectionModel.setOffsetInBlock(bottomRow.width / 2 - connInfo.width / 2, (connInfo.centerline - connInfo.height / 2));  
    }
  }
};



// 自定义块 创建Object
Blockly.Blocks['create_object'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
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
      var itemBlock = workspace.newBlock('lists_create_with_item');
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
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
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
      var input = this.getInput('ADD' + i);
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
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH']);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};
