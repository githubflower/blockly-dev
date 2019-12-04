
/**
 * @fileoverview Utility functions for handling threads.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Threads
 * @namespace
 */
goog.provide('Blockly.Threads');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Events');
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('Blockly.Names');
goog.require('Blockly.utils.xml');
goog.require('Blockly.Workspace');
goog.require('Blockly.Xml');


/**
 * Constant to separate thread names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.THREAD_CATEGORY_NAME
 */
Blockly.Threads.NAME_TYPE = Blockly.THREAD_CATEGORY_NAME;

/**
 * Find all user-created thread definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains threads without return variables, the second with.
 *     Each thread is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.Threads.allThreads = function(root) {
  var blocks = root.getAllBlocks(false);
  var threadsReturn = [];
  var threadsNoReturn = [];
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getThreadDef) {
      var tuple = blocks[i].getThreadDef();
      if (tuple) {
        if (tuple[2]) {
          threadsReturn.push(tuple);
        } else {
          threadsNoReturn.push(tuple);
        }
      }
    }
  }
  threadsNoReturn.sort(Blockly.Threads.procTupleComparator_);
  threadsReturn.sort(Blockly.Threads.procTupleComparator_);
  return [threadsNoReturn, threadsReturn];
};

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.Threads.procTupleComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Ensure two identically-named threads don't exist.
 * Take the proposed thread name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other threads.
 * @param {string} name Proposed thread name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Threads.findLegalName = function(name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple threads called 'do something'.
    return name;
  }
  name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
  while (!Blockly.Threads.isLegalName_(name, block.workspace, block)) {
    // Collision with another thread.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return name;
};

/**
 * Does this thread have a legal name?  Illegal names include names of
 * threads already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Blockly.Threads.isLegalName_ = function(name, workspace, opt_exclude) {
  return !Blockly.Threads.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a thread name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Blockly.Threads.isNameUsed = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].getThreadDef) {
      var procName = blocks[i].getThreadDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Rename a thread.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Blockly.Threads.rename = function(name) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  name = name.trim();

  var legalName = Blockly.Threads.findLegalName(name, this.getSourceBlock());
  var oldName = this.getValue();
  if (oldName != name && oldName != legalName) {
    // Rename any callers.
    var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].renameThread) {
        blocks[i].renameThread(oldName, legalName);
      }
    }
  }
  return legalName;
};

/**
 * Construct the blocks required by the flyout for the thread category.
 * @param {!Blockly.Workspace} workspace The workspace containing threads.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Threads.flyoutCategory = function(workspace) {
  var xmlList = [];
  if (Blockly.Blocks['threads_def']) {
    // <block type="threads_defnoreturn" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'threads_def');
    block.setAttribute('gap', 16);
    var nameField = Blockly.utils.xml.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.utils.xml.createTextNode(
        Blockly.Msg['THREADS_DEFNORETURN_THREAD']));
    block.appendChild(nameField);
    xmlList.push(block);
  }
  /*if (Blockly.Blocks['threads_start']) {
    // <block type="threads_defreturn" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'threads_start');
    block.setAttribute('gap', 16);
    var nameField = Blockly.utils.xml.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.utils.xml.createTextNode(
        Blockly.Msg['THREADS_DEFRETURN_THREAD']));
    block.appendChild(nameField);
    xmlList.push(block);
  }
  if (Blockly.Blocks['threads_end']) {
    // <block type="threads_ifreturn" gap="16"></block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'threads_end');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }*/
  if (xmlList.length) {
    // Add slightly larger gap between system blocks and user calls.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);
  }

  function populateThreads(threadList, templateName) {
    for (var i = 0; i < threadList.length; i++) {
      var name = threadList[i][0];
      var args = threadList[i][1];
      // <block type="threads_callnoreturn" gap="16">
      //   <mutation name="do something">
      //     <arg name="x"></arg>
      //   </mutation>
      // </block>
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', templateName);
      block.setAttribute('gap', 16);
      var mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('name', name);
      block.appendChild(mutation);
      for (var j = 0; j < args.length; j++) {
        var arg = Blockly.utils.xml.createElement('arg');
        arg.setAttribute('name', args[j]);
        mutation.appendChild(arg);
      }
      xmlList.push(block);
    }
  }

  var tuple = Blockly.Threads.allThreads(workspace);
  populateThreads(tuple[0], 'threads_start');
  populateThreads(tuple[0], 'threads_end');
  // tuple[1]   noreturn 
  //todo
  return xmlList;
};

/**
 * Find all the callers of a named thread.
 * @param {string} name Name of thread.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 */
Blockly.Threads.getCallers = function(name, workspace) {
  var callers = [];
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getThreadCall) {
      var procName = blocks[i].getThreadCall();
      // Thread name may be null if the block is only half-built.
      if (procName && Blockly.Names.equals(procName, name)) {
        callers.push(blocks[i]);
      }
    }
  }
  return callers;
};

/**
 * When a thread definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock Thread definition block.
 */
Blockly.Threads.mutateCallers = function(defBlock) {
  var oldRecordUndo = Blockly.Events.recordUndo;
  var name = defBlock.getThreadDef()[0];
  var xmlElement = defBlock.mutationToDom(true);
  var callers = Blockly.Threads.getCallers(name, defBlock.workspace);
  for (var i = 0, caller; caller = callers[i]; i++) {
    var oldMutationDom = caller.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    caller.domToMutation(xmlElement);
    var newMutationDom = caller.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      // Fire a mutation on every caller block.  But don't record this as an
      // undo action since it is deterministically tied to the thread's
      // definition mutation.
      Blockly.Events.recordUndo = false;
      Blockly.Events.fire(new Blockly.Events.BlockChange(
          caller, 'mutation', null, oldMutation, newMutation));
      Blockly.Events.recordUndo = oldRecordUndo;
    }
  }
};

/**
 * Find the definition block for the named thread.
 * @param {string} name Name of thread.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The thread definition block, or null not found.
 */
Blockly.Threads.getDefinition = function(name, workspace) {
  // Assume that a thread definition is a top block.
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getThreadDef) {
      var tuple = blocks[i].getThreadDef();
      if (tuple && Blockly.Names.equals(tuple[0], name)) {
        return blocks[i];
      }
    }
  }
  return null;
};
