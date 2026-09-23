# Logos das empresas dos depoimentos

Os três logos que aparecem ao lado do nome nos depoimentos da home, a pedido da cliente (23/09/2026). Não são do kit da 9vee: são marcas das empresas, e o site atual da 9vee não publica nenhum deles.

| Arquivo | Empresa | Fonte | Licença do desenho |
|---|---|---|---|
| `nissan.svg` | Nissan | Simple Icons 16.32.0, `icons/nissan.svg` | CC0 1.0 |
| `general-motors.svg` | General Motors | Simple Icons 16.32.0, `icons/generalmotors.svg` | CC0 1.0 |
| `embraer.svg` | Embraer | Wikimedia Commons, `File:Embraer_logo.svg` | domínio público, por não ter originalidade suficiente para direito autoral |

A licença cobre só o desenho do arquivo. Os três continuam marcas registradas das empresas. Antes de o site ir para o ar, cada empresa precisa autorizar por escrito o uso do logo. A pendência está no texto de cada depoimento, em `content/home.md`, junto com a autorização da fala.

O componente `LogoEmpresa` usa só a geometria de cada arquivo (pelo `lerSvgDoKit`) e pinta com a cor do texto. As cores originais das marcas não entram no site. O tamanho sai do formato do `viewBox`: logo quase quadrado vai pela altura, e logo largo (mais que o dobro da altura), pela largura.

Para trocar por um arquivo oficial que a empresa mandar, salve com o mesmo nome. O SVG precisa ter `viewBox` e o desenho em `path` ou `polygon`. O leitor não aplica `transform`, ignora `rect` e `circle` sem avisar e não enxerga `fill-rule="evenodd"` escrito como atributo: se o arquivo tiver algum desses, converta para `path` antes.
