// Copyright (c) 2010-2013 Google Inc.
// Copyright (c) 2014 Opera Software ASA.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

window.cvox || (window.cvox = {});
cvox.MathJaxExternalUtil = function () {};
cvox.MathJaxExternalUtil.mmlAttr = function () {
    return ""
};
cvox.MathJaxExternalUtil.mfenced = function (a) {
    null == a && (a = "");
    var b = [a + '<mrow mfenced="true"' + this.toMathMLattributes() + ">"],
        c = a + "  ";
    this.data.open && b.push(this.data.open.toMathML(c));
    null != this.data[0] && b.push(this.data[0].toMathML(c));
    for (var d = 1, e = this.data.length; d < e; d++) {
        this.data[d] && (this.data["sep" + d] && b.push(this.data["sep" + d].toMathML(c)), b.push(this.data[d].toMathML(c)))
    }
    this.data.close && b.push(this.data.close.toMathML(c));
    b.push(a + "</mrow>");
    return b.join("\n")
};
cvox.MathJaxExternalUtil.getMathml = function (a, b) {
    var c = MathJax.ElementJax.mml.mbase.prototype,
        d = MathJax.ElementJax.mml.mfenced.prototype;
    this.mmlAttr = c.toMathMLattributes;
    var e = d.toMathML;
    try {
        c.toMathMLattributes = cvox.MathJaxExternalUtil.mbase;
        d.toMathML = cvox.MathJaxExternalUtil.mfenced;
        var f = a.root.toMathML("");
        c.toMathMLattributes = this.mmlAttr;
        d.toMathML = e;
        MathJax.Callback(b)(f)
    } catch (g) {
        c.toMathMLattributes = this.mmlAttr;
        d.toMathML = e;
        if (!g.restart) {
            throw g;
        }
        return MathJax.Callback.After([cvox.MathJaxExternalUtil.getMathml, a, b], g.restart)
    }
};
cvox.MathJaxExternalUtil.mbase = function () {
    var a = cvox.MathJaxExternalUtil.mmlAttr.call(this);
    null != this.spanID && (a += ' spanID="' + ((this.id || "MathJax-Span-" + this.spanID) + MathJax.OutputJax["HTML-CSS"].idPostfix) + '"');
    null != this.texClass && (a += ' texClass="' + this.texClass + '"');
    return a
};
cvox.MathJaxExternalUtil.isActive = function () {
    return "undefined" != typeof MathJax && "undefined" != typeof MathJax.Hub && "undefined" != typeof MathJax.ElementJax && "undefined" != typeof MathJax.InputJax
};
cvox.MathJaxExternalUtil.getMathjaxCallback_ = function (a, b) {
    cvox.MathJaxExternalUtil.getMathml(b, function (c) {
        b.root.inputID && a(c, b.root.inputID)
    })
};
cvox.MathJaxExternalUtil.registerSignal = function (a, b) {
    MathJax.Hub.Register.MessageHook(b, function (b) {
        b = MathJax.Hub.getJaxFor(b[1]);
        cvox.MathJaxExternalUtil.getMathjaxCallback_(a, b)
    })
};
cvox.MathJaxExternalUtil.getAllJax = function (a) {
    var b = MathJax.Hub.getAllJax();
    b && b.forEach(function (b) {
        b.root.spanID && cvox.MathJaxExternalUtil.getMathjaxCallback_(a, b)
    })
};
cvox.MathJaxExternalUtil.injectConfigScript = function () {
    var a = document.createElement("script");
    a.setAttribute("type", "text/x-mathjax-config");
    a.textContent = 'MathJax.Hub.Config({\n  jax: ["input/AsciiMath", "input/TeX"],\n  extensions: ["toMathML.js"],\n  skipStartupTypeset: true,\n  messageStyle: "none",\n  TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}\n});\nMathJax.Hub.Queue(\n  function() {MathJax.Hub.inputJax["math/asciimath"].Process();\n  MathJax.Hub.inputJax["math/tex"].Process()}\n);\n//\n// Prevent these from being loaded\n//\nif (!MathJax.Extension.MathMenu) {MathJax.Extension.MathMenu = {}};\nif (!MathJax.Extension.MathZoom) {MathJax.Extension.MathZoom = {}};';
    document.activeElement.appendChild(a)
};
cvox.MathJaxExternalUtil.injectLoadScript = function () {
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("src", "http://cdn.mathjax.org/mathjax/latest/MathJax.js");
    document.activeElement.appendChild(a)
};
cvox.MathJaxExternalUtil.configMediaWiki = function () {
    mediaWiki && MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
        var a = MathJax.ElementJax.mml;
        MathJax.Hub.Insert(MathJax.InputJax.TeX.Definitions, {
            mathchar0mi: {
                thetasym: "03B8",
                koppa: "03DF",
                stigma: "03DB",
                varstigma: "03DB",
                coppa: "03D9",
                varcoppa: "03D9",
                sampi: "03E1",
                C: ["0043", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                cnums: ["0043", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                Complex: ["0043", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                H: ["210D", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                N: ["004E", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                natnums: ["004E", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                Q: ["0051",
                    {
                        mathvariant: a.VARIANT.DOUBLESTRUCK
                    }],
                R: ["0052", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                reals: ["0052", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                Reals: ["0052", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                Z: ["005A", {
                    mathvariant: a.VARIANT.DOUBLESTRUCK
                }],
                sect: "00A7",
                P: "00B6",
                AA: ["00C5", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                alef: ["2135", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                alefsym: ["2135", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                weierp: ["2118", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                real: ["211C", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                part: ["2202", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                infin: ["221E", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                empty: ["2205", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                O: ["2205", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                ang: ["2220", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                exist: ["2203", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                clubs: ["2663", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                diamonds: ["2662", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                hearts: ["2661", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                spades: ["2660", {
                    mathvariant: a.VARIANT.NORMAL
                }],
                textvisiblespace: "2423",
                geneuro: "20AC",
                euro: "20AC"
            },
            mathchar0mo: {
                and: "2227",
                or: "2228",
                bull: "2219",
                plusmn: "00B1",
                sdot: "22C5",
                Dagger: "2021",
                sup: "2283",
                sub: "2282",
                supe: "2287",
                sube: "2286",
                isin: "2208",
                hAar: "21D4",
                hArr: "21D4",
                Harr: "21D4",
                Lrarr: "21D4",
                lrArr: "21D4",
                lArr: "21D0",
                Larr: "21D0",
                rArr: "21D2",
                Rarr: "21D2",
                harr: "2194",
                lrarr: "2194",
                larr: "2190",
                gets: "2190",
                rarr: "2192",
                oiint: ["222F", {
                    texClass: a.TEXCLASS.OP
                }],
                oiiint: ["2230", {
                    texClass: a.TEXCLASS.OP
                }]
            },
            mathchar7: {
                Alpha: "0391",
                Beta: "0392",
                Epsilon: "0395",
                Zeta: "0396",
                Eta: "0397",
                Iota: "0399",
                Kappa: "039A",
                Mu: "039C",
                Nu: "039D",
                Omicron: "039F",
                Rho: "03A1",
                Tau: "03A4",
                Chi: "03A7",
                Koppa: "03DE",
                Stigma: "03DA",
                Digamma: "03DC",
                Coppa: "03D8",
                Sampi: "03E0"
            },
            delimiter: {
                "\\uarr": "2191",
                "\\darr": "2193",
                "\\Uarr": "21D1",
                "\\uArr": "21D1",
                "\\Darr": "21D3",
                "\\dArr": "21D3",
                "\\rang": "27E9",
                "\\lang": "27E8"
            },
            macros: {
                sgn: "NamedFn",
                arccot: "NamedFn",
                arcsec: "NamedFn",
                arccsc: "NamedFn",
                sen: "NamedFn",
                image: ["Macro", "\\Im"],
                bold: ["Macro", "\\mathbf{#1}", 1],
                pagecolor: ["Macro", "", 1],
                emph: ["Macro", "\\textit{#1}", 1],
                textsf: ["Macro", "\\mathord{\\sf{\\text{#1}}}", 1],
                texttt: ["Macro", "\\mathord{\\tt{\\text{#1}}}", 1],
                vline: ["Macro", "\\smash{\\large\\lvert}", 0]
            }
        })
    })
};
cvox.MathJaxExternalUtil.convertToMml = function (a, b, c, d, e, f) {
    var g = MathJax.HTML.Element("script", {
        type: c
    }, [b]),
        g = {
            math: b,
            script: g
        };
    MathJax.InputJax[d].prefilterHooks.Execute(g);
    var h;
    try {
        h = f(g.math)
    } catch (k) {
        if (k[e]) {
            h = MathJax.ElementJax.mml.merror(k.message.replace(/\n.*/, ""))
        } else {
            if (k.restart) {
                return MathJax.Callback.After([cvox.MathJaxExternalUtil.convertToMml, a, b, c, d, e, f], k.restart)
            }
            throw k;
        }
    }
    h = h.inferred ? MathJax.ElementJax.mml.apply(MathJax.ElementJax, h.data) : MathJax.ElementJax.mml(h);
    h.root.display = "block";
    g.math = h;
    g.script.MathJax = {};
    MathJax.InputJax[d].postfilterHooks.Execute(g);
    return cvox.MathJaxExternalUtil.getMathml(g.math, a)
};
cvox.MathJaxExternalUtil.texToMml = function (a, b) {
    cvox.MathJaxExternalUtil.convertToMml(a, b, "math/tex;mode=display", "TeX", "texError", function (a) {
        return MathJax.InputJax.TeX.Parse(a).mml()
    })
};
cvox.MathJaxExternalUtil.asciiMathToMml = function (a, b) {
    cvox.MathJaxExternalUtil.convertToMml(a, b, "math/asciimath", "AsciiMath", "asciimathError", MathJax.InputJax.AsciiMath.AM.parseMath)
};
cvox.TestMessages = {
    locale: {
        message: "en"
    },
    chromevox_name: {
        message: "ChromeVox"
    },
    chromevox_description: {
        message: "ChromeVox - Giving Voice to Chrome"
    },
    chromevox_stop_speech_key: {
        message: "Stop speech"
    },
    chromevox_toggle_sticky_mode: {
        message: "Enable/Disable sticky mode"
    },
    chromevox_prefix_key: {
        message: "Prefix key"
    },
    chromevox_handle_tab_next: {
        message: "Jump to next focusable item"
    },
    chromevox_handle_tab_prev: {
        message: "Jump to previous focusable item"
    },
    chromevox_backward: {
        message: "Navigate backward"
    },
    chromevox_forward: {
        message: "Navigate forward"
    },
    chromevox_left: {
        message: "Move left"
    },
    chromevox_right: {
        message: "Move right"
    },
    chromevox_skip_backward: {
        message: "Skip backward during continuous reading"
    },
    chromevox_skip_forward: {
        message: "Skip forward during continuous reading"
    },
    chromevox_previous_granularity: {
        message: "Decrease navigation granularity"
    },
    chromevox_next_granularity: {
        message: "Increase navigation granularity"
    },
    chromevox_act_on_current_item: {
        message: "Take action on current item"
    },
    chromevox_force_click_on_current_item: {
        message: "Click on current item"
    },
    chromevox_read_link_url: {
        message: "Announce the URL behind a link"
    },
    chromevox_read_current_title: {
        message: "Announce the title of the current page"
    },
    chromevox_read_current_url: {
        message: "Announce the URL of the current page"
    },
    chromevox_read_from_here: {
        message: "Start reading from current location"
    },
    chromevox_show_power_key: {
        message: "Open ChromeVox keyboard help"
    },
    chromevox_hide_power_key: {
        message: "Hide ChromeVox help"
    },
    chromevox_power_key_help: {
        message: "Press up or down to review commands, press enter to activate"
    },
    chromevox_help: {
        message: "Open ChromeVox tutorial"
    },
    chromevox_toggle_search_widget: {
        message: "Toggle search widget"
    },
    chromevox_show_options_page: {
        message: "Open options page"
    },
    chromevox_show_kb_explorer_page: {
        message: "Open keyboard explorer"
    },
    chromevox_decrease_tts_rate: {
        message: "Decrease rate of speech"
    },
    chromevox_increase_tts_rate: {
        message: "Increase rate of speech"
    },
    chromevox_decrease_tts_pitch: {
        message: "Decrease pitch"
    },
    chromevox_increase_tts_pitch: {
        message: "Increase pitch"
    },
    chromevox_decrease_tts_volume: {
        message: "Decrease speech volume"
    },
    chromevox_increase_tts_volume: {
        message: "Increase speech volume"
    },
    chromevox_show_forms_list: {
        message: "Show forms list"
    },
    chromevox_show_headings_list: {
        message: "Show headings list"
    },
    chromevox_show_links_list: {
        message: "Show links list"
    },
    chromevox_show_tables_list: {
        message: "Show tables list"
    },
    chromevox_show_landmarks_list: {
        message: "Show landmarks list"
    },
    chromevox_previous_row: {
        message: "Previous table row"
    },
    chromevox_next_row: {
        message: "Next table row"
    },
    chromevox_previous_col: {
        message: "Previous table column"
    },
    chromevox_next_col: {
        message: "Next table column"
    },
    chromevox_announce_headers: {
        message: "Announce the headers of the current cell"
    },
    chromevox_speak_table_location: {
        message: "Announce current cell coordinates"
    },
    chromevox_guess_row_header: {
        message: "Make a guess at the row header of the current cell"
    },
    chromevox_guess_col_header: {
        message: "Make a guess at the column header of the current cell"
    },
    chromevox_skip_to_beginning: {
        message: "Go to beginning of table"
    },
    chromevox_skip_to_end: {
        message: "Go to end of table"
    },
    chromevox_skip_to_row_beginning: {
        message: "Go to beginning of the current row"
    },
    chromevox_skip_to_row_end: {
        message: "Go to end of the current row"
    },
    chromevox_skip_to_col_beginning: {
        message: "Go to beginning of the current column"
    },
    chromevox_skip_to_col_end: {
        message: "Go to end of the current column"
    },
    chromevox_next_heading1: {
        message: "Next level 1 heading"
    },
    chromevox_previous_heading1: {
        message: "Previous level 1 heading"
    },
    chromevox_next_heading2: {
        message: "Next level 2 heading"
    },
    chromevox_previous_heading2: {
        message: "Previous level 2 heading"
    },
    chromevox_next_heading3: {
        message: "Next level 3 heading"
    },
    chromevox_previous_heading3: {
        message: "Previous level 3 heading"
    },
    chromevox_next_heading4: {
        message: "Next level 4 heading"
    },
    chromevox_previous_heading4: {
        message: "Previous level 4 heading"
    },
    chromevox_next_heading5: {
        message: "Next level 5 heading"
    },
    chromevox_previous_heading5: {
        message: "Previous level 5 heading"
    },
    chromevox_next_heading6: {
        message: "Next level 6 heading"
    },
    chromevox_previous_heading6: {
        message: "Previous level 6 heading"
    },
    chromevox_next_combo_box: {
        message: "Next combo box"
    },
    chromevox_previous_combo_box: {
        message: "Previous combo box"
    },
    chromevox_next_edit_text: {
        message: "Next editable text area"
    },
    chromevox_previous_edit_text: {
        message: "Previous editable text area"
    },
    chromevox_next_form_field: {
        message: "Next form field"
    },
    chromevox_previous_form_field: {
        message: "Previous form field"
    },
    chromevox_next_graphic: {
        message: "Next graphic"
    },
    chromevox_previous_graphic: {
        message: "Previous graphic"
    },
    chromevox_next_heading: {
        message: "Next heading"
    },
    chromevox_previous_heading: {
        message: "Previous heading"
    },
    chromevox_next_list_item: {
        message: "Next list item"
    },
    chromevox_previous_list_item: {
        message: "Previous list item"
    },
    chromevox_next_jump: {
        message: "Next jump"
    },
    chromevox_previous_jump: {
        message: "Previous jump"
    },
    chromevox_next_link: {
        message: "Next link"
    },
    chromevox_previous_link: {
        message: "Previous link"
    },
    chromevox_next_list: {
        message: "Next list"
    },
    chromevox_previous_list: {
        message: "Previous list"
    },
    chromevox_next_math: {
        message: "Next math"
    },
    chromevox_previous_math: {
        message: "Previous math"
    },
    chromevox_next_media: {
        message: "Next media"
    },
    chromevox_previous_media: {
        message: "Previous media"
    },
    chromevox_next_blockquote: {
        message: "Next block quote"
    },
    chromevox_previous_blockquote: {
        message: "Previous block quote"
    },
    chromevox_next_radio: {
        message: "Next radio button"
    },
    chromevox_previous_radio: {
        message: "Previous radio button"
    },
    chromevox_next_slider: {
        message: "Next slider"
    },
    chromevox_previous_slider: {
        message: "Previous slider"
    },
    chromevox_next_table: {
        message: "Next table"
    },
    chromevox_next_visited_link: {
        message: "Next visited link"
    },
    chromevox_previous_table: {
        message: "Previous table"
    },
    chromevox_previous_visited_link: {
        message: "Previous visited link"
    },
    chromevox_next_button: {
        message: "Next button"
    },
    chromevox_previous_button: {
        message: "Previous button"
    },
    chromevox_next_checkbox: {
        message: "Next checkbox"
    },
    chromevox_previous_checkbox: {
        message: "Previous checkbox"
    },
    chromevox_next_landmark: {
        message: "Next landmark"
    },
    chromevox_previous_landmark: {
        message: "Previous landmark"
    },
    chromevox_benchmark: {
        message: "Debug benchmark"
    },
    chromevox_announce_position: {
        message: "Announces a brief description of the current position"
    },
    chromevox_fully_describe: {
        message: "Announces a complete description of the current position"
    },
    chromevox_options_page_title: {
        message: "ChromeVox Options"
    },
    chromevox_options_page_summary: {
        message: "Use the options below to customize ChromeVox. Changes take effect immediately."
    },
    chromevox_options_mouse_focus_follows: {
        message: "Use the mouse to change focus."
    },
    chromevox_options_site_specific_enhancements: {
        message: "Enhance specific sites (like Google Search)."
    },
    chromevox_options_verbosity_verbose: {
        message: "Enable verbose descriptions."
    },
    chromevox_options_cursor_between_characters: {
        message: "Place cursor between characters when editing text (like Mac OS X)."
    },
    chromevox_options_magnifier_show_checkbox: {
        message: "Show a magnified view of the page content."
    },
    chromevox_options_voices: {
        message: "Voices"
    },
    chromevox_options_voices_description: {
        message: "Change the current voice by selecting an option from the list below."
    },
    chromevox_options_keyboard_shortcuts: {
        message: "Keyboard shortcuts"
    },
    chromevox_options_keymap_description: {
        message: "Change the current keymap by selecting an option from the list below."
    },
    chromevox_options_select_keys: {
        message: "Reset current keymap"
    },
    chromevox_options_shortcuts_description: {
        message: "Customize keyboard shortcuts for frequently used commands by typing them into the corresponding fields below."
    },
    chromevox_options_modifier_keys: {
        message: "Modifier keys"
    },
    chromevox_options_cvox_modifier_key: {
        message: "ChromeVox modifier key"
    },
    chromevox_kbexplorer_title: {
        message: "ChromeOS Keyboard Explorer"
    },
    chromevox_kbexplorer_instructions: {
        message: "Press any key to learn its name. Ctrl+W will close the keyboard explorer."
    },
    chromevox_chrome_system_need_restart: {
        message: "System was updated.  Restart is recommended."
    },
    chromevox_chrome_brightness_changed: {
        message: "Brightness $1 percent",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_chrome_tab_created: {
        message: "tab created"
    },
    chromevox_chrome_tab_selected: {
        message: "$1, tab",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_chrome_normal_window_selected: {
        message: "window $1 tab",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_chrome_incognito_window_selected: {
        message: "incognito window $1 tab",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_chrome_menu_opened: {
        message: "$1 menu opened",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_checkbox_checked: {
        message: "$1 checkbox checked",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_checkbox_checked_state: {
        message: "checked"
    },
    chromevox_checkbox_checked_state_brl: {
        message: "x"
    },
    chromevox_describe_checkbox_unchecked: {
        message: "$1, checkbox not checked",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_checkbox_unchecked_state: {
        message: "not checked"
    },
    chromevox_checkbox_unchecked_state_brl: {
        message: " "
    },
    chromevox_describe_radio_selected: {
        message: "$1, radio button selected",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_radio_selected_state: {
        message: "selected"
    },
    chromevox_radio_selected_state_brl: {
        message: "x"
    },
    chromevox_describe_radio_unselected: {
        message: "$1, radio button unselected",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_radio_unselected_state: {
        message: "unselected"
    },
    chromevox_radio_unselected_state_brl: {
        message: " "
    },
    chromevox_describe_menu: {
        message: "$1, menu",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_menu_item: {
        message: "$1, menu item",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_menu_item_with_submenu: {
        message: "$1, menu item, with submenu",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_window: {
        message: "$1, window",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_textbox: {
        message: "$1, $2, text box",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_describe_unnamed_textbox: {
        message: "$1, text box",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_password: {
        message: "$1, $2, password text box",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_describe_unnamed_password: {
        message: "$1, password text box",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_button: {
        message: "$1, button",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_combobox: {
        message: "$1, $2, combo box",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_describe_unnamed_combobox: {
        message: "$1, combo box",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_listbox: {
        message: "$1, $2, list box",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_describe_unnamed_listbox: {
        message: "$1, list box",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_link: {
        message: "$1, link",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_tab: {
        message: "$1, tab",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_describe_slider: {
        message: "$1, $2, slider",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_describe_selected: {
        message: ", selected"
    },
    chromevox_describe_unselected: {
        message: ", unselected"
    },
    chromevox_describe_index: {
        message: ", $1 of $2, ",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_announce_rate: {
        message: "Rate $1 percent",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_announce_pitch: {
        message: "Pitch $1 percent",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_announce_volume: {
        message: "Volume $1 percent",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_exiting_dialog: {
        message: "Exited dialog."
    },
    chromevox_exited_container: {
        message: "Exited $1.",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_entering_dialog: {
        message: "Entered dialog"
    },
    chromevox_live_regions_removed: {
        message: "removed:"
    },
    chromevox_sticky_mode_enabled: {
        message: "Sticky mode enabled"
    },
    chromevox_sticky_mode_disabled: {
        message: "Sticky mode disabled"
    },
    chromevox_keyboard_help_intro: {
        message: "Keyboard Help"
    },
    chromevox_context_menu_intro: {
        message: "Context Menu"
    },
    chromevox_choice_widget_name: {
        message: "$1 list.",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_choice_widget_help: {
        message: "Use up and down arrow keys to browse, or type to search."
    },
    chromevox_choice_widget_exited: {
        message: "Exited"
    },
    chromevox_choice_widget_type_generic: {
        message: " "
    },
    chromevox_end_of_cell: {
        message: "End of cell."
    },
    chromevox_no_url_found: {
        message: "No URL found"
    },
    chromevox_leaving_table: {
        message: "Leaving table."
    },
    chromevox_leaving_grid: {
        message: "Leaving grid."
    },
    chromevox_inside_table: {
        message: "Inside table"
    },
    chromevox_no_tables: {
        message: "No table found."
    },
    chromevox_not_inside_table: {
        message: "Not inside table."
    },
    chromevox_no_cell_below: {
        message: "No cell below."
    },
    chromevox_no_cell_above: {
        message: "No cell above."
    },
    chromevox_no_cell_right: {
        message: "No cell right."
    },
    chromevox_no_cell_left: {
        message: "No cell left."
    },
    chromevox_empty_cell: {
        message: "Empty cell."
    },
    chromevox_spanned: {
        message: "Spanned."
    },
    chromevox_row_header: {
        message: "Row header:"
    },
    chromevox_empty_row_header: {
        message: "Empty row header"
    },
    chromevox_column_header: {
        message: "Column header:"
    },
    chromevox_empty_column_header: {
        message: "Empty column header"
    },
    chromevox_no_headers: {
        message: "No headers"
    },
    chromevox_empty_headers: {
        message: "Empty headers"
    },
    chromevox_table_location: {
        message: "Row $1 of $2, Column $3 of $4",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            },
            3: {
                content: "$3"
            },
            4: {
                content: "$4"
            }
        }
    },
    chromevox_no_next_checkbox: {
        message: "No next checkbox."
    },
    chromevox_no_previous_checkbox: {
        message: "No previous checkbox."
    },
    chromevox_no_next_edit_text: {
        message: "No next editable text field."
    },
    chromevox_no_previous_edit_text: {
        message: "No previous editable text field."
    },
    chromevox_no_next_heading: {
        message: "No next heading."
    },
    chromevox_no_previous_heading: {
        message: "No previous heading."
    },
    chromevox_no_next_heading_1: {
        message: "No next level 1 heading."
    },
    chromevox_no_previous_heading_1: {
        message: "No previous level 1 heading."
    },
    chromevox_no_next_heading_2: {
        message: "No next level 2 heading."
    },
    chromevox_no_previous_heading_2: {
        message: "No previous level 2 heading."
    },
    chromevox_no_next_heading_3: {
        message: "No next level 3 heading."
    },
    chromevox_no_previous_heading_3: {
        message: "No previous level 3 heading."
    },
    chromevox_no_next_heading_4: {
        message: "No next level 4 heading."
    },
    chromevox_no_previous_heading_4: {
        message: "No previous level 4 heading."
    },
    chromevox_no_next_heading_5: {
        message: "No next level 5 heading."
    },
    chromevox_no_previous_heading_5: {
        message: "No previous level 5 heading."
    },
    chromevox_no_next_heading_6: {
        message: "No next level 6 heading."
    },
    chromevox_no_previous_heading_6: {
        message: "No previous level 6 heading."
    },
    chromevox_no_next_not_link: {
        message: "No next item that isn't a link."
    },
    chromevox_no_previous_not_link: {
        message: "No previous item that isn't a link."
    },
    chromevox_no_next_anchor: {
        message: "No next anchor."
    },
    chromevox_no_previous_anchor: {
        message: "No previous anchor."
    },
    chromevox_no_next_link: {
        message: "No next link."
    },
    chromevox_no_previous_link: {
        message: "No previous link."
    },
    chromevox_no_next_table: {
        message: "No next table."
    },
    chromevox_no_previous_table: {
        message: "No previous table."
    },
    chromevox_no_next_visited_link: {
        message: "No next visited link."
    },
    chromevox_no_previous_visited_link: {
        message: "No previous visited link."
    },
    chromevox_no_next_math: {
        message: "No next math expression."
    },
    chromevox_no_previous_math: {
        message: "No previous math expression."
    },
    chromevox_no_next_media_widget: {
        message: "No next media widget."
    },
    chromevox_no_previous_media_widget: {
        message: "No previous media widget."
    },
    chromevox_no_next_list: {
        message: "No next list."
    },
    chromevox_no_previous_list: {
        message: "No previous list."
    },
    chromevox_no_next_list_item: {
        message: "No next list item."
    },
    chromevox_no_previous_list_item: {
        message: "No previous list item."
    },
    chromevox_no_next_blockquote: {
        message: "No next blockquote."
    },
    chromevox_no_previous_blockquote: {
        message: "No previous blockquote."
    },
    chromevox_no_next_form_field: {
        message: "No next form field."
    },
    chromevox_no_previous_form_field: {
        message: "No previous form field."
    },
    chromevox_no_next_jump: {
        message: "No next jump point."
    },
    chromevox_no_previous_jump: {
        message: "No previous jump point."
    },
    chromevox_no_next_landmark: {
        message: "No next ARIA landmark."
    },
    chromevox_no_previous_landmark: {
        message: "No previous ARIA landmark."
    },
    chromevox_no_next_combo_box: {
        message: "No next combo box."
    },
    chromevox_no_previous_combo_box: {
        message: "No previous combo box."
    },
    chromevox_no_next_button: {
        message: "No next button."
    },
    chromevox_no_previous_button: {
        message: "No previous button."
    },
    chromevox_no_next_graphic: {
        message: "No next graphic."
    },
    chromevox_no_previous_graphic: {
        message: "No previous graphic."
    },
    chromevox_no_next_slider: {
        message: "No next slider."
    },
    chromevox_no_previous_slider: {
        message: "No previous slider."
    },
    chromevox_no_next_radio_button: {
        message: "No next radio button."
    },
    chromevox_no_previous_radio_button: {
        message: "No previous radio button."
    },
    chromevox_no_next_section: {
        message: "No next section."
    },
    chromevox_no_previous_section: {
        message: "No previous section."
    },
    chromevox_no_next_control: {
        message: "No next control."
    },
    chromevox_no_previous_control: {
        message: "No previous control."
    },
    chromevox_element_clicked: {
        message: "Clicked"
    },
    chromevox_element_double_clicked: {
        message: "double clicked"
    },
    chromevox_powerkey_no_headings: {
        message: "No headings."
    },
    chromevox_powerkey_no_links: {
        message: "No links."
    },
    chromevox_powerkey_no_forms: {
        message: "No forms."
    },
    chromevox_powerkey_no_tables: {
        message: "No tables."
    },
    chromevox_powerkey_no_landmarks: {
        message: "No ARIA landmarks."
    },
    chromevox_powerkey_no_jumps: {
        message: "No jumps."
    },
    chromevox_list_position: {
        message: "$1 of $2",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_list_position_brl: {
        message: "$1/$2",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_aria_has_submenu: {
        message: "has submenu"
    },
    chromevox_aria_has_submenu_brl: {
        message: "+submnu"
    },
    chromevox_aria_has_popup: {
        message: "has pop up"
    },
    chromevox_aria_has_popup_brl: {
        message: "+popup"
    },
    chromevox_aria_value_min: {
        message: "Min $1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_value_min_brl: {
        message: "min:$1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_value_max: {
        message: "Max $1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_value_max_brl: {
        message: "max:$1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_value_now: {
        message: "$1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_value_now_brl: {
        message: "$1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_role_alert: {
        message: "Alert"
    },
    chromevox_aria_role_alert_brl: {
        message: "alrt"
    },
    chromevox_aria_role_alertdialog: {
        message: "Alert dialog"
    },
    chromevox_aria_role_alertdialog_brl: {
        message: "alrt dlg"
    },
    chromevox_aria_role_button: {
        message: "Button"
    },
    chromevox_aria_role_button_brl: {
        message: "btn"
    },
    chromevox_aria_role_checkbox: {
        message: "Check box"
    },
    chromevox_aria_role_checkbox_brl: {
        message: "chx"
    },
    chromevox_aria_role_combobox: {
        message: "Combo box"
    },
    chromevox_aria_role_combobox_brl: {
        message: "cbx"
    },
    chromevox_aria_role_dialog: {
        message: "Dialog"
    },
    chromevox_aria_role_dialog_brl: {
        message: "dlg"
    },
    chromevox_aria_role_grid: {
        message: "Grid"
    },
    chromevox_aria_role_grid_brl: {
        message: "grd"
    },
    chromevox_aria_role_gridcell: {
        message: "Cell"
    },
    chromevox_aria_role_gridcell_brl: {
        message: "cl"
    },
    chromevox_aria_role_gridcell_pos: {
        message: "row $1 column $2",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_aria_role_link: {
        message: "Link"
    },
    chromevox_aria_role_link_brl: {
        message: "lnk"
    },
    chromevox_aria_role_link_singular: {
        message: "1 link"
    },
    chromevox_aria_role_link_plural: {
        message: "$1 links",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_role_listbox: {
        message: "List box"
    },
    chromevox_aria_role_listbox_brl: {
        message: "lstbx"
    },
    chromevox_aria_role_log: {
        message: "Log"
    },
    chromevox_aria_role_log_brl: {
        message: "log"
    },
    chromevox_aria_role_marquee: {
        message: "Marquee"
    },
    chromevox_aria_role_marquee_brl: {
        message: "maqe"
    },
    chromevox_aria_role_menu: {
        message: "Menu"
    },
    chromevox_aria_role_menu_brl: {
        message: "mnu"
    },
    chromevox_aria_role_menubar: {
        message: "Menu bar"
    },
    chromevox_aria_role_menubar_brl: {
        message: "mnu br"
    },
    chromevox_aria_role_menuitem: {
        message: "Menu item"
    },
    chromevox_aria_role_menuitem_brl: {
        message: "mnu itm"
    },
    chromevox_aria_role_menuitemcheckbox: {
        message: "Menu item check box"
    },
    chromevox_aria_role_menuitemcheckbox_brl: {
        message: "mnu itm chx"
    },
    chromevox_aria_role_menuitemradio: {
        message: "Menu item radio button"
    },
    chromevox_aria_role_menuitemradio_brl: {
        message: "mnu itm rd"
    },
    chromevox_aria_role_option: {
        message: " "
    },
    chromevox_aria_role_option_brl: {
        message: " "
    },
    chromevox_aria_role_popup_button: {
        message: "Pop-up button"
    },
    chromevox_aria_role_popup_button_brl: {
        message: "pup btn"
    },
    chromevox_aria_role_progressbar: {
        message: "Progress bar"
    },
    chromevox_aria_role_progressbar_brl: {
        message: "prog br"
    },
    chromevox_aria_role_radio: {
        message: "Radio button"
    },
    chromevox_aria_role_radio_brl: {
        message: "rd"
    },
    chromevox_aria_role_radiogroup: {
        message: "Radio button group"
    },
    chromevox_aria_role_radiogroup_brl: {
        message: "rd grp"
    },
    chromevox_aria_role_scrollbar: {
        message: "Scroll bar"
    },
    chromevox_aria_role_scrollbar_brl: {
        message: "scr br"
    },
    chromevox_aria_role_slider: {
        message: "Slider"
    },
    chromevox_aria_role_slider_brl: {
        message: "slr"
    },
    chromevox_aria_role_spinbutton: {
        message: "Spin button"
    },
    chromevox_aria_role_spinbutton_brl: {
        message: "spn btn"
    },
    chromevox_aria_role_status: {
        message: "Status"
    },
    chromevox_aria_role_status_brl: {
        message: "sts"
    },
    chromevox_aria_role_tab: {
        message: "Tab"
    },
    chromevox_aria_role_tab_brl: {
        message: "tab"
    },
    chromevox_aria_role_tabpanel: {
        message: "Tab panel"
    },
    chromevox_aria_role_tabpanel_brl: {
        message: "tab pnl"
    },
    chromevox_aria_role_textbox: {
        message: "Text box"
    },
    chromevox_aria_role_textbox_brl: {
        message: "txtbx"
    },
    chromevox_aria_role_timer: {
        message: "Timer"
    },
    chromevox_aria_role_timer_brl: {
        message: "tmr"
    },
    chromevox_aria_role_toolbar: {
        message: "Tool bar"
    },
    chromevox_aria_role_toolbar_brl: {
        message: "tl br"
    },
    chromevox_aria_role_tooltip: {
        message: "Tool tip"
    },
    chromevox_aria_role_tooltip_brl: {
        message: "tl tp"
    },
    chromevox_aria_role_treeitem: {
        message: "Tree item"
    },
    chromevox_aria_role_treeitem_brl: {
        message: "tr itm"
    },
    chromevox_aria_role_article: {
        message: "Article"
    },
    chromevox_aria_role_article_brl: {
        message: "acl"
    },
    chromevox_aria_role_application: {
        message: "Application"
    },
    chromevox_aria_role_application_brl: {
        message: "app"
    },
    chromevox_aria_role_banner: {
        message: "Banner"
    },
    chromevox_aria_role_banner_brl: {
        message: "bnr"
    },
    chromevox_aria_role_columnheader: {
        message: "Column header"
    },
    chromevox_aria_role_columnheader_brl: {
        message: "clm hd"
    },
    chromevox_aria_role_complementary: {
        message: "Complementary"
    },
    chromevox_aria_role_complementary_brl: {
        message: "cmpy"
    },
    chromevox_aria_role_contentinfo: {
        message: "Content info"
    },
    chromevox_aria_role_contentinfo_brl: {
        message: "cnt in"
    },
    chromevox_aria_role_definition: {
        message: "Definition"
    },
    chromevox_aria_role_definition_brl: {
        message: "def"
    },
    chromevox_aria_role_directory: {
        message: "Directory"
    },
    chromevox_aria_role_directory_brl: {
        message: "dir"
    },
    chromevox_aria_role_document: {
        message: "Document"
    },
    chromevox_aria_role_document_brl: {
        message: "doc"
    },
    chromevox_aria_role_form: {
        message: "Form"
    },
    chromevox_aria_role_form_brl: {
        message: "frm"
    },
    chromevox_aria_role_form_singular: {
        message: "1 form"
    },
    chromevox_aria_role_form_plural: {
        message: "$1 forms",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_aria_role_group: {
        message: "Group"
    },
    chromevox_aria_role_group_brl: {
        message: "grp"
    },
    chromevox_aria_role_heading: {
        message: "Heading"
    },
    chromevox_aria_role_heading_brl: {
        message: "hd"
    },
    chromevox_aria_role_img: {
        message: "Image"
    },
    chromevox_aria_role_img_brl: {
        message: "img"
    },
    chromevox_aria_role_list: {
        message: "List"
    },
    chromevox_aria_role_list_brl: {
        message: "lst"
    },
    chromevox_aria_role_listitem: {
        message: "List item"
    },
    chromevox_aria_role_listitem_brl: {
        message: "lstitm"
    },
    chromevox_aria_role_main: {
        message: "Main"
    },
    chromevox_aria_role_main_brl: {
        message: "main"
    },
    chromevox_aria_role_math: {
        message: "Math"
    },
    chromevox_aria_role_math_brl: {
        message: "math"
    },
    chromevox_aria_role_navigation: {
        message: "Navigation"
    },
    chromevox_aria_role_navigation_brl: {
        message: "nav"
    },
    chromevox_aria_role_note: {
        message: "Note"
    },
    chromevox_aria_role_note_brl: {
        message: "note"
    },
    chromevox_aria_role_region: {
        message: "Region"
    },
    chromevox_aria_role_region_brl: {
        message: "rgn"
    },
    chromevox_aria_role_rowheader: {
        message: "Row header"
    },
    chromevox_aria_role_rowheader_brl: {
        message: "rw hd"
    },
    chromevox_aria_role_search: {
        message: "Search"
    },
    chromevox_aria_role_search_brl: {
        message: "srch"
    },
    chromevox_aria_role_separator: {
        message: "Separator"
    },
    chromevox_aria_role_separator_brl: {
        message: "sprtr"
    },
    chromevox_aria_autocomplete_inline: {
        message: "Autocompletion inline"
    },
    chromevox_aria_autocomplete_inline_brl: {
        message: "autocomplete"
    },
    chromevox_aria_autocomplete_list: {
        message: "Autocompletion list"
    },
    chromevox_aria_autocomplete_list_brl: {
        message: "autocomplete lst"
    },
    chromevox_aria_autocomplete_both: {
        message: "Autocompletion inline and list"
    },
    chromevox_aria_autocomplete_both_brl: {
        message: "autocomplete lst"
    },
    chromevox_aria_checked_true: {
        message: "Checked"
    },
    chromevox_aria_checked_true_brl: {
        message: "x"
    },
    chromevox_aria_checked_false: {
        message: "Not checked"
    },
    chromevox_aria_checked_false_brl: {
        message: " "
    },
    chromevox_aria_checked_mixed: {
        message: "Partially checked"
    },
    chromevox_aria_checked_mixed_brl: {
        message: "/x"
    },
    chromevox_aria_disabled_true: {
        message: "Disabled"
    },
    chromevox_aria_disabled_true_brl: {
        message: "="
    },
    chromevox_aria_expanded_true: {
        message: "Expanded"
    },
    chromevox_aria_expanded_true_brl: {
        message: ">"
    },
    chromevox_aria_expanded_false: {
        message: "Collapsed"
    },
    chromevox_aria_expanded_false_brl: {
        message: "<"
    },
    chromevox_aria_invalid_true: {
        message: "Invalid input"
    },
    chromevox_aria_invalid_true_brl: {
        message: "!"
    },
    chromevox_aria_invalid_grammar: {
        message: "Grammatical mistake detected"
    },
    chromevox_aria_invalid_grammar_brl: {
        message: "Grammatical mistake detected"
    },
    chromevox_aria_invalid_spelling: {
        message: "Spelling mistake detected"
    },
    chromevox_aria_invalid_spelling_brl: {
        message: "misspelled"
    },
    chromevox_aria_multiline_true: {
        message: "Multi line"
    },
    chromevox_aria_multiline_true_brl: {
        message: "mult ln"
    },
    chromevox_aria_multiselectable_true: {
        message: "Multi select"
    },
    chromevox_aria_multiselectable_true_brl: {
        message: "mult sel"
    },
    chromevox_aria_pressed_true: {
        message: "Pressed"
    },
    chromevox_aria_pressed_true_brl: {
        message: "x"
    },
    chromevox_aria_pressed_false: {
        message: "Not pressed"
    },
    chromevox_aria_pressed_false_brl: {
        message: " "
    },
    chromevox_aria_pressed_mixed: {
        message: "Partially pressed"
    },
    chromevox_aria_pressed_mixed_brl: {
        message: "/x"
    },
    chromevox_aria_readonly_true: {
        message: "Read only"
    },
    chromevox_aria_readonly_true_brl: {
        message: "rdonly"
    },
    chromevox_aria_required_true: {
        message: "Required"
    },
    chromevox_aria_required_true_brl: {
        message: "req"
    },
    chromevox_aria_selected_true: {
        message: "Selected"
    },
    chromevox_aria_selected_true_brl: {
        message: "x"
    },
    chromevox_aria_selected_false: {
        message: "Not selected"
    },
    chromevox_aria_selected_false_brl: {
        message: " "
    },
    chromevox_tag_link: {
        message: "Link"
    },
    chromevox_tag_link_brl: {
        message: "lnk"
    },
    chromevox_tag_button: {
        message: "Button"
    },
    chromevox_tag_button_brl: {
        message: "btn"
    },
    chromevox_tag_h1: {
        message: "Heading 1"
    },
    chromevox_tag_h1_brl: {
        message: "h1"
    },
    chromevox_tag_h2: {
        message: "Heading 2"
    },
    chromevox_tag_h2_brl: {
        message: "h2"
    },
    chromevox_tag_h3: {
        message: "Heading 3"
    },
    chromevox_tag_h3_brl: {
        message: "h3"
    },
    chromevox_tag_h4: {
        message: "Heading 4"
    },
    chromevox_tag_h4_brl: {
        message: "h4"
    },
    chromevox_tag_h5: {
        message: "Heading 5"
    },
    chromevox_tag_h5_brl: {
        message: "h5"
    },
    chromevox_tag_h6: {
        message: "Heading 6"
    },
    chromevox_tag_h6_brl: {
        message: "h6"
    },
    chromevox_tag_li: {
        message: "List item"
    },
    chromevox_tag_li_brl: {
        message: "lstitm"
    },
    chromevox_tag_ol: {
        message: "Ordered List"
    },
    chromevox_tag_ol_brl: {
        message: "lst"
    },
    chromevox_tag_select: {
        message: "Combo box"
    },
    chromevox_tag_select_brl: {
        message: "cbx"
    },
    chromevox_tag_textarea: {
        message: "Text area"
    },
    chromevox_tag_textarea_brl: {
        message: "txta"
    },
    chromevox_tag_table: {
        message: "table"
    },
    chromevox_tag_table_brl: {
        message: "tbl"
    },
    chromevox_tag_ul: {
        message: "List"
    },
    chromevox_tag_ul_brl: {
        message: "lst"
    },
    chromevox_tag_section: {
        message: "Section"
    },
    chromevox_tag_section_brl: {
        message: "stn"
    },
    chromevox_tag_nav: {
        message: "Navigation"
    },
    chromevox_tag_nav_brl: {
        message: "nav"
    },
    chromevox_tag_article: {
        message: "Article"
    },
    chromevox_tag_article_brl: {
        message: "article"
    },
    chromevox_tag_aside: {
        message: "Aside"
    },
    chromevox_tag_aside_brl: {
        message: "aside"
    },
    chromevox_tag_hgroup: {
        message: "Heading group"
    },
    chromevox_tag_hgroup_brl: {
        message: "hgrp"
    },
    chromevox_tag_header: {
        message: "Header"
    },
    chromevox_tag_header_brl: {
        message: "hdr"
    },
    chromevox_tag_footer: {
        message: "Footer"
    },
    chromevox_tag_footer_brl: {
        message: "ftr"
    },
    chromevox_tag_time: {
        message: "Time"
    },
    chromevox_tag_time_brl: {
        message: " "
    },
    chromevox_tag_mark: {
        message: "Mark"
    },
    chromevox_tag_mark_brl: {
        message: "mark"
    },
    chromevox_tag_video: {
        message: "Video"
    },
    chromevox_tag_video_brl: {
        message: "video"
    },
    chromevox_tag_audio: {
        message: "Audio"
    },
    chromevox_tag_audio_brl: {
        message: "audio"
    },
    chromevox_input_type_button: {
        message: "Button"
    },
    chromevox_input_type_button_brl: {
        message: "btn"
    },
    chromevox_input_type_checkbox: {
        message: "Check box"
    },
    chromevox_input_type_checkbox_brl: {
        message: "chx"
    },
    chromevox_input_type_color: {
        message: "Color picker"
    },
    chromevox_input_type_color_brl: {
        message: "color picker"
    },
    chromevox_input_type_datetime: {
        message: "Date time control"
    },
    chromevox_input_type_datetime_brl: {
        message: "date time"
    },
    chromevox_input_type_datetime_local: {
        message: "Date time control"
    },
    chromevox_input_type_datetime_local_brl: {
        message: "date time"
    },
    chromevox_input_type_date: {
        message: "Date control"
    },
    chromevox_input_type_date_brl: {
        message: "date"
    },
    chromevox_input_type_email: {
        message: "Edit text, email entry"
    },
    chromevox_input_type_email_brl: {
        message: "edtxt email"
    },
    chromevox_input_type_file: {
        message: "File selection"
    },
    chromevox_input_type_file_brl: {
        message: "file"
    },
    chromevox_input_type_image: {
        message: "Button"
    },
    chromevox_input_type_image_brl: {
        message: "btn"
    },
    chromevox_input_type_month: {
        message: "Month control"
    },
    chromevox_input_type_month_brl: {
        message: "month"
    },
    chromevox_input_type_number: {
        message: "Edit text numeric only"
    },
    chromevox_input_type_number_brl: {
        message: "edtxt#"
    },
    chromevox_input_type_password: {
        message: "Password edit text"
    },
    chromevox_input_type_password_brl: {
        message: "pwd edtxt"
    },
    chromevox_input_type_radio: {
        message: "Radio button"
    },
    chromevox_input_type_radio_brl: {
        message: "rd btn"
    },
    chromevox_input_type_range: {
        message: "Slider"
    },
    chromevox_input_type_range_brl: {
        message: "slr"
    },
    chromevox_input_type_reset: {
        message: "Reset"
    },
    chromevox_input_type_reset_brl: {
        message: "reset"
    },
    chromevox_input_type_search: {
        message: "Edit text, search entry"
    },
    chromevox_input_type_search_brl: {
        message: "search edtxt"
    },
    chromevox_input_type_submit: {
        message: "Button"
    },
    chromevox_input_type_submit_brl: {
        message: "btn"
    },
    chromevox_input_type_tel: {
        message: "Edit text, number entry"
    },
    chromevox_input_type_tel_brl: {
        message: "tele# edtxt"
    },
    chromevox_input_type_text: {
        message: "Edit text"
    },
    chromevox_input_type_text_brl: {
        message: "edtxt"
    },
    chromevox_input_type_url: {
        message: "Edit text, URL entry"
    },
    chromevox_input_type_url_brl: {
        message: "url edtxt"
    },
    chromevox_input_type_week: {
        message: "Week of the year control"
    },
    chromevox_input_type_week_brl: {
        message: "week"
    },
    chromevox_internal_link: {
        message: "Internal link"
    },
    chromevox_internal_link_brl: {
        message: "int lnk"
    },
    chromevox_text_box_blank: {
        message: "Blank"
    },
    chromevox_list_with_items: {
        message: "with $1 items",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_list_with_items_brl: {
        message: "+$1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_state_percent: {
        message: "$1%",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_state_percent_brl: {
        message: "$1%",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_has_submenu: {
        message: "with submenu"
    },
    chromevox_has_submenu_brl: {
        message: "+submnu"
    },
    chromevox_has_popup: {
        message: "has popup"
    },
    chromevox_has_popup_brl: {
        message: "has popup"
    },
    chromevox_collection: {
        message: "$1 collection with $2 items",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_enter_key: {
        message: "Enter"
    },
    chromevox_space_key: {
        message: "Space"
    },
    chromevox_backspace_key: {
        message: "Backspace"
    },
    chromevox_tab_key: {
        message: "Tab"
    },
    chromevox_left_key: {
        message: "Left"
    },
    chromevox_up_key: {
        message: "Up"
    },
    chromevox_right_key: {
        message: "Right"
    },
    chromevox_down_key: {
        message: "Down"
    },
    chromevox_unknown_link: {
        message: "Unknown link"
    },
    chromevox_toggle_chromevox_active: {
        message: "Toggle ChromeVox active or inactive."
    },
    chromevox_chromevox_inactive: {
        message: "ChromeVox is now inactive."
    },
    chromevox_pause: {
        message: ", "
    },
    chromevox_end: {
        message: ". "
    },
    chromevox_previous_different_element: {
        message: "Previous different element."
    },
    chromevox_next_different_element: {
        message: "Next different element."
    },
    chromevox_previous_similar_element: {
        message: "Previous similar element."
    },
    chromevox_next_similar_element: {
        message: "Next similar element."
    },
    chromevox_no_more_similar_elements: {
        message: "No more similar elements."
    },
    chromevox_no_more_different_elements: {
        message: "No more different elements."
    },
    chromevox_index_total: {
        message: "$1 of $2",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_enter_css_space: {
        message: "Enter group exploration"
    },
    chromevox_enter_group_exploration: {
        message: "Exploring groups"
    },
    chromevox_pdf_header: {
        message: 'This page contains the text automatically extracted from the PDF file <b>$1</b>. <a href="$2">Click here for the original.</a>',
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_object_strategy: {
        message: "Object"
    },
    chromevox_group_strategy: {
        message: "Group"
    },
    chromevox_table_strategy: {
        message: "Table"
    },
    chromevox_row_granularity: {
        message: "Row"
    },
    chromevox_column_granularity: {
        message: "Column"
    },
    chromevox_mathml_tree_granularity: {
        message: "Math ML Tree"
    },
    chromevox_mathml_layout_granularity: {
        message: "Math ML Layout"
    },
    chromevox_mathml_token_granularity: {
        message: "Math ML Token"
    },
    chromevox_mathml_leaf_granularity: {
        message: "Math ML Leaf"
    },
    chromevox_visual_strategy: {
        message: "Visual"
    },
    chromevox_custom_strategy: {
        message: "Custom"
    },
    chromevox_line_granularity: {
        message: "Line"
    },
    chromevox_sentence_granularity: {
        message: "Sentence"
    },
    chromevox_word_granularity: {
        message: "Word"
    },
    chromevox_character_granularity: {
        message: "Character"
    },
    chromevox_search_widget_intro: {
        message: "Find in page."
    },
    chromevox_search_widget_intro_help: {
        message: "Enter a search query."
    },
    chromevox_search_widget_outro: {
        message: "Exited find in page."
    },
    chromevox_search_widget_no_results: {
        message: "No more results."
    },
    chromevox_modifier_keys: {
        message: "Modifier Keys"
    },
    chromevox_navigation: {
        message: "ChromeVox Navigation"
    },
    chromevox_information: {
        message: "Information"
    },
    chromevox_help_commands: {
        message: "Help Commands"
    },
    chromevox_controlling_speech: {
        message: "Controlling Speech"
    },
    chromevox_overview: {
        message: "Overview"
    },
    chromevox_tables: {
        message: "Tables"
    },
    chromevox_jump_commands: {
        message: "Jump Commands"
    },
    chromevox_braille: {
        message: "Braille"
    },
    chromevox_developer: {
        message: "Developer"
    },
    chromevox_keymap_classic: {
        message: "Classic keymap"
    },
    chromevox_keymap_flat: {
        message: "Flat keymap"
    },
    chromevox_keymap_experimental: {
        message: "Experimental keymap"
    },
    chromevox_enable_tts_log: {
        message: "Enable TTS logging"
    },
    chromevox_begin_selection: {
        message: "Start selection"
    },
    chromevox_end_selection: {
        message: "End selection"
    },
    chromevox_selection_is: {
        message: "Selection is "
    },
    chromevox_toggle_selection: {
        message: "Start or end selection."
    },
    chromevox_copy: {
        message: "copy."
    },
    chromevox_cut: {
        message: "cut."
    },
    chromevox_paste: {
        message: "paste."
    },
    chromevox_selected: {
        message: "selected"
    },
    chromevox_unselected: {
        message: "unselected"
    },
    chromevox_added_to_selection: {
        message: "added to selection"
    },
    chromevox_removed_from_selection: {
        message: "removed from selection"
    },
    chromevox_then: {
        message: "then"
    },
    chromevox_followed_by: {
        message: "followed by"
    },
    chromevox_modifier_key: {
        message: "ChromeVox modifier"
    },
    chromevox_key_conflict: {
        message: "$1 is already assigned to a command.",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_math_expr: {
        message: "Math"
    },
    chromevox_math_expr_brl: {
        message: "Math"
    },
    chromevox_not_inside_math: {
        message: "Not inside math"
    },
    chromevox_timewidget_ampm: {
        message: "AM PM"
    },
    chromevox_timewidget_hours: {
        message: "hours"
    },
    chromevox_timewidget_minutes: {
        message: "minutes"
    },
    chromevox_timewidget_seconds: {
        message: "seconds"
    },
    chromevox_timewidget_milliseconds: {
        message: "milliseconds"
    },
    chromevox_timewidget_am: {
        message: "AM"
    },
    chromevox_timewidget_pm: {
        message: "PM"
    },
    chromevox_datewidget_week: {
        message: "week"
    },
    chromevox_datewidget_january: {
        message: "January"
    },
    chromevox_datewidget_february: {
        message: "February"
    },
    chromevox_datewidget_march: {
        message: "March"
    },
    chromevox_datewidget_april: {
        message: "April"
    },
    chromevox_datewidget_may: {
        message: "May"
    },
    chromevox_datewidget_june: {
        message: "June"
    },
    chromevox_datewidget_july: {
        message: "July"
    },
    chromevox_datewidget_august: {
        message: "August"
    },
    chromevox_datewidget_september: {
        message: "September"
    },
    chromevox_datewidget_october: {
        message: "October"
    },
    chromevox_datewidget_november: {
        message: "November"
    },
    chromevox_datewidget_december: {
        message: "December"
    },
    chromevox_no_punctuation: {
        message: "No punctuation"
    },
    chromevox_some_punctuation: {
        message: "Some punctuation"
    },
    chromevox_all_punctuation: {
        message: "All punctuation"
    },
    chromevox_search_help_item: {
        message: "Press enter to accept or escape to cancel, down for next and up for previous."
    },
    chromevox_clickable: {
        message: "clickable"
    },
    chromevox_clickable_brl: {
        message: "clickable"
    },
    chromevox_previous_character: {
        message: "Previous Character"
    },
    chromevox_next_character: {
        message: "Next Character"
    },
    chromevox_previous_word: {
        message: "Previous Word"
    },
    chromevox_next_word: {
        message: "Next Word"
    },
    chromevox_previous_sentence: {
        message: "Previous Sentence"
    },
    chromevox_next_sentence: {
        message: "Next Sentence"
    },
    chromevox_previous_line: {
        message: "Previous Line"
    },
    chromevox_next_line: {
        message: "Next Line"
    },
    chromevox_previous_object: {
        message: "Previous Object"
    },
    chromevox_next_object: {
        message: "Next Object"
    },
    chromevox_previous_group: {
        message: "Previous Group"
    },
    chromevox_next_group: {
        message: "Next Group"
    },
    chromevox_role_landmark: {
        message: "Landmark"
    },
    chromevox_modifier_entry_error: {
        message: "No modifier pressed; please press and hold one or more modifiers; lift your fingers once done and you will hear the keys set. Tab to exit."
    },
    chromevox_modifier_entry_set: {
        message: "$1 is now the new ChromeVox modifier.",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_keymap_reset: {
        message: "$1 has been reset.",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_keymap_switch: {
        message: "Switched to $1.",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_jump_to_top: {
        message: "Jump to the top of the page"
    },
    chromevox_jump_to_bottom: {
        message: "Jump to the bottom of the page"
    },
    chromevox_wrapped_to_top: {
        message: "Wrapped to top"
    },
    chromevox_wrapped_to_bottom: {
        message: "Wrapped to bottom"
    },
    chromevox_cycle_punctuation_echo: {
        message: "Cycle punctuation echo"
    },
    chromevox_cycle_typing_echo: {
        message: "Cycle typing echo"
    },
    chromevox_pause_all_media: {
        message: "Pauses all currently playing media widgets"
    },
    chromevox_open_long_desc: {
        message: "Open long description in a new tab"
    },
    chromevox_no_long_desc: {
        message: "No long description"
    },
    chromevox_image_with_long_desc: {
        message: "Image with long description"
    },
    chromevox_selected_options_value: {
        message: "$1 to $2",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_selected_options_value_brl: {
        message: "$1-$2",
        placeholders: {
            1: {
                content: "$1"
            },
            2: {
                content: "$2"
            }
        }
    },
    chromevox_selected_options_state: {
        message: "selected $1 items",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_selected_options_state_brl: {
        message: "sld $1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_clear_page_selection: {
        message: "cleared selection"
    },
    chromevox_character_echo: {
        message: "character echo"
    },
    chromevox_word_echo: {
        message: "word echo"
    },
    chromevox_character_and_word_echo: {
        message: "character and word echo"
    },
    chromevox_none_echo: {
        message: "no typing echo"
    },
    chromevox_enter_content: {
        message: "enter structured content, such as tables"
    },
    chromevox_exit_content: {
        message: "exit structured content, such as tables"
    },
    chromevox_enter_content_say: {
        message: "entered $1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_structural_line: {
        message: "structural line"
    },
    chromevox_layout_line: {
        message: "line"
    },
    chromevox_toggle_line_type: {
        message: "Toggle line type between structural or layout"
    },
    chromevox_table_shifter: {
        message: "table"
    },
    chromevox_navigation_shifter: {
        message: "default navigation"
    },
    chromevox_math_shifter: {
        message: "math"
    },
    chromevox_toggle_semantics: {
        message: "Toggle interpretation of math expressions between structural and semantic"
    },
    chromevox_semantics_on: {
        message: "Semantics on"
    },
    chromevox_semantics_off: {
        message: "Semantics off"
    },
    chromevox_phonetic_map: {
        message: '{"a": "alpha", "b": "bravo", "c": "charlie", "d": "delta", "e": "echo", "f": "foxtrot", "g": "golf", "h": "hotel", "i": "india", "j": "juliet","k": "kilo", "l": "lima", "m": "mike", "n": "november", "o": "oscar","p": "papa", "q": "quebec", "r": "romeo", "s": "sierra", "t": "tango", "u": "uniform", "v": "victor", "w": "whiskey","x": "xray", "y": "yankee", "z": "zulu"}'
    },
    chromevox_page_has_one_alert_singular: {
        message: "This page has 1 alert"
    },
    chromevox_page_has_alerts_plural: {
        message: "This page has $1 alerts",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_review_alerts: {
        message: "Press Alt+Shift+A to review alerts"
    },
    chromevox_no_next_article: {
        message: "No next article."
    },
    chromevox_no_previous_article: {
        message: "No previous article."
    },
    chromevox_chromevox_intro: {
        message: "ChromeVox is ready"
    },
    chromevox_intro_brl: {
        message: "ChromeVox connected"
    },
    chromevox_earcons_on: {
        message: "Earcons on"
    },
    chromevox_earcons_off: {
        message: "Earcons off"
    },
    chromevox_toggle_earcons: {
        message: "Turn sound feedback (earcons) on or off."
    },
    chromevox_speak_time_and_date: {
        message: "Speak the current time and date."
    },
    chromevox_mark_as_search_result_brl: {
        message: "S:$1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    },
    chromevox_text_deleted: {
        message: "Deleted"
    },
    chromevox_perform_default_action: {
        message: "Perform default action"
    },
    chromevox_visited_url: {
        message: "visited"
    },
    chromevox_visited_url_brl: {
        message: "visited"
    },
    chromevox_exclamation: {
        message: "{COUNT, plural, =1 {exclamation point}other {# exclamation points}}"
    },
    chromevox_space: {
        message: "{COUNT, plural, =1 {space}other {# spaces}}"
    },
    chromevox_backtick: {
        message: "{COUNT, plural, =1 {backtick}other {# backticks}}"
    },
    chromevox_tilde: {
        message: "{COUNT, plural, =1 {TILDE}other {# tildes}}"
    },
    chromevox_at: {
        message: "{COUNT, plural, =1 {at}other {# at signs}}"
    },
    chromevox_pound: {
        message: "{COUNT, plural, =1 {pound}other {# pound signs}}"
    },
    chromevox_dollar: {
        message: "{COUNT, plural, =1 {dollar}other {# dollar signs}}"
    },
    chromevox_percent: {
        message: "{COUNT, plural, =1 {percent}other {# percent signs}}"
    },
    chromevox_caret: {
        message: "{COUNT, plural, =1 {caret}other {# carets}}"
    },
    chromevox_ampersand: {
        message: "{COUNT, plural, =1 {ampersand}other {# ampersands}}"
    },
    chromevox_asterisk: {
        message: "{COUNT, plural, =1 {asterisk}other {# asterisks}}"
    },
    chromevox_open_paren: {
        message: "{COUNT, plural, =1 {open paren}other {# open parens}}"
    },
    chromevox_close_paren: {
        message: "{COUNT, plural, =1 {close paren}other {# close parens}}"
    },
    chromevox_dash: {
        message: "{COUNT, plural, =1 {dash}other {# dashes}}"
    },
    chromevox_underscore: {
        message: "{COUNT, plural, =1 {underscore}other {# underscores}}"
    },
    chromevox_equals: {
        message: "{COUNT, plural, =1 {equal}other {# equal signs}}"
    },
    chromevox_plus: {
        message: "{COUNT, plural, =1 {plus}other {# plus signs}}"
    },
    chromevox_left_bracket: {
        message: "{COUNT, plural, =1 {left bracket}other {# left brackets}}"
    },
    chromevox_right_bracket: {
        message: "{COUNT, plural, =1 {right bracket}other {# right brackets}}"
    },
    chromevox_left_brace: {
        message: "{COUNT, plural, =1 {left brace}other {# left braces}}"
    },
    chromevox_right_brace: {
        message: "{COUNT, plural, =1 {right brace}other {# right braces}}"
    },
    chromevox_pipe: {
        message: "{COUNT, plural, =1 {pipe}other {# vertical pipes}}"
    },
    chromevox_semicolon: {
        message: "{COUNT, plural, =1 {semicolon}other {# semicolons}}"
    },
    chromevox_colon: {
        message: "{COUNT, plural, =1 {colon}other {# colons}}"
    },
    chromevox_comma: {
        message: "{COUNT, plural, =1 {comma}other {# commas}}"
    },
    chromevox_dot: {
        message: "{COUNT, plural, =1 {dot}=3 {ellipsis}other {# dots}}"
    },
    chromevox_less_than: {
        message: "{COUNT, plural, =1 {less than}other {# less than signs}}"
    },
    chromevox_greater_than: {
        message: "{COUNT, plural, =1 {greater than}other {# greater than signs}}"
    },
    chromevox_slash: {
        message: "{COUNT, plural, =1 {slash}other {# slashes}}"
    },
    chromevox_question_mark: {
        message: "{COUNT, plural, =1 {question mark}other {# question marks}}"
    },
    chromevox_quote: {
        message: "{COUNT, plural, =1 {quote}other {# quotes}}"
    },
    chromevox_apostrophe: {
        message: "{COUNT, plural, =1 {apostrophe}other {# apostrophes}}"
    },
    chromevox_tab: {
        message: "{COUNT, plural, =1 {tab}other {# tabs}}"
    },
    chromevox_backslash: {
        message: "{COUNT, plural, =1 {backslash}other {# backslashes}}"
    },
    chromevox_braille_routing: {
        message: "Click the item under a routing key"
    },
    chromevox_braille_pan_left: {
        message: "Pan backward"
    },
    chromevox_braille_pan_right: {
        message: "Pan bforward"
    },
    chromevox_braille_line_up: {
        message: "Braille previous Line"
    },
    chromevox_braille_line_down: {
        message: "Braille next Line"
    },
    chromevox_braille_top: {
        message: "Move braille display to top of page"
    },
    chromevox_braille_bottom: {
        message: "Move braille display to bottom of page"
    },
    chromevox_access_key: {
        message: "has access key, $1",
        placeholders: {
            1: {
                content: "$1"
            }
        }
    }
};
