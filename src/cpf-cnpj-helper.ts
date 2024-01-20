import { cpf } from 'cpf-cnpj-validator';
const TAMANHO_CPF: number = 11;

export function limparFormatacao(documento: string) : string {
    const documentoSemFormatacao = documento.replace(/\./g, '').replace(/\-/g, '');
    
    if (documentoSemFormatacao.length !== TAMANHO_CPF) {
        throw new Error('Tamanho incorreto para um CPF.');
    }

    if (!cpf.isValid(documentoSemFormatacao)) {
        throw new Error('Número de CPF inválido.');
    }
    
    return documentoSemFormatacao;
}