goog.provide('Blockly.FieldBtn');

goog.require('Blockly.Events');
goog.require('Blockly.Field');
goog.require("Blockly.fieldRegistry");
goog.require("Blockly.utils");
goog.require("Blockly.utils.object");

Blockly.FieldBtn = function(value, opt_validator, opt_config){
	this.SERIALIZABLE = true;
	this.type = opt_config && opt_config.type;
	this.eventType = opt_config && opt_config.eventType;
	Blockly.FieldBtn.superClass_.constructor.call(this, value, opt_validator, opt_config)
}

Blockly.utils.object.inherits(
  Blockly.FieldBtn,
  Blockly.Field
);

Blockly.FieldBtn.fromJson = function(options) {
  var text = Blockly.utils.replaceMessageReferences(options['text']);
  return new Blockly.FieldBtn(text, undefined, options);
};

Blockly.FieldBtn.prototype.focus = function(e) {
  var el = this.getElement();
  if (el) {
    el.focus();
    Blockly.utils.dom.addClass(el, 'focused');
  }
};

Blockly.FieldBtn.prototype.onMouseDown_ = function(e){
  if (!this.sourceBlock_ || !this.sourceBlock_.workspace) {
    return;
  }
  var gesture = this.sourceBlock_.workspace.getGesture(e);
  if (gesture) {
    gesture.setStartField(this);
  }
  this.sourceBlock_.doSthWithFieldBtnClick && this.sourceBlock_.doSthWithFieldBtnClick(this);
}

Blockly.fieldRegistry.register(
  "field_btn",
  Blockly.FieldBtn
);