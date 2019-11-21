Blockly.blockRendering.Drawer.prototype.drawOutline_ = function() {
  switch(this.block_.type){
    case 'line':
      this.drawLineWithArrow();
      break;
    case 'controls_if':
      this.drawOutline_controls_if();
      break;
    default: 
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
    // topRow.connection.connectionModel.setOffsetInBlock(connX, 0);  // google默认的位置
    if(this.block_.type === 'controls_if'){
      topRow.connection.connectionModel.setOffsetInBlock(80, 0); //a
    }else{
      topRow.connection.connectionModel.setOffsetInBlock(topRow.width / 2 - topRow.connection.width / 2, 0); //居中
    }
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
        if(!topRow.connection){
          this.outlinePath_ += ' h 8 ';
        }
        // this.outlinePath_ += ' h 8 '; //this.constants_.OUTSIDE_CORNERS.topLeft: m 0,8 a 8 8 0 0,1 8,-8 //zjie
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
        // this.outlinePath_ += ' h -8 ';
        let radius = this.constants_.CORNER_RADIUS;
        if(!bottomRow.connection){
          this.outlinePath_ += `h -${radius} `;  
        }
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

Blockly.blockRendering.Drawer.prototype.drawOutline_controls_if = function(){
  // this.outlinePath_
  const a = this.constants_.DIAMOND_LONG; //菱形的长半轴
  const b = this.constants_.DIAMOND_SHORT; //菱形的短半轴
  const shortLineWidth = this.constants_.LINE_ELSE_H; //连接菱形的else的最少短横线长度
  const arrowWidth = this.constants_.ARROW_WIDTH;// 箭头的宽
  const arrowHeight = this.constants_.ARROW_HEIGHT;//箭头的高
  const flagRectWidth = this.constants_.PRESET_BLOCK; //预置的block的边长
  
  var sizeOfStatement = this.getStatementInputWH();
  var statementWidth = sizeOfStatement.width / 2 + sizeOfStatement.connectedBlockWidths;
  var statementHeight = sizeOfStatement.height;
  

  // 将菱形的左边的点看做x轴的原点
  this.outlinePath_ += `m 0 0 m ${a} 0 l ${a} ${b} l -${a} ${b} l -${a} -${b} l ${a} -${b} `;//菱形
  this.outlinePath_ += `M ${2 * a} ${b} l ${Math.max(statementWidth  - a, shortLineWidth)} 0 l 0 ${b + statementHeight + 80} l -${Math.max(statementWidth , (a + shortLineWidth))} 0 `;// else分支的折线
  this.outlinePath_ += `l ${arrowHeight} -${arrowWidth} m -${arrowHeight} ${arrowWidth} l ${arrowHeight} ${arrowWidth} `; //绘制else分支回到主线的箭头
 
  this.outlinePath_ += `M ${a} ${2 * b + this.constants_.STATEMENT_OFFSET_Y} l ${flagRectWidth / 2} 0 l 0 ${flagRectWidth} l -${flagRectWidth} 0 l 0 -${flagRectWidth}  z `;//绘制if分支的statement位置
  this.outlinePath_ += `M ${a} ${2 * b} v ${statementHeight + 100} `; //if主线
  this.outlinePath_ += `l -${arrowWidth} -${arrowHeight} m ${arrowWidth} ${arrowHeight} l ${arrowWidth} -${arrowHeight} `; // 绘制箭头
  this.outlinePath_ += ` z`; //todo

  this.positionPreviousConnection_();
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
    /*if (row.hasJaggedEdge) { // 是否有锯齿 如果是收拢状态则有锯齿 默认无锯齿
      this.drawJaggedEdge_(row);
    } else*/ if (row.hasStatement) { // 是否有块级代码输入 默认无
      console.log(+new Date());
      debugger
      this.drawStatementInput_controls_if(row);
    } /*else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
      this.drawValueInput_(row);
    } else {
      this.drawRightSideRow_(row);
    }*/
  }
}

// 获取包含statementInput的那个InputRow的高度
Blockly.blockRendering.Drawer.prototype.getStatementInputWH = function(){
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
    if (row.hasStatement) { // 是否有块级代码输入 默认无
      return {
        width: row.width,
        connectedBlockWidths: row.connectedBlockWidths,
        height: row.height
      };
    }
  }
}

Blockly.blockRendering.Drawer.prototype.drawStatementInput_controls_if = function(row) {
  print(row.getLastInput().input.name)
  var isExistElse = /else/i.test(row.getLastInput().input.name); //是否存在else分支
  print(`----${isExistElse}`)
  if(isExistElse){
    const flagRectWidth = this.constants_.PRESET_BLOCK; //预置的block的边长
  
    var sizeOfStatement = this.getStatementInputWH();
    var statementWidth = sizeOfStatement.width / 2 + sizeOfStatement.connectedBlockWidths;
    var statementHeight = sizeOfStatement.height;
    this.outlinePath_ += `M ${2 * this.constants_.DIAMOND_LONG + Math.max(statementWidth  - this.constants_.DIAMOND_LONG, this.constants_.LINE_ELSE_H)} ${2 * this.constants_.DIAMOND_SHORT + this.constants_.STATEMENT_OFFSET_Y} l ${flagRectWidth / 2} 0 l 0 ${flagRectWidth} l -${flagRectWidth} 0 l 0 -${flagRectWidth}  z `;//绘制else分支的statement位置
  }
  this.positionStatementInputConnection_(row);
};

/*Blockly.blockRendering.Drawer.prototype.positionStatementInputConnection_ = function(row) {
  var input = row.getLastInput();
  if (input.connection) {
    var connX = row.xPos + row.statementEdge + input.notchOffset;
    if (this.info_.RTL) {
      connX *= -1;
    }
    if(this.block_.type === 'controls_if'){
      connX = 80;//a
      var connY = 100 + 60; //2b
      input.connection.setOffsetInBlock(connX, connY);
      print('controls_if');
    }else{
      input.connection.setOffsetInBlock(connX, row.yPos);
    }
  }
};*/
Blockly.geras.Drawer.prototype.positionStatementInputConnection_ = function(row) {
  var input = row.getLastInput();
  if (input.connection) {
    var connX = row.xPos + row.statementEdge + input.notchOffset;
    console.log(`connX:${connX}, row.yPos:${row.yPos} + -${this.constants_.DARK_PATH_OFFSET}`);
    if (this.info_.RTL) {
      connX *= -1;
    } else {
      connX += this.constants_.DARK_PATH_OFFSET;
    }
    //zjie 调整连接内部代码块的位置 相当于google的UI中内部向下凸起的位置
    if(this.block_.type === 'controls_if'){
      const shortLineWidth = this.constants_.LINE_ELSE_H; //连接菱形的else的最少短横线长度
      var sizeOfStatement = this.getStatementInputWH();
      var statementWidth = sizeOfStatement.width / 2 + sizeOfStatement.connectedBlockWidths;
      if(/else/i.test(input.input.name)){ //else statement
        debugger;
        connX = Math.max(statementWidth + this.constants_.DIAMOND_LONG, shortLineWidth + this.constants_.DIAMOND_LONG * 2);
      }else{
        connX = this.constants_.DIAMOND_LONG;
      }
      input.connection.setOffsetInBlock(connX, 2 * this.constants_.DIAMOND_SHORT + this.constants_.LINE_IF);
    }else{
      input.connection.setOffsetInBlock(connX, row.yPos + this.constants_.DARK_PATH_OFFSET);
    }
  }
};



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


Blockly.geras.RenderInfo.prototype.finalize_ = function() {
  // Performance note: this could be combined with the draw pass, if the time
  // that this takes is excessive.  But it shouldn't be, because it only
  // accesses and sets properties that already exist on the objects.
print(this.block_.type);
  var widestRowWithConnectedBlocks = 0;
  var yCursor = 0;
  for (var i = 0, row; (row = this.rows[i]); i++) {
    row.yPos = yCursor;
    row.xPos = this.startX;
    yCursor += row.height;

    widestRowWithConnectedBlocks =
        Math.max(widestRowWithConnectedBlocks, row.widthWithConnectedBlocks);
    // Add padding to the bottom row if block height is less than minimum
    var heightWithoutHat = yCursor - this.topRow.ascenderHeight;
    if (row == this.bottomRow &&
        heightWithoutHat < this.constants_.MIN_BLOCK_HEIGHT) {
      // But the hat height shouldn't be part of this.
      var diff = this.constants_.MIN_BLOCK_HEIGHT - heightWithoutHat;
      this.bottomRow.height += diff;
      yCursor += diff;
    }
    this.recordElemPositions_(row);
  }
  this.bottomRow.baseline = yCursor - this.bottomRow.descenderHeight;

  // The dark (lowlight) adds to the size of the block in both x and y.
  this.widthWithChildren = widestRowWithConnectedBlocks +
      this.startX + this.constants_.DARK_PATH_OFFSET;
  this.width += this.constants_.DARK_PATH_OFFSET;
  this.height = yCursor + this.constants_.DARK_PATH_OFFSET;
  if(this.block_.type === 'controls_if'){
    this.height += ( this.constants_.DIAMOND_SHORT * 2 + this.constants_.LINE_IF );
  }
  this.startY = this.topRow.capline;
};