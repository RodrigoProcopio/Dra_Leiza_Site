# Site Institucional — Dra. Leiza Hollas

Site institucional da Dra. Leiza Loiane Hollas, cirurgiã cardiovascular. Desenvolvido em React + TypeScript + Vite, com suporte multilíngue (PT/EN/ES), SEO otimizado e deploy automático via Netlify.

🌐 **Produção:** [draleizahollas.com.br](https://draleizahollas.com.br)

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Framework UI |
| TypeScript | 5 | Tipagem estática |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Estilização |
| Framer Motion | — | Animações |
| i18next | — | Internacionalização |
| EmailJS | — | Envio de formulário |
| Netlify | — | Hospedagem + CI/CD |

---

## Estrutura do projeto

```
src/
├── app/
│   ├── App.tsx              # Composição principal
│   └── seo/
│       └── Seo.tsx          # Meta tags, OG, hreflang
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navegação + skip link + LanguageSwitcher
│   │   ├── Footer.tsx       # Links, redes sociais, LGPD
│   │   ├── ScrollToTop.tsx  # Botão voltar ao topo
│   │   └── Container.tsx    # Wrapper de largura máxima
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── StatsSection.tsx
│       ├── TimelineSection.tsx
│       ├── PacientArea.tsx
│       ├── PublicationsSection.tsx
│       └── ContactSection.tsx
├── i18n/
│   ├── index.ts             # Configuração i18next
│   └── locales/
│       ├── pt/common.json
│       ├── en/common.json
│       └── es/common.json
├── types/
│   └── index.ts             # Interfaces Article, ContactTranslation, easePremium
└── styles/
    └── globals.css          # Tailwind + animações globais
public/
├── images/                  # Imagens estáticas
├── favicon.ico
├── favicon-192.png
├── favicon-512.png
├── apple-touch-icon.png
├── og.jpg                   # Imagem Open Graph (1200×630)
├── robots.txt
└── sitemap.xml
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

> ⚠️ Nunca commite o arquivo `.env`. Ele já está no `.gitignore`.

As mesmas variáveis devem ser configuradas no painel do Netlify em:
**Site configuration → Environment variables**

---

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/RodrigoProcopio/Dra_Leiza_Site.git
cd Dra_Leiza_Site

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env com as variáveis acima

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

---

## Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção (TypeScript + Vite)
npm run lint     # Verificação de qualidade (ESLint)
npm run preview  # Preview do build de produção
```

---

## Deploy

O deploy é automático via Netlify a cada push na branch `main`.

**Fluxo:**
1. Push para `main` no GitHub
2. Netlify detecta o push e inicia o build
3. Executa `npm run build`
4. Publica o conteúdo de `/dist`

Para verificar o status do deploy acesse o painel do Netlify.

---

## Internacionalização (i18n)

O site suporta 3 idiomas: **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**.

Os arquivos de tradução ficam em `src/i18n/locales/[idioma]/common.json`.

Para adicionar ou editar textos, edite os 3 arquivos mantendo a mesma estrutura de chaves.

O idioma é persistido no `localStorage` do usuário e inicializado com `pt` como fallback.

---

## SEO

- Meta tags estáticas no `index.html` (lidas por crawlers sem JS)
- Meta tags dinâmicas via `react-helmet` no `Seo.tsx` (atualizadas por idioma)
- `hreflang` para PT-BR, EN e ES
- `robots.txt` permitindo todos os crawlers
- `sitemap.xml` com as URLs do site
- `og.jpg` (1200×630) para preview em redes sociais

---

## Manutenção de conteúdo

| Conteúdo | Onde editar |
|---|---|
| Textos do site | `src/i18n/locales/[idioma]/common.json` |
| Artigos e publicações | Chave `publicacoes.artigos` nos JSONs |
| Trajetória / timeline | Chave `timeline` nos JSONs + array `MILESTONES` em `TimelineSection.tsx` |
| Estatísticas | Array `STATS` em `StatsSection.tsx` |
| Dados de contato | Chave `contato` nos JSONs |
| Imagens | `public/images/` |

---

## Contato técnico

Desenvolvido e mantido por **Rodrigo Procópio**.