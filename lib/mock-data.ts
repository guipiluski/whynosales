export interface FreeIssue {
  id: string
  impact: "ALTO" | "MÉDIO" | "BAIXO"
  title: string
  sub: string
}

export interface FullIssue {
  id: string
  impact: "ALTO" | "MÉDIO" | "BAIXO"
  page: "HOME" | "PLP" | "PDP" | "CARRINHO" | "CHECKOUT" | "GLOBAL"
  title: string
  what: string
  why: string
  steps: string[]
  time: string
  code: boolean
}

export interface MockResult {
  url: string
  score: number
  segmentAvg: number
  revenue: { min: string; max: string }
  recoverable: { min: string; max: string }
  totalIssues: number
  freeIssues: FreeIssue[]
  fullIssues: FullIssue[]
  actionPlan: {
    week1: string[]
    week2_3: string[]
    month1: string[]
  }
}

export const MOCK_RESULT: MockResult = {
  url: "minhaloja.com.br",
  score: 43,
  segmentAvg: 61,
  revenue: { min: "R$ 4.200", max: "R$ 7.800" },
  recoverable: { min: "R$ 1.800", max: "R$ 3.200" },
  totalIssues: 11,

  freeIssues: [
    {
      id: "pdp_mobile_cta",
      impact: "ALTO",
      title: "Botão de comprar invisível no celular",
      sub: "62% do seu tráfego provavelmente vem de dispositivos móveis.",
    },
    {
      id: "pdp_no_reviews",
      impact: "ALTO",
      title: "Sem avaliações de clientes nas páginas de produto",
      sub: "Produtos sem reviews têm 34% menos conversão (Spiegel Research).",
    },
    {
      id: "checkout_shipping",
      impact: "ALTO",
      title: "Valor do frete revelado só no carrinho",
      sub: "48% dos abandonos têm frete inesperado como causa principal.",
    },
  ],

  fullIssues: [
    {
      id: "pdp_mobile_cta",
      impact: "ALTO",
      page: "PDP",
      title: "Botão de comprar invisível no celular",
      what: "Seu botão principal de compra não aparece na tela inicial do celular — o visitante precisa rolar para baixo para encontrá-lo.",
      why: "62% do tráfego de e-commerces no Brasil vem de celular. Visitantes que não veem o botão imediatamente têm 3× mais chance de sair.",
      steps: [
        "Abra o editor de tema da sua loja.",
        "Edite a seção de produto.",
        "Mova o botão para acima das imagens no layout mobile.",
        "Teste em viewports de 390px, 412px e 768px.",
        "Publique.",
      ],
      time: "30 min",
      code: false,
    },
    {
      id: "pdp_no_reviews",
      impact: "ALTO",
      page: "PDP",
      title: "Sem avaliações de clientes nas páginas de produto",
      what: "Nenhuma das suas páginas de produto exibe avaliações, notas ou depoimentos de clientes anteriores.",
      why: "Produtos com pelo menos 5 avaliações convertem 34% mais do que os sem avaliação.",
      steps: [
        "Instale um app de avaliações compatível (Loox, Judge.me ou Trustoo).",
        "Configure envio automático de email solicitando avaliação após entrega.",
        "Importe avaliações anteriores se tiver (ex: do Mercado Livre).",
        "Exiba a nota média e número de avaliações no topo da PDP.",
      ],
      time: "60 min",
      code: false,
    },
    {
      id: "checkout_shipping",
      impact: "ALTO",
      page: "CARRINHO",
      title: "Valor do frete revelado só no carrinho",
      what: "O visitante só descobre o valor do frete ao adicionar o produto ao carrinho, gerando abandono por surpresa.",
      why: "48% dos carrinhos abandonados têm custo de entrega inesperado como causa principal (Baymard, 2024).",
      steps: [
        "Adicione um simulador de frete por CEP na página do produto.",
        "Se tiver frete grátis, comunique em banner no topo e nas PDPs.",
        "No carrinho, mostre o frete antes do CTA de checkout.",
      ],
      time: "30 min",
      code: false,
    },
    {
      id: "checkout_mandatory_reg",
      impact: "ALTO",
      page: "CHECKOUT",
      title: "Cadastro obrigatório antes de finalizar a compra",
      what: "O cliente precisa criar uma conta antes de comprar, gerando atrito e abandono no checkout.",
      why: "Remover o cadastro obrigatório pode aumentar conversão em até 45% (Baymard Institute).",
      steps: [
        "Acesse as configurações de checkout da sua plataforma.",
        "Na Nuvemshop: Configurações → Checkout → desmarque 'Exigir cadastro'.",
        "No Shopify: Settings → Checkout → Accounts are optional.",
        "Teste o fluxo completo em modo anônimo.",
      ],
      time: "15 min",
      code: false,
    },
    {
      id: "global_lcp",
      impact: "MÉDIO",
      page: "GLOBAL",
      title: "Página principal carregando acima de 2,5 segundos",
      what: "O Largest Contentful Paint da sua home está em 3,8s — acima do limite recomendado de 2,5s.",
      why: "Cada segundo a mais no carregamento reduz a conversão em até 7% (Google/Deloitte).",
      steps: [
        "Comprima as imagens do banner principal para formato WebP.",
        "Adicione loading=eager e fetchpriority=high na imagem hero.",
        "Remova ou adie scripts de terceiros que bloqueiam o render.",
        "Teste novamente com o PageSpeed Insights.",
      ],
      time: "2h",
      code: true,
    },
    {
      id: "pdp_single_image",
      impact: "MÉDIO",
      page: "PDP",
      title: "Apenas uma imagem de produto nas PDPs",
      what: "Suas páginas de produto têm somente uma foto, sem ângulos adicionais, detalhes ou foto em uso.",
      why: "Produtos com 3+ imagens convertem 27% mais do que os com imagem única (BigCommerce).",
      steps: [
        "Fotografe o produto em pelo menos 3 ângulos.",
        "Adicione pelo menos 1 foto em contexto (produto sendo usado).",
        "Resolução mínima: 1000×1000px.",
      ],
      time: "3h",
      code: false,
    },
    {
      id: "home_no_social_proof",
      impact: "MÉDIO",
      page: "HOME",
      title: "Sem prova social visível na home",
      what: "A home não exibe avaliações, número de clientes ou outros sinais de confiança acima da dobra.",
      why: "Exibir prova social aumenta a confiança inicial do visitante em até 34%.",
      steps: [
        "Adicione uma barra de prova social abaixo do hero.",
        "Exemplo: '4.8★ · +2.300 clientes · Frete grátis acima de R$199'.",
        "Ou adicione uma seção de depoimentos com foto e texto curto.",
      ],
      time: "45 min",
      code: false,
    },
    {
      id: "pdp_no_urgency",
      impact: "MÉDIO",
      page: "PDP",
      title: "Sem elemento de urgência ou escassez",
      what: "As páginas de produto não comunicam estoque limitado, prazo de entrega ou outros gatilhos de urgência.",
      why: "Elementos de urgência autênticos aumentam a conversão em PDP em até 22% (OptinMonster).",
      steps: [
        "Adicione badge 'Últimas unidades' quando estoque < 5.",
        "Mostre estimativa de entrega (ex: 'Compre hoje e receba em até 5 dias úteis').",
        "Não use urgência falsa — só ative quando for real.",
      ],
      time: "30 min",
      code: false,
    },
    {
      id: "plp_no_filters",
      impact: "MÉDIO",
      page: "PLP",
      title: "Sem filtros de navegação na listagem de produtos",
      what: "As páginas de coleção não oferecem filtros por tamanho, cor, faixa de preço ou outras variáveis.",
      why: "Filtros de navegação reduzem o tempo até encontrar o produto em 40% (Baymard).",
      steps: [
        "Ative os filtros nativos da sua plataforma.",
        "Configure filtros relevantes para o seu nicho (tamanho, cor, preço).",
        "Teste a experiência no mobile — filtros devem ser acessíveis em tela pequena.",
      ],
      time: "40 min",
      code: false,
    },
    {
      id: "checkout_no_seals",
      impact: "BAIXO",
      page: "CHECKOUT",
      title: "Sem selos de segurança visíveis no checkout",
      what: "O checkout não exibe selos de segurança que aumentam a confiança na hora do pagamento.",
      why: "Selos de segurança no checkout aumentam a taxa de conclusão em 10 a 15% (Econsultancy).",
      steps: [
        "Adicione os logos dos meios de pagamento aceitos.",
        "Exiba o selo 'Compra segura' ou certificação SSL.",
        "Adicione ícone de cadeado próximo ao campo de cartão.",
      ],
      time: "20 min",
      code: false,
    },
    {
      id: "global_whatsapp",
      impact: "BAIXO",
      page: "GLOBAL",
      title: "Sem botão de WhatsApp ou contato visível",
      what: "Nenhum canal de contato fácil está visível na loja, reduzindo a confiança do visitante.",
      why: "73% dos lojistas brasileiros usam WhatsApp como canal complementar de vendas.",
      steps: [
        "Instale um app de botão flutuante de WhatsApp.",
        "Configure com o número de atendimento e uma mensagem pré-preenchida.",
        "Posicione no canto inferior direito.",
      ],
      time: "20 min",
      code: false,
    },
  ],

  actionPlan: {
    week1: [
      "Botão de comprar invisível no celular",
      "Cadastro obrigatório no checkout",
      "Sem avaliações nas páginas de produto",
    ],
    week2_3: [
      "Valor do frete revelado só no carrinho",
      "Sem prova social na home",
      "Elemento de urgência nas PDPs",
    ],
    month1: [
      "Velocidade de carregamento (LCP)",
      "Apenas uma imagem de produto",
      "Filtros na listagem de produtos",
      "Selos de segurança no checkout",
      "Botão de WhatsApp",
    ],
  },
}

export const ANALYZING_STEPS = [
  "Avaliando carregamento das páginas",
  "Analisando o Design",
  "Checando sinais de confiança",
  "Procurando pontos de fricção",
  "Calculando o impacto dos problemas",
]
