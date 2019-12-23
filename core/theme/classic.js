/**
 * @license
 * Copyright 2018 Google LLC
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
 * @fileoverview Classic theme.
 * Contains multi-coloured border to create shadow effect.
 */
'use strict';

goog.provide('Blockly.Themes.Classic');

goog.require('Blockly.Theme');


// Temporary holding object.
Blockly.Themes.Classic = {};

Blockly.Themes.Classic.defaultBlockStyles = {
  "logic_blocks": {
    // "colourPrimary": "blue"
    "colourPrimary": "#6200EA"
    // "colourPrimary": "#AA00FF"
  },
  "loop_blocks": {
    "colourPrimary": "#19b5fe"
    // "colourPrimary": "#304FFE"
  },
  "math_blocks": {
    "colourPrimary": "#2c82c9"
    // "colourPrimary": "#00BFA5"
  },
  "text_blocks": {
    "colourPrimary": "#304FFE"
    // "colourPrimary": "#AA00FF"
  },
  "list_blocks": {
    "colourPrimary": "#1f3a93"
    // "colourPrimary": "#FF6F00"
  },
  "variable_blocks": {
    // "colourPrimary": "#00C853"
    "colourPrimary": "#1e8bc3"
  },
  "procedure_blocks": {
    "colourPrimary": "#01579b"
  },
  "thread_blocks": {
    "colourPrimary": "#0d0a31",
    // "colourPrimary": "#282c34",
    "colourSecondary": "#dbbdd6",
    "colourTertiary": "#84497a"
  },
  "connect_blocks": {
    "colourPrimary": "#DD2C00",
  },
  "colour_blocks": {
    "colourPrimary": "20"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#564895"
  },
  "hat_blocks": {
    "colourPrimary": "330",
    "hat": "cap"
  },
};

Blockly.Themes.Classic.categoryStyles = {
  "colour_category": {
    "colour": "20"
  },
  "list_category": {
    "colour": "260"
  },
  "logic_category": {
    "colour": "210"
  },
  "loop_category": {
    "colour": "120"
  },
  "math_category": {
    "colour": "230"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category": {
    "colour": "310"
  }
};

Blockly.Themes.Classic =
    new Blockly.Theme(Blockly.Themes.Classic.defaultBlockStyles,
        Blockly.Themes.Classic.categoryStyles);
