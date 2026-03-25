# PRD — WhyNoSales

**Versão:** 1.0  
**Status:** Em desenvolvimento  
**Última atualização:** Março 2026

\---

## 1\. Visão do produto

### O que é

Ferramenta online de diagnóstico de CRO (Conversion Rate Optimization) para e-commerces brasileiros. O usuário cola o link de qualquer loja virtual e recebe, em aproximadamente 60 segundos, um relatório completo com:

* CRO Score de 0 a 100
* Estimativa de receita mensal não capturada em reais
* Lista de problemas identificados, priorizados por impacto
* Plano de ação com passos concretos de correção

### Analogia de posicionamento

PageSpeed Insights do Google — mas focado em conversão, não em performance técnica. Interface igual: cola a URL, recebe o diagnóstico. Sem instalação, sem cadastro, sem integração.

### Por que existe

A taxa de conversão média de e-commerces brasileiros é 1,4%. Isso significa que 98,6% do tráfego — e de todo o dinheiro gasto em anúncios — sai sem comprar. O lojista sabe que tem um problema, mas não sabe o que está errado. As ferramentas existentes são caras, complexas, em inglês, ou exigem instalação.

### Diferencial competitivo

As regras do score vêm do Método b.con — desenvolvido em anos de consultoria para e-commerces brasileiros. Um concorrente técnico pode copiar a infraestrutura. Não pode copiar o julgamento sobre o que importa em uma loja brasileira.

\---

## 2\. Usuários-alvo

### Segmento primário — Lojista autônomo

Dono de loja pequena ou média, fatura R$10k–150k/mês, opera sozinho ou com 1–2 pessoas. Provavelmente na Nuvemshop. Investe em tráfego pago mas não acompanha conversão sistematicamente. Linguagem: "tenho visitas mas ninguém compra", "gastei em anúncio e não vendi".

### Segmento secundário — Gestor de e-commerce

Profissional contratado por uma marca. Mais familiaridade com ferramentas, mas nem sempre tem autonomia para contratar serviços externos.

### Segmento terciário — Agência de performance

Cuida de múltiplas lojas. Usa ferramentas como parte do processo de venda e entrega para clientes. Maior LTV potencial. Interessa o plano white-label futuro.

### O que a pesquisa validou

* A dor é narrada em vendas, não em porcentagem: "minha loja não vende", nunca "minha taxa de conversão está em 0,8%"
* O gatilho para agir é dinheiro gasto sem retorno, não curiosidade por métricas
* Existe uma longa fase de tentativa própria antes de buscar ajuda externa
* Ferramentas como Hotjar têm fricção alta (lentidão no site) — "sem instalar nada" é diferencial real
* "Diagnóstico" ressoa mais que "auditoria de CRO"

\---

## 3\. Funil de produtos

```
\[Ferramenta Gratuita]      ← entrada, volume, viralidade
        ↓
\[Relatório Completo R$47]  ← primeira transação, quebra barreira
        ↓
\[Ebook CRO R$97]           ← educação, prepara para serviço
        ↓
\[Auditoria + Call R$1.497] ← serviço de diagnóstico humano
        ↓
\[Consultoria R$5.000/mês]  ← maior ticket, recorrente
```

A ferramenta não é o negócio. É o melhor vendedor que o negócio já teve.

\---

## 4\. Fluxos de usuário

### Fluxo 1 — Landing page

**Rota:** `/`  
**Objetivo:** convencer o usuário a colar o link da loja. Uma ação, zero distrações.

**Elementos obrigatórios:**

* Nav: wordmark `WhyNoSales` (DM Mono)
* Background: `FallingPattern` com `color="#0A0A0A"` e `backgroundColor="#FFFFFF"`, com máscara radial que desfoca nas bordas
* Eyebrow: `DIAGNÓSTICO DE CONVERSÃO` em DM Mono 10px uppercase
* Headline: "Sua loja tem tráfego" (linha 1, `#0A0A0A`) + "mas poucas vendas?" (linha 2, `#6B6B6B`)
* Subheadline: "Em 60 segundos você descobre o que está impedindo seus visitantes de comprar. Sem instalar nada."
* Input row: container unificado com borda `1px solid #E5E5E5`, border-radius pill. Input (DM Mono, placeholder "minhaloja.com.br") + botão preto redondo com ícone de arrow-right. Ao focar: borda muda para `#0A0A0A` + focus ring `0 0 0 3px rgba(10,10,10,0.06)`
* Microcopy: "Grátis · Sem cadastro · Funciona com Nuvemshop, Shopify e qualquer outra plataforma"
* Footer: `b.con © 2026` + links: Como funciona · Privacidade

**Interações:**

* Enter no input submete
* Botão "Analisar minha loja": hover opacity 0.82, active opacity 0.7
* Se URL em branco, usa URL mockada `minhaloja.com.br`

\---

### Fluxo 2 — Tela de análise

**Rota:** `/analyzing?url=...`  
**Duração:** \~60 segundos (mockado: 7 steps × 480ms + 600ms de margem)  
**Objetivo:** criar antecipação positiva enquanto a análise roda

**Elementos obrigatórios:**

* URL sendo analisada: `↳ minhaloja.com.br` em DM Mono 12px `#6B6B6B`
* Lista de steps sequenciais. Para cada step:

  * Completado: `✓` verde (`#16A34A`) + texto verde estático
  * Atual: `→` preto + `<ShiningText>` com o nome do step
  * Pendente: espaço + texto `#ABABAB` com opacity 0.35
* Steps (em ordem): Avaliando carregamento das páginas:

  * Analisando o Design
  * Checando sinais de confiança
  * Procurando pontos de fricção
  * Calculando o impacto dos problemas
* Microcopy abaixo dos steps: "A maioria das lojas perde vendas todos os dias por problemas simples." (13px `#ABABAB`)

**Animação dos steps:** setTimeout encadeado, 480ms entre cada step. Após todos completos + 600ms, navega para `/results`.

\---

### Fluxo 3 — Diagnóstico gratuito

**Rota:** `/results?url=...`  
**Objetivo:** entregar valor real e converter para relatório pago (R$47)

**Elementos obrigatórios:**

**Header:**

* Label "DIAGNÓSTICO" uppercase mono
* URL em DM Mono 16px
* Subtext: "Gerado agora · 11 problemas encontrados"

**Score block (momento wow):**

* Label "CRO SCORE" uppercase mono
* Número `43` em DM Mono 88px weight 500, com animação de counter (0→43 em 900ms, easing cubic out)
* `/100` em DM Mono 24px `#ABABAB` alinhado ao baseline
* "Sua loja está **abaixo da média** do seu segmento (média: 61/100)."
* Link secundário: "Compartilhar esse diagnóstico ↗"

**Card de receita perdida:**

* Label "RECEITA NÃO CAPTURADA / MÊS"
* Valor: "R$ 4.200 – R$ 7.800" em 28px weight 600
* Subtexto explicativo

**Top 5 problemas (versão gratuita):**

* Badge de impacto (ALTO/MÉDIO/BAIXO com cores)
* Título do problema
* Frase de impacto com dado
* Ícone de cadeado + "Ver correção" em `#ABABAB` (bloqueado)

**CTA block:**

* Texto: "Esses são os 3 problemas mais urgentes. O relatório completo mostra todos os 11 com o passo a passo de correção para cada um."
* Botão primário full-width: "Ver o relatório completo por R$ 47"
* Microcopy: "Pagamento único · Sem assinatura · PDF incluído"

\---

### Fluxo 4 — Relatório completo (pós-pagamento)

**Rota:** `/report`  
**Objetivo:** entregar o relatório completo e converter para auditoria humana (R$1.497)

**Elementos obrigatórios:**

**Header:**

* Label "RELATÓRIO COMPLETO"
* URL em DM Mono 18px
* Data de geração + CRO Score
* Botão outline "Exportar PDF ↓"

**Card de impacto financeiro (2 colunas):**

* Esquerda: "Receita não capturada / mês" + valor
* Direita: "Potencial de recuperação" + valor em verde `#16A34A`

**Tabs:**

* "Problemas (11)" — lista de todos os problemas
* "Plano de ação" — roadmap temporal

**Lista de problemas (tab Problemas):**

* Agrupados por impacto: ALTO → MÉDIO → BAIXO
* Cada grupo tem cabeçalho com badge + contagem + descrição
* Cada problema: accordion expansível

  * Fechado: badge impacto + badge página + título + tempo + dificuldade + seta
  * Aberto: "O que está acontecendo" + "Por que importa" (grid 2 colunas) + "Como corrigir" (bloco mono estilo code com steps numerados)

**Plano de ação (tab Plano):**

* Esta semana (fundo vermelho claro)
* Próximas 2 semanas (fundo laranja claro)
* Próximo mês (fundo cinza claro)
* Cada fase: título + subtítulo + lista numerada de problemas

**CTA de consultoria:**

* Card com borda
* "Quer ajuda para implementar esse plano?"
* Descrição da auditoria
* Botão primário: "Agendar auditoria com a b.con — R$ 1.497 →"

\---

### Fluxo 5 — Confirmação de consulta

**Rota:** `/consult`  
**Objetivo:** confirmar o agendamento e definir expectativas

**Elementos:**

* `✓` em DM Mono 32px
* "Solicitação recebida."
* "O Guilherme vai entrar em contato em até 24h para agendar a call de auditoria."
* Card: "O que acontece a seguir" com 4 steps numerados

\---

## 5\. Regras de copy

### Tom de voz

Direto, humano, sem rodeios. Consultor experiente que fala com respeito. Sem exclamações, sem superlativos.

### Vocabulário validado (usar)

* "minha loja não vende" / "minha loja não converte"
* "tenho visitas mas ninguém compra"
* "gastei em anúncio e não vendi"
* "diagnóstico" (não "auditoria")
* "passo a passo" (não "tutorial")
* "Sem instalar nada"
* "Sem código necessário"

### Vocabulário a evitar

* "otimização de taxa de conversão" → usar "vender mais com o mesmo tráfego"
* "UX" sem contexto → usar "experiência do seu cliente"
* "bounce rate" → usar "pessoas que saem sem comprar"
* "CRO" sem explicação nas primeiras menções

\---

## 6\. Scoring engine (para implementação futura)

### Fórmula base

```
Score = 100 - SOMA(score\_weight dos problemas encontrados)
Score mínimo = 0
```

Se existir `niche\_override` para o nicho detectado, usar `score\_weight\_override`.

### Pesos por categoria (totalizando 100)

|Categoria|Peso máximo|
|-|-|
|Mobile|25|
|Confiança|20|
|Performance|20|
|Produto e conteúdo|15|
|Conversão|15|
|Navegação e UX|5|

### Fonte das regras

Arquivo `docs/rules.xlsx` — 5 abas:

* `rules` — 30 checks iniciais com `rule\_id`, `page\_type`, `category`, `title\_pt`, `description\_pt`, `how\_to\_detect`, `impact\_level`, `score\_weight`, `fix\_instructions\_pt`, `fix\_difficulty`, `fix\_time\_minutes`, `stat\_for\_copy`, `active`
* `benchmarks` — médias de conversão por nicho
* `score\_config` — pesos por categoria
* `niche\_overrides` — ajustes de peso por nicho
* `platform\_notes` — instruções específicas por plataforma (Nuvemshop, Shopify)

### Detecção técnica (fase MVP)

A análise usa:

1. **Playwright** — renderiza a loja como um browser real, captura DOM e screenshots
2. **Lighthouse Node API** — Core Web Vitals, LCP, CLS, INP, performance score
3. **Extração de DOM** — verifica presença/ausência de elementos (reviews, botão CTA, imagens, etc.)
4. **Claude API (Sonnet)** — gera as recomendações em português baseadas nos problemas detectados

Timeout: 30 segundos por análise. Fila com BullMQ para processamento assíncrono.

\---

## 7\. Estimativa de receita perdida

### Cálculo

```
trafego\_estimado = baseado em dados públicos do SimilarWeb ou estimativa conservadora
conversao\_atual  = score / 100 \* conversao\_media\_segmento (da aba benchmarks)
conversao\_ideal  = top20\_conversion\_rate do segmento
gap              = conversao\_ideal - conversao\_atual
ticket\_medio     = avg\_ticket\_brl do segmento
receita\_perdida  = trafego\_mensal \* gap \* ticket\_medio
```

Exibir como range (±30%) para não parecer preciso demais.

\---

## 8\. Monetização

### Relatório pago — R$47 (one-shot)

Acesso ao relatório completo: todos os problemas + plano de ação + PDF.

**Billing:** Pagar.me (Pix + cartão + boleto). Aprovação em tempo real. Relatório liberado imediatamente após confirmação.

**Garantia:** "Se o relatório não mostrar nenhum problema que você não sabia que existia, devolvemos os R$47."

### Auditoria + Call — R$1.497

Análise humana feita por Guilherme, entregue em call de 90 minutos. Inclui análise da loja, benchmarks do segmento, plano de ação para 90 dias.

### Consultoria — R$5.000/mês

Acompanhamento mensal. Contrato mínimo 3 meses.

### Funil internacional (a partir do mês 5)

Mesmos produtos em inglês com preços em dólar: relatório $19, auditoria $497, consultoria $2.000–5.000/mês.

\---

## 9\. Infraestrutura

### Custo mensal estimado (MVP)

|Serviço|Custo|
|-|-|
|Vercel Hobby|R$0|
|Railway (backend + workers)|R$50|
|Supabase Free|R$0|
|Upstash Redis|R$25|
|Claude API (\~200 análises)|R$20|
|Domínio|R$5|
|**Total**|**\~R$100/mês**|

### Custo por análise

\~R$0,10 (Claude API + infra). Margem bruta por relatório pago (R$47): \~99%.

\---

## 10\. Roadmap

### MVP (semanas 1–10)

* \[ ] Setup do projeto (Next.js + Tailwind + shadcn)
* \[ ] Landing page com FallingPattern
* \[ ] Tela de análise com ShiningText
* \[ ] Tela de diagnóstico gratuito (dados mockados)
* \[ ] Tela de relatório completo (dados mockados)
* \[ ] Tela de confirmação de consulta
* \[ ] Engine de análise básica (Playwright + Lighthouse + 30 regras)
* \[ ] Geração de recomendações com Claude API
* \[ ] Billing com Pagar.me (one-shot R$47)
* \[ ] Auth por email (magic link Supabase)
* \[ ] Export PDF (react-pdf)

### V1.1 (mês 3–4)

* \[ ] Histórico de análises por conta
* \[ ] Alerta por email quando score cai
* \[ ] Benchmarks por nicho nas análises
* \[ ] Suporte a Shopify (detecção de plataforma + instruções específicas)

### V1.2 (mês 5–6)

* \[ ] Funil em inglês (tradução + ajuste de regras para padrão internacional)
* \[ ] Lançamento no Product Hunt
* \[ ] Plano de agências (white-label, multi-URL)

### V2 (mês 6+)

* \[ ] Integração OAuth opcional com Nuvemshop (dados internos da loja)
* \[ ] Taxa de conversão real, abandono de carrinho por segmento
* \[ ] A/B testing simplificado

\---

## 11\. Métricas de sucesso

|Métrica|Meta mês 3|Meta mês 6|Meta mês 12|
|-|-|-|-|
|Análises/mês|500|2.000|5.000|
|Conversão gratuito→pago|—|4%|5%|
|Relatórios pagos/mês|20|80|200|
|MRR de serviços|R$0|R$7.994|R$40.765|
|Clientes de consultoria ativos|0|1|4|

\---

## 12\. Decisões de produto já tomadas

* **Sem LATAM:** foco no Brasil. Português apenas no lançamento.
* **SaaS em segundo plano:** o risco de IA canibalizar features de diagnóstico básico é real. Prioridade são os serviços (auditoria e consultoria), não o SaaS recorrente.
* **Internacional no mês 5:** funil em inglês para captação de clientes de consultoria em dólar, não para volume de SaaS.
* **Sem app de loja (por agora):** a ferramenta URL-based é mais viral, mais rápida de lançar e atinge qualquer plataforma.

