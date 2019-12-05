//存放一些自定义参数
window.QKM = {};

Blockly.blockRendering.Drawer.prototype.drawOutline_controls_if_else = function() {
  // this.outlinePath_ 需要分为if---elseif---else 3个部分进行绘制
  const a = this.constants_.DIAMOND_LONG; //菱形的长半轴
  const b = this.constants_.DIAMOND_SHORT; //菱形的短半轴
  const shortLineWidth = this.constants_.LINE_ELSE_H; //连接菱形的else的最少短横线长度
  const arrowWidth = this.constants_.ARROW_WIDTH; // 箭头的宽
  const arrowHeight = this.constants_.ARROW_HEIGHT; //箭头的高
  const flagRectWidth = this.constants_.PRESET_BLOCK; //预置的block的边长

  // 将菱形的左边的点看做x轴的原点
  this.outlinePath_ += `m 0 0 m ${a} 0 l ${a} ${b} l -${a} ${b} l -${a} -${b} l ${a} -${b} `; //菱形
  // console.log(this.info_.block_.svgGroup_, this.info_.block_.id, this.info_.testParams);

  this.outlinePath_ += `M ${2 * a} ${b} l ${this.info_.getInnerWidth() - a} 0 `; //绘制else分支横线
  this.outlinePath_ += `l 0 ${this.info_.height - b + this.constants_.ELSE_BOCK_OFFSET_Y } l -${this.info_.getInnerWidth()} 0 `; // else分支的折线
  this.outlinePath_ += `l ${arrowHeight} -${arrowWidth} m -${arrowHeight} ${arrowWidth} l ${arrowHeight} ${arrowWidth} `; //绘制else分支回到主线的箭头

  this.outlinePath_ += `M ${a} ${2 * b + this.constants_.STATEMENT_OFFSET_Y} l ${flagRectWidth / 2} 0 l 0 ${flagRectWidth} l -${flagRectWidth} 0 l 0 -${flagRectWidth}  z `; //绘制if分支的statement位置
  this.outlinePath_ += `M ${a} ${2 * b} v ${this.info_.height - 2 * b} `; //if主线
  // this.outlinePath_ += `l -${arrowWidth} -${arrowHeight} m ${arrowWidth} ${arrowHeight} l ${arrowWidth} -${arrowHeight} `; // 绘制箭头
  this.outlinePath_ += ` z`; //todo

  this.positionPreviousConnection_();
  for (var r = 1; r < this.info_.rows.length - 1; r++) {
    var row = this.info_.rows[r];
    /*if (row.hasJaggedEdge) { // 是否有锯齿 如果是收拢状态则有锯齿 默认无锯齿
      this.drawJaggedEdge_(row);
    } else*/
    if (row.hasStatement) { // 是否有块级代码输入 默认无
      this.drawStatementInput_controls_if(row);
    } else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
      this.drawValueInput_(row);
      // this.positionExternalValueConnection_(row);
    }
    /*else {
         this.drawRightSideRow_(row);
       }*/
  }
}


Object.assign(Blockly.blockRendering.Drawer.prototype, {
  drawInlineInput_(input) {
    var width = input.width;
    var height = input.height;
    var yPos = input.centerline - height / 2;
// debugger

    var connectionTop = input.connectionOffsetY;
    var connectionBottom = input.connectionHeight + connectionTop;
    var connectionRight = input.xPos + input.connectionWidth;
    if (this.block_.type == 'controls_repeat_ext') {
      var loopInfo = this.info_.getLoopInfo();
      connectionRight = loopInfo.width_left - this.constants_.DIAMOND_LONG + this.constants_.LOOP_FIELD_OFFSET_X;
      yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
    }
    this.inlinePath_ += Blockly.utils.svgPaths.moveTo(connectionRight, yPos) +
        Blockly.utils.svgPaths.lineOnAxis('v', connectionTop) +
        // input.shape.pathDown +
        'v 15 ' +
        Blockly.utils.svgPaths.lineOnAxis('v', height - connectionBottom) +
        Blockly.utils.svgPaths.lineOnAxis('h', width - input.connectionWidth) +
        Blockly.utils.svgPaths.lineOnAxis('v', -height) +
        'z';

    this.positionInlineInputConnection_(input);
  },
  drawOutline_: function() {
    switch (this.block_.type) {
      case 'line':
        this.drawLineWithArrow();
        break;
      case 'thread':
        this.drawThreadBlock();
        break;
      case 'controls_if':
        // this.drawOutline_controls_if_else();
        this.drawOutline_controls_if();
        break;
      case 'controls_repeat_ext':
        this.drawOutline_loop();
        break;
      default:
        this.drawSthCustom()
        this.drawTop_();
        this.drawRight_();
        this.drawBottom_();
        this.drawLeft_();
    }
  },
  drawSthCustom(){  
    if(/logic_/.test(this.block_.type)){
      this.drawMaskRect({
        x: 6,
        y: -2,
        width: this.info_.width - 5,
        height: this.info_.height + 3,
        class: 'logicBlocakMask',
        // fill: '#f7488d',
        // fill: '#06D6A0',
        fill: '#ff4b2c',
        'fill-opacity': 1
      }, this.block_, true/* unshiftFlag: 是否插入到parent的第一个子节点前面*/);
    } 
  },
  drawOutline_controls_if: function() {
    // this.outlinePath_ 需要分为if---elseif---else 3个部分进行绘制
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    var hasElseBranch = false;
    doElseBranchInfo.branchs.forEach(item => {
      const reg = /(do)?(else)?(\d*)/i;
      var typeObj = reg.exec(item.type);
      if (typeObj[1] === 'DO' && typeObj[3] === '0') {
        this.drawIf(item, doElseBranchInfo);
      } else if (typeObj[1] === 'DO' && parseInt(typeObj[3], 10) > 0) {
        this.drawElseif(item, doElseBranchInfo);
      } else {
        // this.drawElseFlag();    
        // todo positionElseStatementConnection
        hasElseBranch = true;
        this.drawElse(item, doElseBranchInfo);
      }
    });
    // branchs = [] 说明是收拢状态
    if (!doElseBranchInfo.branchs.length) {
      this.moveToStartPoint();
      this.drawDiamond();
    } else {
      if (!hasElseBranch) {
        this.outlinePath_ += `m 0 0 v ${doElseBranchInfo.maxHeight + this.constants_.DIAMOND_SHORT} `;
      }
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

    this.positionNextConnection_(doElseBranchInfo);
  },
  drawOutline_loop() {
    var loopInfo = this.info_.getLoopInfo();
    this.moveToStartPoint(loopInfo);
    this.drawDiamond(loopInfo);
    //菱形左侧
    this.outlinePath_ += ` m 0 ${2 * this.constants_.DIAMOND_SHORT} v ${loopInfo.height} m 0 0 l -${loopInfo.width_left} 0 m 0 0 l 0 -${loopInfo.height + this.constants_.DIAMOND_SHORT} m 0 0 l ${loopInfo.width_left - this.constants_.DIAMOND_LONG} 0 `;
    this.drawArrowRight();
    //菱形右侧
    this.outlinePath_ += ` m ${this.constants_.DIAMOND_LONG * 2} 0 h ${loopInfo.width_right - this.constants_.DIAMOND_LONG} m 0 0 v ${loopInfo.height + this.constants_.DIAMOND_SHORT + this.constants_.GAP_V} m 0 0 h -${loopInfo.width_right + 1} m 0 0 v ${this.constants_.LOOP_NEXTCONNECTION_OFFSET} `;
    this.drawArrowDown();
    this.drawMaskRect({
      x: loopInfo.width_left - 1,
      y: this.constants_.DIAMOND_SHORT * 2 + loopInfo.height +   1
    }, this.block_);
    this.positionPreviousConnection_();
    for (var r = 1; r < this.info_.rows.length - 1; r++) {
      var row = this.info_.rows[r];
      if (row.hasStatement) { // 是否有块级代码输入 默认无
        this.drawStatementInput_loop(row);
      } else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
        debugger
        this.drawValueInput_(row);
      }
    }
    this.positionNextConnection_(); 
  },

  // 绘制遮罩  
  drawMaskRect(attrs, target, unshiftFlag){
    //动态获取'.blocklyMainBackground'的背景色，然后画一条线连接do主线和else线的这2个拐点
    var lineColor = jQuery('.blocklyMainBackground').css('fill');
    var defaultAttrs = {
      width: '3',
      height: this.constants_.GAP_V - 2,
      class: 'maskRect',
      fill: lineColor,
      // stroke: lineColor
    };
    if(target.maskRect){
      Object.keys(attrs).forEach(key => {
        target.maskRect.setAttribute(key, attrs[key]);
      });
    }else{
      target.maskRect = Blockly.utils.dom.createSvgElement('rect', Object.assign(defaultAttrs, attrs), target.svgGroup_, unshiftFlag);
    }
  },
  positionPreviousConnection_: function() {
    var topRow = this.info_.topRow;
    if (this.block_.type === 'line') {
      topRow.connection.connectionModel.setOffsetInBlock(0, 0);
    } else if (topRow.connection) {
      var x = topRow.xPos + topRow.notchOffset;
      var connX = (this.info_.RTL ? -x : x);
      // topRow.connection.connectionModel.setOffsetInBlock(connX, 0);  // google默认的位置
      if (this.block_.type === 'controls_if') {
        var ifBlockInfo = this.info_.getDoElseBranchInfo();
        topRow.connection.connectionModel.setOffsetInBlock(ifBlockInfo.branchs[0].width_left, 0); //a
      }else if(this.block_.type === 'controls_repeat_ext'){
        var loopInfo = this.info_.getLoopInfo();
        topRow.connection.connectionModel.setOffsetInBlock(/*this.constants_.DIAMOND_LONG + this.constants_.GAP_H*/loopInfo.width_left, 0);
      } else {
        topRow.connection.connectionModel.setOffsetInBlock(topRow.width / 2 - topRow.connection.width / 2, 0); //居中
      }
    }
  },
  drawRight_: function() {
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
  },
  drawTop_: function() {
    var topRow = this.info_.topRow;
    var elements = topRow.elements;
    this.positionPreviousConnection_();
    this.outlinePath_ +=
      Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);
    for (var i = 0, elem;
      (elem = elements[i]); i++) {
      // 参考： \core\renderers\measurables\types.js
      if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
        //zjie 去掉所有block左上角圆弧
        if (window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner) {
          if (!topRow.connection) {
            this.outlinePath_ += ' h 8 ';
          }
          // this.outlinePath_ += ' h 8 '; //this.constants_.OUTSIDE_CORNERS.topLeft: m 0,8 a 8 8 0 0,1 8,-8 //zjie
        } else {
          this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topLeft;
        }
      } else if (Blockly.blockRendering.Types.isPreviousConnection(elem)) { // 是否是前置连接块 如果是 则说明顶部要有凹槽
        if (window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.topNotch) {
          this.outlinePath_ += this.constants_.NOTCH_WIDTH; // elem.shape.pathLeft: l 6,4  3,0  6,-4  //zjie  画一条直线代替原来的折线
        } else {
          if (topRow.connection) {
            this.outlinePath_ += ` H ${topRow.width / 2 - topRow.connection.width / 2} ${elem.shape.pathLeft}`;
          } else {
            this.outlinePath_ += elem.shape.pathLeft;
          }
        }
      } else if (Blockly.blockRendering.Types.isHat(elem)) {
        this.outlinePath_ += this.constants_.START_HAT.path;
        //zjie 始终不会进来？
      } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
        // this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
        if (topRow.connection) {
          this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', (topRow.width / 2 - topRow.connection.width / 2));
        } else {
          this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
        }
      }
      // No branch for a square corner, because it's a no-op.
    }
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('v', topRow.height);
  },
  drawBottom_: function() {
    var bottomRow = this.info_.bottomRow;
    var elems = bottomRow.elements;
    this.positionNextConnection_();

    this.outlinePath_ +=
      Blockly.utils.svgPaths.lineOnAxis('V', bottomRow.baseline);

    for (var i = elems.length - 1, elem;
      (elem = elems[i]); i--) {
      if (Blockly.blockRendering.Types.isNextConnection(elem)) {
        if (window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.bottomHump) {
          this.outlinePath_ += (this.constants_.NOTCH_WIDTH * -1); // elem.shape.pathLeft:  l -6,4  -3,0  -6,-4   //zjie
        } else {
          this.outlinePath_ += elem.shape.pathRight;
        }
      } else if (Blockly.blockRendering.Types.isLeftSquareCorner(elem)) {
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', bottomRow.xPos);
      } else if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
        if (window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner) {
          // a 8 8 0 0,1 -8,-8 //zjie 虽然是画椭圆的写法，但是长半径和短半径相同，实际画的就是一个正圆
          // this.outlinePath_ += ' h -8 ';
          let radius = this.constants_.CORNER_RADIUS;
          if (!bottomRow.connection) {
            if(this.block_.type !== 'threads_def'){
              this.outlinePath_ += `h -${radius} `;
            }
          }
        } else {
          // this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.bottomLeft;
          let radius = this.constants_.CORNER_RADIUS;
          if (bottomRow.connection) {
            this.outlinePath_ += `h ${radius} `;
          }
          this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.bottomLeft;
        }
      } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
        // this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width * -1);
        if (bottomRow.connection) {
          this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', (bottomRow.width / 2 - bottomRow.connection.width / 2) * -1);
        } else {
          // this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', (bottomRow.width / 2) * -1);
          if(this.block_.type === 'threads_def'){
            this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', this.info_.width * -1);
          }else{
            this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width * -1);
          }
        }
      }
    }
  },
  //zjie 画带箭头的线
  drawLineWithArrow: function() {
    var topRow = this.info_.topRow;
    var elements = topRow.elements;
    var lineHeight = 50;
    var lineWidth = 2;
    var arrowWidth = 8;
    var arrowHeight = 16;
    this.positionPreviousConnection_();
    this.outlinePath_ +=
      Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);

    /*this.outlinePath_ += ` h ${ lineWidth / 2 } `;
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('v', lineHeight);
    this.outlinePath_ += ` l ${arrowWidth / 2} -2 l ${(arrowWidth / 2 + lineWidth / 2) * -1} ${arrowHeight} l ${(arrowWidth / 2 + lineWidth / 2) * -1} ${arrowHeight * -1} l ${arrowWidth / 2} 2 v -50 z `;
*/
    this.outlinePath_ += ` v ${lineHeight} m 0 0 l -${this.constants_.ARROW_SHORT} -${this.constants_.ARROW_LONG} m ${2 * this.constants_.ARROW_SHORT} 0 l -${this.constants_.ARROW_SHORT} ${this.constants_.ARROW_LONG} z`;
    this.positionNextConnection_();
  },
  drawThreadBlock(){
    var minW = 100,
      minH = 200;
    this.outlinePath_ += `m 0 0 h ${minW} v ${minH} h -${minW} v -${minH} z`;
  },
  drawIf: function(item, doElseBranchInfo) {
    this.moveToStartPoint(item);
    this.drawDiamond();
    this.drawConnectionFlag(item);
    this.drawLineV(item, doElseBranchInfo);
    this.drawLineBottomH(item, doElseBranchInfo);
    this.drawLineH(item, doElseBranchInfo);
  },
  drawElseif: function(item, doElseBranchInfo) {
    const type = 'elseif';
    this.lineToStartPoint(item);
    this.moveOffset(this.constants_.DIAMOND_LONG, this.constants_.DIAMOND_SHORT * (-1), item);
    this.drawDiamond();
    this.drawConnectionFlag(item);
    this.drawLineV(item, doElseBranchInfo);
    this.drawLineBottomH(item, doElseBranchInfo);
    this.drawLineH(item, doElseBranchInfo);
  },
  drawElse: function(item, doElseBranchInfo) {
    this.lineToStartPoint(item);
    this.drawConnectionFlag(item);
    this.drawLineV(item, doElseBranchInfo);
    this.drawLineBottomH(item, doElseBranchInfo);

    // this.outlinePath_ += 'z';
  },
  drawConnectionFlag(item) {
    var reg = /else/i;
    var y = reg.test(item.type) ? this.constants_.DIAMOND_SHORT : (this.constants_.DIAMOND_SHORT * 2);
    y += this.constants_.STATEMENT_OFFSET_Y;
    this.outlinePath_ += ` m 0 ${y} `;
    // 画1个圆 (由2个半圆组成)
    this.outlinePath_ += ` a 5 5 0 1 1 0 10 `;
    this.outlinePath_ += ` a 5 5 0 1 1 0 -10 z `;
    this.outlinePath_ += ` m 0 -${y} `
  },
  moveToStartPoint: function(item) {
    if (!item) {
      this.outlinePath_ += `M ${this.constants_.DIAMOND_LONG} 0 `;
    } else {
      this.outlinePath_ += `M ${item.width_left} 0 `;
    }
  },
  lineToStartPoint: function(item) {
    const reg = /else/i;
    if (reg.test(item.type)) {
      this.outlinePath_ += `l ${item.width_left} 0 `;
    } else {
      this.outlinePath_ += `l ${Math.max(item.width_left - this.constants_.DIAMOND_LONG, 0)} 0 `;
    }
  },
  moveOffset: function(x, y, item) {
    this.outlinePath_ += ` m ${x} ${y}`;
  },
  drawDiamond: function() {
    const a = this.constants_.DIAMOND_LONG;
    const b = this.constants_.DIAMOND_SHORT;
    this.outlinePath_ += ` l ${a} ${b} l -${a} ${b} l -${a} -${b} l ${a} -${b} `;
  },
  drawLineH: function(item, doElseBranchInfo) {
    // 最后画这个 应为这个终点刚好是下一个分支的起点
    this.outlinePath_ += `m ${this.constants_.DIAMOND_LONG} -${doElseBranchInfo.maxHeight + this.constants_.DIAMOND_SHORT} h ${Math.max(item.width_right - this.constants_.DIAMOND_LONG, 0)} `;
  },
  drawLineBottomH: function(item, doElseBranchInfo) {
    // 绘制分支下面回到主线的横线  先画左边再画右边
    var reg = /(do)?(else)?(\d*)/i;
    var regInfo = reg.exec(item.type);
    // DO1...DOn...ELSE   (排除DO0)
    if (!regInfo[1] || regInfo[3] > 0) {
      this.outlinePath_ += `m 0 0 l -${item.width_left} 0 m ${item.width_left} 0 `;
    } else {
      this.drawArrowLeft();
      // this.drawArrowDown();
    }
    // 非else
    if (!regInfo[2]) {
      this.outlinePath_ += `h ${item.width_right} m -${item.width_right} 0 `;
    }
  },
  drawLineV: function(item, doElseBranchInfo) {
    this.outlinePath_ += `m 0 ${item.type === 'ELSE' ? 0 : (2 * this.constants_.DIAMOND_SHORT)} v ${doElseBranchInfo.maxHeight + (item.type === 'ELSE' ? this.constants_.DIAMOND_SHORT : 0)}`;
  },
  drawArrowLeft() {
    const w = 8;
    const h = 4;
    this.outlinePath_ += `m 0 0 l ${w} -${h} m 0 ${2 * h} l -${w} -${h} m 0 0 `;
    // this.outlinePath_ += ` l ${w} -${h} l -${w} ${h} l ${w} ${h} l -${w} -${h} `; //为了不让区域闭合，每次手动回到画线的起点
  },
  drawArrowDown() {
    const long = 8;
    const short = 4;
    this.outlinePath_ += ` m 0 0 l ${short} -${long} m -${2 * short} 0 l ${short} ${long} `;
  },
  drawArrowRight() {
    this.outlinePath_ += ` m 0 0 l -${this.constants_.ARROW_LONG} -${this.constants_.ARROW_SHORT} m 0 ${2 * this.constants_.ARROW_SHORT} l ${this.constants_.ARROW_LONG} -${this.constants_.ARROW_SHORT} `;
  },

  drawStatementInput_controls_if: function(row) {
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    this.positionStatementInputConnection_(row, doElseBranchInfo);
  },
  drawStatementInput_loop(row){
    var input = row.getLastInput();
    if(input.connection){
      var connX = row.xPos + row.statementEdge + input.notchOffset;
      if (this.info_.RTL) {
        connX *= -1;
      } else {
        connX += this.constants_.DARK_PATH_OFFSET;
      }
      //todo
      var loopInfo = this.info_.getLoopInfo();
      connX = loopInfo.width_left;
      input.connection.setOffsetInBlock(connX, this.constants_.DARK_PATH_OFFSET + 2 * this.constants_.DIAMOND_SHORT + this.constants_.STATEMENT_OFFSET_Y);

      this.outlinePath_ += `M ${loopInfo.width_left} ${2 * this.constants_.DIAMOND_SHORT + loopInfo.height / 2 - 5} `;
      this.outlinePath_ += ` a 5 5 0 1 1 0 10 `;
      this.outlinePath_ += ` a 5 5 0 1 1 0 -10 z `;
    }else {
      input.connection.setOffsetInBlock(connX, row.yPos + this.constants_.DARK_PATH_OFFSET);
    }
  }

})


Object.assign(Blockly.geras.Drawer.prototype, {
  // 设置connection的位置
  positionStatementInputConnection_: function(row, doElseBranchInfo) {
    var input = row.getLastInput();

    var reg = /(do)?(else)?(\d*)/i;
    var matchInfo = reg.exec(input.input.name);
    var index = +matchInfo[3];


    function getAllWidthLeft(index, ary) {
      if (index === 1) {
        return ary[0].width;
      }
      return ary[index - 1].width + getAllWidthLeft.call(this, index - 1, ary);
    }

    if (input.connection) {
      var connX = row.xPos + row.statementEdge + input.notchOffset;
      if (this.info_.RTL) {
        connX *= -1;
      } else {
        connX += this.constants_.DARK_PATH_OFFSET;
      }
      //zjie 调整连接内部代码块的位置 相当于google的UI中内部向下凸起的位置
      if (this.block_.type === 'controls_if') {
        const shortLineWidth = this.constants_.LINE_ELSE_H; //连接菱形的else的最少短横线长度
        if (index > 0) { //else statement
          connX = getAllWidthLeft.call(this, index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left;
        } else if (matchInfo[0].toLowerCase() === 'else') {
          connX = getAllWidthLeft.call(this, doElseBranchInfo.branchs.length - 1, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[doElseBranchInfo.branchs.length - 1].width_left;
        } else {
          connX = doElseBranchInfo.branchs[0].width_left;
        }
        input.connection.setOffsetInBlock(connX, 2 * this.constants_.DIAMOND_SHORT + this.constants_.STATEMENT_OFFSET_Y);

        /*var xLen = 5;
        var sourceBlockSvg = this.block_;
        var renderingConstants = sourceBlockSvg.workspace.getRenderer().getConstants();
        // Horizontal line, notch, horizontal line.
        var steps = Blockly.utils.svgPaths.moveBy(-xLen, 0) +
          Blockly.utils.svgPaths.lineOnAxis('h', xLen) +
          renderingConstants.NOTCH.pathLeft +
          Blockly.utils.svgPaths.lineOnAxis('h', xLen);

        if (row.connectedPath_) {
          Blockly.utils.dom.removeNode(row.connectedPath_)
          delete row.connectedPath_;
        }

        row.connectedPath_ = Blockly.utils.dom.createSvgElement(
          'path', {
            'class': 'blocklyConnectionPath',
            'd': steps,
            transform: 'translate(' + connX + ',' + (2 * this.constants_.DIAMOND_SHORT + this.constants_.STATEMENT_OFFSET_Y) + ')' +
              (this.block_.RTL ? ' scale(-1 1)' : '')
          },
          this.block_.getSvgRoot());*/
      } else if (this.block_.type === 'threads_def'){
        debugger;
        input.connection.setOffsetInBlock(this.info_.width / 2, row.yPos + this.constants_.DARK_PATH_OFFSET);
      } else {
        input.connection.setOffsetInBlock(connX, row.yPos + this.constants_.DARK_PATH_OFFSET);
      }
    }
  },
  //只有在controls_if模块才有这个doElseBranchInfo
  positionNextConnection_: function(doElseBranchInfo) {
    var bottomRow = this.info_.bottomRow;
    if (bottomRow.connection) {
      var connInfo = bottomRow.connection;
      var x = connInfo.xPos; // Already contains info about startX
      var connX = (this.info_.RTL ? -x : x);
      switch (this.block_.type) {
        case 'controls_if':
          if (doElseBranchInfo && doElseBranchInfo.branchs.length) {
            // 这里需要手动调整高度10  ？  具体原因待确认
            connInfo.connectionModel.setOffsetInBlock(doElseBranchInfo.branchs[0].width_left, doElseBranchInfo.maxHeight + doElseBranchInfo.otherRowHeight + this.constants_.GAP_V + 10);

          }
          break;
        case 'controls_repeat_ext':
          var loopInfo = this.info_.getLoopInfo();
          connInfo.connectionModel.setOffsetInBlock(loopInfo.width_left, loopInfo.height + 2 * this.constants_.DIAMOND_SHORT + this.constants_.GAP_V + this.constants_.LOOP_NEXTCONNECTION_OFFSET);
          break;
        case 'line':
          connInfo.connectionModel.setOffsetInBlock(0, (connInfo.centerline - connInfo.height * 2 - 6));
          break;
        default:
          // connInfo.connectionModel.setOffsetInBlock(connX, (connInfo.centerline - connInfo.height / 2));
          connInfo.connectionModel.setOffsetInBlock(bottomRow.width / 2 - connInfo.width / 2, (connInfo.centerline - connInfo.height / 2)); //zjie 将nextConnection移到这个block中间  同时需要修改block的outlinePath
      }
    }
  },
  positionExternalValueConnection_: function(row, doElseBranchInfo) {
    function getAllWidthLeft(index, ary) {
      if (index === 0) {
        return 0;
      }
      return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
    }
    var input = row.getLastInput();
    if (input.connection) {
      var connX;

      if (this.block_.type === 'controls_if') {
        connX = row.xPos;
        if (this.info_.RTL) {
          connX *= -1;
        }
        var index = +input.input.name.split('IF')[1];
        input.connection.setOffsetInBlock(connX + getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left, this.constants_.DIAMOND_SHORT - row.height / 2);
        this.branchWidth += row.widthWithConnectedBlocks;
      } else {
        connX = row.xPos + row.width;
        if (this.info_.RTL) {
          connX *= -1;
        }
        input.connection.setOffsetInBlock(connX, row.yPos);
      }
    }
  },

  //重写绘制“可输入”的形状 主要是为了自定义controls_if模块的样式
  drawValueInput_: function(row) {
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    this.positionExternalValueConnection_(row, doElseBranchInfo);
    // 暂时不画这个标记输入的框框
    /*var y = 10; // 这里inputRectHeight、inputRectWidth都是指实际输入框的一半
    var x = y * this.constants_.DIAMOND_LONG / this.constants_.DIAMOND_SHORT;
    if(this.block_.type === 'controls_if'){
      this.outlinePath_ += (` M ${x} ${this.constants_.DIAMOND_SHORT - y} l ${2 * (this.constants_.DIAMOND_LONG - x)} 0 l 0 ${2 * y}`);
      this.outlinePath_ += (` l -${2 * (this.constants_.DIAMOND_LONG - x)} 0 l 0 -${2 * y} z`);
    } */
    if (this.block_.type === 'controls_if') {
      function getExternalValueInput(row) {
        return row.elements.find(item => {
          return item instanceof Blockly.blockRendering.ExternalValueInput;
        })
      }
      var input = getExternalValueInput(row).input;
      var reg = /(if)(\d*)/i;
      var index = +reg.exec(input.name)[2];

      function getAllWidthLeft(index, ary) {
        if (index === 0) {
          return 0;
        }
        return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
      }
      var xPos = getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left;
      var yPos = this.constants_.DIAMOND_SHORT / 2;
      this.outlinePath_ += (` M ${xPos} ${yPos} v 35 z`);
      print(JSON.stringify({
        x: xPos,
        y: yPos,
        width: row.width,
        height: row.height
      }));
      /*var lineColor = jQuery('.blocklyMainBackground').css('fill');
      var defaultAttrs = {
        width: '3',
        height: this.constants_.GAP_V - 2,
        class: 'maskRect',
        fill: lineColor,
        // stroke: lineColor
      };
      if(input.sourceBlock_.maskRect){
        Object.keys(attrs).forEach(key => {
          input.sourceBlock_.maskRect.setAttribute(key, attrs[key]);
        });
      }else{
        input.sourceBlock_.maskRect = Blockly.utils.dom.createSvgElement('rect', Object.assign(defaultAttrs, attrs), input.sourceBlock_.svgGroup_);
      }*/
 

      /*this.drawMaskRect({
        x: xPos,
        y: yPos,
        width: row.width,
        height: row.height
      }, input.sourceBlock_);*/
    } else {
      var input = row.getLastInput();

      var pathDown = (typeof input.shape.pathDown == "function") ?
        input.shape.pathDown(input.height) :
        input.shape.pathDown;

      //zjie 当有外部输入的时候，是否画右边的凹槽
      if (window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner) {
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
          // pathDown +  //zjie
          Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
      } else {
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
          pathDown +
          Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
      }
    }
  },

  //调整field的位置  覆盖 \core\renderers\common\drawer.js
  layoutField_: function(fieldInfo) {
    switch (this.block_.type) {
      case 'controls_if':
        this.positionFieldsOfControlsIf(fieldInfo);
        break;
      case 'controls_repeat_ext':
        this.positionFieldsOfLoop(fieldInfo);
        break;
      default:
        this.drawDefaultLayoutField_(fieldInfo);
    }
  },

  /**
   * [getLayoutFieldInfo description]
   * @param  {[type]} fieldInfo [description]
   * @param  {[Object]} params    [xPos, yPos, scale]
   * @return {[Object]}           [description]
   */
  getLayoutFieldInfo(fieldInfo, params) {
    var loopInfo = this.info_.getLoopInfo();
    // params.xPos = params.xPos + this.constants_.LOOP_FIELD_OFFSET_X;
    params.xPos = loopInfo.width_left + 10;
    params.yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
    return {
      xPos: params.xPos,
      yPos: params.yPos,
      scale: params.scale
    }
  },

  positionInlineInputConnection_(input) {
    var yPos = input.centerline - input.height / 2;
    // Move the connection.
    if (input.connection) {
      // xPos already contains info about startX
      var connX = input.xPos + input.connectionWidth + this.constants_.DARK_PATH_OFFSET;
      if (this.block_.type == 'controls_repeat_ext') {
        var loopInfo = this.info_.getLoopInfo();
        connX = loopInfo.width_left - this.constants_.DIAMOND_LONG + this.constants_.LOOP_FIELD_OFFSET_X;
        // connX = loopInfo.width_left - input.width /*+ 10*/; // 10: space的宽度？
        // connX += this.constants_.LOOP_FIELD_OFFSET_X; //todo
        yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
      }
      if (this.info_.RTL) {
        connX *= -1;
      }
      input.connection.setOffsetInBlock( connX, yPos + input.connectionOffsetY + this.constants_.DARK_PATH_OFFSET);
    }
  },

  /**
   * [positionFieldsOfLoop 设置循环条件的field位置]
   * @param  {[type]} fieldInfo [description]
   * @return {[type]}           [description]
   */
  positionFieldsOfLoop(fieldInfo) {
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
      var info = this.getLayoutFieldInfo(fieldInfo, {
        xPos,
        yPos,
        scale
      });
      svgGroup.setAttribute('transform', 'translate(' + info.xPos + ',' + info.yPos + ')' + info.scale);
      this.hideDoText(fieldInfo);
    }

    if (this.info_.isInsertionMarker) {
      // Fields and icons are invisible on insertion marker.  They still have to
      // be rendered so that the block can be sized correctly.
      svgGroup.setAttribute('display', 'none');
    }
  },

  //隐藏loop块中的‘do’描述
  hideDoText(fieldInfo){
    if(fieldInfo.field.value_ === 'do'){
      fieldInfo.field.fieldGroup_.setAttribute('display', 'none')
    }
  },

  //默认的layoutField_方法
  drawDefaultLayoutField_(fieldInfo) {
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
      svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')' + scale);
    }

    if (this.info_.isInsertionMarker) {
      // Fields and icons are invisible on insertion marker.  They still have to
      // be rendered so that the block can be sized correctly.
      svgGroup.setAttribute('display', 'none');
    }
  },

  positionFieldsOfControlsIf(fieldInfo) {
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    var svgGroup;
    var yPos = fieldInfo.centerline - fieldInfo.height / 2;
    var xPos = fieldInfo.xPos;
    var scale = '';

    if (Blockly.blockRendering.Types.isField(fieldInfo)) {
      svgGroup = fieldInfo.field.getSvgRoot();
    } else if (Blockly.blockRendering.Types.isIcon(fieldInfo)) {
      svgGroup = fieldInfo.icon.iconGroup_;
    }
    if (this.info_.RTL) {
      xPos = -(xPos + fieldInfo.width);
      if (fieldInfo.flipRtl) {
        xPos += fieldInfo.width;
        scale = 'scale(-1 1)';
      }
    }
    if (Blockly.blockRendering.Types.isIcon(fieldInfo)) {
      xPos += doElseBranchInfo.branchs[0].width_left - this.constants_.DIAMOND_LONG + 7;
      yPos = this.constants_.DIAMOND_SHORT - fieldInfo.height / 2;
      svgGroup.setAttribute('display', 'block');
      svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')');
      fieldInfo.icon.computeIconLocation();
    } else {
      var reg = /(if)?(do)?(else)?(\d*)/i;
      var regInfo = reg.exec(fieldInfo.parentInput.name);
      var type = regInfo[1] || regInfo[2] || regInfo[3],
        index = parseInt(regInfo[4], 10);
      type = type && type.toLowerCase();
      switch (type) {
        case 'if':
          if (index > 0) {
            if (fieldInfo.field.type === 'field_btn') {
              xPos = this.getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left - 50;
              yPos = this.constants_.DIAMOND_SHORT - fieldInfo.height / 2;
            } else {
              xPos = this.getAllWidthLeft(index, doElseBranchInfo.branchs) - fieldInfo.width /*+ doElseBranchInfo.branchs[index].width_left - 50*/ ;
              yPos = this.constants_.DIAMOND_SHORT - fieldInfo.height - 10;
            }
          } else {
            xPos = doElseBranchInfo.branchs[0].width_left - fieldInfo.width - 5;
            yPos = this.constants_.DIAMOND_SHORT - fieldInfo.height / 2;
            if(fieldInfo.field.value_ === 'if'){
              fieldInfo.field.fieldGroup_.setAttribute('display', 'none')
            }
          }
          break;
        case 'do':
          xPos = this.getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left;
          yPos = this.constants_.DIAMOND_SHORT * 2 + (this.constants_.STATEMENT_OFFSET_Y / 2);
          break;
        case 'else':
          xPos = this.getAllWidthLeft(doElseBranchInfo.branchs.length - 1, doElseBranchInfo.branchs) - 35;
          yPos += 8;
          break;
        default:
          if (fieldInfo.parentInput.name === '_TEMP_COLLAPSED_INPUT') {
            //多个block收拢之后block的描述
            yPos += 20;
          }
      }
      svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')' + scale);
    }

    if (this.info_.isInsertionMarker) {
      // Fields and icons are invisible on insertion marker.  They still have to
      // be rendered so that the block can be sized correctly.
      svgGroup.setAttribute('display', 'none');
    }
  },

  getAllWidthLeft(index, ary) {
    if (index === 0) {
      return 0;
    }
    return ary[index - 1].width + this.getAllWidthLeft(index - 1, ary);
  }

})


Object.assign(Blockly.geras.RenderInfo.prototype, {
  finalize_: function() {
    // Performance note: this could be combined with the draw pass, if the time
    // that this takes is excessive.  But it shouldn't be, because it only
    // accesses and sets properties that already exist on the objects.
    var widestRowWithConnectedBlocks = 0,
      yCursor = 0,
      do_block_height = 0,
      else_block_height = 0,
      other_rows_height = 0;
if(this.block_.type === 'threads_def'){
    debugger
}
    for (var i = 0, row;
      (row = this.rows[i]); i++) {
      row.yPos = yCursor;
      row.xPos = this.startX;
      if (this.block_.type !== 'controls_if') {
        yCursor += row.height;
      }
 

      if (this.block_.type === 'controls_if' && row.hasStatement) {
        var statementInput = this.getStatementInput(row)
        if (/do/i.test(statementInput.input.name) && statementInput.connectedBlock) {
          do_block_height += row.height;
        } else if (/else/i.test(statementInput.input.name) && statementInput.connectedBlock) {
          else_block_height += row.height;
        } else {
          other_rows_height += row.height;
        }
      }
      if(row.widthWithConnectedBlocks > widestRowWithConnectedBlocks){
        this.widestChildBlock = row;
       
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
    if (this.block_.type === 'controls_if') {
      yCursor = other_rows_height + Math.max(do_block_height, else_block_height);
    }
    this.bottomRow.baseline = yCursor - this.bottomRow.descenderHeight;
    // The dark (lowlight) adds to the size of the block in both x and y.
    this.widthWithChildren = widestRowWithConnectedBlocks + this.startX + this.constants_.DARK_PATH_OFFSET;
    this.width += this.constants_.DARK_PATH_OFFSET;
    if(this.block_.type === 'threads_def'){
      window.aath = this;
      debugger;
      this.width = Math.max(this.widthWithChildren, this.width);
    }

    function getAllBranchWidth() {
      var doElseBranchInfo = this.getDoElseBranchInfo();
      var sum = 0;
      doElseBranchInfo.branchs.forEach(item => {
        sum += item.width;
      })
      return sum;
    }

    if (this.block_.type === 'controls_if') {
      window.aaif = this;
      this.width = getAllBranchWidth.call(this);
      this.widthWithChildren = this.width; //外部的容器在计算宽度时会参考this.widthWithChildren
      debugger
    }
    this.height = yCursor + this.constants_.DARK_PATH_OFFSET;

    if (this.block_.type === 'controls_if') {
      this.height += (this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y);
      this.height = this.height + this.constants_.GAP_V; //15 为了让子block于父block戳开一段距离，不然会挤在一起很难看
    }
    this.setLoopBlockHeight();
    this.startY = this.topRow.capline;
  },
  //设置循环模块的高度
  setLoopBlockHeight() {
    if (this.block_.type === 'controls_repeat_ext') {
      this.height += (this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y + this.constants_.LOOP_NEXTCONNECTION_OFFSET);
    }
  },
  /**
   * if主线和else主线之间的距离
   * @return {[Number]}
   */
  getInnerWidth: function() {
    const reg_do = /do/i,
      reg_else = /else/i;
    var do_block_x = 0,
      do_block_width = 0,
      else_block_x = 0,
      else_block_width = 0,
      widestRowWithConnectedBlocks = 0,
      widestRowWithConnectedBlocks_do = 0,
      widestRowWithConnectedBlocks_else = 0;


    for (var i = 0, row;
      (row = this.rows[i]); i++) {
      if (this.block_.type === 'controls_if' && row.hasStatement) {
        var statementInput = this.getStatementInput(row)
        if (reg_do.test(statementInput.input.name) && statementInput.connectedBlock) {
          do_block_x = statementInput.connectedBlock.previousConnection.offsetInBlock_.x; //statementInput.connectedBlock.previousConnection.x_;
          do_block_width = statementInput.connectedBlock.width;
          widestRowWithConnectedBlocks_do = Math.max(do_block_width, /*row.widthWithConnectedBlocks, */ widestRowWithConnectedBlocks_do);
        } else if (reg_else.test(statementInput.input.name) && statementInput.connectedBlock) {
          else_block_x = statementInput.connectedBlock.previousConnection.offsetInBlock_.x; //statementInput.connectedBlock.previousConnection.x_;
          else_block_width = statementInput.connectedBlock.width;
          widestRowWithConnectedBlocks_else = Math.max(else_block_width, /* row.widthWithConnectedBlocks,*/ widestRowWithConnectedBlocks_else);
        }
      }
    }
    var ret = Math.max((widestRowWithConnectedBlocks_do - do_block_x + this.constants_.SPACE_BT_DO_ELSE + else_block_x), (this.constants_.DIAMOND_LONG + this.constants_.LINE_ELSE_H));
    return ret;
  },

  getStatementInput(row) {
    return row.elements.find(item => {
      return item instanceof Blockly.geras.StatementInput;
    })
  },

  /**
   * @return {Object}
   * 获取DO0 DO1 DO2 ... ELSE等各个branch（逻辑分支）的大小
   */
  getDoElseBranchInfo: function() {
    const doElseBranchInfo = {};
    const branchs = [];
    const reg = /(do)?(else)?\d*/i;



    function getMaxHeight(obj) {
      var max = 0;
      Object.keys(obj).forEach(key => {
        max = Math.max(obj[key].height, max);
      })
      return max;
    }
    var otherRowHeight = this.constants_.STATEMENT_OFFSET_Y;;
    for (var i = 0, row;
      (row = this.rows[i]); i++) {
      if (this.block_.type === 'controls_if' && row.hasStatement) {
        var statementInput = this.getStatementInput(row)
        let key = reg.exec(statementInput.input.name)[0];
        if (key) {
          if (!doElseBranchInfo[key]) {
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
          temmObj.width_left = Math.max(temmObj.block_x, key.toLowerCase() === 'else' ? 0 : this.constants_.DIAMOND_LONG); //主线左边的宽度 (这里的block_x可能和最长的那个block的x偏移对不上 TODO)
          temmObj.width_right = Math.max(temmObj.max_block_width - temmObj.block_x, key.toLowerCase() === 'else' ? 0 : (this.constants_.DIAMOND_LONG + this.constants_.LINE_ELSE_H)) + this.constants_.GAP_H;
          temmObj.width = temmObj.width_left + temmObj.width_right; //15 设置一点间隙 美观一点
          temmObj.height = row.height;
        }
      }
    }
    //( this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y)
    var maxHeight = getMaxHeight(doElseBranchInfo) + otherRowHeight + this.constants_.STATEMENT_OFFSET_Y; //这些block里面高度最大的那个block的高度
    return {
      branchs: branchs,
      maxHeight: maxHeight,
      otherRowHeight: otherRowHeight
    };
  },
  /**
   * 获取循环块的相关数据
   * @return {[type]}
   */
  getLoopInfo() {
    var loopInfo = {};
    for (var i = 0, row;
      (row = this.rows[i]); i++) {
      if (row.hasStatement) {
        var statementInput = this.getStatementInput(row);

        let connectedBlock = statementInput.connectedBlock;
        Object.assign(loopInfo, {
          block_x: connectedBlock ? connectedBlock.previousConnection.offsetInBlock_.x : 0,
          block_width: connectedBlock ? connectedBlock.width : 0,
          max_block_width: 0,
          height: row.height + this.constants_.STATEMENT_OFFSET_Y * 2
        })
        loopInfo.max_block_width = Math.max(loopInfo.max_block_width, loopInfo.block_width);
        loopInfo.width_left = Math.max(loopInfo.block_x, this.constants_.DIAMOND_LONG) + this.constants_.GAP_H;
        loopInfo.width_right = Math.max(loopInfo.max_block_width - loopInfo.block_x, this.constants_.DIAMOND_LONG) + this.constants_.GAP_H;
        loopInfo.width = loopInfo.width_left + loopInfo.width_right;
      }
    }
    return loopInfo;
  }
})