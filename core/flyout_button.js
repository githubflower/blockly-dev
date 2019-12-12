/**
 * @license
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Class for a button in the flyout.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.FlyoutButton');

goog.require('Blockly.Css');
goog.require('Blockly.utils');
goog.require('Blockly.utils.Coordinate');
goog.require('Blockly.utils.dom');


/**
 * Class for a button in the flyout.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace in which to place this
 *     button.
 * @param {!Blockly.WorkspaceSvg} targetWorkspace The flyout's target workspace.
 * @param {!Element} xml The XML specifying the label/button.
 * @param {boolean} isLabel Whether this button should be styled as a label.
 * @constructor
 */
Blockly.FlyoutButton = function(workspace, targetWorkspace, xml, isLabel) {
  // Labels behave the same as buttons, but are styled differently.

  /**
   * @type {!Blockly.WorkspaceSvg}
   * @private
   */
  this.workspace_ = workspace;

  /**
   * @type {!Blockly.WorkspaceSvg}
   * @private
   */
  this.targetWorkspace_ = targetWorkspace;

  /**
   * @type {string}
   * @private
   */
  this.text_ = xml.getAttribute('text');

  /**
   * @type {!Blockly.utils.Coordinate}
   * @private
   */
  this.position_ = new Blockly.utils.Coordinate(0, 0);

  /**
   * Whether this button should be styled as a label.
   * @type {boolean}
   * @private
   */
  this.isLabel_ = isLabel;

  /**
   * The key to the function called when this button is clicked.
   * @type {string}
   * @private
   */
  this.callbackKey_ = xml.getAttribute('callbackKey') ||
  /* Check the lower case version too to satisfy IE */
                      xml.getAttribute('callbackkey');

  /**
   * If specified, a CSS class to add to this button.
   * @type {?string}
   * @private
   */
  this.cssClass_ = xml.getAttribute('web-class') || null;
};

/**
 * The margin around the text in the button.
 */
Blockly.FlyoutButton.MARGIN = 5;

/**
 * The width of the button's rect.
 * @type {number}
 */
Blockly.FlyoutButton.prototype.width = 0;

/**
 * The height of the button's rect.
 * @type {number}
 */
Blockly.FlyoutButton.prototype.height = 0;

/**
 * Opaque data that can be passed to Blockly.unbindEvent_.
 * @type {Array.<!Array>}
 * @private
 */
Blockly.FlyoutButton.prototype.onMouseUpWrapper_ = null;

/**
 * Create the button elements.
 * @return {!SVGElement} The button's SVG group.
 */
Blockly.FlyoutButton.prototype.createDom = function() {
  var cssClass = this.isLabel_ ? 'blocklyFlyoutLabel' : 'blocklyFlyoutButton';
  if (this.cssClass_) {
    cssClass += ' ' + this.cssClass_;
  }

  this.svgGroup_ = Blockly.utils.dom.createSvgElement('g', {'class': cssClass},
      this.workspace_.getCanvas());

  if (!this.isLabel_) {
    // Shadow rectangle (light source does not mirror in RTL).
    var shadow = Blockly.utils.dom.createSvgElement('rect',
        {
          'class': 'blocklyFlyoutButtonShadow',
          'rx': 4, 'ry': 4, 'x': 1, 'y': 1
        },
        this.svgGroup_);
  }
  // Background rectangle.
  var rect = Blockly.utils.dom.createSvgElement('rect',
      {
        'class': this.isLabel_ ?
            'blocklyFlyoutLabelBackground' : 'blocklyFlyoutButtonBackground',
        'rx': 4, 'ry': 4
      },
      this.svgGroup_);

  var svgText = Blockly.utils.dom.createSvgElement('text',
      {
        'class': this.isLabel_ ? 'blocklyFlyoutLabelText' : 'blocklyText',
        'x': 0,
        'y': 0,
        'text-anchor': 'middle'
      },
      this.svgGroup_);
  svgText.textContent = Blockly.utils.replaceMessageReferences(this.text_);
  if (this.isLabel_) {
    this.svgText_ = svgText;
    this.workspace_.getThemeManager().subscribe(this.svgText_, 'flyoutText', 'fill');
  }

  this.width = Blockly.utils.dom.getTextWidth(svgText);
  this.height = 20;  // Can't compute it :(

  if (!this.isLabel_) {
    this.width += 2 * Blockly.FlyoutButton.MARGIN;
    shadow.setAttribute('width', this.width);
    shadow.setAttribute('height', this.height);
  }
  rect.setAttribute('width', this.width);
  rect.setAttribute('height', this.height);

  svgText.setAttribute('x', this.width / 2);
  svgText.setAttribute('y', this.height - Blockly.FlyoutButton.MARGIN);

  this.updateTransform_();

  this.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(
      this.svgGroup_, 'mouseup', this, this.onMouseUp_);
  return this.svgGroup_;
};

/**
 * Correctly position the flyout button and make it visible.
 */
Blockly.FlyoutButton.prototype.show = function() {
  this.updateTransform_();
  this.svgGroup_.setAttribute('display', 'block');
};

/**
 * Update SVG attributes to match internal state.
 * @private
 */
Blockly.FlyoutButton.prototype.updateTransform_ = function() {
  this.svgGroup_.setAttribute('transform',
      'translate(' + this.position_.x + ',' + this.position_.y + ')');
};

/**
 * Move the button to the given x, y coordinates.
 * @param {number} x The new x coordinate.
 * @param {number} y The new y coordinate.
 */
Blockly.FlyoutButton.prototype.moveTo = function(x, y) {
  this.position_.x = x;
  this.position_.y = y;
  this.updateTransform_();
};

/**
 * Location of the button.
 * @return {!Blockly.utils.Coordinate} x, y coordinates.
 * @package
 */
Blockly.FlyoutButton.prototype.getPosition = function() {
  return this.position_;
};

/**
 * Get the button's target workspace.
 * @return {!Blockly.WorkspaceSvg} The target workspace of the flyout where this
 *     button resides.
 */
Blockly.FlyoutButton.prototype.getTargetWorkspace = function() {
  return this.targetWorkspace_;
};

/**
 * Dispose of this button.
 */
Blockly.FlyoutButton.prototype.dispose = function() {
  if (this.onMouseUpWrapper_) {
    Blockly.unbindEvent_(this.onMouseUpWrapper_);
  }
  if (this.svgGroup_) {
    Blockly.utils.dom.removeNode(this.svgGroup_);
  }
  if (this.svgText_) {
    this.workspace_.getThemeManager().unsubscribe(this.svgText_);
  }
};

/**
 * Do something when the button is clicked.
 * @param {!Event} e Mouse up event.
 * @private
 */
Blockly.FlyoutButton.prototype.onMouseUp_ = function(e) {
  var gesture = this.targetWorkspace_.getGesture(e);
  if (gesture) {
    gesture.cancel();
  }
  this.showEditor();

  /*if (this.isLabel_ && this.callbackKey_) {
    console.warn('Labels should not have callbacks. Label text: ' + this.text_);
  } else if (!this.isLabel_ && !(this.callbackKey_ &&
      this.targetWorkspace_.getButtonCallback(this.callbackKey_))) {
    console.warn('Buttons should have callbacks. Button text: ' + this.text_);
  } else if (!this.isLabel_) {
    this.targetWorkspace_.getButtonCallback(this.callbackKey_)(this);
  }*/
};

Blockly.FlyoutButton.prototype.showEditor = function(){
  this.createFormDiv();
}
Object.assign(Blockly.FlyoutButton.prototype, {
  getSvgRoot(){
    return this.svgGroup_;
  },
  createFormDiv(){
    this.editor_ = this.dropdownCreate_();
    Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);
    Blockly.DropDownDiv.setBoundsElement(this.svgGroup_);
    var position = this.svgGroup_.getBoundingClientRect();
    Blockly.DropDownDiv.show(this.svgGroup_, false, position.x, position.y + 30, 0, 0, this.dropdownDispose_.bind(this));
    // this.renderEditor_();
    
  },
  dropdownCreate_: function(){
    var formDivHtml = 
    `<div id="formDiv" class="custom-extend-div">
      <label for="varKey">变量名称</label>
      <input type="text" name="varKey" id="varKey"/>
      <label for="varVal">变量值</label>
      <input type="text" name="varVal" id="varVal"/>
      <br/>
      <input type="button" value="确定" id="confirmBtn">
      <input type="button" value="取消" id="cancelBtn">
    </div>`;

    this.bindEvent4FormDiv(this);
    return jQuery(formDivHtml)[0];
  },
  updateForm(){
    jQuery('#varKey').val('');
    jQuery('#varVal').val('');
  },
  dropdownDispose_(){
    jQuery(document).off('click', '#confirmBtn');
    jQuery(document).off('click', '#cancelBtn');
  },
  bindEvent4FormDiv: function(field){
    //确定
    jQuery(document).on('click', '#confirmBtn', field, function(e){
      var btn = e.data;
      var varKey = jQuery('#varKey').val();
      var varVal = jQuery('#varVal').val();
      
      field.dropdownDispose_();
      field.checkVarAndCreate(varKey, varVal, field.getTargetWorkspace(), (text, varVal)=>{
        var firstBlock = new Blockly.BlockSvg(field.getTargetWorkspace(), 'variables_set_hidden', null, false/*是否显示这个block*/);
        // var firstBlock = new Blockly.BlockSvg(field.getTargetWorkspace(), 'math_number', null, false/*是否显示这个block*/);
        debugger;
        var varId = field.targetWorkspace_.variableMap_.getVariable(varKey).id_;
        firstBlock.getInput('VAR_NAME').fieldRow[0].setValue(varId);
        firstBlock.getInput('VAR_VALUE').fieldRow[0].setValue(varVal);
       

      }, null, varVal);
      jQuery('#formDiv').hide();
      Blockly.DropDownDiv.hideIfOwner(field, true);
    })

    //取消
    jQuery(document).on('click', '#cancelBtn', field, function(e){
      field.dropdownDispose_();
      jQuery('#formDiv').hide();
      Blockly.DropDownDiv.hideIfOwner(field, true);
    })
  },
  //创建变量并给变量赋值
  checkVarAndCreate(text, varVal, workspace, success_callback, varType, _initValue){
    var type = varType || '';
    if (text) {
      var existing =
          Blockly.Variables.nameUsedWithAnyType_(text, workspace);
      if (existing) {
        var lowerCase = text.toLowerCase();
        if (existing.type == type) {
          var msg = Blockly.Msg['VARIABLE_ALREADY_EXISTS'].replace(
              '%1', lowerCase);
        } else {
          var msg =
              Blockly.Msg['VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE'];
          msg = msg.replace('%1', lowerCase).replace('%2', existing.type);
        }
        Blockly.alert(msg,
            function() {
              // promptAndCheckWithAlert(text);  // Recurse
            });
      } else {
        // No conflict
        workspace.createVariable(text, type, null, _initValue);
        if (success_callback) {
          success_callback.call(this, text, varVal);
        }
      }
    } else {
      // User canceled prompt.
      /*if (success_callback) {
        success_callback(null);
      }*/
    }
  }
})

/**
 * CSS for buttons and labels.  See css.js for use.
 */
Blockly.Css.register([
  /* eslint-disable indent */
  '.blocklyFlyoutButton {',
    'fill: #888;',
    'cursor: default;',
  '}',

  '.blocklyFlyoutButtonShadow {',
    'fill: #666;',
  '}',

  '.blocklyFlyoutButton:hover {',
    'fill: #aaa;',
  '}',

  '.blocklyFlyoutLabel {',
    'cursor: default;',
  '}',

  '.blocklyFlyoutLabelBackground {',
    'opacity: 0;',
  '}',

  '.blocklyFlyoutLabelText {',
    'fill: #000;',
  '}'
  /* eslint-enable indent */
]);
