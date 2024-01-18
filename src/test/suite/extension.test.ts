import * as assert from 'assert';


import * as vscode from 'vscode';
import * as helper from '../../cpf-cnpj-helper';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Deve retornar CPF sem formatação', () => {
		const cpf = '123.456.789-12';
		const cpfSemFormatacao = helper.limparFormatacaoCpf(cpf);
		assert.strictEqual(cpfSemFormatacao, '12345678912');
	});
});
