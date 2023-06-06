/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
function getLanguageId() {
    let editor = vscode_1.window.activeTextEditor;
    if (editor === undefined) {
        return undefined;
    }
    return editor.document.languageId;
}
function filterSurroundItems(items, languageId) {
    if (languageId === undefined) {
        return items;
    }
    return items.filter((item) => {
        if (!item.languageIds || item.languageIds.length < 1) {
            return true;
        }
        if (item.languageIds.includes(`-${languageId}`)) {
            return false;
        }
        if (item.languageIds.includes("*") ||
            item.languageIds.includes(languageId)) {
            return true;
        }
        return false;
    });
}
function getSurroundConfig() {
    let config = vscode_1.workspace.getConfiguration("surround");
    const showOnlyUserDefinedSnippets = config.get("showOnlyUserDefinedSnippets", false);
    const items = showOnlyUserDefinedSnippets
        ? {}
        : config.get("with", {});
    const custom = config.get("custom", {});
    for (const key of Object.keys(custom)) {
        if (typeof custom[key] !== "object" || !custom[key].label) {
            vscode_1.window.showErrorMessage(`Invalid custom config for Surround: surround.custom.${key}!\nPlease check your settings!`);
            return Object.assign({}, items);
        }
    }
    return Object.assign(Object.assign({}, items), custom);
}
function getEnabledSurroundItems(surroundConfig) {
    const items = [];
    Object.keys(surroundConfig).forEach((surroundItemKey) => {
        const surroundItem = surroundConfig[surroundItemKey];
        if (!surroundItem.disabled) {
            items.push(surroundItem);
        }
    });
    return items;
}
function trimSelection(selection) {
    let activeEditor = vscode_1.window.activeTextEditor;
    if (activeEditor && selection) {
        const startLine = selection.start.line;
        const endLine = selection.end.line;
        let startPosition = undefined;
        let endPosition = undefined;
        for (let lineNo = startLine; lineNo <= endLine; lineNo++) {
            const line = activeEditor.document.lineAt(lineNo);
            if (line.isEmptyOrWhitespace) {
                continue;
            }
            if (lineNo === startLine &&
                !line.text.slice(selection.start.character).trim()) {
                continue;
            }
            if (lineNo > startLine &&
                lineNo === endLine &&
                selection.end.character < line.firstNonWhitespaceCharacterIndex) {
                continue;
            }
            if (!startPosition) {
                // find start character index
                let startCharacter = line.firstNonWhitespaceCharacterIndex;
                if (lineNo === startLine) {
                    startCharacter = Math.max(startCharacter, selection.start.character);
                }
                startPosition = new vscode_1.Position(lineNo, startCharacter);
            }
            // find end character index
            let endCharacter = line.firstNonWhitespaceCharacterIndex + line.text.trim().length;
            if (lineNo === endLine) {
                endCharacter = Math.min(endCharacter, selection.end.character);
            }
            endPosition = new vscode_1.Position(lineNo, endCharacter);
        }
        if (startPosition && endPosition) {
            return new vscode_1.Selection(startPosition, endPosition);
        }
    }
    return undefined;
}
function trimSelections() {
    let activeEditor = vscode_1.window.activeTextEditor;
    if (activeEditor && activeEditor.selections) {
        const selections = [];
        activeEditor.selections.forEach((selection) => {
            if (selection.start.line === selection.end.line &&
                selection.start.character === selection.end.character) {
                return selections.push(selection);
            }
            const trimmedSelection = trimSelection(selection);
            if (trimmedSelection) {
                selections.push(trimmedSelection);
            }
        });
        activeEditor.selections = selections;
    }
}
function applyQuickPick(item, surroundItems) {
    const activeEditor = vscode_1.window.activeTextEditor;
    if (activeEditor && item) {
        const surroundItem = surroundItems.find((s) => item.label === s.label);
        if (surroundItem) {
            try {
                trimSelections();
                activeEditor.insertSnippet(new vscode_1.SnippetString(surroundItem.snippet));
            }
            catch (err) {
                vscode_1.window.showErrorMessage("Could not apply surround snippet: " + surroundItem.label, String(err));
            }
        }
    }
}
function applySurroundItem(key, surroundConfig) {
    if (vscode_1.window.activeTextEditor && surroundConfig[key]) {
        const surroundItem = surroundConfig[key];
        vscode_1.window.activeTextEditor.insertSnippet(new vscode_1.SnippetString(surroundItem.snippet));
    }
}
function registerCommands(context, surroundConfig) {
    vscode_1.commands.getCommands().then((cmdList) => {
        Object.keys(surroundConfig).forEach((key) => {
            const cmdText = `surround.with.${key}`;
            if (cmdList.indexOf(cmdText) === -1) {
                context.subscriptions.push(vscode_1.commands.registerCommand(cmdText, () => {
                    applySurroundItem(key, surroundConfig);
                }));
            }
        });
    });
}
const SURROUND_LAST_VERSION_KEY = "yatki.vscode-surround:last-version";
const PENDING_FOCUS = "yatki.vscode-surround:pending-focus";
function showWelcomeOrWhatsNew(context, version, previousVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        if (previousVersion !== version) {
            if (vscode_1.window.state.focused) {
                void context.globalState.update(PENDING_FOCUS, undefined);
                void context.globalState.update(SURROUND_LAST_VERSION_KEY, version);
                void showMessage(version, previousVersion);
            }
            else {
                // Save pending on window getting focus
                yield context.globalState.update(PENDING_FOCUS, true);
                const disposable = vscode_1.window.onDidChangeWindowState((e) => {
                    if (!e.focused) {
                        return;
                    }
                    disposable.dispose();
                    // If the window is now focused and we are pending the welcome, clear the pending state and show the welcome
                    if (context.globalState.get(PENDING_FOCUS) === true) {
                        void context.globalState.update(PENDING_FOCUS, undefined);
                        void context.globalState.update(SURROUND_LAST_VERSION_KEY, version);
                        void showMessage(version, previousVersion);
                    }
                });
                context.subscriptions.push(disposable);
            }
        }
    });
}
function showMessage(version, previousVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        const whatsNew = { title: "What's New" };
        const giveAStar = { title: "★ Give a star" };
        const sponsor = { title: "❤ Sponsor" };
        const actions = [giveAStar, sponsor];
        const showUpdateNotifications = !!vscode_1.workspace
            .getConfiguration("surround")
            .get("showUpdateNotifications");
        if (previousVersion) {
            if (!showUpdateNotifications) {
                return;
            }
            actions.unshift(whatsNew);
        }
        const message = previousVersion
            ? `Surround has been updated to v${version}! — check out what's new!`
            : "Thanks for using Surround — have a beautiful day! 🖖🏻 Cheers,";
        const result = yield vscode_1.window.showInformationMessage(message, ...actions);
        if (result !== null) {
            if (result === whatsNew) {
                yield vscode_1.env.openExternal(vscode_1.Uri.parse("https://github.com/yatki/vscode-surround/releases"));
            }
            else if (result === giveAStar) {
                yield vscode_1.env.openExternal(vscode_1.Uri.parse("https://github.com/yatki/vscode-surround"));
            }
            else if (result === sponsor) {
                yield vscode_1.env.openExternal(vscode_1.Uri.parse("https://github.com/sponsors/yatki"));
            }
        }
    });
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let surroundItems = [];
    let showRecentlyUsedFirst = true;
    let surroundConfig;
    const previousVersion = context.globalState.get(SURROUND_LAST_VERSION_KEY);
    const surroundExt = vscode_1.extensions.getExtension("yatki.vscode-surround");
    const surroundVersion = surroundExt.packageJSON.version;
    function update() {
        surroundConfig = getSurroundConfig();
        showRecentlyUsedFirst = !!vscode_1.workspace
            .getConfiguration("surround")
            .get("showRecentlyUsedFirst");
        surroundItems = getEnabledSurroundItems(surroundConfig);
        registerCommands(context, surroundConfig);
    }
    vscode_1.workspace.onDidChangeConfiguration(() => {
        update();
    });
    update();
    void showWelcomeOrWhatsNew(context, surroundVersion, previousVersion);
    let disposable = vscode_1.commands.registerCommand("surround.with", () => __awaiter(this, void 0, void 0, function* () {
        let quickPickItems = filterSurroundItems(surroundItems, getLanguageId()).map(({ label, description }) => ({
            label,
            description,
        }));
        const item = yield vscode_1.window.showQuickPick(quickPickItems, {
            placeHolder: "Type the label of the snippet",
            matchOnDescription: true,
        });
        if (!item) {
            return;
        }
        applyQuickPick(item, surroundItems);
        const selectedSurroundItem = surroundItems.find((i) => i.label === item.label && i.description === item.description);
        if (showRecentlyUsedFirst && selectedSurroundItem) {
            surroundItems = surroundItems.filter((i) => i.label !== item.label || i.description !== item.description);
            surroundItems.unshift(selectedSurroundItem);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=surround-web.js.map