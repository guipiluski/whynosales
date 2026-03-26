"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp, Share2 } from "lucide-react"
import { MOCK_RESULT } from "@/lib/mock-data"
import { impactColors, pageColors } from "@/lib/tokens"
import type { FullIssue } from "@/lib/mock-data"
import { ShareModal } from "@/components/ui/share-modal"

function IssueAccordion({ issue }: { issue: FullIssue }) {
  const [open, setOpen] = useState(false)
  const impact = impactColors(issue.impact)
  const page = pageColors(issue.page)

  return (
    <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#F9F9F9] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span
          className="font-mono text-[10px] font-medium px-2 py-0.5 rounded flex-shrink-0"
          style={{ background: impact.bg, color: impact.fg }}
        >
          {issue.impact}
        </span>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded flex-shrink-0"
          style={{ background: page.bg, color: page.fg }}
        >
          {issue.page}
        </span>
        <span className="flex-1 text-[14px] font-medium text-[#0A0A0A]">{issue.title}</span>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <span className="font-mono text-[11px] text-[#ABABAB] hidden sm:block">{issue.time}</span>
          {open ? <ChevronUp size={14} className="text-[#ABABAB]" /> : <ChevronDown size={14} className="text-[#ABABAB]" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-[#E5E5E5]">
          <div className="grid sm:grid-cols-2 gap-4 mt-4 mb-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1.5">O que está acontecendo</p>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{issue.what}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1.5">Por que importa</p>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{issue.why}</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-2">Como corrigir</p>
            <div className="bg-[#F9F9F9] rounded-[8px] p-3">
              {issue.steps.map((step, i) => (
                <div key={i} className="flex gap-2.5 mb-2 last:mb-0">
                  <span className="font-mono text-[11px] text-[#ABABAB] flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-[13px] text-[#0A0A0A]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ReportContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url") ?? MOCK_RESULT.url
  const [tab, setTab] = useState<"issues" | "plan">("issues")
  const [shareOpen, setShareOpen] = useState(false)

  const altoIssues = MOCK_RESULT.fullIssues.filter(i => i.impact === "ALTO")
  const medioIssues = MOCK_RESULT.fullIssues.filter(i => i.impact === "MÉDIO")
  const baixoIssues = MOCK_RESULT.fullIssues.filter(i => i.impact === "BAIXO")

  const impactGroups = [
    { label: "ALTO", issues: altoIssues, colors: { bg: "#FFF0F0", fg: "#DC2626" }, desc: "Corrigir esta semana" },
    { label: "MÉDIO", issues: medioIssues, colors: { bg: "#FFF8F0", fg: "#C2610C" }, desc: "Corrigir nas próximas 2 semanas" },
    { label: "BAIXO", issues: baixoIssues, colors: { bg: "#FEFCE8", fg: "#854D0E" }, desc: "Corrigir no próximo mês" },
  ]

  const planPhases = [
    {
      label: "Esta semana",
      items: MOCK_RESULT.actionPlan.week1,
      bg: "#FFF0F0",
      border: "#FECACA",
    },
    {
      label: "Próximas 2 semanas",
      items: MOCK_RESULT.actionPlan.week2_3,
      bg: "#FFF8F0",
      border: "#FED7AA",
    },
    {
      label: "Próximo mês",
      items: MOCK_RESULT.actionPlan.month1,
      bg: "#F9F9F9",
      border: "#E5E5E5",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center px-6 py-5 max-w-2xl mx-auto">
        <span className="font-mono text-[14px] font-medium text-[#0A0A0A]">WhyNoSales</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1">Relatório completo</p>
          <p className="font-mono text-[16px] text-[#0A0A0A]">{url}</p>
          <p className="text-[13px] text-[#6B6B6B] mt-0.5">
            Gerado agora · CRO Score: <strong className="text-[#0A0A0A] font-mono">{MOCK_RESULT.score}/100</strong>
          </p>
        </div>

        {/* Financial impact card */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="border border-[#E5E5E5] rounded-[10px] p-4">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1.5">Receita não capturada / mês</p>
            <p className="text-[20px] font-semibold text-[#0A0A0A]">{MOCK_RESULT.revenue.min} – {MOCK_RESULT.revenue.max}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[10px] p-4">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-1.5">Potencial de recuperação</p>
            <p className="text-[20px] font-semibold text-[#16A34A]">{MOCK_RESULT.recoverable.min} – {MOCK_RESULT.recoverable.max}</p>
          </div>
        </div>

        {/* Share + export row */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 text-[13px] text-[#ABABAB] hover:text-[#0A0A0A] transition-colors"
          >
            <Share2 size={13} />
            Compartilhar relatório
          </button>
        </div>

        <div className="h-px bg-[#E5E5E5] mb-6" />

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border border-[#E5E5E5] rounded-[8px] p-1">
          <button
            onClick={() => setTab("issues")}
            className={`flex-1 py-2 rounded-[6px] text-[13px] font-medium transition-colors ${
              tab === "issues"
                ? "bg-[#0A0A0A] text-white"
                : "text-[#6B6B6B] hover:text-[#0A0A0A]"
            }`}
          >
            Problemas ({MOCK_RESULT.totalIssues})
          </button>
          <button
            onClick={() => setTab("plan")}
            className={`flex-1 py-2 rounded-[6px] text-[13px] font-medium transition-colors ${
              tab === "plan"
                ? "bg-[#0A0A0A] text-white"
                : "text-[#6B6B6B] hover:text-[#0A0A0A]"
            }`}
          >
            Plano de ação
          </button>
        </div>

        {/* Tab content */}
        {tab === "issues" && (
          <div className="flex flex-col gap-6">
            {impactGroups.map(group => group.issues.length > 0 && (
              <div key={group.label}>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-mono text-[10px] font-medium px-2 py-0.5 rounded"
                    style={{ background: group.colors.bg, color: group.colors.fg }}
                  >
                    {group.label}
                  </span>
                  <span className="text-[12px] text-[#6B6B6B]">{group.issues.length} {group.issues.length === 1 ? "problema" : "problemas"} · {group.desc}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {group.issues.map(issue => (
                    <IssueAccordion key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "plan" && (
          <div className="flex flex-col gap-4">
            {planPhases.map(phase => (
              <div
                key={phase.label}
                className="rounded-[10px] p-4"
                style={{ background: phase.bg, border: `1px solid ${phase.border}` }}
              >
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#6B6B6B] mb-3">{phase.label}</p>
                <div className="flex flex-col gap-2">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex gap-2.5">
                      <span className="font-mono text-[12px] text-[#ABABAB] flex-shrink-0">{i + 1}.</span>
                      <p className="text-[13px] text-[#0A0A0A]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Consultoria CTA */}
        <div className="border border-[#E5E5E5] rounded-[10px] p-6 mt-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#ABABAB] mb-2">Próximo passo</p>
          <p className="text-[16px] font-semibold text-[#0A0A0A] mb-2">Quer ajuda para implementar esse plano?</p>
          <p className="text-[13px] text-[#6B6B6B] mb-4">
            A auditoria com call de 90 minutos inclui análise humana da sua loja, benchmarks do seu segmento e um plano de ação para 90 dias.
          </p>
          <a
            href="/consult"
            className="flex items-center justify-center w-full bg-[#0A0A0A] text-white text-[14px] font-medium py-3 rounded-[10px] hover:opacity-[0.82] transition-opacity"
          >
            Agendar auditoria com a b.con — R$ 1.497 →
          </a>
        </div>
      </div>

      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          url={url}
          score={MOCK_RESULT.score}
          type="relatorio"
        />
      )}
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#ABABAB] font-mono text-sm">Carregando...</p>
      </div>
    }>
      <ReportContent />
    </Suspense>
  )
}
