export function limparFormatacaoCpf(cpf: string) : string {
    const cpfSemFormatacao = cpf.replace(/\./g, '').replace(/\-/g, '');
    return cpfSemFormatacao;
}