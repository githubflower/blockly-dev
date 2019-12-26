/**
 * @license
 * Copyright 2012 Google LLC
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
 * @fileoverview Image field.  Used for pictures, icons, etc.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldSvg');

goog.require('Blockly.Field');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.utils');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Size');


/**
 * Class for an image on a block.
 * @param {string} src The URL of the image. Defaults to an empty string.
 * @param {!(string|number)} width Width of the image.
 * @param {!(string|number)} height Height of the image.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @param {function(!Blockly.FieldSvg)=} opt_onClick Optional function to be
 *     called when the image is clicked. If opt_onClick is defined, opt_alt must
 *     also be defined.
 * @param {boolean=} opt_flipRtl Whether to flip the icon in RTL.
 * @param {Object=} opt_config A map of options used to configure the field.
 *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/image#creation}
 *    for a list of properties this parameter supports.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldSvg = function(svgTag, attrs, opt_alt, opt_onClick, opt_flipRtl, opt_config) {
  // Return early.
  
  this.svgTag = svgTag || 'path';
  this.attrs = attrs;

  // Initialize configurable properties.
  /**
   * Whether to flip this image in RTL.
   * @type {boolean}
   * @private
   */
  this.flipRtl_ = false;

  /**
   * Alt text of this image.
   * @type {string}
   * @private
   */
  this.altText_ = '';

  Blockly.FieldSvg.superClass_.constructor.call(
      this, svgTag || '', null, opt_config);

  if (!opt_config) {  // If the config wasn't passed, do old configuration.
    this.flipRtl_ = !!opt_flipRtl;
    this.altText_ = Blockly.utils.replaceMessageReferences(opt_alt) || '';
  }

  this.size_ = new Blockly.utils.Size(16, 16)

  /**
   * The function to be called when this field is clicked.
   * @type {?function(!Blockly.FieldSvg)}
   * @private
   */
  this.clickHandler_ = null;

  if (typeof opt_onClick == 'function') {
    this.clickHandler_ = opt_onClick;
  }
};
Blockly.utils.object.inherits(Blockly.FieldSvg, Blockly.Field);

/**
 * Construct a FieldSvg from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (src, width, height,
 *    alt, and flipRtl).
 * @return {!Blockly.FieldSvg} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldSvg.fromJson = function(options) {
  return new Blockly.FieldSvg(
      options['svgTag'], options['attrs'],
      undefined, undefined, undefined, options);
};

/**
 * Vertical padding below the image, which is included in the reported height of
 * the field.
 * @type {number}
 * @private
 */
Blockly.FieldSvg.Y_PADDING = 1;

/**
 * Editable fields usually show some sort of UI indicating they are
 * editable. This field should not.
 * @type {boolean}
 */
Blockly.FieldSvg.prototype.EDITABLE = false;

/**
 * Used to tell if the field needs to be rendered the next time the block is
 * rendered. Image fields are statically sized, and only need to be
 * rendered at initialization.
 * @type {boolean}
 * @protected
 */
Blockly.FieldSvg.prototype.isDirty_ = false;

/**
 * Configure the field based on the given map of options.
 * @param {!Object} config A map of options to configure the field based on.
 * @private
 */
Blockly.FieldSvg.prototype.configure_ = function(config) {
  Blockly.FieldSvg.superClass_.configure_.call(this, config);
  this.flipRtl_ = !!config['flipRtl'];
};

/**
 * Create the block UI for this image.
 * @package
 */
Blockly.FieldSvg.prototype.initView = function() {
  this.svgElement_ = Blockly.utils.dom.createSvgElement( this.svgTag, this.attrs || {}, this.fieldGroup_);
};

/**
 * Ensure that the input value (the source URL) is a string.
 * @param {*=} opt_newValue The input value.
 * @return {?string} A string, or null if invalid.
 * @protected
 */
Blockly.FieldSvg.prototype.doClassValidation_ = function(opt_newValue) {
  if (typeof opt_newValue != 'string') {
    return null;
  }
  return opt_newValue;
};

/**
 * Update the value of this image field, and update the displayed image.
 * @param {*} newValue The value to be saved. The default validator guarantees
 * that this is a string.
 * @protected
 */
Blockly.FieldSvg.prototype.doValueUpdate_ = function(attrs) {
  Blockly.utils.dom.update(this.svgElement_, attrs);
};

Blockly.FieldSvg.prototype.replaceImageElement = function(dom) {
  this.svgElement_ = dom;
};

/**
 * Get whether to flip this image in RTL
 * @return {boolean} True if we should flip in RTL.
 * @override
 */
Blockly.FieldSvg.prototype.getFlipRtl = function() {
  return this.flipRtl_;
};


/**
 * If field click is called, and click handler defined,
 * call the handler.
 */
Blockly.FieldSvg.prototype.showEditor_ = function() {
  if (this.clickHandler_) {
    this.clickHandler_(this);
  }
};

/**
 * Set the function that is called when this image  is clicked.
 * @param {?function(!Blockly.FieldSvg)} func The function that is called
 *    when the image is clicked, or null to remove.
 */
Blockly.FieldSvg.prototype.setOnClickHandler = function(func) {
  this.clickHandler_ = func;
};

/**
 * Use the `getText_` developer hook to override the field's text
 * representation.
 * Return the image alt text instead.
 * @return {?string} The image alt text.
 * @protected
 * @override
 */
Blockly.FieldSvg.prototype.getText_ = function() {
  return this.altText_;
};

//获取fieldSvg的状态  返回 'expand' or  'collapse'
Blockly.FieldSvg.prototype.getStatus = function(){
  return this._status;
}

//设置fieldSvg的状态  暂时将参数范围放开，方便自定义  可传任意值
Blockly.FieldSvg.prototype.setStatus = function(status){
  this._status = status;
  this.updateByStatus(status);
}

Blockly.FieldSvg.prototype.updateByStatus = function(status){
  print('status:', status);
  var a = 4, b = 6;
  var expandPath = `M 0 0 h 16 v 16 h -16 z M 2 2 l ${a} ${b}  l -${a} ${b} M 8 2 l ${a} ${b} m 0 0 l -${a} ${b} z`;
  var collapsePath = `M 0 0 h 16 v 16 h -16 z M 6 2 l -${a} ${b}  l ${a} ${b} M 12 2 l -${a} ${b} m 0 0 l ${a} ${b} z`;
  var path = status === 'expand' ? expandPath: collapsePath;
  Blockly.utils.dom.update(this.svgElement_, {
    // class: status,
    d: path
  })
  jQuery(this.svgElement_).toggleClass(status);
}

Blockly.fieldRegistry.register('field_svg', Blockly.FieldSvg);
