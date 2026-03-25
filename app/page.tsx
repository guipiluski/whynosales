"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { FallingPattern } from "@/components/ui/falling-pattern"

export default function LandingPage() {
  const [url, setUrl] = useState("")
  const [focused, setFocused] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit() {
    const target = url.trim() || "minhaloja.com.br"
    router.push(`/analyzing?url=${encodeURIComponent(target)}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "#FFFFFF" }}>
      {/* Background pattern */}
      <FallingPattern
        color="#0A0A0A"
        backgroundColor="#FFFFFF"
        className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#FFFFFF_80%)]"
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto w-full">
        <span
          className="text-[14px] font-medium tracking-[-0.01em] text-[#0A0A0A]"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          WhyNoSales
        </span>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
        {/* Eyebrow */}
        <p
          className="text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-6"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Diagnóstico de conversão
        </p>

        {/* Headline */}
        <h1 className="text-[40px] sm:text-[52px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4 max-w-xl">
          <span className="text-[#0A0A0A]">Sua loja tem tráfego</span>
          <br />
          <span className="text-[#6B6B6B]">mas poucas vendas?</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[16px] text-[#6B6B6B] mb-10 max-w-md leading-relaxed">
          Em 60 segundos você descobre o que está impedindo seus visitantes de comprar.{" "}
          <span className="text-[#0A0A0A]">Sem instalar nada.</span>
        </p>

        {/* Input row */}
        <div
          className="flex items-center w-full max-w-[480px] rounded-[10px] transition-all duration-150"
          style={{
            border: focused ? "1px solid #0A0A0A" : "1px solid #E5E5E5",
            boxShadow: focused ? "0 0 0 3px rgba(10,10,10,0.06)" : "none",
            background: "#FFFFFF",
            padding: "6px 6px 6px 16px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="minhaloja.com.br"
            className="flex-1 bg-transparent outline-none text-[14px] text-[#0A0A0A] placeholder:text-[#ABABAB]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          />
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex-shrink-0 transition-opacity duration-100 hover:opacity-[0.82] active:opacity-70"
            aria-label="Analisar minha loja"
          >
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Microcopy */}
        <p className="text-[12px] text-[#ABABAB] mt-4">
          Grátis · Sem cadastro · Funciona com Nuvemshop, Shopify e qualquer outra plataforma
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto w-full">
        <span
          className="text-[12px] text-[#ABABAB]"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          b.con © 2026
        </span>
        <div className="flex gap-5">
          <a href="#" className="text-[12px] text-[#ABABAB] hover:text-[#0A0A0A] transition-colors">
            Como funciona
          </a>
          <a href="#" className="text-[12px] text-[#ABABAB] hover:text-[#0A0A0A] transition-colors">
            Privacidade
          </a>
        </div>
      </footer>
    </div>
  )
}
