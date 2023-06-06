'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const History_1 = require("./History");
const getEditor = () => vscode.window.activeTextEditor;
const getDocument = (editor) => editor.document;
const getEol = (document) => document.eol === 1 ? '\n' : '\r\n';
const getSelectedText = () => {
    const editor = getEditor();
    if (!editor)
        return;
    const document = getDocument(editor);
    if (!document)
        return;
    // QUESTION: Is this needed?
    const eol = getEol(document);
    return editor.selections.map((selection) => {
        // Copy the whole line when no text is selected
        if (selection.start.line === selection.end.line && selection.start.character === selection.end.character) {
            const range = document.lineAt(selection.start).range;
            const text = editor.document.getText(range);
            // Add a new line to mimic native bahavious
            return `${text}${eol}`;
        }
        return editor.document.getText(selection);
    });
};
const buildCopyCutCommand = (history, isCut = false) => {
    const editorCommand = isCut ? 'clipboardCutAction' : 'clipboardCopyAction';
    return () => {
        vscode.commands.executeCommand(`editor.action.${editorCommand}`);
        // Grab ths text from each selection
        const selectedText = getSelectedText();
        if (selectedText)
            history.add(selectedText);
    };
};
const buildHistoryCommand = (history) => () => {
    const LABEL_LENGTH = 60; // Length to crop the label text, allows space for 'description' statisics
    const editor = getEditor();
    if (!editor)
        return;
    const document = getDocument(editor);
    if (!document)
        return;
    // QUESTION: Is this needed?
    const eol = getEol(document);
    // Build a list of all items in history
    const items = history.get().map((blocks, index) => {
        const lines = blocks.join(eol).trim().split(eol);
        const [firstCopiedLine, ...restCopiedLines] = lines;
        const numberOfBlocks = blocks.length;
        const numberOfLines = lines.length;
        let label = firstCopiedLine;
        const labelIsTooLong = label.length > (LABEL_LENGTH - 4);
        if (labelIsTooLong) {
            label = label.substr(0, LABEL_LENGTH);
        }
        if (labelIsTooLong || numberOfLines > 1) {
            label += ' ...';
        }
        ;
        let description = [];
        if (numberOfBlocks > 1)
            description.push(`${numberOfBlocks} blocks`);
        if (numberOfLines > 1)
            description.push(`${numberOfLines} lines`);
        let detail = '';
        // Include all text even if it does not visually fit, this allows for searching the whole text.
        if (numberOfLines > 1)
            detail = restCopiedLines.join(eol);
        return {
            label,
            description: description.join(', '),
            detail,
            blocks,
            lines
        };
    });
    if (!items.length) {
        vscode.window.showInformationMessage('There is currently nothing stored in your clipboard history.');
        return;
    }
    vscode.window.showQuickPick(items, {
        placeHolder: 'Select the lines to paste',
        matchOnDescription: false,
        matchOnDetail: true
    })
        .then((item) => {
        if (!item)
            return;
        const willMoveToTop = vscode.workspace.getConfiguration('copy-copy-paste').get('movePastedBlockToTop', true);
        if (willMoveToTop)
            history.add(item.blocks);
        const wsEdit = new vscode.WorkspaceEdit();
        const mapBlocksToSelections = editor.selections.length === item.blocks.length;
        const mapLinesToSelections = item.blocks.length === 1 && editor.selections.length === item.lines.length;
        const edits = editor.selections.map((selection, index) => {
            const range = new vscode.Range(selection.start, selection.end);
            let text;
            if (mapBlocksToSelections) {
                text = item.blocks[index];
            }
            else if (mapLinesToSelections) {
                text = item.lines[index];
            }
            else {
                // Everything
                text = item.lines.join('\n');
            }
            const edit = new vscode.TextEdit(range, text);
            return edit;
        });
        wsEdit.set(document.uri, edits);
        vscode.workspace.applyEdit(wsEdit);
        vscode.env.clipboard.writeText(item.blocks.join(eol));
    });
};
function activate(context) {
    vscode.workspace.onDidChangeConfiguration(() => {
        const clipboardSize = vscode.workspace.getConfiguration('copy-copy-paste').get('size');
        history.setBufferLimit(clipboardSize);
    });
    const history = new History_1.default();
    const clipboardSize = vscode.workspace.getConfiguration('copy-copy-paste').get('size');
    history.setBufferLimit(clipboardSize);
    const copyCommand = vscode.commands.registerCommand('copy-copy-paste.copy', buildCopyCutCommand(history, false));
    const cutCommand = vscode.commands.registerCommand('copy-copy-paste.cut', buildCopyCutCommand(history, true));
    const pasteCommand = vscode.commands.registerCommand('copy-copy-paste.history', buildHistoryCommand(history));
    const clearCommand = vscode.commands.registerCommand('copy-copy-paste.clear', () => history.clear());
    context.subscriptions.push(copyCommand);
    context.subscriptions.push(cutCommand);
    context.subscriptions.push(pasteCommand);
    context.subscriptions.push(clearCommand);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map