import { cpf, cnpj } from 'cpf-cnpj-validator';
const TAMANHO_CPF: number = 11;
const TAMANHO_CNPJ: number = 14;

export function limparFormatacao(documento: string) : string {
    const documentoSemFormatacao = limparNumeroDocumento(documento);
    
    validarDocumento(documentoSemFormatacao);

    return documentoSemFormatacao;
}

export function formatarDocumento(numero: string) : string {
    
    const documentoSemFormatacao = limparNumeroDocumento(numero);

    validarDocumento(documentoSemFormatacao);

    if (documentoSemFormatacao.length === TAMANHO_CPF) {
        return cpf.format(numero);
    } else {
        return cnpj.format(numero);
    }
}

function validarDocumento(documento: string): void {
    if (verificarSeTamanhoDoDocumentoEstaInvalido(documento)) {
        throw new Error('Tamanho inválido para um documento.');
    }

    if (documento.length === TAMANHO_CPF) {
        if (!cpf.isValid(documento)) {
            throw new Error('Número de CPF inválido.');
        }
    } else {
        if (!cnpj.isValid(documento)) {
            throw new Error('Número de CNPJ está inválido.');
        }
    }
}

function verificarSeTamanhoDoDocumentoEstaInvalido(documentoSemFormatacao: string) {
    return !(documentoSemFormatacao.length === TAMANHO_CPF || documentoSemFormatacao.length === TAMANHO_CNPJ);
}

function limparNumeroDocumento(documento: string) : string {
    return documento.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
}
