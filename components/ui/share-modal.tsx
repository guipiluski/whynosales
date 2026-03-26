"use client"

import { useEffect, useRef } from "react"
import { X, Image as ImageIcon, FileText } from "lucide-react"

interface ShareModalProps {
  onClose: () => void
  url: string
  score: number
  type: "diagnostico" | "relatorio"
}

export function ShareModal({ onClose, url, score, type }: ShareModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose()
  }

  function handleShare(format: "image" | "pdf") {
    // Mock: just close modal (in production, trigger export)
    alert(`Em breve: exportar ${type === "diagnostico" ? "diagnóstico" : "relatório"} como ${format === "image" ? "imagem" : "PDF"}.`)
    onClose()
  }

  const label = type === "diagnostico" ? "diagnóstico" : "relatório"

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(10,10,10,0.4)", backdropFilter: "blur(4px)" }}
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-sm bg-white rounded-[12px] border border-[#E5E5E5] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5]">
          <div>
            <p className="text-[15px] font-semibold text-[#0A0A0A]">Compartilhar {label}</p>
            <p className="text-[12px] text-[#ABABAB] mt-0.5 font-mono">{url}</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#F9F9F9] transition-colors"
          >
            <X size={14} className="text-[#6B6B6B]" />
          </button>
        </div>

        {/* Options */}
        <div className="p-5 flex flex-col gap-3">
          <button
            onClick={() => handleShare("image")}
            className="flex items-center gap-3 border border-[#E5E5E5] rounded-[10px] px-4 py-3.5 hover:border-[#0A0A0A] hover:bg-[#F9F9F9] transition-all text-left"
          >
            <div className="flex items-center justify-center w-9 h-9 bg-[#F9F9F9] rounded-[8px] flex-shrink-0">
              <ImageIcon size={16} className="text-[#6B6B6B]" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#0A0A0A]">Imagem</p>
              <p className="text-[12px] text-[#ABABAB]">Exportar como PNG · Inclui marca WhyNoSales</p>
            </div>
          </button>

          <button
            onClick={() => handleShare("pdf")}
            className="flex items-center gap-3 border border-[#E5E5E5] rounded-[10px] px-4 py-3.5 hover:border-[#0A0A0A] hover:bg-[#F9F9F9] transition-all text-left"
          >
            <div className="flex items-center justify-center w-9 h-9 bg-[#F9F9F9] rounded-[8px] flex-shrink-0">
              <FileText size={16} className="text-[#6B6B6B]" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#0A0A0A]">PDF</p>
              <p className="text-[12px] text-[#ABABAB]">Exportar como PDF · Inclui URL whynosales.com</p>
            </div>
          </button>
        </div>

        {/* Footer branding */}
        <div className="px-5 pb-4 flex items-center justify-center">
          <p className="font-mono text-[11px] text-[#ABABAB]">
            WhyNoSales · CRO Score {score}/100
          </p>
        </div>
      </div>
    </div>
  )
}
