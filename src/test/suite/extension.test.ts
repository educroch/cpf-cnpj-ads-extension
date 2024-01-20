import * as assert from 'assert';

import * as vscode from 'vscode';
import * as helper from '../../cpf-cnpj-helper';

suite('Teste de limpeza de formatação para CPF.', () => {
	vscode.window.showInformationMessage('Iniciando todos os testes de limpeza de formatação do CPF.');

	test('Deve retornar CPF sem formatação, quanto CPF for válido.', () => {
		const cpf = '868.659.450-69';
		const cpfSemFormatacao = helper.limparFormatacao(cpf);
		assert.strictEqual(cpfSemFormatacao, '86865945069');
	});

	test('Deve retornar Error, quanto tamanho do CPF for inválido.', () => {
		const cpf = '1000.659.450-69';
		assert.throws(() => {
			helper.limparFormatacao(cpf);
		}, (err) => {
			assert(err instanceof Error);
			assert.strictEqual(err.message, 'Tamanho inválido para um documento.');
			return true;
		});
	});

	test('Deve retornar Error, quanto CPF for inválido.', () => {
		const cpf = '123.456.789-12';
		assert.throws(() => {
			helper.limparFormatacao(cpf);
		}, (err) => {
			assert(err instanceof Error);
			assert.strictEqual(err.message, 'Número de CPF inválido.');
			return true;
		});
	});
});

suite('Teste de limpeza de formatação para CNPJ.', () => {
	vscode.window.showInformationMessage('Iniciando todos os testesd de limpeza de formatação do CNPJ.');

	test('Deve retornar CNPJ sem formatação, quanto CNPJ for válido.', () => {
		const cnpj = '58.182.141/0001-52';
		const cnpjSemFormatacao = helper.limparFormatacao(cnpj);
		assert.strictEqual(cnpjSemFormatacao, '58182141000152');
	});

	test('Deve retornar Error, quanto tamanho do CNPJ for inválido.', () => {
		const cnpj = '158.182.141/0001-52';
		assert.throws(() => {
			helper.limparFormatacao(cnpj);
		}, (err) => {
			assert(err instanceof Error);
			assert.strictEqual(err.message, 'Tamanho inválido para um documento.');
			return true;
		});
	});

	test('Deve retornar Error, quanto CNPJ for inválido.', () => {
		const cnpj = '12.123.456/0000-12';
		assert.throws(() => {
			helper.limparFormatacao(cnpj);
		},(err) => {
			assert(err instanceof Error);
			assert.strictEqual(err.message, 'Número de CNPJ está inválido.');
			return true;
		});
	});
});
