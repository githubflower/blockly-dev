/**
 * @license
 * Copyright 2019 Google LLC
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
 * @fileoverview Non-editable, serializable text field. Behaves like a
 *    normal label but is serialized to XML. It may only be
 *    edited programmatically.
 */
"use strict";

goog.provide("Blockly.FieldLabelSerializableQkm");

goog.require("Blockly.FieldLabelSerializable");
goog.require("Blockly.fieldRegistry");
goog.require("Blockly.utils");
goog.require("Blockly.utils.object");

/**
 * Class for a non-editable, serializable text field.
 * @param {*} opt_value The initial value of the field. Should cast to a
 *    string. Defaults to an empty string if null or undefined.
 * @param {string=} opt_class Optional CSS class for the field's text.
 * @param {Object=} opt_config A map of options used to configure the field.
 *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/label-serializable#creation}
 *    for a list of properties this parameter supports.
 * @extends {Blockly.FieldLabel}
 * @constructor
 *
 */
Blockly.FieldLabelSerializableQkm = function(opt_value, opt_class, opt_config) {
  this.SERIALIZABLE = true;
  Blockly.FieldLabelSerializableQkm.superClass_.constructor.call(
    this,
    opt_value,
    opt_class,
    opt_config
  );
  this._customValue = {
    inputType: null,
    inputValue: null
  };
  // @param {Object=} data  
  this._setCustomValue = (data)=>{
    Object.assign(this._customValue, data);
  }
  this._getCustomValue = ()=>{
    return this._customValue;
  }
};
Blockly.FieldLabelSerializableQkm.fromJson = function(options) {
  var text = Blockly.utils.replaceMessageReferences(options['text']);
  return new Blockly.FieldLabelSerializableQkm(text, undefined, options);
};

Blockly.utils.object.inherits(
  Blockly.FieldLabelSerializableQkm,
  Blockly.FieldLabelSerializable
);

//绑定点击事件
Blockly.FieldLabelSerializableQkm.prototype.bindEvents_ = function() {
  var el = this.getClickTarget_();
  this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(el, 'mousedown', this, this.handleMousedown, true);
/*  this.mouseEnterHandler_ = Blockly.bindEventWithChecks_(el, 'mouseenter', this, this.handleMouseEnter_, true);
  this.mouseLeaveHandler_ = Blockly.bindEventWithChecks_(el, 'mouseleave', this, this.handleMouseLeave_, true);
  this.mouseOverHandler_ = Blockly.bindEventWithChecks_(el, 'mouseover', this, this.handleMouseOver_, true);*/
};

Blockly.FieldLabelSerializableQkm.prototype.handleMousedown = function(e){
  if (!this.sourceBlock_ || !this.sourceBlock_.workspace) {
    return;
  }
  var gesture = this.sourceBlock_.workspace.getGesture(e);
  if (gesture) {
    gesture.setStartField(this);
  }

  console.log('---mousedown---');
  console.log('workspace.isDragging: ' + this.sourceBlock_.workspace.isDragging())
}
/*Blockly.FieldLabelSerializableQkm.prototype.handleClick_ = function(){
  console.log('---handleClick_---');
}
Blockly.FieldLabelSerializableQkm.prototype.handleMouseEnter_ = function() {
  console.log('---handleMouseEnter_---');
  this.focus();
};
Blockly.FieldLabelSerializableQkm.prototype.handleMouseLeave_ = function() {
  console.log('---handleMouseLeave_---'); //todo
};
Blockly.FieldLabelSerializableQkm.prototype.handleMouseOver_ = function() {
  console.log('---handleMouseOver_---');
};*/
Blockly.FieldLabelSerializableQkm.prototype.getElement = function(){
  return this.getClickTarget_();
}


Blockly.FieldLabelSerializableQkm.prototype.showEditor_ = function(){
  this.createFormDiv();
}

Object.assign(Blockly.FieldLabelSerializableQkm.prototype, {
  EDITABLE: true,
  SERIALIZABLE: true,
  CURSOR: 'default',
  createFormDiv: function(){
    /*var $formDiv = jQuery('#formDiv');
    if($formDiv[0]){
      $formDiv.show();
      this.positionFormDiv();
      return;
    }
    var formDivHtml = 
    `<div id="formDiv" class="custom-extend-div">
      <label for="inputType">赋值方式</label>
      <select name="inputType">
          <option value="1" selected>自定义输入</option>
          <option value="2" >已存在的变量</option>
      </select>
      <input type="text" name="dataValue" id="formDivInput"/>
      <br/>
      <input type="button" value="确定" id="confirmBtn">
      <input type="button" value="取消" id="cancelBtn">
    </div>`;
    jQuery('.injectionDiv').append(formDivHtml);

    var defaultData = this.getDataFromCfg();
    this.updateForm(defaultData);
    this.positionFormDiv();

    this.bindEvent4FormDiv(this);*/



    this.editor_ = this.dropdownCreate_();
    // this.renderEditor_();
    Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
    this.bindEvent4FormDiv(this);
  },
  dropdownCreate_: function(){
    var formDivHtml = 
    `<div id="formDiv" class="custom-extend-div">
      <label for="inputType">赋值方式</label>
      <select name="inputType">
          <option value="1" selected>自定义输入</option>
          <option value="2" >已存在的变量</option>
      </select>
      <input type="text" name="dataValue" id="formDivInput"/>
      <br/>
      <input type="button" value="确定" id="confirmBtn">
      <input type="button" value="取消" id="cancelBtn">
    </div>`;
    return jQuery(formDivHtml)[0];
  },
  dropdownDispose_: function(){
    //todo
  },
  getDataFromCfg: function(){
    var block = this.sourceBlock_;
    //assistValueField  用于生成XML以及将XML转为图形界面
    var assistValueField = block.inputList.find(item => {
      return item.name === "ASSIST_INPUT";
    });
    var assistType = assistValueField.fieldRow.find(item => {
      return item.name === "ASSIST_TYPE";
    });
    var assistValue = assistValueField.fieldRow.find(item => {
      return item.name === "ASSIST_VALUE";
    });
    return {
      inputType: assistType.getValue(),
      inputValue: assistValue.getValue()
    }
  },
  updateForm: function(formData){
    jQuery('select[name="inputType"]').val(formData.inputType);
    jQuery('#formDivInput').val(formData.inputValue);

    this.positionFormDiv();
  },
  positionFormDiv: function(){
    var position = this.sourceBlock_.getBoundingRectangle()  //Blockly.utils.Rect {top: 113, bottom: 143, left: 563, right: 699.2684326171875}
    jQuery('#formDiv').css({
      top: position.top + this.sourceBlock_.height,
      left: position.left + jQuery('.blocklyToolboxDiv').width()
    })
  },
  bindEvent4FormDiv: function(field){
    //确定
    jQuery(document).on('click', '#confirmBtn', field, function(e){
      var field = e.data;
      var inputType = jQuery('select[name="inputType"]').val();
      var inputValue = jQuery('#formDivInput').val();
      field._setCustomValue({
        inputType: inputType,
        inputValue: inputValue
      });
      jQuery('#formDiv').hide();

      var block = field.sourceBlock_;
 
      //assistValueField  用于生成XML以及将XML转为图形界面
      var assistValueField = block.inputList.find(item => {
        return item.name === "ASSIST_INPUT";
      });
      var assistType = assistValueField.fieldRow.find(item => {
        return item.name === "ASSIST_TYPE";
      });
      var assistValue = assistValueField.fieldRow.find(item => {
        return item.name === "ASSIST_VALUE";
      });

      assistType.setValue(inputType);
      assistValue.setValue(inputValue);

      Blockly.DropDownDiv.hideIfOwner(field, true);
    })

    //取消
    jQuery(document).on('click', '#cancelBtn', field, function(e){
      jQuery('#formDiv').hide();
      Blockly.DropDownDiv.hideIfOwner(field, true);
    })
  },
  initView: function() {
    this.createBorderRect_();
    this.createTextElement_();
  }
})

Blockly.FieldLabelSerializableQkm.prototype.focus = function(e) {
  var el = this.getElement();
  if (el) {
    el.focus();
    Blockly.utils.dom.addClass(el, 'focused');
  }
};

Blockly.fieldRegistry.register(
  "field_label_serializable_qkm",
  Blockly.FieldLabelSerializableQkm
);
