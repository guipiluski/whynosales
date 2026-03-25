# WhyNoSales — CLAUDE.md

Este arquivo é lido automaticamente em toda sessão do Claude Code. Contém as convenções, stack, design system e regras do projeto que nunca devem ser violadas.

\---

## O que é o produto

Ferramenta online de diagnóstico de CRO (otimização de conversão) para e-commerces brasileiros. O usuário cola o link da loja e recebe em \~60 segundos um relatório com score de 0–100, problemas identificados priorizados por impacto e estimativa de receita perdida. Referência visual: Resend, Perplexity, Linear.

\---

## Stack obrigatória

* **Framework:** Next.js 14 com App Router
* **Linguagem:** TypeScript (strict mode)
* **Estilo:** Tailwind CSS v4 + shadcn/ui
* **Componentes UI:** shadcn/ui em `/components/ui`
* **Animações:** framer-motion (FallingPattern) + motion/react (ShiningText e outros)
* **Fontes:** DM Sans (corpo) + DM Mono (mono/labels/scores) via next/font/google
* **Backend:** Node.js + Express (pasta `/server`)
* **ORM:** Prisma + PostgreSQL (Supabase)
* **Filas:** BullMQ + Redis (Upstash)
* **Pagamentos:** Stripe
* **Email:** Resend + React Email
* **Analytics:** Posthog
* **Erros:** Sentry
* **Deploy:** Vercel (frontend) + Railway (backend + workers)

\---

## Estrutura de pastas

```
/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Landing page
│   ├── analyzing/page.tsx      # Tela de loading
│   ├── results/page.tsx        # Diagnóstico gratuito
│   ├── report/page.tsx         # Relatório completo (pós-pagamento)
│   ├── consult/page.tsx        # Confirmação de agendamento
│   └── layout.tsx
├── components/
│   ├── ui/                     # shadcn/ui components + componentes customizados
│   │   ├── falling-pattern.tsx # Background animado da landing page
│   │   ├── shining-text.tsx    # Texto animado da tela de análise
│   │   └── ...shadcn components
│   ├── landing/                # Componentes exclusivos da landing
│   ├── results/                # Componentes do diagnóstico gratuito
│   └── report/                 # Componentes do relatório completo
├── lib/
│   ├── tokens.ts               # Design tokens (cores, tipografia)
│   ├── mock-data.ts            # Dados mockados — ÚNICA fonte de mocks
│   ├── utils.ts                # cn() e outros utilitários
│   └── scoring.ts              # Lógica de cálculo do score
├── server/                     # Backend Node.js
│   ├── api/
│   ├── workers/
│   └── scoring/
├── docs/
│   ├── PRD.md                  # Product Requirements Document
│   └── rules.xlsx              # Base de regras de scoring
└── CLAUDE.md                   # Este arquivo
```

\---

## Design system — tokens obrigatórios

Todos os tokens ficam em `lib/tokens.ts` e são usados via Tailwind CSS variables. **Nunca hardcodar cores diretamente em componentes.**

```ts
// lib/tokens.ts
export const tokens = {
  colors: {
    bg:      "#FFFFFF",
    ink:     "#0A0A0A",
    muted:   "#6B6B6B",
    faint:   "#ABABAB",
    border:  "#E5E5E5",
    surface: "#F9F9F9",
    // Impact levels
    alto:   { bg: "#FFF0F0", fg: "#DC2626" },
    medio:  { bg: "#FFF8F0", fg: "#C2610C" },
    baixo:  { bg: "#FEFCE8", fg: "#854D0E" },
    green:  { bg: "#F0FDF4", fg: "#16A34A" },
    // Page type badges
    home:     { bg: "#EFF6FF", fg: "#1D4ED8" },
    plp:      { bg: "#F5F3FF", fg: "#6D28D9" },
    pdp:      { bg: "#F0FDF4", fg: "#16A34A" },
    cart:     { bg: "#FFF8F0", fg: "#C2610C" },
    checkout: { bg: "#FFF0F0", fg: "#DC2626" },
    global:   { bg: "#F4F4F4", fg: "#0A0A0A" },
  },
  fonts: {
    sans: "'DM Sans', 'Helvetica Neue', sans-serif",
    mono: "'DM Mono', 'JetBrains Mono', monospace",
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "10px",
  },
}
```

\---

## Regras de design — nunca violar

1. **Sem gradientes.** Profundidade vem de bordas `1px solid #E5E5E5`, nunca de gradientes ou sombras decorativas.
2. **Sem shadows decorativas.** Apenas focus rings funcionais.
3. **Sem bordas acima de 10px de radius** (exceto input row da landing que usa 10px).
4. **Sem cores de background em seções** — fundo sempre `#FFFFFF` ou `#F9F9F9` em cards.
5. **DM Sans para corpo, DM Mono para:** scores, labels uppercase, URLs, badges, código, o wordmark "b.con".
6. **Labels uppercase em mono:** `font-mono text-\[10px] tracking-\[0.12em] uppercase text-\[#ABABAB]`.
7. **Score (número grande):** DM Mono, 88px, weight 500 — é o único momento de tipografia "wow" do produto.
8. **O `FallingPattern` é o background exclusivo da landing page** (hero section). Não usar em outras telas.
9. **O `ShiningText` é o componente de texto animado** exclusivo da tela de análise (analyzing).
10. **Cores de fundo da landing page:** `color` do FallingPattern = `#0A0A0A`, `backgroundColor` = `#FFFFFF`.

\---

## Componentes especiais já criados

### FallingPattern (`/components/ui/falling-pattern.tsx`)

Background animado da landing page. Usar assim:

```tsx
// app/page.tsx — hero section
<div className="relative min-h-\[90vh]">
  <FallingPattern
    color="#0A0A0A"
    backgroundColor="#FFFFFF"
    className="absolute inset-0 h-full \[mask-image:radial-gradient(ellipse\_at\_center,transparent\_20%,#FFFFFF\_80%)]"
  />
  <div className="relative z-10 flex flex-col items-center justify-center min-h-\[90vh]">
    {/\* conteúdo da hero \*/}
  </div>
</div>
```

Dependência: `framer-motion`

### ShiningText (`/components/ui/shining-text.tsx`)

Texto com efeito shimmer para a tela de análise. Usar nos steps de loading:

```tsx
// app/analyzing/page.tsx — step atual
<ShiningText text="Analisando páginas de produto..." />
```

Steps completados usam texto estático verde (`text-\[#16A34A]`) com prefixo `✓`.
Steps pendentes usam `text-\[#ABABAB]` com opacidade reduzida.
**Somente o step atual usa ShiningText.**

Dependência: `motion` (não framer-motion — são pacotes diferentes)

\---

## Dados mockados

**Regra:** todos os dados mockados ficam EXCLUSIVAMENTE em `lib/mock-data.ts`. Nenhum componente deve ter dados hardcoded.

Quando a engine real de análise for implementada, basta trocar a importação de `lib/mock-data.ts` por uma chamada de API — sem tocar em nenhum componente.

```ts
// Estrutura obrigatória de lib/mock-data.ts
export const MOCK\_RESULT = {
  url: "minhaloja.com.br",
  score: 43,
  segmentAvg: 61,
  revenue: { min: "R$ 4.200", max: "R$ 7.800" },
  recoverable: { min: "R$ 1.800", max: "R$ 3.200" },
  totalIssues: 11,
  freeIssues: \[...],   // top 3 para diagnóstico gratuito
  fullIssues: \[...],   // todos os 11 para relatório pago
  actionPlan: { week1: \[...], week2\_3: \[...], month1: \[...] },
}
```

\---

## Fluxo de navegação

```
/ (landing)
  → /analyzing?url=minhaloja.com.br  (60s de loading)
    → /results?url=minhaloja.com.br  (diagnóstico gratuito)
      → /report (relatório completo — pós pagamento)
        → /consult (confirmação de agendamento)
```

URL da loja passa como query param. Estado de resultado fica em cache do servidor (Redis) pelo `url` como chave.

\---

## Convenções de código

* Componentes: PascalCase, arquivos kebab-case (`issue-card.tsx`)
* Funções utilitárias: camelCase
* Tipos e interfaces: PascalCase com sufixo descritivo (`IssueCardProps`)
* CSS classes: sempre Tailwind — sem `style={}` em componentes novos (o protótipo inicial usou inline styles por velocidade, mas componentes de produção usam Tailwind)
* Sem `any` — TypeScript strict
* Server Components por padrão; `"use client"` só quando necessário (animações, interatividade)

\---

## O que não fazer

* Não instalar bibliotecas de UI além do shadcn/ui (sem MUI, Chakra, Ant Design)
* Não usar `style={{}}` inline em componentes novos — usar Tailwind
* Não criar dados mockados fora de `lib/mock-data.ts`
* Não usar cores hardcoded fora de `lib/tokens.ts`
* Não adicionar gradientes, glassmorphism ou sombras decorativas
* Não criar rotas fora da estrutura definida em "Fluxo de navegação"
* Não usar `framer-motion` onde `motion` (motion/react) já está instalado para o mesmo efeito — manter consistência

\---

## Referências

* PRD completo: `docs/PRD.md`
* Base de regras de scoring: `docs/rules.xlsx`
* Protótipo React original: `docs/prototype-reference.jsx`

