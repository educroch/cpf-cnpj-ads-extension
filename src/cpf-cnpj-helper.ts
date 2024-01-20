import { cpf, cnpj } from 'cpf-cnpj-validator';
const TAMANHO_CPF: number = 11;
const TAMANHO_CNPJ: number = 14;

export function limparFormatacao(documento: string) : string {
    const documentoSemFormatacao = documento.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
    
    if (verificarSeTamanhoDoDocumentoEstaInvalido(documentoSemFormatacao)) {
        throw new Error('Tamanho inválido para um documento.');
    }

    if (documentoSemFormatacao.length === TAMANHO_CPF) {
        if (!cpf.isValid(documentoSemFormatacao)) {
            throw new Error('Número de CPF inválido.');
        }
    } else {
        if (!cnpj.isValid(documentoSemFormatacao)) {
            throw new Error('Número de CNPJ está inválido.');
        }
    }

    return documentoSemFormatacao;
}

function verificarSeTamanhoDoDocumentoEstaInvalido(documentoSemFormatacao: string) {
    return !(documentoSemFormatacao.length === TAMANHO_CPF || documentoSemFormatacao.length === TAMANHO_CNPJ);
}

