"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Share2 } from "lucide-react"
import { MOCK_RESULT } from "@/lib/mock-data"
import { impactColors } from "@/lib/tokens"
import { ShareModal } from "@/components/ui/share-modal"

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get("url") ?? MOCK_RESULT.url

  const [score, setScore] = useState(0)
  const [shareOpen, setShareOpen] = useState(false)

  // Animate score counter
  useEffect(() => {
    const target = MOCK_RESULT.score
    const duration = 900
    const steps = 40
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setScore(target)
        clearInterval(interval)
      } else {
        setScore(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center px-6 py-5 max-w-2xl mx-auto">
        <span className="font-mono text-[14px] font-medium text-[#0A0A0A]">WhyNoSales</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1">Diagnóstico</p>
          <p className="font-mono text-[16px] text-[#0A0A0A]">{url}</p>
          <p className="text-[13px] text-[#6B6B6B] mt-1">Gerado agora · {MOCK_RESULT.totalIssues} problemas encontrados</p>
        </div>

        <div className="h-px bg-[#E5E5E5] mb-8" />

        {/* Score block */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-3">CRO Score</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono text-[88px] leading-none font-medium text-[#0A0A0A]">{score}</span>
            <span className="font-mono text-[24px] text-[#ABABAB]">/100</span>
          </div>
          <p className="text-[15px] text-[#6B6B6B]">
            Sua loja está <strong className="text-[#0A0A0A]">abaixo da média</strong> do seu segmento (média: {MOCK_RESULT.segmentAvg}/100).
          </p>
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 mt-3 text-[13px] text-[#ABABAB] hover:text-[#0A0A0A] transition-colors"
          >
            <Share2 size={13} />
            Compartilhar esse diagnóstico
          </button>
        </div>

        <div className="h-px bg-[#E5E5E5] mb-8" />

        {/* Revenue card */}
        <div className="border border-[#E5E5E5] rounded-[10px] p-5 mb-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-2">Receita não capturada / mês</p>
          <p className="text-[28px] font-semibold text-[#0A0A0A]">
            {MOCK_RESULT.revenue.min} – {MOCK_RESULT.revenue.max}
          </p>
          <p className="text-[13px] text-[#6B6B6B] mt-1">
            Estimativa baseada no seu score e na média do segmento. Corrigindo os problemas abaixo, você pode recuperar entre {MOCK_RESULT.recoverable.min} e {MOCK_RESULT.recoverable.max} por mês.
          </p>
        </div>

        {/* Free issues */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-4">Problemas encontrados</p>
          <div className="flex flex-col gap-3">
            {MOCK_RESULT.freeIssues.map((issue) => {
              const colors = impactColors(issue.impact)
              return (
                <div key={issue.id} className="border border-[#E5E5E5] rounded-[10px] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="font-mono text-[10px] font-medium px-2 py-0.5 rounded"
                          style={{ background: colors.bg, color: colors.fg }}
                        >
                          {issue.impact}
                        </span>
                      </div>
                      <p className="text-[14px] font-medium text-[#0A0A0A] mb-1">{issue.title}</p>
                      <p className="text-[12px] text-[#6B6B6B]">{issue.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#E5E5E5]">
                    <Lock size={12} className="text-[#ABABAB]" />
                    <span className="text-[12px] text-[#ABABAB]">Ver correção</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-[#E5E5E5] rounded-[10px] p-6">
          <p className="text-[15px] text-[#6B6B6B] mb-4">
            Esses são os 3 problemas mais urgentes. O relatório completo mostra todos os {MOCK_RESULT.totalIssues} com o passo a passo de correção para cada um.
          </p>
          <button
            onClick={() => router.push(`/checkout?url=${encodeURIComponent(url)}`)}
            className="w-full bg-[#0A0A0A] text-white text-[14px] font-medium py-3 rounded-[10px] hover:opacity-[0.82] active:opacity-70 transition-opacity"
          >
            Ver o relatório completo por R$ 47
          </button>
          <p className="text-[12px] text-[#ABABAB] text-center mt-3">
            Pagamento único · Sem assinatura · PDF incluído
          </p>
        </div>
      </div>

      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          url={url}
          score={MOCK_RESULT.score}
          type="diagnostico"
        />
      )}
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#ABABAB] font-mono text-sm">Carregando...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
