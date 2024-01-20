import * as assert from 'assert';


import * as vscode from 'vscode';
import * as helper from '../../cpf-cnpj-helper';

suite('Teste de limpeza de formatação.', () => {
	vscode.window.showInformationMessage('Iniciando todos os testes.');

	test('Deve retornar CPF sem formatação, quanto CPF for válido.', () => {
		const cpf = '868.659.450-69';
		const cpfSemFormatacao = helper.limparFormatacao(cpf);
		assert.strictEqual(cpfSemFormatacao, '86865945069');
	});

	test('Deve retornar Error, quanto tamanho do CPF for inválido.', () => {
		const cpf = '1000.659.450-69';
		assert.throws(() => {
			helper.limparFormatacao(cpf);
		}, Error);
	});

	test('Deve retornar Error, quanto CPF for inválido.', () => {
		const cpf = '123.456.789-12';
		assert.throws(() => {
			helper.limparFormatacao(cpf);
		}, Error);
	});
});
