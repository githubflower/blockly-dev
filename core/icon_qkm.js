/**
 * @fileoverview Object representing an icon on a block.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Icon_qkm');

goog.require('Blockly.Icon');
goog.require('Blockly.utils');
goog.require('Blockly.utils.Coordinate');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.Size');


/**
 * Class for an icon.
 * @param {Blockly.BlockSvg} block The block associated with this icon.
 * @constructor
 */
Blockly.Icon_qkm = function(block) {
  /**
   * The block this icon is attached to.
   * @type {Blockly.BlockSvg}
   * @protected
   */
  this.block_ = block;
};
Blockly.utils.object.inherits(Blockly.Icon_qkm, Blockly.Icon);

Blockly.Icon_qkm.prototype.iconClick_ = function(e) {
  if (this.block_.workspace.isDragging()) {
    // Drag operation is concluding.  Don't open the editor.
    return;
  }
  if (!this.block_.isInFlyout && !Blockly.utils.isRightButton(e)) {
    this.setVisible(!this.isVisible());
  }
};
