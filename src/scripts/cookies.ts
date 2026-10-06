// O aviso de cookies e o GA4. O aviso aparece enquanto não houver resposta da versão atual; o botão
// "Preferências de cookies" do rodapé reabre. O script do Google só carrega depois do aceite, com o Consent Mode v2
// negando tudo antes e liberando só a estatística. Quem volta atrás fica sem os cookies do Google, e nada mais sai.
// A lógica sem tela está em src/lib/cookies.ts (a escolha) e em src/lib/medicao.ts (os eventos).
import {
  CHAVE_COOKIES,
  carregaGa4,
  consentimentoDoGoogle,
  cookiesDoGa4,
  dominiosDoCookie,
  lerEscolha,
  novaEscolha,
  textoDaEscolha,
  type EscolhaDeCookies,
} from '../lib/cookies';
import { parametrosDoEvento, type DadosDoEvento, type EventoDeLead } from '../lib/medicao';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...argumentos: unknown[]) => void;
  }
}

const armazenamento = (() => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
})();

const aviso = document.querySelector<HTMLElement>('[data-aviso-cookies]');
const versao = Number(aviso?.dataset.versao ?? 0);
const ga4 = aviso?.dataset.ga4 ?? '';
// Só no local: com o modo de depuração, os eventos aparecem no DebugView da propriedade de teste.
const depurar = aviso?.hasAttribute('data-ga4-depurar') ?? false;
const raiz = document.documentElement;

let escolha = lerGuardada();
let abridor: HTMLElement | null = null;

function lerGuardada(): EscolhaDeCookies | null {
  try {
    return lerEscolha(armazenamento?.getItem(CHAVE_COOKIES) ?? null, versao);
  } catch {
    return null;
  }
}

/** O GA4 está ligado e com o aceite: só assim um evento sai. */
const medindo = () => Boolean(window.gtag) && carregaGa4(escolha, ga4) && !Reflect.get(window, `ga-disable-${ga4}`);

/** Manda um dos três eventos de lead, se a pessoa aceitou a estatística. Sem o aceite, nada sai. */
export function medir(evento: EventoDeLead, dados: DadosDoEvento): void {
  if (medindo()) window.gtag!('event', evento, parametrosDoEvento(evento, dados));
}

function ligarGa4() {
  if (!carregaGa4(escolha, ga4)) return;
  Reflect.set(window, `ga-disable-${ga4}`, false);
  if (window.gtag) {
    window.gtag('consent', 'update', consentimentoDoGoogle(escolha));
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  // O gtag.js lê da fila o objeto `arguments`, e não uma lista: por isso a função clássica, e não a de seta.
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', consentimentoDoGoogle(null));
  window.gtag('consent', 'update', consentimentoDoGoogle(escolha));
  window.gtag('js', new Date());
  if (depurar) window.gtag('config', ga4, { debug_mode: true });
  else window.gtag('config', ga4);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`;
  document.head.append(script);
}

/** Quem recusa depois de ter aceitado: o GA4 para nesta página, e os cookies do Google saem do navegador. */
function desligarGa4() {
  if (ga4) Reflect.set(window, `ga-disable-${ga4}`, true);
  window.gtag?.('consent', 'update', consentimentoDoGoogle(null));
  for (const nome of cookiesDoGa4(document.cookie)) {
    for (const dominio of ['', ...dominiosDoCookie(location.hostname)]) {
      document.cookie = `${nome}=; Max-Age=0; Path=/${dominio ? `; Domain=${dominio}` : ''}`;
    }
  }
}

function mostrar(comPreferencias: boolean) {
  if (!aviso) return;
  abrirPreferencias(comPreferencias);
  aviso.hidden = false;
  raiz.dataset.avisoAberto = '';
  medirAltura();
}

function esconder() {
  if (!aviso) return;
  const focoDentro = aviso.contains(document.activeElement);
  aviso.hidden = true;
  delete raiz.dataset.avisoAberto;
  // O foco volta para quem abriu (o botão do rodapé). Sem ele, vai para o conteúdo, e não se perde no topo da página.
  if (abridor?.isConnected) abridor.focus();
  else if (focoDentro) document.getElementById('conteudo')?.focus({ preventScroll: true });
  abridor = null;
}

function abrirPreferencias(abrir: boolean) {
  if (!aviso) return;
  const categorias = aviso.querySelector<HTMLElement>('#aviso-cookies-categorias')!;
  const estatistica = aviso.querySelector<HTMLInputElement>('input[name="cookies-estatistica"]')!;
  categorias.hidden = !abrir;
  estatistica.checked = escolha?.estatistica ?? false;
  aviso.querySelector('[data-cookies="preferencias"]')!.setAttribute('aria-expanded', String(abrir));
  aviso.querySelector<HTMLElement>('[data-cookies="preferencias"]')!.hidden = abrir;
  aviso.querySelector<HTMLElement>('[data-cookies="salvar"]')!.hidden = !abrir;
}

function decidir(estatistica: boolean) {
  escolha = novaEscolha(estatistica, new Date(), versao);
  try {
    armazenamento?.setItem(CHAVE_COOKIES, textoDaEscolha(escolha));
  } catch {
    // Sem armazenamento, a escolha vale só para esta página, e o aviso volta na próxima.
  }
  esconder();
  if (estatistica) ligarGa4();
  else desligarGa4();
}

// O atalho do WhatsApp sobe acima do aviso no celular: a altura dele vira uma variável do documento.
const observador = typeof ResizeObserver === 'function' ? new ResizeObserver(() => medirAltura()) : undefined;
function medirAltura() {
  if (aviso && !aviso.hidden) raiz.style.setProperty('--altura-aviso', `${aviso.offsetHeight}px`);
}

/** Aplica a resposta guardada: o aviso aparece sem ela, e o GA4 liga com o aceite. */
function aplicarGuardada() {
  escolha = lerGuardada();
  if (escolha) {
    if (aviso && !aviso.hidden && !abridor) esconder();
    if (escolha.estatistica) ligarGa4();
  } else {
    mostrar(false);
  }
}

if (aviso) {
  observador?.observe(aviso);
  aviso.addEventListener('click', (evento) => {
    const acao = (evento.target as Element).closest<HTMLElement>('[data-cookies]')?.dataset.cookies;
    if (acao === 'aceitar') decidir(true);
    else if (acao === 'recusar') decidir(false);
    else if (acao === 'salvar') decidir(aviso.querySelector<HTMLInputElement>('input[name="cookies-estatistica"]')!.checked);
    else if (acao === 'preferencias') {
      abrirPreferencias(true);
      aviso.querySelector<HTMLInputElement>('input[name="cookies-estatistica"]')!.focus();
    }
  });
  // Esc fecha o aviso reaberto pelo rodapé, sem mudar a escolha. O primeiro aviso só sai com uma resposta.
  aviso.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && escolha) esconder();
  });
  document.addEventListener('click', (evento) => {
    const botao = (evento.target as Element | null)?.closest?.<HTMLElement>('[data-preferencias-cookies]');
    if (!botao) return;
    abridor = botao;
    mostrar(true);
    aviso.querySelector<HTMLInputElement>('input[name="cookies-estatistica"]')!.focus();
  });
  aplicarGuardada();
  // Página restaurada do cache (voltar) ou pré-renderizada antes da resposta: vale o que está guardado agora.
  addEventListener('pageshow', (evento) => {
    if (evento.persisted) aplicarGuardada();
  });
  document.addEventListener('prerenderingchange', aplicarGuardada);
}
