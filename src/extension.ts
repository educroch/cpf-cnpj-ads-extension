'use strict';
import * as vscode from 'vscode';
import { limparFormatacao } from './cpf-cnpj-helper';

const MENSAGEM_SELECAO: string = 'Não foi possível identificar um texto selecionado para limpar a formatação.';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('cpfcnpjextension.removerFormatacao', () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showInformationMessage(MENSAGEM_SELECAO);
            return;
        }

        const selection = editor.selection;
        if (selection && !selection.isEmpty) {
            const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
            const highlighted = editor.document.getText(selectionRange);
            
            try {
                const semFormatacao = limparFormatacao(highlighted);
                editor.edit((editorBuilder) => {
                    editorBuilder.replace(selectionRange, semFormatacao);
                });
            } catch (error: any) {
                vscode.window.showInformationMessage(error.message);
            }

        } else {
            vscode.window.showInformationMessage(MENSAGEM_SELECAO);
        }
        
    }));
}

export function deactivate() {
}