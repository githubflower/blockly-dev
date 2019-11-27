Blockly.blockRendering.Drawer.prototype.drawOutline_ = function() {
  switch(this.block_.type){
    case 'line':
      this.drawLineWithArrow();
      break;
    case 'controls_if':
      // this.drawOutline_controls_if();
      this.drawOutline_controls_if2();
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
      topRow.connection.connectionModel.setOffsetInBlock(this.constants_.DIAMOND_LONG, 0); //a
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
}

Blockly.blockRendering.Drawer.prototype.drawOutline_controls_if = function(){
  // this.outlinePath_ 需要分为if---elseif---else 3个部分进行绘制
  const a = this.constants_.DIAMOND_LONG; //菱形的长半轴
  const b = this.constants_.DIAMOND_SHORT; //菱形的短半轴
  const shortLineWidth = this.constants_.LINE_ELSE_H; //连接菱形的else的最少短横线长度
  const arrowWidth = this.constants_.ARROW_WIDTH;// 箭头的宽
  const arrowHeight = this.constants_.ARROW_HEIGHT;//箭头的高
  const flagRectWidth = this.constants_.PRESET_BLOCK; //预置的block的边长
  
  // 将菱形的左边的点看做x轴的原点
  this.outlinePath_ += `m 0 0 m ${a} 0 l ${a} ${b} l -${a} ${b} l -${a} -${b} l ${a} -${b} `;//菱形
  // console.log(this.info_.block_.svgGroup_, this.info_.block_.id, this.info_.testParams);

  this.outlinePath_ += `M ${2 * a} ${b} l ${this.info_.getInnerWidth() - a} 0 `;//绘制else分支横线
  this.outlinePath_ += `l 0 ${this.info_.height - b + this.constants_.ELSE_BOCK_OFFSET_Y } l -${this.info_.getInnerWidth()} 0 `;// else分支的折线
  this.outlinePath_ += `l ${arrowHeight} -${arrowWidth} m -${arrowHeight} ${arrowWidth} l ${arrowHeight} ${arrowWidth} `; //绘制else分支回到主线的箭头
 
  this.outlinePath_ += `M ${a} ${2 * b + this.constants_.STATEMENT_OFFSET_Y} l ${flagRectWidth / 2} 0 l 0 ${flagRectWidth} l -${flagRectWidth} 0 l 0 -${flagRectWidth}  z `;//绘制if分支的statement位置
  this.outlinePath_ += `M ${a} ${2 * b} v ${this.info_.height - 2 * b} `; //if主线
  // this.outlinePath_ += `l -${arrowWidth} -${arrowHeight} m ${arrowWidth} ${arrowHeight} l ${arrowWidth} -${arrowHeight} `; // 绘制箭头
  this.outlinePath_ += ` z`; //todo

  this.positionPreviousConnection_();
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
    /*if (row.hasJaggedEdge) { // 是否有锯齿 如果是收拢状态则有锯齿 默认无锯齿
      this.drawJaggedEdge_(row);
    } else*/ if (row.hasStatement) { // 是否有块级代码输入 默认无
      this.drawStatementInput_controls_if(row);
    } else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
      this.drawValueInput_(row);
      // this.positionExternalValueConnection_(row);
    } /*else {
      this.drawRightSideRow_(row);
    }*/
  }
}

Blockly.blockRendering.Drawer.prototype.drawOutline_controls_if2 = function(){
  // this.outlinePath_ 需要分为if---elseif---else 3个部分进行绘制
  var doElseBranchInfo = this.info_.getDoElseBranchInfo();
  var hasElseBranch = false;
  doElseBranchInfo.branchs.forEach(item => {
    const reg = /(do)?(else)?(\d*)/i;
    var typeObj = reg.exec(item.type);
    if(typeObj[1] === 'DO' && typeObj[3] === '0'){
      this.drawIf(item, doElseBranchInfo);
    }else if(typeObj[1] === 'DO' && parseInt(typeObj[3], 10) > 0){
      this.drawElseif(item, doElseBranchInfo);
    }else{
      // this.drawElseFlag();    
      // todo positionElseStatementConnection
      hasElseBranch = true;
      this.drawElse(item, doElseBranchInfo);
    }
  });
  if(!hasElseBranch){
    this.outlinePath_ += ` v ${doElseBranchInfo.maxHeight + this.constants_.DIAMOND_SHORT} `;
  }

  this.positionPreviousConnection_();
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
   if (row.hasStatement) { // 是否有块级代码输入 默认无
      this.drawStatementInput_controls_if(row);
    } else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
      this.drawValueInput_(row, doElseBranchInfo);
    }
  }
}

Object.assign(Blockly.blockRendering.Drawer.prototype, {
  drawIf: function(item, doElseBranchInfo){
    this.moveToStartPoint(item);
    this.drawDiamond();
    this.drawLineV(item, doElseBranchInfo);
    this.drawLineBottomH(item, doElseBranchInfo);
    this.drawLineH(item, doElseBranchInfo);
  },
  drawElseif: function(item, doElseBranchInfo){
    const type = 'elseif';
    this.lineToStartPoint(item);
    this.moveOffset(this.constants_.DIAMOND_LONG, this.constants_.DIAMOND_SHORT * (-1), item);
    this.drawDiamond();
    this.drawLineV(item, doElseBranchInfo);
    this.drawLineBottomH(item, doElseBranchInfo, type);
    this.drawLineH(item, doElseBranchInfo);
  },
  drawElse: function(item, doElseBranchInfo){
    this.lineToStartPoint(item);
    this.drawLineV(item, doElseBranchInfo);
    
    this.outlinePath_ += 'z';
  },
  drawElseFlag(){
    //todo
  },
  moveToStartPoint: function(item){
    this.outlinePath_ += `M ${item.width_left} 0 `;
  },
  lineToStartPoint: function(item){
    this.outlinePath_ += `l ${Math.max(item.width_left - this.constants_.DIAMOND_LONG, 0)} 0 `;
  },
  moveOffset: function(x, y, item){
    this.outlinePath_ += ` m ${x} ${y}`;
  },
  drawDiamond: function(){
    const a = this.constants_.DIAMOND_LONG;
    const b = this.constants_.DIAMOND_SHORT;
    this.outlinePath_ += ` l ${a} ${b} l -${a} ${b} l -${a} -${b} l ${a} -${b} `;
  },
  drawLineH: function(item, doElseBranchInfo){
    // 最后画这个 应为这个终点刚好是下一个分支的起点
    this.outlinePath_ += `m ${this.constants_.DIAMOND_LONG} -${doElseBranchInfo.maxHeight + this.constants_.DIAMOND_SHORT} h ${Math.max(item.width_right - this.constants_.DIAMOND_LONG, 0)} `;
  },
  drawLineBottomH: function(item, doElseBranchInfo, type){
    // 绘制分支下面回到主线的横线  先画左边再画右边
    if(type === 'elseif'){
      this.outlinePath_ += `l -${item.width_left} 0 m ${item.width_left} 0 `;
    }
    this.outlinePath_ += `h ${item.width_right} m -${item.width_right} 0 `;
  },
  drawLineV: function(item, doElseBranchInfo){
    this.outlinePath_ += `m 0 ${item.type === 'ELSE' ? 0 : (2 * this.constants_.DIAMOND_SHORT)} v ${doElseBranchInfo.maxHeight + (item.type === 'ELSE' ? this.constants_.DIAMOND_SHORT : 0)}`;
  }
})

// 获取包含statementInput的那个InputRow的高度
Blockly.blockRendering.Drawer.prototype.getStatementInputWH = function(){
  var temp = 0;
  var ret = [];
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
    if (row.hasStatement) { // 是否有块级代码输入 默认无
      temp++;
      ret.push({
        width: row.width,
        connectedBlockWidths: row.connectedBlockWidths,
        statementWidth: row.statementWidth,
        height: row.height
      })
    }
  }
  return ret[0];
}

Blockly.blockRendering.Drawer.prototype.drawStatementInput_controls_if = function(row) {
  print('row.getLastInput().input.name---', row.getLastInput().input.name)
  var isExistElse = /else/i.test(row.getLastInput().input.name); //是否存在else分支
  if(isExistElse){
    const flagRectWidth = this.constants_.PRESET_BLOCK; //预置的block的边长
    this.outlinePath_ += `M ${this.constants_.DIAMOND_LONG + this.info_.getInnerWidth()} ${2 * this.constants_.DIAMOND_SHORT + this.constants_.STATEMENT_OFFSET_Y} l ${flagRectWidth / 2} 0 l 0 ${flagRectWidth} l -${flagRectWidth} 0 l 0 -${flagRectWidth}  z `;//绘制else分支的statement位置
  }


  


  var doElseBranchInfo = this.info_.getDoElseBranchInfo();
  this.positionStatementInputConnection_(row, doElseBranchInfo);
};

Blockly.geras.Drawer.prototype.positionStatementInputConnection_ = function(row, doElseBranchInfo) {
  debugger;
  var input = row.getLastInput();

  var reg = /(do)?(else)?(\d*)/i;
  var matchInfo = reg.exec(input.input.name);
  var index = +matchInfo[3];


  function getAllWidthLeft(index, ary){
    if(index === 1){
      return ary[0].width;
    }
    return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
  }

  if (input.connection) {
    var connX = row.xPos + row.statementEdge + input.notchOffset;
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
      if(index > 0){ //else statement
        connX = getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left;
      }else if(matchInfo[0].toLowerCase() === 'else'){
        connX = getAllWidthLeft(doElseBranchInfo.branchs.length - 1, doElseBranchInfo.branchs)
      }else{
        connX = this.constants_.DIAMOND_LONG;
      }
      print(matchInfo[0], connX);
      input.connection.setOffsetInBlock(connX, 2 * this.constants_.DIAMOND_SHORT + this.constants_.STATEMENT_OFFSET_Y);
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
  var widestRowWithConnectedBlocks = 0;
  var yCursor = 0;
  var statementWidth = 0;

  var do_block_x = this.constants_.DIAMOND_LONG, 
      do_block_width = 0,
      do_block_height = 0,
      else_block_x = 0,
      else_block_width = 0,
      else_block_height = 0,
      other_rows_height = 0,
      all_rows_height = 0;
  function getStatementInput(row){
    return row.elements.find(item => {
      return item instanceof Blockly.geras.StatementInput;
    })
  }
  for (var i = 0, row; (row = this.rows[i]); i++) {
    row.yPos = yCursor;
    row.xPos = this.startX;
    yCursor += row.height;

    if(this.block_.type === 'controls_if' && row.hasStatement){
      var statementInput = getStatementInput(row)
      if(/do/i.test(statementInput.input.name) && statementInput.connectedBlock){
        do_block_x = statementInput.connectedBlock.previousConnection.offsetInBlock_.x;
        do_block_width = statementInput.connectedBlock.width;
        do_block_height += row.height;
      }else if(/else/i.test(statementInput.input.name) && statementInput.connectedBlock){
        else_block_x = statementInput.connectedBlock.previousConnection.offsetInBlock_.x;
        else_block_width = statementInput.connectedBlock.width;
        else_block_height += row.height;
      }else{
        other_rows_height += row.height;
      }
    }
    widestRowWithConnectedBlocks = Math.max(widestRowWithConnectedBlocks, row.widthWithConnectedBlocks);
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
  if(this.block_.type === 'controls_if'){
    yCursor = other_rows_height + Math.max(do_block_height, else_block_height);
  }
  this.bottomRow.baseline = yCursor - this.bottomRow.descenderHeight;

  // The dark (lowlight) adds to the size of the block in both x and y.
  this.widthWithChildren = widestRowWithConnectedBlocks + this.startX + this.constants_.DARK_PATH_OFFSET;
  this.width += this.constants_.DARK_PATH_OFFSET;
  statementWidth = do_block_width + else_block_width;

  
  // 目前if...else的block的绘制直接一步完成，没有T-R-B-L的概念，不太好 （自定义将菱形和else分支短横线放在topRow中实现会更好，这样将不需要另外处理block的size问题
  // 否则就要像我这样处理，太麻烦了，而且还容易产生bug）
  // controls_if 模块的width和widthWithChildren应该是一样的，应该这样计算：   statement 即 connectedBlock
  // 分成左右2块   左边取Math.max(statement_if.previousConnection.x, this.constans_.DIAMOND_LONG)
  //              右边取Math.max(this.constans_.DIAMOND_LONG + this.constans_.LINE_ELSE_H, statement_if.width - x)
  //              else模块同理
  function calWidth(do_block_x, do_block_width, else_block_x, else_block_width){
    // var width = Math.max(do_block_x, this.constants_.DIAMOND_LONG) + Math.max(this.constants_.DIAMOND_LONG + this.constants_.LINE_ELSE_H, do_block_width - do_block_x + else_block_width + this.constants_.SPACE_BT_DO_ELSE);
    var width = Math.max(do_block_x, this.constants_.DIAMOND_LONG) + (this.getInnerWidth()) + (else_block_width - else_block_x);
    return width;
  }
  
  if(this.block_.type === 'controls_if'){
    this.width = Math.max( 
      this.constants_.DIAMOND_LONG * 2 + this.constants_.LINE_ELSE_H, 
      calWidth.call(this, do_block_x, do_block_width, else_block_x, else_block_width)
    );
    this.widthWithChildren = this.width; //外部的容器在计算宽度时会参考this.widthWithChildren
  }
  this.height = yCursor + this.constants_.DARK_PATH_OFFSET;

  if(this.block_.type === 'controls_if'){
    this.height += ( this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y);
    this.height = Math.max(this.constants_.EMPTY_CONTROL_IF_MIN_HEIGHT, this.height) + 15; //15 为了让子block于父block戳开一段距离，不然会挤在一起很难看
  }
  this.startY = this.topRow.capline;
};

/**
 * if主线和else主线之间的距离
 * @return {[Number]}
 */
Blockly.geras.RenderInfo.prototype.getInnerWidth = function(){
  const reg_do = /do/i,
        reg_else = /else/i;
  var do_block_x = 0, 
      do_block_width = 0,
      else_block_x = 0,
      else_block_width = 0,
      widestRowWithConnectedBlocks = 0,
      widestRowWithConnectedBlocks_do = 0,
      widestRowWithConnectedBlocks_else = 0;

  function getStatementInput(row){
    return row.elements.find(item => {
      return item instanceof Blockly.geras.StatementInput;
    })
  }
  for (var i = 0, row; (row = this.rows[i]); i++) {
    if(this.block_.type === 'controls_if' && row.hasStatement){
      var statementInput = getStatementInput(row)
      if(reg_do.test(statementInput.input.name) && statementInput.connectedBlock){
        do_block_x = statementInput.connectedBlock.previousConnection.offsetInBlock_.x; //statementInput.connectedBlock.previousConnection.x_;
        do_block_width = statementInput.connectedBlock.width;
        widestRowWithConnectedBlocks_do = Math.max(do_block_width, /*row.widthWithConnectedBlocks, */widestRowWithConnectedBlocks_do);
      }else if(reg_else.test(statementInput.input.name) && statementInput.connectedBlock){
        else_block_x = statementInput.connectedBlock.previousConnection.offsetInBlock_.x; //statementInput.connectedBlock.previousConnection.x_;
        else_block_width = statementInput.connectedBlock.width;
        widestRowWithConnectedBlocks_else = Math.max(else_block_width,/* row.widthWithConnectedBlocks,*/ widestRowWithConnectedBlocks_else);
      }
    }
  }
  var ret = Math.max( (widestRowWithConnectedBlocks_do - do_block_x + this.constants_.SPACE_BT_DO_ELSE + else_block_x), (this.constants_.DIAMOND_LONG + this.constants_.LINE_ELSE_H) );
  return ret;
}

/**
 * @return {Object}
 * 获取DO0 DO1 DO2 ... ELSE等各个branch（逻辑分支）的大小
 */
Blockly.geras.RenderInfo.prototype.getDoElseBranchInfo = function(){
  const doElseBranchInfo = {};
  const branchs = [];
  const reg = /(do)?(else)?\d*/i;

  function getStatementInput(row){
    return row.elements.find(item => {
      return item instanceof Blockly.geras.StatementInput;
    })
  }
  function getMaxHeight(obj){
    var max = 0;
    Object.keys(obj).forEach(key => {
      max = Math.max(obj[key].height, max);
    })
    return max;
  }
  var otherRowHeight = 0;
  for (var i = 0, row; (row = this.rows[i]); i++) {
    if(this.block_.type === 'controls_if' && row.hasStatement){
      var statementInput = getStatementInput(row)
      let key = reg.exec(statementInput.input.name)[0];
      if(key){
        if(!doElseBranchInfo[key]){
          doElseBranchInfo[key] = {
            type: key,
            max_block_width: 0,
            height: 0
          };
          branchs.push(doElseBranchInfo[key]);
        }
        let temmObj = doElseBranchInfo[key];
        let connectedBlock = statementInput.connectedBlock;
        temmObj.block_x = connectedBlock ? connectedBlock.previousConnection.offsetInBlock_.x : 0;
        temmObj.block_width = connectedBlock ? connectedBlock.width : 0;
        temmObj.max_block_width = Math.max(temmObj.max_block_width, temmObj.block_width);
        temmObj.width_left = Math.max( temmObj.block_x, this.constants_.DIAMOND_LONG ); //主线左边的宽度 (这里的block_x可能和最长的那个block的x偏移对不上 TODO)
        temmObj.width_right = Math.max( temmObj.max_block_width - temmObj.block_x, this.constants_.DIAMOND_LONG + this.constants_.LINE_ELSE_H);
        temmObj.width = temmObj.width_left + temmObj.width_right;
        temmObj.height += row.height;
      }
    }else{
      otherRowHeight += row.height;// controls_if模块中非do.else模块的元素的累计高度
    }
  }
  //( this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y)
  var maxHeight = getMaxHeight(doElseBranchInfo) + otherRowHeight /*+ this.constants_.STATEMENT_OFFSET_Y*/;//这些block里面高度最大的那个block的高度
  return {
    branchs: branchs,
    maxHeight: maxHeight,
    otherRowHeight: otherRowHeight
  };
}

Blockly.geras.Drawer.prototype.positionExternalValueConnection_ = function(row, doElseBranchInfo) {
  function getAllWidthLeft(index, ary){
    if(index === 1){
      return ary[0].width;
    }
    return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
  }
  var input = row.getLastInput();
  if (input.connection) {
    var connX;

    if(this.block_.type === 'controls_if'){
      connX = row.xPos;
      if (this.info_.RTL) {
        connX *= -1;
      }
      var index = +input.input.name.split('IF')[1];
      if(index > 0){
        input.connection.setOffsetInBlock(connX + getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left, /*row.yPos +*/ this.constants_.DIAMOND_SHORT - row.height / 2);
      }else{
        input.connection.setOffsetInBlock(connX + this.constants_.DIAMOND_LONG, /*row.yPos +*/ this.constants_.DIAMOND_SHORT - row.height / 2);        
      }
      this.branchWidth += row.widthWithConnectedBlocks;
    }else{
      connX = row.xPos + row.width;
      if (this.info_.RTL) {
        connX *= -1;
      }
      input.connection.setOffsetInBlock(connX, row.yPos);
    }
    
  }
};

//调整field的位置  覆盖 \core\renderers\common\drawer.js
Blockly.blockRendering.Drawer.prototype.layoutField_ = function(fieldInfo) {
  if (Blockly.blockRendering.Types.isField(fieldInfo)) {
    var svgGroup = fieldInfo.field.getSvgRoot();
  } else if (Blockly.blockRendering.Types.isIcon(fieldInfo)) {
    var svgGroup = fieldInfo.icon.iconGroup_;
  }

  var yPos = fieldInfo.centerline - fieldInfo.height / 2;
  var xPos = fieldInfo.xPos;
  var scale = '';
  if (this.info_.RTL) {
    xPos = -(xPos + fieldInfo.width);
    if (fieldInfo.flipRtl) {
      xPos += fieldInfo.width;
      scale = 'scale(-1 1)';
    }
  }
  if (Blockly.blockRendering.Types.isIcon(fieldInfo)) {
    svgGroup.setAttribute('display', 'block');
    svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')');
    fieldInfo.icon.computeIconLocation();
  } else {
    if(fieldInfo.field.eventType === 'toggleIF'){
      //todo  20 “条件”按钮的相对偏移  需改为绝对偏移
      var doElseBranchInfo = this.info_.getDoElseBranchInfo();
      
      var reg = /(if)(\d*)/i;
      var index = +reg.exec(fieldInfo.field.name)[2];

      function getAllWidthLeft(index, ary){
        if(index === 1){
          return ary[0].width;
        }
        return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
      }
      function getAllHeightLeft(index, ary){
        if(index === 1){
          return ary[0].height;
        }
        return ary[index - 1].height + getAllWidthLeft(index - 1, ary);
      }
      if(index > 0){
        xPos = getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left - 50;
        yPos = this.constants_.DIAMOND_SHORT - fieldInfo.height / 2
      }else{
        xPos = xPos - 20;
        yPos = yPos + 20;
      }
      svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')' + scale);  
    }else{
      if(this.block_.type === 'controls_if' && fieldInfo.parentInput.name === '_TEMP_COLLAPSED_INPUT'){//多个block收拢之后block的描述
        svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + (yPos + 20) + ')' + scale);
      }else{
        svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')' + scale);
      }
    }
  }

  if (this.info_.isInsertionMarker) {
    // Fields and icons are invisible on insertion marker.  They still have to
    // be rendered so that the block can be sized correctly.
    svgGroup.setAttribute('display', 'none');
  }
};

//重写绘制“可输入”的形状 主要是为了自定义controls_if模块的样式
Blockly.blockRendering.Drawer.prototype.drawValueInput_ = function(row) {
  var doElseBranchInfo = this.info_.getDoElseBranchInfo();
  this.positionExternalValueConnection_(row, doElseBranchInfo);
  // 暂时不画这个标记输入的框框
  /*var y = 10; // 这里inputRectHeight、inputRectWidth都是指实际输入框的一半
  var x = y * this.constants_.DIAMOND_LONG / this.constants_.DIAMOND_SHORT;
  if(this.block_.type === 'controls_if'){
    this.outlinePath_ += (` M ${x} ${this.constants_.DIAMOND_SHORT - y} l ${2 * (this.constants_.DIAMOND_LONG - x)} 0 l 0 ${2 * y}`);
    this.outlinePath_ += (` l -${2 * (this.constants_.DIAMOND_LONG - x)} 0 l 0 -${2 * y} z`);
  } */ 
  if(this.block_.type === 'controls_if'){
    function getExternalValueInput(row){
      return row.elements.find(item => {
        return item instanceof Blockly.blockRendering.ExternalValueInput;
      })
    }
    var input = getExternalValueInput(row).input;
    var reg = /(if)(\d*)/i;
    var index = +reg.exec(input.name)[2];
    function getAllWidthLeft(index, ary){
      if(index === 1){
        return ary[0].width;
      }
      return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
    }
    if(index > 0){
      this.outlinePath_ += (` M ${getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left} ${this.constants_.DIAMOND_SHORT / 2} v 35 z`);
    }else{
      this.outlinePath_ += (` M ${this.constants_.DIAMOND_LONG} ${this.constants_.DIAMOND_SHORT / 2} v 35 z`);
    }
  }else{
    var input = row.getLastInput();

    var pathDown = (typeof input.shape.pathDown == "function") ?
        input.shape.pathDown(input.height) :
        input.shape.pathDown;
    
    //zjie 当有外部输入的时候，是否画右边的凹槽
    if(window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner){
      this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
        // pathDown +  //zjie
        Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
    }else{
      this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
        pathDown + 
        Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
    }  
  }
};