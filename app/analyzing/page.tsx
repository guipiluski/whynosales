"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShiningText } from "@/components/ui/shining-text"
import { ANALYZING_STEPS } from "@/lib/mock-data"

function AnalyzingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get("url") ?? "minhaloja.com.br"

  // Index of the step currently being "loaded" (ShiningText). -1 = not started yet.
  const [currentStep, setCurrentStep] = useState(-1)
  // Steps that have finished loading (static black text)
  const [doneSteps, setDoneSteps] = useState<number[]>([])

  useEffect(() => {
    let idx = 0

    function showNext() {
      if (idx < ANALYZING_STEPS.length) {
        const current = idx
        setCurrentStep(current)
        idx++
        setTimeout(() => {
          // Mark this step as done and immediately show the next one
          setDoneSteps(prev => [...prev, current])
          showNext()
        }, 900)
      } else {
        // All done
        setCurrentStep(-1)
        setTimeout(() => {
          router.push(`/results?url=${encodeURIComponent(url)}`)
        }, 600)
      }
    }

    const init = setTimeout(showNext, 400)
    return () => clearTimeout(init)
  }, [url, router])

  // Which step indices are visible (done or current)
  const visibleUpTo = currentStep >= 0 ? currentStep : doneSteps.length - 1

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="w-full max-w-sm">
        {/* URL being analyzed */}
        <p className="text-[12px] text-[#6B6B6B] mb-8 font-mono">
          ↳ {url}
        </p>

        {/* Steps — only render visible ones */}
        <div className="flex flex-col gap-3">
          {ANALYZING_STEPS.map((step, index) => {
            if (index > visibleUpTo) return null
            const isDone = doneSteps.includes(index)
            const isCurrent = currentStep === index

            return (
              <div key={step} className="flex items-center gap-3">
                <span
                  className="text-[14px] w-4 flex-shrink-0 font-mono"
                  style={{ color: isDone ? "#16A34A" : "#0A0A0A" }}
                >
                  {isDone ? "✓" : "→"}
                </span>
                <span
                  className="text-[14px]"
                  style={{ color: isDone ? "#0A0A0A" : "#0A0A0A" }}
                >
                  {isCurrent ? <ShiningText text={step} /> : step}
                </span>
              </div>
            )
          })}
        </div>

        {/* Microcopy */}
        <p className="text-[13px] text-[#ABABAB] mt-10">
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
