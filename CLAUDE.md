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

Cada app tem um par `-privacidade.html` + `-termos.html`:

| App | Privacidade | Termos |
|---|---|---|
| Evergrid | ✅ | ✅ |
| Flashs | ✅ | ✅ |
| Fruitsful | ✅ | ✅ |
| KegelFlow | ✅ | ✅ |
| LevelGrip | ✅ | ✅ |
| Puzzle | ✅ | ✅ |
| Zodique | ✅ | ✅ |

## Convenções

- Nomes de arquivo em minúsculas, com hífen: `<app>-privacidade.html`, `<app>-termos.html`.
- Ao adicionar um app novo: criar as duas páginas legais, adicionar o card no [index.html](index.html), colocar as imagens em `assets/img/<app>/` como WebP, e listar o app na tabela acima.
- Conteúdo legal em português.

## Decisões tomadas

| Data | Decisão | Motivo |
|---|---|---|
| 2026-09-15 | Manter o site como HTML estático sem build step | Simplicidade; o conteúdo muda pouco e o Cloudflare serve os arquivos direto da raiz |
| 2026-09-15 | Material-fonte dos portfólios fora do git | ~105 MB de peso para gerar assets que já são versionados em WebP |

## Problemas em aberto

_Nenhum registrado até o momento._

## Histórico de sessões

### 2026-09-15 — Criação deste arquivo de histórico
- **Pedido:** criar um `CLAUDE.md` que sirva de memória persistente entre conversas — a ser lido no início de cada sessão e atualizado ao final.
- **Feito:** criado este arquivo, com mapeamento inicial da estrutura do projeto (stack, deploy no Cloudflare, lista de apps, convenções) levantado a partir dos arquivos do repositório.
- **Estado:** repositório limpo, branch `main`. Último commit antes desta sessão: `c9e8ead` (página de Termos de Uso do Zodique).
- **Em aberto:** nada.
