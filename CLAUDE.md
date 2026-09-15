# CLAUDE.md — Histórico e contexto do projeto MyPage

> **Instruções para o Claude (ler sempre no início da sessão):**
> 1. **No começo de toda conversa**, ler este arquivo inteiro antes de qualquer coisa.
> 2. **Ao longo da conversa**, sempre que surgir informação nova, decisão tomada, problema resolvido ou problema em aberto, registrar aqui.
> 3. **Ao final da conversa**, adicionar uma nova entrada em [Histórico de sessões](#histórico-de-sessões) e atualizar as seções de [Problemas em aberto](#problemas-em-aberto) e [Decisões](#decisões-tomadas).
> 4. Usar datas absolutas (YYYY-MM-DD), nunca "ontem" ou "semana passada".
> 5. Não duplicar o que o git já registra (diff de código, mensagens de commit). Registrar aqui o **porquê**, não o **o quê**.

---

## Visão geral do projeto

- **Nome:** MyPage
- **Caminho:** `/Users/guilhermelorenzi/GQL/MyPage`
- **O que é:** site pessoal estático do Guilherme Quintero Lorenzi, que funciona como portfólio dos apps iOS e como host das páginas legais (política de privacidade e termos de uso) exigidas pela App Store.
- **Domínio:** `guilhermequinterolorenzi.com` (ver [CNAME](CNAME))
- **Branch principal:** `main`

## Stack e infraestrutura

- **HTML estático puro**, sem build step, sem framework. Cada página é um `.html` na raiz.
- **CSS:** [assets/css/style.css](assets/css/style.css) (arquivo único, ~21 KB).
- **Deploy:** Cloudflare Workers/Pages via `npx wrangler deploy`, configurado em [wrangler.jsonc](wrangler.jsonc).
  - ⚠️ O campo `name` no wrangler.jsonc **tem** de ser `mypage`, igual ao projeto no painel do Cloudflare. Se não bater, o deploy cria um Worker novo em vez de atualizar o que tem o domínio.
  - `html_handling: "auto-trailing-slash"` → `/puzzle-termos` serve `puzzle-termos.html`.
  - `not_found_handling: "none"` → não existe `404.html` na raiz.
- **Imagens:** todas em WebP otimizado, versionadas em `assets/img/`. O material-fonte pesado (`Portfolio-KegelFlow/`, `Portfolio-Fruitsful/`, `portfolio_Flashs/`, ~105 MB) está no `.gitignore` e **não** é publicado.
- **`app-ads.txt`** na raiz para verificação de ad networks.

## Estrutura de arquivos

```
/
├── index.html                    # landing/portfólio principal (~68 KB)
├── suporte.html                  # página de suporte
├── <app>-privacidade.html        # política de privacidade por app
├── <app>-termos.html             # termos de uso por app
├── CNAME, app-ads.txt, wrangler.jsonc
└── assets/
    ├── css/style.css
    ├── js/
    └── img/{evergrid,flashs,fruit,fruitsful,icon,kegelflow,puzzle,arte}/
```

## Apps cobertos pelo site

Cada app tem um par `-privacidade.html` + `-termos.html`, uma seção no
[index.html](index.html) e uma linha na lista do [suporte.html](suporte.html).

A ordem no index é **publicados primeiro**, depois os que ainda não saíram.

| App | Apple ID | Bundle ID | Publicado | Seção no index | Prints |
|---|---|---|---|---|---|
| KegelFlow | 6752828065 | — | ✅ | ✅ | ✅ 8 (inclui Watch) |
| Flash's | 6760672572 | — | ✅ | ✅ | ⚠️ marketing, não prints |
| Fruitsful | 6776395524 | com.fruitsful.app | ✅ | ✅ | ✅ 7 |
| LevelGrip | 6809867209 | com.quintero.habits | ✅ | ✅ | ✅ 4 (recortados) |
| Puzzle Atelier | 6807783038 | com.quintero.puzzle | ❌ | ✅ | ✅ 6 |
| Evergrid | 6811076687 | com.quintero.habitsCore | ❌ | ✅ | ✅ 6 |
| Zodique | 6811381975 | com.quintero.signos | ❌ | ✅ | ✅ 6 (recortados) |

### Cor de acento por app

Cada seção tem a sua cor, tirada da cor dominante do próprio ícone
(definidas em [style.css](assets/css/style.css), seção 7):

| App | Cor | Hex |
|---|---|---|
| KegelFlow | laranja | `#ff7a45` |
| Flash's | amarelo | `#ffd250` |
| Fruitsful | vermelho | `#ff4d3d` |
| LevelGrip | azul | `#4d7cff` |
| Puzzle Atelier | verde | `#4cc46a` |
| Evergrid | verde-água | `#2fd9a0` |
| Zodique | roxo | `#a97bff` |

### Onde ficam os prints originais

Fora deste repositório, nos projetos dos apps em `~/GQL/`:

| App | Pasta | Tipo |
|---|---|---|
| Fruitsful | `~/GQL/Fruitsful/Marketing/iphone/` | prints crus, 69 arquivos |
| Evergrid | `~/GQL/Habit/AppStore/screenshots/_capturas/iphone/` | prints crus, claro e escuro |
| LevelGrip | `~/GQL/Gripe/AppStore/screenshots/<locale>/iphone/` | só marketing composto |
| Puzzle | `~/GQL/Puzzle/AppStoreConnection/screenshots/<locale>/iPhone/` | só marketing composto |
| Zodique | `~/GQL/Zodique/AppStore/screenshots/<locale>/iphone/` | só marketing composto, 6 telas |
| Flash's (SwiftUI) | `~/GQL/card/FlashCardSwift/` | **nenhum print existe em todo o `~/GQL`** |

⚠️ A pasta de screenshots do Zodique é **regenerada por um pipeline do projeto**:
durante a sessão de 2026-09-15 os idiomas foram apagados e recriados enquanto
o site era montado (`en-US` sumiu no meio do trabalho). Se for preciso repetir
o recorte, copie os PNG para fora antes de trabalhar neles.

⚠️ `~/GQL/Puzzle/AppStoreConnection/iPhone/` contém imagens do **Fruitsful**,
não do Puzzle — um `cp` para a pasta errada. Não usar achando que é Puzzle.

## Convenções

- Nomes de arquivo em minúsculas, com hífen: `<app>-privacidade.html`, `<app>-termos.html`.
- Ao adicionar um app novo: criar as duas páginas legais, adicionar o card no [index.html](index.html), colocar as imagens em `assets/img/<app>/` como WebP, e listar o app na tabela acima.
- Conteúdo legal em português.

## Decisões tomadas

| Data | Decisão | Motivo |
|---|---|---|
| 2026-09-15 | Manter o site como HTML estático sem build step | Simplicidade; o conteúdo muda pouco e o Cloudflare serve os arquivos direto da raiz |
| 2026-09-15 | Material-fonte dos portfólios fora do git | ~105 MB de peso para gerar assets que já são versionados em WebP |
| 2026-09-15 | Nome do Guilherme como `<h1>` do hero, não a frase de posicionamento | O site é um portfólio pessoal; quem chega tem de sair sabendo o nome |
| 2026-09-15 | Cor de acento tirada da cor dominante do ícone de cada app | Faz o topo de cada seção "lembrar" o ícone, que era o efeito pedido, sem escolher cor no olho |
| 2026-09-15 | Todo app tem os mesmos 3 botões (App Store, Privacidade, Termos) | Antes, app não publicado tinha um botão apagado com texto diferente. Agora a ficha é sempre igual; o botão da loja fica desabilitado (`.btn--off`) enquanto o app não sai |
| 2026-09-15 | Prints do LevelGrip recortados de dentro do mockup de marketing | Não existe print cru salvo (o `capturar.sh` não preservou o intermediário). O site desenha a própria moldura de iPhone em CSS, então a UI recortada basta |
| 2026-09-15 | Cache longo só para imagens; CSS e JS com 1 h | `style.css` e `main.js` têm nome fixo, sem hash de conteúdo — cache longo faria uma correção demorar dias a chegar |

## Segurança

Auditado em 2026-09-15. O site é estático, sem backend, sem formulário e sem
terceiro nenhum carregado — a superfície real é pequena.

- **`.assetsignore`** ([arquivo](.assetsignore)): o `wrangler.jsonc` serve a raiz
  inteira (`"directory": "./"`), então `.git/`, `wrangler.jsonc` e `CLAUDE.md`
  estavam (ou ficariam) públicos. Verificado ao vivo: `/.git/config` respondia
  **200**. Os objetos git não estavam expostos e o repo já é público no GitHub,
  então o impacto era baixo — mas o `CLAUDE.md` viraria público no primeiro
  commit. Qualquer arquivo novo que não seja do site tem de entrar nessa lista.
- **`_headers`** ([arquivo](_headers)): CSP, HSTS, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy` e as regras de cache.
  ⚠️ A CSP usa **hash SHA-256** do script inline de idioma que existe no `<head>`
  de cada página. **Se esse script mudar um único byte, o hash quebra e o
  seletor de idioma para de funcionar em produção.** Recalcular com:
  ```bash
  python3 -c "
  import re,hashlib,base64,sys
  s=open(sys.argv[1],encoding='utf-8').read()
  for m in re.finditer(r'<script(?![^>]*\ssrc=)[^>]*>(.*?)</script>',s,re.S):
      print('sha256-'+base64.b64encode(hashlib.sha256(m.group(1).encode()).digest()).decode())
  " index.html
  ```
- **Abuso de requisições:** não há o que abusar. Sem banco, sem endpoint de
  escrita, sem código por requisição — a Cloudflare serve arquivo do edge e
  assets estáticos não contam como invocação de Worker. Rate limiting e WAF
  seriam teatro aqui. A mitigação de DDoS da Cloudflare já é automática.

## Problemas em aberto

- **Prints do Flash's** — a galeria usa as peças de marketing da App Store
  (`.gallery--panels`), não prints reais, e o Guilherme quer prints. Busca
  exaustiva em todo o `~/GQL` (2026-09-15) não encontrou **nenhuma** captura do
  Flash's, nem da build Flutter nem da nativa em SwiftUI: o único arquivo é o
  ícone do app. Só resta rodar no simulador e capturar.
- **Verificar no painel da Cloudflare** (não dá para fazer por código):
  SSL/TLS em *Full (Strict)*, *Always Use HTTPS* ligado e TLS mínimo 1.2.
- **Validar o deploy**: depois do `npx wrangler deploy`, conferir que
  `/.git/config`, `/wrangler.jsonc` e `/CLAUDE.md` dão **404**, e que os
  cabeçalhos do `_headers` chegam:
  ```bash
  for p in /.git/config /wrangler.jsonc /CLAUDE.md /_headers; do
    echo "$(curl -s -o /dev/null -w '%{http_code}' https://guilhermequinterolorenzi.com$p)  $p"
  done
  curl -sI https://guilhermequinterolorenzi.com/ | grep -i 'content-security\|strict-transport'
  ```
  E abrir o DevTools numa página legal para confirmar que a CSP não bloqueou o
  script de idioma.
- **Versões nos badges** de Fruitsful e LevelGrip estão como `v1.0` por
  suposição — conferir no App Store Connect e corrigir se diferente.

## Histórico de sessões

### 2026-09-15 — Reestruturação do index, cores por app, hero e segurança
- **Pedido:** organizar melhor a estrutura do site; dar a cada app uma cor de
  topo que lembre o ícone; padronizar as seções para todos terem a mesma
  informação e os mesmos links; corrigir os números falsos do hero; destacar o
  nome do Guilherme no topo com uma animação de ícones; trocar os prints ruins;
  e fazer uma análise de segurança do site, que já está no ar.
- **Feito:**
  - **Hero reescrito** — o nome virou o `<h1>` (era a frase de posicionamento),
    com "Lorenzi" em gradiente, linha de ofício abaixo e um **carrossel diagonal
    de ícones** correndo no fundo (`.reel`, três esteiras em velocidades e
    sentidos diferentes, CSS puro, sem JS).
  - **Números corrigidos:** eram "4 apps (2 na App Store)" e "650+ testes";
    passaram a "7 apps (4 na App Store)" e "800+ testes" — a soma dos testes
    declarados nas fichas dá 818.
  - **Ordem dos apps:** publicados primeiro (KegelFlow, Flash's, Fruitsful,
    LevelGrip), depois Puzzle, Evergrid e Zodique.
  - **Cores por app** tiradas por script da cor dominante de cada ícone.
  - **Seção do Zodique criada** do zero, escrita a partir do que as páginas
    legais já afirmam (cálculo no aparelho, aba Conexões, GeoNames, sem conta).
  - **Prints do Fruitsful trocados** pelos crus do simulador, incluindo os de
    pilha cheia que faltavam (`31_bigpiletoday_home`, `78_pile_closeup` com 71
    frutas, `77_after_harvest` com as podres).
  - **Galerias do LevelGrip e do Zodique criadas**, recortando a UI de dentro
    dos mockups de marketing (nenhum dos dois tem print cru salvo). O recorte
    é feito achando as bordas do device pela diferença com o fundo da própria
    linha, e ancorando o topo no bloco de texto do relógio "09:41" — a headline
    da peça tem o mesmo padrão de brancos nas pontas, e só se distingue pela
    altura do bloco (~84 px na headline, ~32 px no relógio).
  - **Rodapé:** Privacidade/Termos apontavam só para o Puzzle; agora levam à
    lista por app no suporte (`suporte.html#apps`, âncora criada).
  - **Segurança:** criados `.assetsignore` e `_headers` (ver seção acima).
- **Estado:** `main`, alterações ainda **não commitadas e não deployadas**.
- **Em aberto:** prints de Flash's e Zodique; ajustes no painel da Cloudflare;
  validação pós-deploy. Ver [Problemas em aberto](#problemas-em-aberto).

### 2026-09-15 — Criação deste arquivo de histórico
- **Pedido:** criar um `CLAUDE.md` que sirva de memória persistente entre conversas — a ser lido no início de cada sessão e atualizado ao final.
- **Feito:** criado este arquivo, com mapeamento inicial da estrutura do projeto (stack, deploy no Cloudflare, lista de apps, convenções) levantado a partir dos arquivos do repositório.
- **Estado:** repositório limpo, branch `main`. Último commit antes desta sessão: `c9e8ead` (página de Termos de Uso do Zodique).
- **Em aberto:** nada.
