//存放一些自定义参数
window.QKM = {};
function drawArrow(arrow){
  const CONSTANTS = new Blockly.blockRendering.ConstantProvider();
  var path = '';
  switch(arrow){
    case 'up':
      path += `m 0 ${CONSTANTS.ARROW_HEIGHT}`; //往下移箭头的高度
      path += `l -${CONSTANTS.ARROW_WIDTH} 0 l ${CONSTANTS.ARROW_WIDTH} -${CONSTANTS.ARROW_HEIGHT} l ${CONSTANTS.ARROW_WIDTH} ${CONSTANTS.ARROW_HEIGHT} l -${CONSTANTS.ARROW_WIDTH} 0 z`;
      break;
    case 'down':
      path += `m 0 -${CONSTANTS.ARROW_HEIGHT}`; //往上移箭头的高度
      path += `l -${CONSTANTS.ARROW_WIDTH} 0 l ${CONSTANTS.ARROW_WIDTH} ${CONSTANTS.ARROW_HEIGHT} l ${CONSTANTS.ARROW_WIDTH} -${CONSTANTS.ARROW_HEIGHT} l -${CONSTANTS.ARROW_WIDTH} 0 z`;
      break;
  }
  return path;
}

Object.assign(Blockly.blockRendering.Drawer.prototype, {
  drawSomeRect(){
    switch(this.block_.type){
      case 'controls_for':
      case 'controls_forEach':
        this.drawConditionLayerRect({
          x: this.info_.getLoopInfo().width_left || 0,
          y: 20,
          width: Math.max(this.info_.width_google - 50, 0), //todo 向左偏移了50
          height: 30,
          class: 'conditionLayerRect',
          fill: '#01579b',
          // fill: '#ff4b2c',
        }, this.block_, true);
        break;
      case 'line':
        if(!this.block_.transparentRect){
          this.block_.transparentRect = Blockly.utils.dom.createSvgElement('rect', {
            x: -10,
            y: 0,
            width: 20,
            height: 50,
            class: 'transparentRect',
            fill: 'transparent',
          }, this.block_.svgGroup_);
        }
        break;  
      default:
        // do nothing
    }
  },
  drawInlineInput_(input) {
    var width = input.width;
    var height = input.height;
    var yPos = input.centerline - height / 2;
    var connectionTop = input.connectionOffsetY;
    var connectionBottom = input.connectionHeight + connectionTop;
    var connectionRight = input.xPos + input.connectionWidth;
    if (this.block_.type === 'controls_repeat_ext' ||
      this.block_.type === 'controls_whileUntil' ) {
      var loopInfo = this.info_.getLoopInfo();
      connectionRight = loopInfo.width_left - this.constants_.DIAMOND_LONG + this.constants_.LOOP_FIELD_OFFSET_X;
      yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
    }
    if(this.block_.type === 'controls_for' || 
      this.block_.type === 'controls_forEach' ){
      var loopInfo = this.info_.getLoopInfo();
      connectionRight += loopInfo.width_left;//loopInfo.width_left - this.constants_.DIAMOND_LONG + this.constants_.LOOP_FIELD_OFFSET_X;
      yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
    }else{
      this.inlinePath_ += Blockly.utils.svgPaths.moveTo(connectionRight, yPos) +
          Blockly.utils.svgPaths.lineOnAxis('v', connectionTop) +
          // input.shape.pathDown +
          'v 15 ' +
          Blockly.utils.svgPaths.lineOnAxis('v', height - connectionBottom) +
          Blockly.utils.svgPaths.lineOnAxis('h', width - input.connectionWidth) +
          Blockly.utils.svgPaths.lineOnAxis('v', -height) +
          'z';
    }
  

    this.positionInlineInputConnection_(input);
  },
  drawStatementInput_(row) {
    var input = row.getLastInput();
    // Where to start drawing the notch, which is on the right side in LTR.
    var x = input.xPos + input.notchOffset + input.shape.width;
    var innerTopLeftCorner =
      input.shape.pathRight +
      Blockly.utils.svgPaths.lineOnAxis('h', -(input.notchOffset - this.constants_.INSIDE_CORNERS.width)) +
      this.constants_.INSIDE_CORNERS.pathTop;

    var innerHeight = row.height - (2 * this.constants_.INSIDE_CORNERS.height);
    
    if (this.block_.type === 'threads_def' ||
        this.block_.type === 'procedures_defnoreturn' ||
        this.block_.type === 'procedures_defreturn' ) {
      x = this.info_.width;
      this.outlinePath_ = ` m 0 0 H ${x} `;
      this.outlinePath_ += /*Blockly.utils.svgPaths.lineOnAxis('H', x) +*/
        Blockly.utils.svgPaths.lineOnAxis('v', innerHeight) +
        // this.constants_.INSIDE_CORNERS.pathBottom +
        Blockly.utils.svgPaths.lineOnAxis('H', x);
    } else {
      this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', x) +
        innerTopLeftCorner +
        Blockly.utils.svgPaths.lineOnAxis('v', innerHeight) +
        this.constants_.INSIDE_CORNERS.pathBottom +
        Blockly.utils.svgPaths.lineOnAxis('H', row.xPos + row.width);
    }
    this.positionStatementInputConnection_(row);
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
      case 'controls_whileUntil':
      case 'controls_for':
      case 'controls_forEach':
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
        x: 7,
        y: -1,
        width: this.info_.width - 7,
        height: this.info_.height + 1,
        class: 'logicBlocakMask',
        fill: '#19b5fe',
        // fill: '#ff4b2c',
        'fill-opacity': 1
      }, this.block_, true/* unshiftFlag: 是否插入到parent的第一个子节点前面*/);
    } 
  },
  drawOutline_controls_if: function() {
    this.outlinePath_ += 'm 0 0 ';
    // this.outlinePath_ 需要分为if---elseif---else 3个部分进行绘制
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    var hasElseBranch = false;
    // branchs = [] 说明是收拢状态
    if(this.block_.workspace.isFlyout){
      this.moveToStartPoint();
      this.drawDiamond();
    }else if(this.block_.isCollapsed()) {
      this.moveToStartPoint();
      this.drawDiamond();
     
      this.outlinePath_ += `m 0 ${this.constants_.DIAMOND_SHORT * 2} l 0 20 `;
      this.drawArrowDown();
      this.outlinePath_ += `m 0 -20`;
      
    } else {
     
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
      x: (loopInfo.width_left - 1) || 0,
      y: this.constants_.DIAMOND_SHORT * 2 + (loopInfo.height || 0) +   1
    }, this.block_);
    this.positionPreviousConnection_();
    
    for (var r = 1; r < this.info_.rows.length - 1; r++) {
      var row = this.info_.rows[r];
      if (row.hasStatement) { // 是否有块级代码输入 默认无
        this.drawStatementInput_loop(row);
      } else if (row.hasExternalInput) { // 如果是INPUT_VALUE 块 则有外部输入
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
      'fill-opacity': 0.9
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
  //todo 1209
  drawConditionLayerRect(attrs, target, asFirstChild){
    //不能放在第一个元素的位置（因为放在后面的元素渲染时优先级更高，会覆盖前面的内容），需要插入到path元素之后，也就是第3个元素之后
    var defaultAttrs = {
      width: this.info_.width_google,
      height: 50,
      class: 'maskRect',
      fill: '#ff0000',
      // stroke: lineColor
    };
    if(target.layerRect){
      Object.keys(attrs).forEach(key => {
        target.layerRect.setAttribute(key, attrs[key]);
      });
    }else{
      // target.layerRect = Blockly.utils.dom.createSvgElement('rect', Object.assign(defaultAttrs, attrs), target.svgGroup_, asFirstChild);
      target.layerRect = Blockly.utils.dom.createSvgElement('rect', Object.assign(defaultAttrs, attrs));
      Blockly.utils.dom.insertAfter(target.layerRect, target.svgGroup_.children[2]); //前3个元素都是path
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
        topRow.connection.connectionModel.setOffsetInBlock(ifBlockInfo.branchs[0] && ifBlockInfo.branchs[0].width_left || this.constants_.DIAMOND_LONG, 0); //a
      }else if(this.block_.type === 'controls_repeat_ext' ||
      this.block_.type === 'controls_whileUntil' ||
      this.block_.type === 'controls_for' ||
      this.block_.type === 'controls_forEach'){
        var loopInfo = this.info_.getLoopInfo();
        topRow.connection.connectionModel.setOffsetInBlock(/*this.constants_.DIAMOND_LONG + this.constants_.GAP_H*/loopInfo.width_left, 0);
      } else {
        topRow.connection.connectionModel.setOffsetInBlock(topRow.width / 2 /*- topRow.connection.width / 2*/, 0); //居中
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
            if(this.block_.type !== 'threads_def' &&
              this.block_.type !== 'procedures_defnoreturn' &&
              this.block_.type !== 'procedures_defreturn' ){
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
          if(this.block_.type === 'threads_def' ||
              this.block_.type === 'procedures_defnoreturn' ||
              this.block_.type === 'procedures_defreturn' ){
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
    this.outlinePath_ += Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);
    // l -${this.constants_.ARROW_SHORT} -${this.constants_.ARROW_LONG} m ${2 * this.constants_.ARROW_SHORT} 0 l -${this.constants_.ARROW_SHORT} ${this.constants_.ARROW_LONG} z
    this.outlinePath_ += ` v ${lineHeight} m 0 0 `;
    this.outlinePath_ += drawArrow('down');
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
    if(regInfo[1] && regInfo[3] == 0){
      this.outlinePath_ += ` l 0 20 `;
      this.drawArrowDown();
      this.outlinePath_ += `m 0 -20`;
    }


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

      // this.outlinePath_ += `M ${loopInfo.width_left} ${2 * this.constants_.DIAMOND_SHORT + loopInfo.height / 2 - 5} `;
      this.outlinePath_ += `M ${loopInfo.width_left} ${2 * this.constants_.DIAMOND_SHORT +  this.constants_.STATEMENT_OFFSET_Y - 5} `;
      this.outlinePath_ += ` a 5 5 0 1 1 0 10 `;
      this.outlinePath_ += ` a 5 5 0 1 1 0 -10 z `;
    }else {
      input.connection.setOffsetInBlock(connX, row.yPos + this.constants_.DARK_PATH_OFFSET);
    }
  }

})


Object.assign(Blockly.geras.Drawer.prototype, {
  draw() {
    this.hideHiddenIcons_();
    this.drawOutline_();
    this.drawInternals_();
    this.drawSomeRect();
    this.block_.pathObject.setPaths(this.outlinePath_ + '\n' + this.inlinePath_,
        this.highlighter_.getPath());
    if (this.info_.RTL) {
      this.block_.pathObject.flipRTL();
    }
    if (Blockly.blockRendering.useDebugger) {
      this.block_.renderingDebugger.drawDebug(this.block_, this.info_);
    }
    this.recordSizeOnBlock_();
  },

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
      } else if (this.block_.type === 'threads_def' ||
        this.block_.type === 'procedures_defnoreturn' ||
        this.block_.type === 'procedures_defreturn' ){
        this.positionStatementInputConnection_threads_def(input, row);
      } else {
        input.connection.setOffsetInBlock(connX, row.yPos + this.constants_.DARK_PATH_OFFSET);
      }
    }
  },
  positionStatementInputConnection_threads_def(input, row){
    // 找出statementInput中所有主线block的connection最大x方向偏移
    // this.block_.
    var maxOffsetX = this.getMaxOffsetX(this.block_.childBlocks_);
    input.connection.setOffsetInBlock(maxOffsetX || this.info_.width / 2, row.yPos + this.constants_.DARK_PATH_OFFSET);
    // input.connection.setOffsetInBlock(this.info_.width / 2, row.yPos + this.constants_.DARK_PATH_OFFSET);
  },
  getMaxOffsetX(blocks){
    var childBlocks = blocks;
    var curBlock;
    var maxOffsetX = 0;
    if(childBlocks && childBlocks.length){
      curBlock = childBlocks[0];
      while(curBlock){
        maxOffsetX = Math.max(maxOffsetX, curBlock.previousConnection.offsetInBlock_.x);
        if(curBlock.nextConnection){
          curBlock = curBlock.nextConnection.targetBlock()
        }else{
          curBlock = null;
        }
      }
    }
    return maxOffsetX + 5;
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
          var y = this.constants_.DIAMOND_SHORT * 2 + 20;
          if(!this.block_.isCollapsed()){
            y = doElseBranchInfo.maxHeight + doElseBranchInfo.otherRowHeight + this.constants_.GAP_V + 30;// 这里需要手动调整高度10  ？  具体原因待确认
          }
          if (doElseBranchInfo && doElseBranchInfo.branchs.length) {
            
            connInfo.connectionModel.setOffsetInBlock(doElseBranchInfo.branchs[0].width_left, y);

          }
          break;
        case 'controls_repeat_ext':
        case 'controls_whileUntil':
        case 'controls_for':
        case 'controls_forEach':
          var loopInfo = this.info_.getLoopInfo();
          connInfo.connectionModel.setOffsetInBlock(loopInfo.width_left, loopInfo.height + 2 * this.constants_.DIAMOND_SHORT + this.constants_.GAP_V + this.constants_.LOOP_NEXTCONNECTION_OFFSET);
          break;
        case 'line':
          connInfo.connectionModel.setOffsetInBlock(0, (connInfo.centerline - connInfo.height * 2 - 6));
          break;
        default:
        debugger;
          // connInfo.connectionModel.setOffsetInBlock(connX, (connInfo.centerline - connInfo.height / 2));
          connInfo.connectionModel.setOffsetInBlock(bottomRow.width / 2 /*- connInfo.width / 2*/, (connInfo.centerline - connInfo.height / 2)); //zjie 将nextConnection移到这个block中间  同时需要修改block的outlinePath
      }
    }
  },
  positionExternalValueConnection_: function(row, doElseBranchInfo) {
    if(this['positionExternalValueConnection_' + this.block_.type] && typeof this['positionExternalValueConnection_' + this.block_.type] === 'function'){
      this['positionExternalValueConnection_' + this.block_.type](row);
    }else{
      var input = row.getLastInput(),connX;
      if (input.connection) {
        //1224
        if(this.block_.type === 'lists_create_with' && row.hasExternalInput){
          connX = this.block_.fixPositionX ;
        }else{
          connX = row.xPos + row.width;
        }
        if (this.info_.RTL) {
          connX *= -1;
        }
        input.connection.setOffsetInBlock(connX, row.yPos);
        input.connection.setHidden(false);
      }
    }
  },

  positionExternalValueConnection_controls_if(row){
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    function getAllWidthLeft(index, ary) {
      if (index === 0) {
        return 0;
      }
      return ary[index - 1].width + getAllWidthLeft(index - 1, ary);
    }
    var input = row.getLastInput(),
      connX;
    if (input.connection) {
      connX = row.xPos;
      if (this.info_.RTL) {
        connX *= -1;
      }
      var index = +input.input.name.split('IF')[1];
      input.connection.setOffsetInBlock(connX + getAllWidthLeft(index, doElseBranchInfo.branchs) + doElseBranchInfo.branchs[index].width_left, this.constants_.DIAMOND_SHORT - row.height / 2);
      this.branchWidth += row.widthWithConnectedBlocks;
    }
  },

  positionExternalValueConnection_controls_whileUntil(row){
    var input = row.getLastInput(),
    loopInfo = this.info_.getLoopInfo(),
    connX;
    if (input.connection) {
      connX = row.xPos + row.width;
      if (this.info_.RTL) {
        connX *= -1;
      }
      input.connection.setOffsetInBlock(loopInfo.width_left, this.constants_.DIAMOND_SHORT - row.height / 2);
    }
  },

  positionExternalValueConnection_controls_for(row){
    this.positionExternalValueConnection_controls_whileUntil.call(this, row);
  },
  positionExternalValueConnection_controls_forEach(row){
    this.positionExternalValueConnection_controls_whileUntil.call(this, row);
  },
  

  //重写绘制“可输入”的形状 主要是为了自定义block的样式  比如controls_if，loop，procedures，thread等
  drawValueInput_: function(row) {
    if(this['drawValueInput_' + this.block_.type] && typeof this['drawValueInput_' + this.block_.type] === 'function'){
      this['drawValueInput_' + this.block_.type](row);
    }else{
      var input = row.getLastInput();
      if(!input){
        return;
      }
      var pathDown = (typeof input.shape.pathDown == "function") ?
        input.shape.pathDown(input.height) :
        input.shape.pathDown;

      //zjie 当有外部输入的时候，是否画右边的凹槽
      if (window.CUSTOM_CFG_OUTLINE && !CUSTOM_CFG_OUTLINE.leftRoundedCorner) {
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
          (window.CUSTOM_CFG_OUTLINE.rightNotch ? pathDown : '') +  //zjie
          Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
      } else {
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
          pathDown +
          Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
      }
    }
    this.positionExternalValueConnection_(row);
  },

  drawValueInput_controls_if(row){
    // 暂时不画这个标记输入的框框
    /*var y = 10; // 这里inputRectHeight、inputRectWidth都是指实际输入框的一半
    var x = y * this.constants_.DIAMOND_LONG / this.constants_.DIAMOND_SHORT;
    if(this.block_.type === 'controls_if'){
      this.outlinePath_ += (` M ${x} ${this.constants_.DIAMOND_SHORT - y} l ${2 * (this.constants_.DIAMOND_LONG - x)} 0 l 0 ${2 * y}`);
      this.outlinePath_ += (` l -${2 * (this.constants_.DIAMOND_LONG - x)} 0 l 0 -${2 * y} z`);
    } */
    var doElseBranchInfo = this.info_.getDoElseBranchInfo();
    // this.positionExternalValueConnection_(row, doElseBranchInfo);
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
  },

  /**
   * [drawValueInput_controls_whileUntil while\until循环的输入部分形状的绘制]
   * @return {[type]} [description]
   */
  drawValueInput_controls_whileUntil(row){
    return;
  },
  drawValueInput_controls_for(row){
    return;
  },
  drawValueInput_controls_forEach(row){
    return;
  },
  //调整field的位置  覆盖 \core\renderers\common\drawer.js
  layoutField_: function(fieldInfo) {
    switch (this.block_.type) {
      case 'controls_if':
        this.positionFieldsOfControlsIf(fieldInfo);
        break;
      case 'controls_repeat_ext':
      case 'controls_whileUntil':
      case 'controls_for':
      case 'controls_forEach':
        this.positionFieldsOfLoop(fieldInfo);
        break;
      case 'lists_create_with':
        this.positionFieldsOfListsCreateWith(fieldInfo);
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
   
    params.yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
    switch(this.block_.type){
      case 'controls_repeat_ext':
        params.xPos = loopInfo.width_left + 10;
        // params.yPos += 5;//this.constants_.LOOP_FIELD_OFFSET_Y;
        break;
      case 'controls_whileUntil':
        params.xPos = loopInfo.width_left - fieldInfo.width;
        params.yPos += 5;
        break;
      case 'controls_for':
      case 'controls_forEach':
      //todo
        // params.xPos += loopInfo.width_left - fieldInfo.width;
        params.xPos += loopInfo.width_left - 50;
        // params.yPos += 5;
        break;
    }
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
      if (this.block_.type == 'controls_repeat_ext' ||
      this.block_.type === 'controls_whileUntil') {
        var loopInfo = this.info_.getLoopInfo();
        connX = loopInfo.width_left - this.constants_.DIAMOND_LONG + this.constants_.LOOP_FIELD_OFFSET_X;
        // connX = loopInfo.width_left - input.width /*+ 10*/; // 10: space的宽度？
        // connX += this.constants_.LOOP_FIELD_OFFSET_X; //todo
        yPos += this.constants_.LOOP_FIELD_OFFSET_Y;
      }
      if(this.block_.type === 'controls_for' ||
       this.block_.type === 'controls_forEach'){
        var loopInfo = this.info_.getLoopInfo();
        // connX += loopInfo.width_left - this.constants_.DIAMOND_LONG + this.constants_.LOOP_FIELD_OFFSET_X;
        connX += loopInfo.width_left - 50; //整体向左偏移50px   TODO
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

  positionFieldsOfListsCreateWith(fieldInfo){
    if (Blockly.blockRendering.Types.isField(fieldInfo)) {
      var svgGroup = fieldInfo.field.getSvgRoot();
    } else if (Blockly.blockRendering.Types.isIcon(fieldInfo)) {
      var svgGroup = fieldInfo.icon.iconGroup_;
    }

    var yPos = fieldInfo.centerline - fieldInfo.height / 2;
    var xPos = fieldInfo.xPos;
    // print(xPos, yPos);
    if(fieldInfo.field instanceof Blockly.FieldBtn){
    debugger;   //1225
    // print(fieldInfo.field.getSvgRoot());
    // print(fieldInfo.parentInput.connection.targetBlock());
      if(!this.block_.fixPositionX){
        this.block_.fixPositionX = xPos;
      }else{
        xPos = this.block_.fixPositionX;
      }
    }
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
      svgGroup && svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')' + scale);
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
      svgGroup && svgGroup.setAttribute('transform', 'translate(' + xPos + ',' + yPos + ')' + scale);
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
    this.width_google = this.width;//按照google的计算框架计算出的block的宽度

  


    if(this.block_.type === 'threads_def' ||
        this.block_.type === 'procedures_defnoreturn' ||
        this.block_.type === 'procedures_defreturn' ){
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

    this.height = yCursor + this.constants_.DARK_PATH_OFFSET;
    if (this.block_.type === 'controls_if') {
      if(this.block_.isCollapsed() || this.block_.isInFlyout){
        this.width = this.constants_.DIAMOND_LONG * 2;
        this.height = this.constants_.DIAMOND_SHORT * 2;
      }else{
        this.width = getAllBranchWidth.call(this);
        this.height += (this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y * 2);
        this.height = this.height + this.constants_.GAP_V; //15 为了让子block于父block戳开一段距离，不然会挤在一起很难看
      }
      this.widthWithChildren = this.width; //外部的容器在计算宽度时会参考this.widthWithChildren
    }
 
    this.setLoopBlockHeight();
    this.startY = this.topRow.capline;
  },
  //设置循环模块的高度
  setLoopBlockHeight() {
    if (this.block_.type === 'controls_repeat_ext' ||
      this.block_.type === 'controls_whileUntil' ||
      this.block_.type === 'controls_for' ||
      this.block_.type === 'controls_forEach') {
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
   * [getWidestChildInfo 获取宽度最大的子block]
   * @param  {[type]} block [description]
   * @return {[type]}       [description]
   */
  getWidestChildInfo(block){
    var curBlock = block;
    var width_left = 0;
    var widestChild = {
      width: 0
    };
    /*if(block && block.childBlocks_ && block.childBlocks_.length){
      curBlock = block.childBlocks_[0];
    }*/
    while(curBlock && curBlock.previousConnection){
      if(curBlock.previousConnection.offsetInBlock_.x > width_left){
        width_left = Math.max(width_left, curBlock.previousConnection.offsetInBlock_.x);
        widestChild = curBlock;
      }
      if(curBlock.nextConnection){
        curBlock = curBlock.nextConnection.targetBlock()
      }else{
        curBlock = null;
      }
    }
    return {
      width_left: Math.max(this.constants_.DIAMOND_LONG + this.constants_.GAP_H, width_left),
      widestChild: widestChild 
    }
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
          temmObj.block_x = connectedBlock ? this.getWidestChildInfo(connectedBlock).width_left : 0;
          temmObj.block_width = connectedBlock ? connectedBlock.width : 0;
          temmObj.max_block_width = this.getWidestChildInfo(connectedBlock).widestChild.width; //Math.max(temmObj.max_block_width, temmObj.block_width);
          temmObj.width_left = Math.max(temmObj.block_x, key.toLowerCase() === 'else' ? 0 : this.constants_.DIAMOND_LONG); //主线左边的宽度 (这里的block_x可能和最长的那个block的x偏移对不上 TODO)
          temmObj.width_right = Math.max(temmObj.max_block_width - temmObj.block_x, key.toLowerCase() === 'else' ? 0 : (this.constants_.DIAMOND_LONG + this.constants_.LINE_ELSE_H)) + this.constants_.GAP_H;
          temmObj.width = temmObj.width_left + temmObj.width_right; //this.getWidestChildInfo(connectedBlock).widestChild.width; //
          temmObj.height = row.height;
        }
      }
    }
    //( this.constants_.DIAMOND_SHORT * 2 + this.constants_.STATEMENT_OFFSET_Y)
    var maxHeight = getMaxHeight(doElseBranchInfo) + otherRowHeight + this.constants_.STATEMENT_OFFSET_Y; //这些block里面高度最大的那个block的高度
    // 解决block收拢时没有分之信息会报错的问题
    if(branchs.length === 0){
      branchs.push({
        width_left: this.constants_.DIAMOND_LONG,
        width_right: this.constants_.DIAMOND_LONG + this.constants_.GAP_H,
        height: 2 * this.constants_.DIAMOND_SHORT
      })
    }
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
    var loopInfo = {
      max_block_width: 0,
      width_left: this.constants_.DIAMOND_LONG + this.constants_.GAP_H,
      width_right: this.constants_.DIAMOND_LONG + this.constants_.GAP_H,
      width: 0,
      height: 2* this.constants_.DIAMOND_SHORT
    };
    for (var i = 0, row;
      (row = this.rows[i]); i++) {
      if (row.hasStatement) {
        var statementInput = this.getStatementInput(row);

        let connectedBlock = statementInput.connectedBlock;
        Object.assign(loopInfo, {
          block_x: connectedBlock ? this.getWidestChildInfo(connectedBlock).width_left : 0,
          block_width: connectedBlock ? connectedBlock.width : 0,
          max_block_width: 0,
          height: row.height + this.constants_.STATEMENT_OFFSET_Y * 2
        })
        loopInfo.max_block_width = this.getWidestChildInfo(connectedBlock).widestChild.width;
        loopInfo.width_left = Math.max(loopInfo.block_x, this.constants_.DIAMOND_LONG) + this.constants_.GAP_H;
        loopInfo.width_right = Math.max(loopInfo.max_block_width - loopInfo.block_x + this.constants_.GAP_H, this.constants_.DIAMOND_LONG) + this.constants_.GAP_H;
        loopInfo.width = loopInfo.width_left + loopInfo.width_right;
      }
    }
    return loopInfo;
  }
})

/*--------------------events-----------------*/
Object.assign(Blockly.BlockSvg.prototype, {


  onMouseWheel_(e) {
    // Don't scroll or zoom anything if drag is in progress.
    if (Blockly.Gesture.inProgress()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    var canWheelZoom = this.options.zoomOptions && this.options.zoomOptions.wheel;
    var canWheelMove = this.options.moveOptions && this.options.moveOptions.wheel;
    if (!canWheelZoom && !canWheelMove) {
      return;
    }

    var scrollDelta = Blockly.utils.getScrollDeltaPixels(e);
    if (canWheelZoom && e.ctrlKey && !canWheelMove) {
      // Zoom.
      // The vertical scroll distance that corresponds to a click of a zoom
      // button.
      var PIXELS_PER_ZOOM_STEP = 50;
      var delta = -scrollDelta.y / PIXELS_PER_ZOOM_STEP;
      var position = Blockly.utils.mouseToSvg(e, this.getParentSvg(),
          this.getInverseScreenCTM());
      this.zoom(position.x, position.y, delta);
    } else {
      // Scroll.
      var x = this.scrollX - scrollDelta.x;
      var y = this.scrollY - scrollDelta.y;

      if (e.shiftKey && !scrollDelta.x) {
        // Scroll horizontally (based on vertical scroll delta).
        // This is needed as for some browser/system combinations which do not
        // set deltaX.
        x = this.scrollX - scrollDelta.y;
        y = this.scrollY; // Don't scroll vertically
      }
      this.scroll(x, y);
    }
    e.preventDefault();
  },
  createConnectGuideSvg(){
    const guideSvgH = new Blockly.blockRendering.ConstantProvider().CONNECT_GUIDE_SVG_HEIGHT;
    if(this.connectGuideSvg){
      Blockly.utils.dom.update(this.connectGuideSvg, {
        y: this.height /*- guideSvgH*/ - 6,
        width: this.width,
      });
      //如果connectGuideSvg不是这个svgGroup_的最后1个元素需要将他移到最后，否则可能会出现子block将向导块覆盖的情况
      var isLastChild = Blockly.utils.dom.isLastChild(this.connectGuideSvg);
      if(!isLastChild){
        Blockly.utils.dom.moveToLast(this.connectGuideSvg);
      }
      return;
    }
    this.connectGuideSvg = Blockly.utils.dom.createSvgElement('rect', {
      class: 'connectGuideSvg',
      x: 0,
      y: this.height /*- guideSvgH*/ - 6,
      width: this.width,
      height: guideSvgH,
      // fill: '#ff0000'
    }, this.svgGroup_);

    Blockly.bindEventWithChecks_(this.connectGuideSvg, 'mouseenter', this, this.onMouseEnter_);
    Blockly.bindEventWithChecks_(this.connectGuideSvg, 'mouseleave', this, this.onMouseleave_);
    Blockly.bindEventWithChecks_(this.connectGuideSvg, 'mousedown', this, this.onMouseEnter_);
  },
  onMouseEnter_(e){
    if (Blockly.Gesture.inProgress()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if(e.ctrlKey){
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 将loop和if模块排除
    const excludeBlock = ['controls_if', 'controls_for', 'controls_forEach', 'controls_whileUntil', 'controls_repeat_ext'];
    if(excludeBlock.indexOf(this.type) > -1){
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if(e.target.parentNode){
      Blockly.utils.dom.addClass(e.target.parentNode, 'showConnectGuideSvg')
      window.QKM.dragDisabled = true;
    }
  },

  onMouseleave_(e){
    if(e.target.parentNode){
      Blockly.utils.dom.removeClass(e.target.parentNode, 'showConnectGuideSvg')
    }
  }
})

Blockly.TouchGesture.prototype.handleMove = function(e) {
  function drawArrow(arrow){
    const CONSTANTS = new Blockly.blockRendering.ConstantProvider();
    var path = '';
    switch(arrow){
      case 'up':
        path += `m 0 ${CONSTANTS.ARROW_HEIGHT}`; //往下移箭头的高度
        path += `l -${CONSTANTS.ARROW_WIDTH} 0 l ${CONSTANTS.ARROW_WIDTH} -${CONSTANTS.ARROW_HEIGHT} l ${CONSTANTS.ARROW_WIDTH} ${CONSTANTS.ARROW_HEIGHT} l -${CONSTANTS.ARROW_WIDTH} 0 z`;
        break;
      case 'down':
        path += `m 0 -${CONSTANTS.ARROW_HEIGHT}`; //往上移箭头的高度
        path += `l -${CONSTANTS.ARROW_WIDTH} 0 l ${CONSTANTS.ARROW_WIDTH} ${CONSTANTS.ARROW_HEIGHT} l ${CONSTANTS.ARROW_WIDTH} -${CONSTANTS.ARROW_HEIGHT} l -${CONSTANTS.ARROW_WIDTH} 0 z`;
        break;
    }
    return path;
  }

  const guideSvgH = new Blockly.blockRendering.ConstantProvider().CONNECT_GUIDE_SVG_HEIGHT;
  //鼠标点击连线向导块进行移动
  if(window.QKM.isDrawingConnectedLine  /*e.target.className.baseVal == 'connectGuideSvg'*/){
    //开始画线
    //TODO 暂时将逻辑写在这里看一下效果
    var attrs = {};
    
    //计算线段起点坐标
    var startPoint = window.QKM.startPoint;
    var endPoint = {
      x: e.clientX,
      y: e.clientY
    }
    //为什么在最后会有+1，-1等运算？  避免鼠标一直悬浮在polylineSvg导致目标block捕捉不到鼠标的hover事件
    attrs.d = `m ${this.targetBlock_.width / 2} ${this.targetBlock_.height - guideSvgH / 2} l 0 ${(endPoint.y - startPoint.y)/2} m 0 0 l ${endPoint.x - startPoint.x} 0 m 0 0 l 0 ${(endPoint.y - startPoint.y)/2 > 0 ? (endPoint.y - startPoint.y)/2 - 1 : (endPoint.y - startPoint.y)/2 + 1} `;
    var arrow = endPoint.y - startPoint.y > 0 ? 'down': 'up';
    attrs.d += `${drawArrow(arrow)}`;
    if(this.targetBlock_.polylineSvg){
      this.targetBlock_.polylineSvg.setAttribute('d', attrs.d);
    }else{
      this.targetBlock_.polylineSvg = Blockly.utils.dom.createSvgElement('path', {
        class: 'polylineSvg',
        d: attrs.d,
        stroke: '#ff0000',
        fill: '#ff0000'
      }, this.targetBlock_.svgGroup_);

      Blockly.bindEventWithChecks_(this.targetBlock_.polylineSvg, 'mousedown', this, (e)=>{
        Blockly.utils.dom.addClass(this.targetBlock_.svgGroup_, 'showConnectGuideSvg')
      });
    }
    return;
  }
  if(window.QKM.isDrawingConnectedLine){
    return;
  }
  if (this.isDragging()) {
    // We are in the middle of a drag, only handle the relevant events
    if (Blockly.Touch.shouldHandleEvent(e)) {
      Blockly.TouchGesture.superClass_.handleMove.call(this, e);
    }
    return;
  }
  if (this.isMultiTouch()) {
    if (Blockly.Touch.isTouchEvent(e)) {
      this.handleTouchMove(e);
    }
    Blockly.longStop_();
  } else {
    Blockly.TouchGesture.superClass_.handleMove.call(this, e);
  }
};

/* core/rendered_connection.js */
/**
 * Disconnect two blocks that are connected by this connection.
 * @param {!Blockly.Block} parentBlock The superior block.
 * @param {!Blockly.Block} childBlock The inferior block.
 * @private
 */
Blockly.RenderedConnection.prototype.disconnectInternal_ = function (parentBlock,
  childBlock) {
  Blockly.RenderedConnection.superClass_.disconnectInternal_.call(this,
    parentBlock, childBlock);
  // Rerender the parent so that it may reflow.
  if (parentBlock.rendered) {
    parentBlock.render(true/* opt_bubble  @Blockly.BlockSvg.prototype.render */, true/* force render */);
  }
  if (childBlock.rendered) {
    childBlock.updateDisabled();
    childBlock.render(false/* opt_bubble  @Blockly.BlockSvg.prototype.render */, true/* force render */);
  }
};

