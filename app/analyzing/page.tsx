"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShiningText } from "@/components/ui/shining-text"
import { ANALYZING_STEPS } from "@/lib/mock-data"

function AnalyzingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get("url") ?? "minhaloja.com.br"

  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    let step = 0

    function advance() {
      if (step < ANALYZING_STEPS.length) {
        setCompletedSteps((prev) => [...prev, step - 1].filter((s) => s >= 0))
        setCurrentStep(step)
        step++
        setTimeout(advance, 480)
      } else {
        setCompletedSteps(ANALYZING_STEPS.map((_, i) => i))
        setTimeout(() => {
          router.push(`/results?url=${encodeURIComponent(url)}`)
        }, 600)
      }
    }

    const timeout = setTimeout(advance, 300)
    return () => clearTimeout(timeout)
  }, [url, router])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#FFFFFF" }}
    >
      <div className="w-full max-w-sm">
        {/* URL being analyzed */}
        <p
          className="text-[12px] text-[#6B6B6B] mb-8"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          ↳ {url}
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {ANALYZING_STEPS.map((step, index) => {
            const isDone = completedSteps.includes(index)
            const isCurrent = currentStep === index && !isDone
            const isPending = !isDone && !isCurrent

            return (
              <div key={step} className="flex items-center gap-3">
                {/* Icon */}
                <span
                  className="text-[14px] w-4 flex-shrink-0"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: isDone ? "#16A34A" : isCurrent ? "#0A0A0A" : "transparent",
                  }}
                >
                  {isDone ? "✓" : isCurrent ? "→" : "·"}
                </span>

                {/* Text */}
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: isDone ? "#16A34A" : isPending ? "#ABABAB" : "#0A0A0A",
                    opacity: isPending ? 0.35 : 1,
                  }}
                >
                  {isCurrent ? (
                    <ShiningText text={step} />
                  ) : (
                    step
                  )}
                </span>
              </div>
            )
          })}
        </div>

        {/* Microcopy */}
        <p
          className="text-[13px] text-[#ABABAB] mt-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          A maioria das lojas perde vendas todos os dias por problemas simples.
        </p>
      </div>
    </div>
  )
}

export default function AnalyzingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#ABABAB] font-mono text-sm">Carregando...</p>
      </div>
    }>
      <AnalyzingContent />
    </Suspense>
  )
}
