# Imagens do site

Salve aqui cada imagem gerada no Gemini com o nome indicado em `docs/imagens-gemini.md` (por exemplo, `home-hero-fundo.jpg`) e rode `npm run build`.

O componente de figura acha o arquivo pelo nome e troca o Placeholder pela imagem. O Astro gera sozinho AVIF, WebP de reserva, srcset, width e height. Aceita `.jpg`, `.jpeg`, `.png`, `.webp` e `.avif`. Use `.png` nas camadas recortadas (fundo transparente).

A imagem vai até a borda, sem moldura nem arco desenhado. O arco das páginas é o site que faz; se o Gemini desenhar um, peça de novo com o prompt do documento.
