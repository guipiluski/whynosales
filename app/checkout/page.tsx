"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, CreditCard } from "lucide-react"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get("url") ?? "minhaloja.com.br"

  const [form, setForm] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [loading, setLoading] = useState(false)

  function formatCard(value: string) {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2)
    return digits
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push(`/report?url=${encodeURIComponent(url)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-4 py-16">
      {/* Card */}
      <div className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#E5E5E5]">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1">WhyNoSales</p>
          <p className="text-[20px] font-semibold text-[#0A0A0A]">Relatório completo</p>
          <p className="text-[28px] font-semibold text-[#0A0A0A] mt-1">R$ 47</p>
          <p className="text-[13px] text-[#6B6B6B] mt-1">Diagnóstico de {url} · Pagamento único</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-[12px] font-medium text-[#6B6B6B] mb-1.5">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border border-[#E5E5E5] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0A0A0A] placeholder:text-[#ABABAB] outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </div>

          {/* Card info */}
          <div>
            <label className="block text-[12px] font-medium text-[#6B6B6B] mb-1.5">Informações do cartão</label>
            <div className="border border-[#E5E5E5] rounded-[8px] overflow-hidden focus-within:border-[#0A0A0A] transition-colors">
              <div className="flex items-center px-3 py-2.5 border-b border-[#E5E5E5]">
                <CreditCard size={14} className="text-[#ABABAB] mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={e => setForm(f => ({ ...f, cardNumber: formatCard(e.target.value) }))}
                  className="flex-1 text-[14px] text-[#0A0A0A] placeholder:text-[#ABABAB] outline-none bg-transparent"
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={form.expiry}
                  onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                  className="flex-1 px-3 py-2.5 text-[14px] text-[#0A0A0A] placeholder:text-[#ABABAB] outline-none bg-transparent border-r border-[#E5E5E5]"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={form.cvc}
                  onChange={e => setForm(f => ({ ...f, cvc: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                  className="flex-1 px-3 py-2.5 text-[14px] text-[#0A0A0A] placeholder:text-[#ABABAB] outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-[12px] font-medium text-[#6B6B6B] mb-1.5">Nome no cartão</label>
            <input
              type="text"
              placeholder="Nome completo"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-[#E5E5E5] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0A0A0A] placeholder:text-[#ABABAB] outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A0A0A] text-white text-[14px] font-medium py-3 rounded-[8px] hover:opacity-[0.82] active:opacity-70 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processando...
              </>
            ) : (
              <>
                <Lock size={13} />
                Pagar R$ 47
              </>
            )}
          </button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#ABABAB] mt-1">
            <Lock size={10} />
            <span>Pagamento seguro · Garantia de 7 dias</span>
          </div>
        </form>
      </div>

      <p className="text-[11px] text-[#ABABAB] mt-4">
        Desenvolvido por <span className="font-mono">WhyNoSales</span>
      </p>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#ABABAB] font-mono text-sm">Carregando...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
