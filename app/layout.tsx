import type { Metadata } from "next"
import { DM_Sans, DM_Mono } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "WhyNoSales — Diagnóstico de conversão para e-commerces",
  description:
    "Em 60 segundos você descobre o que está impedindo seus visitantes de comprar. Sem instalar nada.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased bg-white text-[#0A0A0A]">
        {children}
      </body>
    </html>
  )
}
