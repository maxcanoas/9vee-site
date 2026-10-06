# 18: Imagem de compartilhamento por página

**O que construir:** cada página ganha a própria imagem de prévia, para o link mostrar o título certo quando alguém compartilhar no WhatsApp ou nas redes.

**Depende de:** 17 (títulos finais).

**Horas:** 1,5. **Semana:** 7 (era a 8; subiu em 30/09/2026, para a folga ficar na última semana).

**Situação:** feito e aprovado pelo Maxwell em 06/10/2026, adiantado da semana 7, no processo curto. Saiu antes do 17 porque a imagem é gerada no build a partir do título da página: quando o 17 mudar um título, a imagem muda junto.

- [x] Um script gera uma imagem de 1200 × 630 por página, com o título sobre a arte da marca.
- [x] Cada página aponta para a própria imagem no Open Graph; o teste do HTML gerado confere.
- [ ] Prévia conferida no WhatsApp, com o preview publicado. **Pendente:** pela spec, o Open Graph usa sempre `https://www.9vee.com.br`, também no preview, e o endereço da imagem cai no Wix, onde ela não existe. Fica para o lançamento (ticket 20), por decisão do Maxwell em 06/10.

## Como ficou

- **O desenho:** o fundo noite do rodapé, o círculo da marca saindo pela direita, como nos topos do site, o logo claro no alto e o título da página à esquerda, em Readex Pro SemiBold, a fonte dos títulos do site. O título curto sai em 68 px; o longo desce para 60 ou 52 até caber em três linhas, sem encostar no círculo. Título que não cabe nem assim para o build.
- **O fundo** (`src/assets/marca/compartilhar-fundo.png`) sai do `scripts/gerar-ativos.ts`, com os outros ativos do kit, que saíram iguais.
- **A fonte:** o TTF da Readex Pro SemiBold, do repositório da fonte (o Google Fonts só tem a variável), com a licença OFL ao lado, em `src/assets/fontes/`. O sharp só desenha texto com o arquivo da fonte, e o Astro guarda só recortes em WOFF2. O aviso de fontes do kit vale para a fonte do logo, e não para esta.
- **No build** (`scripts/compartilhamento.ts`, ligado no `astro.config.mjs`): no fim de cada build, para cada página que aponta uma imagem em `/compartilhar/`, o texto do `og:image:alt` vira a imagem. O texto é o título da página sem o "9vee", que o logo já mostra (`src/lib/compartilhamento.ts`). O `og:image:alt` também descreve a imagem para quem não a vê. A página de erro continua com a prévia geral, o `/og.jpg`. São 22 imagens no preview e 21 na produção, sem a página não publicada do cantonês.
- **Os testes:** 4 de lógica (`tests/unit/compartilhamento.test.ts`) e 45 do HTML (`tests/dist/seo.test.ts`, nos dois builds: endereço, texto, tamanho e nenhuma imagem sobrando). `npm test` com 243 testes de lógica e 1.556 do HTML.
- **Ficou de fora,** pelo processo curto: a rodada de `code-review`, que volta no ticket 17.
