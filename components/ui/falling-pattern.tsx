"use client"

import { useEffect, useRef } from "react"

interface FallingPatternProps {
  color?: string
  backgroundColor?: string
  className?: string
  dotSize?: number
  spacing?: number
  speed?: number
}

export function FallingPattern({
  color = "#0A0A0A",
  backgroundColor = "#FFFFFF",
  className = "",
  dotSize = 1.5,
  spacing = 24,
  speed = 0.4,
}: FallingPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offsetY = useRef(0)
  const animRef = useRef<number>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0

    function resize() {
      if (!canvas) return
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 2

      const startY = -(spacing - (offsetY.current % spacing))

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          ctx.beginPath()
          ctx.arc(
            col * spacing,
            startY + row * spacing,
            dotSize,
            0,
            Math.PI * 2
          )
          ctx.fillStyle = color
          ctx.globalAlpha = 0.35
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    function loop() {
      offsetY.current += speed
      draw()
      animRef.current = requestAnimationFrame(loop)
    }

    resize()
    loop()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [color, dotSize, spacing, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none w-full h-full ${className}`}
      style={{ backgroundColor }}
    />
  )
}
