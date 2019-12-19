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
  "colour_blocks": {
    "colourPrimary": "20"
  },
  "list_blocks": {
    "colourPrimary": "#B7F0AD"
  },
  "logic_blocks": {
    "colourPrimary": "#91EAD2"
  },
  "loop_blocks": {
    "colourPrimary": "#EFB9AA"
    // "colourPrimary": "#1dabab"
    // "colourPrimary": "#081331"
    // "colourPrimary": "#f2631f"
  },
  "math_blocks": {
    "colourPrimary": "#FF7C9B"
  },
  "procedure_blocks": {
    "colourPrimary": "#926fff"
    // "colourPrimary": "#17a1ff"
  },
  "text_blocks": {
    "colourPrimary": "#D4AEF9"
  },
  "variable_blocks": {
    "colourPrimary": "#98E1F9"
    // "colourPrimary": "#95ca34"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#564895"
  },
  "hat_blocks": {
    "colourPrimary": "330",
    "hat": "cap"
  },
  "thread_blocks": {
    "colourPrimary": "#ff0000",
    "colourSecondary": "#dbbdd6",
    "colourTertiary": "#84497a"
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
