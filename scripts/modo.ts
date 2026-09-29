// O modo que os scripts de build e de servidor recebem na linha de comando. O local não entra: ele é o
// `astro dev`, que não passa por aqui.
export type ModoDoComando = 'preview' | 'producao';

/** O modo do argumento, ou o uso do script e a saída com erro. */
export function modoDoComando(argumento: string | undefined, script: string): ModoDoComando {
  if (argumento === 'preview' || argumento === 'producao') return argumento;
  console.error(`Uso: node scripts/${script} preview   ou   node scripts/${script} producao`);
  process.exit(1);
}
