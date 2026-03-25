export const tokens = {
  colors: {
    bg:      "#FFFFFF",
    ink:     "#0A0A0A",
    muted:   "#6B6B6B",
    faint:   "#ABABAB",
    border:  "#E5E5E5",
    surface: "#F9F9F9",
    alto:   { bg: "#FFF0F0", fg: "#DC2626" },
    medio:  { bg: "#FFF8F0", fg: "#C2610C" },
    baixo:  { bg: "#FEFCE8", fg: "#854D0E" },
    green:  { bg: "#F0FDF4", fg: "#16A34A" },
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

export type ImpactLevel = "ALTO" | "MÉDIO" | "BAIXO"
export type PageType = "HOME" | "PLP" | "PDP" | "CARRINHO" | "CHECKOUT" | "GLOBAL"

export function impactColors(level: ImpactLevel) {
  const map = {
    ALTO:  tokens.colors.alto,
    MÉDIO: tokens.colors.medio,
    BAIXO: tokens.colors.baixo,
  }
  return map[level] ?? { bg: tokens.colors.surface, fg: tokens.colors.muted }
}

export function pageColors(page: PageType) {
  const map: Record<string, { bg: string; fg: string }> = {
    HOME:     tokens.colors.home,
    PLP:      tokens.colors.plp,
    PDP:      tokens.colors.pdp,
    CARRINHO: tokens.colors.cart,
    CHECKOUT: tokens.colors.checkout,
    GLOBAL:   tokens.colors.global,
  }
  return map[page] ?? { bg: tokens.colors.surface, fg: tokens.colors.muted }
}
