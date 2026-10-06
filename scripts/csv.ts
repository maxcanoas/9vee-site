// Leitura e escrita de CSV, para a lista de URLs do site atual e o mapa de redirecionamentos (ticket 14). Campo com
// vírgula, aspas ou quebra de linha vai entre aspas, e a aspa de dentro vira duas, como o Excel e o Google Planilhas
// esperam.

/** As linhas do CSV, cada uma como objeto pelo nome das colunas da primeira linha. */
export function lerCsv(texto: string): Record<string, string>[] {
  const linhas: string[][] = [];
  let linha: string[] = [];
  let campo = '';
  let entreAspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreAspas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') entreAspas = false;
      else campo += c;
    } else if (c === '"') entreAspas = true;
    else if (c === ',') {
      linha.push(campo);
      campo = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++;
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = '';
    } else campo += c;
  }
  if (campo !== '' || linha.length > 0) {
    linha.push(campo);
    linhas.push(linha);
  }
  const [cabecalho, ...dados] = linhas.filter((l) => l.some((valor) => valor !== ''));
  return dados.map((valores) => Object.fromEntries(cabecalho.map((coluna, i) => [coluna, valores[i] ?? ''])));
}

const campoDoCsv = (valor: string) => (/[",\r\n]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor);

/** O CSV das linhas, com as colunas na ordem dada. */
export function escreverCsv(colunas: readonly string[], linhas: readonly Record<string, string>[]): string {
  return [colunas, ...linhas.map((linha) => colunas.map((coluna) => linha[coluna] ?? ''))]
    .map((valores) => valores.map(campoDoCsv).join(','))
    .join('\n')
    .concat('\n');
}
