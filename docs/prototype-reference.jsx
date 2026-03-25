import { useState, useEffect, useRef } from "react";

// ─── TOKENS ────────────────────────────────────────────────────────────────
const T = {
  bg:       "#FFFFFF",
  ink:      "#0A0A0A",
  muted:    "#6B6B6B",
  faint:    "#ABABAB",
  border:   "#E5E5E5",
  surface:  "#F9F9F9",
  altoBg:   "#FFF0F0", altoFg:   "#DC2626",
  medioBg:  "#FFF8F0", medioFg:  "#C2610C",
  baixoBg:  "#FEFCE8", baixoFg:  "#854D0E",
  greenBg:  "#F0FDF4", greenFg:  "#16A34A",
};

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const MOCK = {
  url:          "minhaloja.com.br",
  score:        43,
  segmentAvg:   61,
  revMin:       "R$ 4.200",
  revMax:       "R$ 7.800",
  totalIssues:  11,

  freeIssues: [
    {
      id: "pdp_mobile_cta",
      impact: "ALTO",
      title: "Botão de comprar invisível no celular",
      sub:   "62% do seu tráfego provavelmente vem de dispositivos móveis.",
    },
    {
      id: "pdp_no_reviews",
      impact: "ALTO",
      title: "Sem avaliações de clientes nas páginas de produto",
      sub:   "Produtos sem reviews têm 34% menos conversão (Spiegel Research).",
    },
    {
      id: "checkout_shipping",
      impact: "ALTO",
      title: "Valor do frete revelado só no carrinho",
      sub:   "48% dos abandonos têm frete inesperado como causa principal.",
    },
  ],

  fullIssues: [
    {
      id:       "pdp_mobile_cta",
      impact:   "ALTO",
      page:     "PDP",
      title:    "Botão de comprar invisível no celular",
      what:     "Seu botão principal de compra não aparece na tela inicial do celular — o visitante precisa rolar para baixo para encontrá-lo.",
      why:      "62% do tráfego de e-commerces no Brasil vem de celular. Visitantes que não veem o botão imediatamente têm 3× mais chance de sair.",
      steps:    ["Abra o editor de tema da sua loja.", "Edite a seção de produto.", "Mova o botão para acima das imagens no layout mobile.", "Teste em viewports de 390px, 412px e 768px.", "Publique."],
      time:     "30 min",
      code:     false,
    },
    {
      id:       "pdp_no_reviews",
      impact:   "ALTO",
      page:     "PDP",
      title:    "Sem avaliações de clientes nas páginas de produto",
      what:     "Nenhuma das suas páginas de produto exibe avaliações, notas ou depoimentos de clientes anteriores.",
      why:      "Produtos com pelo menos 5 avaliações convertem 34% mais do que os sem avaliação.",
      steps:    ["Instale um app de avaliações compatível (Loox, Judge.me ou Trustoo).", "Configure envio automático de email solicitando avaliação após entrega.", "Importe avaliações anteriores se tiver (ex: do Mercado Livre).", "Exiba a nota média e número de avaliações no topo da PDP."],
      time:     "60 min",
      code:     false,
    },
    {
      id:       "checkout_shipping",
      impact:   "ALTO",
      page:     "CARRINHO",
      title:    "Valor do frete revelado só no carrinho",
      what:     "O visitante só descobre o valor do frete ao adicionar o produto ao carrinho, gerando abandono por surpresa.",
      why:      "48% dos carrinhos abandonados têm custo de entrega inesperado como causa principal (Baymard, 2024).",
      steps:    ["Adicione um simulador de frete por CEP na página do produto.", "Se tiver frete grátis, comunique em banner no topo e nas PDPs.", "No carrinho, mostre o frete antes do CTA de checkout."],
      time:     "30 min",
      code:     false,
    },
    {
      id:       "checkout_mandatory_reg",
      impact:   "ALTO",
      page:     "CHECKOUT",
      title:    "Cadastro obrigatório antes de finalizar a compra",
      what:     "O cliente precisa criar uma conta antes de comprar, gerando atrito e abandono no checkout.",
      why:      "Remover o cadastro obrigatório pode aumentar conversão em até 45% (Baymard Institute).",
      steps:    ["Acesse as configurações de checkout da sua plataforma.", "Na Nuvemshop: Configurações → Checkout → desmarque 'Exigir cadastro'.", "No Shopify: Settings → Checkout → Accounts are optional.", "Teste o fluxo completo em modo anônimo."],
      time:     "15 min",
      code:     false,
    },
    {
      id:       "global_lcp",
      impact:   "MÉDIO",
      page:     "GLOBAL",
      title:    "Página principal carregando acima de 2,5 segundos",
      what:     "O Largest Contentful Paint da sua home está em 3,8s — acima do limite recomendado de 2,5s.",
      why:      "Cada segundo a mais no carregamento reduz a conversão em até 7% (Google/Deloitte).",
      steps:    ["Comprima as imagens do banner principal para formato WebP.", "Adicione loading=eager e fetchpriority=high na imagem hero.", "Remova ou adie scripts de terceiros que bloqueiam o render.", "Teste novamente com o PageSpeed Insights."],
      time:     "2h",
      code:     true,
    },
    {
      id:       "pdp_single_image",
      impact:   "MÉDIO",
      page:     "PDP",
      title:    "Apenas uma imagem de produto nas PDPs",
      what:     "Suas páginas de produto têm somente uma foto, sem ângulos adicionais, detalhes ou foto em uso.",
      why:      "Produtos com 3+ imagens convertem 27% mais do que os com imagem única (BigCommerce).",
      steps:    ["Fotografe o produto em pelo menos 3 ângulos.", "Adicione pelo menos 1 foto em contexto (produto sendo usado).", "Resolução mínima: 1000×1000px."],
      time:     "3h",
      code:     false,
    },
    {
      id:       "home_no_social_proof",
      impact:   "MÉDIO",
      page:     "HOME",
      title:    "Sem prova social visível na home",
      what:     "A home não exibe avaliações, número de clientes ou outros sinais de confiança acima da dobra.",
      why:      "Exibir prova social aumenta a confiança inicial do visitante em até 34%.",
      steps:    ["Adicione uma barra de prova social abaixo do hero.", "Exemplo: '4.8★ · +2.300 clientes · Frete grátis acima de R$199'.", "Ou adicione uma seção de depoimentos com foto e texto curto."],
      time:     "45 min",
      code:     false,
    },
    {
      id:       "pdp_no_urgency",
      impact:   "MÉDIO",
      page:     "PDP",
      title:    "Sem elemento de urgência ou escassez",
      what:     "As páginas de produto não comunicam estoque limitado, prazo de entrega ou outros gatilhos de urgência.",
      why:      "Elementos de urgência autênticos aumentam a conversão em PDP em até 22% (OptinMonster).",
      steps:    ["Adicione badge 'Últimas unidades' quando estoque < 5.", "Mostre estimativa de entrega (ex: 'Compre hoje e receba em até 5 dias úteis').", "Não use urgência falsa — só ative quando for real."],
      time:     "30 min",
      code:     false,
    },
    {
      id:       "plp_no_filters",
      impact:   "MÉDIO",
      page:     "PLP",
      title:    "Sem filtros de navegação na listagem de produtos",
      what:     "As páginas de coleção não oferecem filtros por tamanho, cor, faixa de preço ou outras variáveis.",
      why:      "Filtros de navegação reduzem o tempo até encontrar o produto em 40% (Baymard).",
      steps:    ["Ative os filtros nativos da sua plataforma.", "Configure filtros relevantes para o seu nicho (tamanho, cor, preço).", "Teste a experiência no mobile — filtros devem ser acessíveis em tela pequena."],
      time:     "40 min",
      code:     false,
    },
    {
      id:       "checkout_no_seals",
      impact:   "BAIXO",
      page:     "CHECKOUT",
      title:    "Sem selos de segurança visíveis no checkout",
      what:     "O checkout não exibe selos de segurança que aumentam a confiança na hora do pagamento.",
      why:      "Selos de segurança no checkout aumentam a taxa de conclusão em 10 a 15% (Econsultancy).",
      steps:    ["Adicione os logos dos meios de pagamento aceitos.", "Exiba o selo 'Compra segura' ou certificação SSL.", "Adicione ícone de cadeado próximo ao campo de cartão."],
      time:     "20 min",
      code:     false,
    },
    {
      id:       "global_whatsapp",
      impact:   "BAIXO",
      page:     "GLOBAL",
      title:    "Sem botão de WhatsApp ou contato visível",
      what:     "Nenhum canal de contato fácil está visível na loja, reduzindo a confiança do visitante.",
      why:      "73% dos lojistas brasileiros usam WhatsApp como canal complementar de vendas.",
      steps:    ["Instale um app de botão flutuante de WhatsApp.", "Configure com o número de atendimento e uma mensagem pré-preenchida.", "Posicione no canto inferior direito."],
      time:     "20 min",
      code:     false,
    },
  ],

  actionPlan: {
    week1:   ["Botão de comprar invisível no celular", "Cadastro obrigatório no checkout", "Sem avaliações nas páginas de produto"],
    week2_3: ["Valor do frete revelado só no carrinho", "Sem prova social na home", "Elemento de urgência nas PDPs"],
    month1:  ["Velocidade de carregamento (LCP)", "Apenas uma imagem de produto", "Filtros na listagem de produtos", "Selos de segurança no checkout", "Botão de WhatsApp"],
  },
};

const ANALYZING_STEPS = [
  "Carregamento mobile",
  "Core Web Vitals",
  "Páginas de produto",
  "Sinais de confiança",
  "Fluxo de checkout",
  "Imagens e performance",
  "Navegação e UX",
];

// ─── UTILS ──────────────────────────────────────────────────────────────────
const impactStyle = (level) => ({
  ALTO:  { bg: T.altoBg,  fg: T.altoFg  },
  MÉDIO: { bg: T.medioBg, fg: T.medioFg },
  BAIXO: { bg: T.baixoBg, fg: T.baixoFg },
}[level] || { bg: T.surface, fg: T.muted });

const pageStyle = (page) => ({
  HOME:     { bg: "#EFF6FF", fg: "#1D4ED8" },
  PLP:      { bg: "#F5F3FF", fg: "#6D28D9" },
  PDP:      { bg: "#F0FDF4", fg: "#16A34A" },
  CARRINHO: { bg: "#FFF8F0", fg: "#C2610C" },
  CHECKOUT: { bg: "#FFF0F0", fg: "#DC2626" },
  GLOBAL:   { bg: "#F4F4F4", fg: "#0A0A0A" },
}[page] || { bg: T.surface, fg: T.muted });

// ─── SHARED STYLES ───────────────────────────────────────────────────────────
const S = {
  page: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    background: T.bg,
    color: T.ink,
    minHeight: "100vh",
    WebkitFontSmoothing: "antialiased",
  },
  mono: { fontFamily: "'DM Mono', 'JetBrains Mono', monospace" },
  label: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.faint,
  },
  divider: { height: 1, background: T.border, margin: "0" },
  badge: (level) => {
    const { bg, fg } = impactStyle(level);
    return {
      ...S.mono,
      fontSize: 10,
      fontWeight: 500,
      background: bg,
      color: fg,
      padding: "3px 8px",
      borderRadius: 4,
      letterSpacing: "0.04em",
    };
  },
  pageBadge: (page) => {
    const { bg, fg } = pageStyle(page);
    return {
      ...S.mono,
      fontSize: 10,
      background: bg,
      color: fg,
      padding: "3px 8px",
      borderRadius: 4,
      letterSpacing: "0.04em",
    };
  },
  card: {
    border: `1px solid ${T.border}`,
    borderRadius: 10,
    background: T.bg,
    padding: "20px 24px",
  },
  btnPrimary: {
    background: T.ink,
    color: T.bg,
    border: "none",
    borderRadius: 8,
    height: 48,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    width: "100%",
    letterSpacing: "0.01em",
    transition: "opacity .15s",
    fontFamily: "inherit",
  },
  btnOutline: {
    background: "transparent",
    color: T.muted,
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    height: 40,
    fontSize: 13,
    cursor: "pointer",
    padding: "0 20px",
    transition: "border-color .15s, color .15s",
    fontFamily: "inherit",
  },
  nav: {
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    borderBottom: `1px solid ${T.border}`,
    height: 52,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    zIndex: 10,
    justifyContent: "space-between",
  },
};

// ─── FONT INJECTION ──────────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}

// ─── SCREEN 1: LANDING ───────────────────────────────────────────────────────
function LandingScreen({ onAnalyze }) {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);

  const handleSubmit = () => {
    const val = url.trim() || MOCK.url;
    onAnalyze(val);
  };

  return (
    <div style={{ ...S.page, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={S.nav}>
        <div style={{ ...S.mono, fontSize: 13, fontWeight: 500 }}>
          b.con
          <span style={{ color: T.faint, margin: "0 6px" }}>/</span>
          <span style={{ color: T.muted }}>diagnóstico</span>
        </div>
        <a href="#" style={{ fontSize: 12, color: T.muted, textDecoration: "none" }}>
          Para agências →
        </a>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", minHeight: "calc(90vh - 52px)" }}>
        <div style={{ maxWidth: 620, width: "100%", textAlign: "center" }}>

          {/* Eyebrow */}
          <div style={{ ...S.label, marginBottom: 28 }}>
            Diagnóstico de Conversão
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(30px, 5.5vw, 48px)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 20 }}>
            Sua loja tem visitas.
            <br />
            <span style={{ color: T.muted }}>Por que não tem vendas?</span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: 15, lineHeight: 1.65, color: T.muted, maxWidth: 460, margin: "0 auto 36px", fontWeight: 400 }}>
            Cole o link da sua loja abaixo. Em 60 segundos você descobre o que está impedindo seus visitantes de comprar — sem instalar nada.
          </p>

          {/* Input row */}
          <div style={{
            display: "flex",
            maxWidth: 540,
            margin: "0 auto",
            border: `1px solid ${focused ? T.ink : T.border}`,
            borderRadius: 10,
            overflow: "hidden",
            background: T.bg,
            transition: "border-color .15s, box-shadow .15s",
            boxShadow: focused ? `0 0 0 3px rgba(10,10,10,0.06)` : "none",
          }}>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="minhaloja.com.br"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                padding: "0 16px",
                height: 50,
                fontSize: 14,
                color: T.ink,
                ...S.mono,
                minWidth: 0,
              }}
            />
            <button
              onClick={handleSubmit}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                background: T.ink,
                color: T.bg,
                border: "none",
                padding: "0 22px",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                height: 50,
                opacity: hover ? 0.82 : 1,
                transition: "opacity .15s",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
              }}
            >
              Analisar minha loja
            </button>
          </div>

          {/* Microcopy */}
          <p style={{ fontSize: 12, color: T.faint, marginTop: 12, letterSpacing: "0.01em" }}>
            Grátis
            <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
            Sem cadastro
            <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
            Funciona com Nuvemshop, Shopify e qualquer outra plataforma
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "14px 24px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ ...S.mono, fontSize: 11, color: T.faint }}>b.con © 2026</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Como funciona", "Relatório completo", "Para agências", "Consultoria b.con", "Privacidade"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: T.faint, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─── SCREEN 2: ANALYZING ─────────────────────────────────────────────────────
function AnalyzingScreen({ url }) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setCompleted(i);
      if (i < ANALYZING_STEPS.length) setTimeout(tick, 480);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ ...S.page, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <nav style={S.nav}>
        <div style={{ ...S.mono, fontSize: 13, fontWeight: 500 }}>
          b.con<span style={{ color: T.faint, margin: "0 6px" }}>/</span>
          <span style={{ color: T.muted }}>diagnóstico</span>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ maxWidth: 420, width: "100%" }}>

          <div style={{ ...S.mono, fontSize: 12, color: T.muted, marginBottom: 24 }}>
            ↳ {url}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ANALYZING_STEPS.map((step, i) => {
              const done    = i < completed;
              const current = i === completed;
              const pending = i > completed;
              return (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, opacity: pending ? 0.35 : 1, transition: "opacity .3s" }}>
                  <span style={{ ...S.mono, fontSize: 13, width: 16, color: done ? T.greenFg : current ? T.ink : T.faint, flexShrink: 0 }}>
                    {done ? "✓" : current ? "→" : " "}
                  </span>
                  <span style={{ ...S.mono, fontSize: 13, color: done ? T.greenFg : current ? T.ink : T.faint }}>
                    {step}
                  </span>
                  {current && (
                    <span style={{ ...S.mono, fontSize: 11, color: T.faint, animation: "pulse 1.2s infinite" }}>
                      ...
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: 13, color: T.faint, marginTop: 32, lineHeight: 1.6 }}>
            A maioria das lojas tem pelo menos 8 problemas que custam vendas todo dia.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
      `}</style>
    </div>
  );
}

// ─── SCREEN 3: FREE RESULTS ──────────────────────────────────────────────────
function ScoreCounter({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const dur = 900, fps = 60, steps = dur / (1000 / fps);
    let frame = 0;
    const tick = () => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / steps, 3);
      setVal(Math.round(ease * target));
      if (frame < steps) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{val}</>;
}

function FreeResultsScreen({ url, onUpgrade }) {
  const [hover, setHover] = useState(false);
  const [copyHover, setCopyHover] = useState(false);

  return (
    <div style={{ ...S.page }}>
      <nav style={S.nav}>
        <div style={{ ...S.mono, fontSize: 13, fontWeight: 500 }}>
          b.con<span style={{ color: T.faint, margin: "0 6px" }}>/</span>
          <span style={{ color: T.muted }}>diagnóstico</span>
        </div>
        <button
          onClick={onUpgrade}
          style={{ ...S.mono, fontSize: 11, background: T.ink, color: T.bg, border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer" }}
        >
          Ver relatório completo
        </button>
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ ...S.label, marginBottom: 8 }}>Diagnóstico</div>
          <div style={{ ...S.mono, fontSize: 16, fontWeight: 500, color: T.ink, marginBottom: 4 }}>{url}</div>
          <div style={{ fontSize: 13, color: T.faint }}>Gerado agora · {MOCK.totalIssues} problemas encontrados</div>
        </div>

        {/* Score block — THE WOW MOMENT */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ ...S.label, marginBottom: 12 }}>CRO Score</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
            <span style={{ ...S.mono, fontSize: 88, fontWeight: 500, lineHeight: 1, color: T.ink, letterSpacing: "-0.02em" }}>
              <ScoreCounter target={MOCK.score} />
            </span>
            <span style={{ ...S.mono, fontSize: 24, color: T.faint, fontWeight: 400 }}>/100</span>
          </div>
          <p style={{ fontSize: 14, color: T.muted }}>
            Sua loja está <strong style={{ color: T.ink }}>abaixo da média</strong> do seu segmento (média: {MOCK.segmentAvg}/100).
          </p>
        </div>

        <div style={S.divider} />

        {/* Revenue block */}
        <div style={{ ...S.card, margin: "24px 0" }}>
          <div style={{ ...S.label, marginBottom: 10 }}>Receita não capturada / mês</div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>
            {MOCK.revMin} – {MOCK.revMax}
          </div>
          <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
            Estimativa baseada no tráfego atual e na média de conversão do seu segmento. Corrigindo os problemas identificados, você pode recuperar entre R$ 1.800 e R$ 3.200 desse valor mensalmente.
          </p>
        </div>

        {/* Top 3 issues */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ ...S.label, marginBottom: 16 }}>3 problemas mais urgentes</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOCK.freeIssues.map((issue) => (
              <div key={issue.id} style={{ ...S.card, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ flexShrink: 0, paddingTop: 1 }}>
                  <span style={S.badge(issue.impact)}>{issue.impact}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{issue.title}</div>
                  <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.55 }}>{issue.sub}</div>
                </div>
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, ...S.mono, fontSize: 12, color: T.faint, paddingTop: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5 }}>
                    <rect x="1" y="1" width="10" height="10" rx="2" stroke={T.faint} strokeWidth="1"/>
                    <path d="M4 6h4M6 4v4" stroke={T.faint} strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  Ver correção
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ ...S.card, padding: "28px 28px" }}>
          <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65, marginBottom: 20 }}>
            Esses são os 3 problemas mais urgentes. O relatório completo mostra todos os <strong style={{ color: T.ink }}>{MOCK.totalIssues} problemas</strong> identificados, ordenados por impacto, com o passo a passo de correção para cada um.
          </p>

          <button
            onClick={onUpgrade}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ ...S.btnPrimary, opacity: hover ? 0.85 : 1 }}
          >
            Ver o relatório completo — R$ 47
          </button>

          <p style={{ fontSize: 12, color: T.faint, textAlign: "center", marginTop: 10 }}>
            Pagamento único · Sem assinatura · PDF incluído
          </p>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              onMouseEnter={() => setCopyHover(true)}
              onMouseLeave={() => setCopyHover(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                color: copyHover ? T.ink : T.muted,
                cursor: "pointer",
                textDecoration: copyHover ? "underline" : "none",
                transition: "color .15s",
                fontFamily: "inherit",
              }}
            >
              Compartilhar esse diagnóstico ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 4: FULL REPORT ───────────────────────────────────────────────────
function IssueCard({ issue, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ ...S.card, padding: 0, overflow: "hidden", marginBottom: 8 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <span style={S.badge(issue.impact)}>{issue.impact}</span>
        <span style={S.pageBadge(issue.page)}>{issue.page}</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: T.ink }}>{issue.title}</span>
        <span style={{ ...S.mono, fontSize: 12, color: T.faint, flexShrink: 0, marginRight: 4 }}>
          {issue.time} · {issue.code ? "Técnico" : "Sem código"}
        </span>
        <span style={{ ...S.mono, fontSize: 14, color: T.faint, transition: "transform .2s", display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ↓
        </span>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 16 }}>
            <div>
              <div style={{ ...S.label, marginBottom: 6 }}>O que está acontecendo</div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>{issue.what}</p>
            </div>
            <div>
              <div style={{ ...S.label, marginBottom: 6 }}>Por que importa</div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>{issue.why}</p>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ ...S.label, marginBottom: 8 }}>Como corrigir</div>
            <div style={{ background: T.surface, borderRadius: 6, padding: "12px 16px", ...S.mono, fontSize: 12, color: T.ink, lineHeight: 1.8 }}>
              {issue.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: T.faint, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FullReportScreen({ url, onConsult }) {
  const [activeTab, setActiveTab] = useState("issues");
  const [hoverConsult, setHoverConsult] = useState(false);

  const alto  = MOCK.fullIssues.filter(i => i.impact === "ALTO");
  const medio = MOCK.fullIssues.filter(i => i.impact === "MÉDIO");
  const baixo = MOCK.fullIssues.filter(i => i.impact === "BAIXO");

  const tabs = [
    { id: "issues",  label: `Problemas (${MOCK.fullIssues.length})` },
    { id: "plan",    label: "Plano de ação" },
  ];

  return (
    <div style={{ ...S.page }}>
      <nav style={S.nav}>
        <div style={{ ...S.mono, fontSize: 13, fontWeight: 500 }}>
          b.con<span style={{ color: T.faint, margin: "0 6px" }}>/</span>
          <span style={{ color: T.muted }}>relatório completo</span>
        </div>
        <button style={{ ...S.mono, fontSize: 11, background: "none", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: T.muted }}>
          Exportar PDF ↓
        </button>
      </nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ ...S.label, marginBottom: 8 }}>Relatório Completo</div>
          <div style={{ ...S.mono, fontSize: 18, fontWeight: 500, marginBottom: 6 }}>{url}</div>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: T.faint }}>
            <span>Gerado em {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}</span>
            <span>·</span>
            <span style={{ ...S.mono }}>CRO Score: {MOCK.score}/100</span>
          </div>
        </div>

        {/* Revenue */}
        <div style={{ ...S.card, marginBottom: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ padding: "16px 20px", borderRight: `1px solid ${T.border}` }}>
            <div style={{ ...S.label, marginBottom: 8 }}>Receita não capturada / mês</div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{MOCK.revMin} – {MOCK.revMax}</div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div style={{ ...S.label, marginBottom: 8 }}>Potencial de recuperação</div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: T.greenFg }}>R$ 1.800 – R$ 3.200</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, marginBottom: 24, gap: 0 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${T.ink}` : "2px solid transparent",
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 500 : 400,
                color: activeTab === tab.id ? T.ink : T.muted,
                cursor: "pointer",
                fontFamily: "inherit",
                marginBottom: -1,
                transition: "color .15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Issues tab */}
        {activeTab === "issues" && (
          <div>
            {alto.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ ...S.badge("ALTO") }}>ALTO</span>
                  <span style={{ fontSize: 12, color: T.muted }}>{alto.length} problema{alto.length > 1 ? "s" : ""} · impacto imediato nas vendas</span>
                </div>
                {alto.map((issue, i) => <IssueCard key={issue.id} issue={issue} defaultOpen={i === 0} />)}
              </div>
            )}
            {medio.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ ...S.badge("MÉDIO") }}>MÉDIO</span>
                  <span style={{ fontSize: 12, color: T.muted }}>{medio.length} problemas · importante para escala</span>
                </div>
                {medio.map(issue => <IssueCard key={issue.id} issue={issue} />)}
              </div>
            )}
            {baixo.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ ...S.badge("BAIXO") }}>BAIXO</span>
                  <span style={{ fontSize: 12, color: T.muted }}>{baixo.length} problema{baixo.length > 1 ? "s" : ""} · otimização progressiva</span>
                </div>
                {baixo.map(issue => <IssueCard key={issue.id} issue={issue} />)}
              </div>
            )}
          </div>
        )}

        {/* Plan tab */}
        {activeTab === "plan" && (
          <div>
            {[
              { label: "Esta semana", sub: "Impacto imediato nas vendas", items: MOCK.actionPlan.week1, color: T.altoBg, fg: T.altoFg },
              { label: "Próximas 2 semanas", sub: "Ganhos relevantes de conversão", items: MOCK.actionPlan.week2_3, color: T.medioBg, fg: T.medioFg },
              { label: "Próximo mês", sub: "Otimização estrutural e progressiva", items: MOCK.actionPlan.month1, color: T.surface, fg: T.muted },
            ].map((phase, idx) => (
              <div key={idx} style={{ ...S.card, marginBottom: 12, padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{phase.label}</span>
                  <span style={{ fontSize: 12, color: T.faint }}>{phase.sub}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {phase.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ ...S.mono, fontSize: 11, background: phase.color, color: phase.fg, padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 13, color: T.ink }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Consult CTA */}
        <div style={{ ...S.card, marginTop: 40, padding: "28px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Quer ajuda para implementar esse plano?</div>
          <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65, marginBottom: 20 }}>
            A b.con faz a auditoria completa da sua loja com entrega em call de 90 minutos. Você sai com um plano de ação personalizado para os próximos 90 dias.
          </p>
          <button
            onClick={onConsult}
            onMouseEnter={() => setHoverConsult(true)}
            onMouseLeave={() => setHoverConsult(false)}
            style={{ ...S.btnPrimary, opacity: hoverConsult ? 0.85 : 1 }}
          >
            Agendar auditoria com a b.con — R$ 1.497 →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 5: CONSULT CONFIRMATION ─────────────────────────────────────────
function ConsultScreen() {
  return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: 24 }}>
      <div style={{ maxWidth: 440 }}>
        <div style={{ ...S.mono, fontSize: 32, fontWeight: 500, marginBottom: 16 }}>✓</div>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Solicitação recebida.</h2>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.65, marginBottom: 24 }}>
          O Guilherme vai entrar em contato em até 24h para agendar a call de auditoria.
        </p>
        <div style={{ ...S.card, padding: "16px 20px", textAlign: "left" }}>
          <div style={{ ...S.label, marginBottom: 6 }}>O que acontece a seguir</div>
          {["Você recebe um email de confirmação.", "Guilherme analisa sua loja antes da call.", "Na call de 90 min, você recebe o diagnóstico ao vivo.", "Sai com o plano de ação para os próximos 90 dias."].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 13, color: T.muted }}>
              <span style={{ ...S.mono, color: T.faint, flexShrink: 0 }}>{i + 1}.</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [analyzedUrl, setAnalyzedUrl] = useState("");
  const [analyzeProgress, setAnalyzeProgress] = useState(0);

  const handleAnalyze = (url) => {
    setAnalyzedUrl(url);
    setScreen("analyzing");
    const dur = ANALYZING_STEPS.length * 480 + 600;
    setTimeout(() => setScreen("free"), dur);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <FontLoader />

      {screen === "landing"   && <LandingScreen onAnalyze={handleAnalyze} />}
      {screen === "analyzing" && <AnalyzingScreen url={analyzedUrl} />}
      {screen === "free"      && <FreeResultsScreen url={analyzedUrl} onUpgrade={() => setScreen("full")} />}
      {screen === "full"      && <FullReportScreen url={analyzedUrl} onConsult={() => setScreen("consult")} />}
      {screen === "consult"   && <ConsultScreen />}
    </div>
  );
}
