'use strict';
import * as vscode from 'vscode';
import { limparFormatacao, formatarDocumento } from './cpf-cnpj-helper';

const MENSAGEM_SELECAO: string = 'Não foi possível identificar um texto selecionado para limpar a formatação.';

interface TextEditor {
    editor: vscode.TextEditor;
    selection: vscode.Range;
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('cpfcnpjextension.removerFormatacao', () => {
        try {
            const semFormatacao = limparFormatacao(lerTextoSelecionado());
            substituirTextoSelecionado(semFormatacao);
        } catch (error: any) {
            vscode.window.showInformationMessage(error.message);
        }
    }));

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('cpfcnpjextension.formatarDocumento', () => {
        try {
            const comFormatacao = formatarDocumento(lerTextoSelecionado());
            substituirTextoSelecionado(comFormatacao);
        } catch (error: any) {
            vscode.window.showInformationMessage(error.message);
        }
    }));
}

export function deactivate() {
}

function lerTextoSelecionado(): string {
    const textEditor = obterTextEditorComSelecionRange();
    return textEditor.editor.document.getText(textEditor.selection);
}

function substituirTextoSelecionado(textoParaSubstituir: string) {
    const textEditor = obterTextEditorComSelecionRange();

    textEditor.editor.edit((editorBuilder) => {
        editorBuilder.replace(textEditor.selection, textoParaSubstituir);
    });
}

function obterTextEditorComSelecionRange(): TextEditor {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        throw new Error(MENSAGEM_SELECAO);
    }

    if (editor.selection && !editor.selection.isEmpty) {
        const selectionRange = new vscode.Range(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character);
        return { editor: editor, selection: selectionRange };
    } else {
        throw new Error(MENSAGEM_SELECAO);
    }
}