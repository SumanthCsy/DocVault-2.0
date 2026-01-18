'use client'

import { useEffect, useRef } from 'react'

export default function ScanningAnimation3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = document.createElement('canvas')
    containerRef.current.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = containerRef.current.clientWidth
    canvas.height = 400

    let animationFrameId: number
    let progress = 0

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(55, 65, 255, 0.1)')
      gradient.addColorStop(1, 'rgba(55, 65, 255, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw document outline
      const docWidth = 200
      const docHeight = 280
      const docX = (canvas.width - docWidth) / 2
      const docY = (canvas.height - docHeight) / 2

      ctx.strokeStyle = 'rgba(55, 65, 255, 0.5)'
      ctx.lineWidth = 2
      ctx.roundRect(docX, docY, docWidth, docHeight, 8)
      ctx.stroke()

      // Draw scanning line
      const scanY = docY + (docHeight * progress)
      ctx.strokeStyle = `rgba(100, 150, 255, ${0.8 * (1 - Math.abs(progress - 0.5) * 2)})`
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(docX, scanY)
      ctx.lineTo(docX + docWidth, scanY)
      ctx.stroke()

      // Draw glow effect around scanning line
      const glowGradient = ctx.createLinearGradient(
        docX,
        scanY - 20,
        docX,
        scanY + 20
      )
      glowGradient.addColorStop(0, 'rgba(100, 150, 255, 0)')
      glowGradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.3)')
      glowGradient.addColorStop(1, 'rgba(100, 150, 255, 0)')
      ctx.fillStyle = glowGradient
      ctx.fillRect(docX, scanY - 20, docWidth, 40)

      // Draw corner points
      const corners = [
        [docX, docY],
        [docX + docWidth, docY],
        [docX + docWidth, docY + docHeight],
        [docX, docY + docHeight],
      ]

      corners.forEach(([x, y]) => {
        ctx.fillStyle = `rgba(100, 150, 255, ${0.5 + Math.sin(Date.now() / 300 + x) * 0.3})`
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw scanning particles
      for (let i = 0; i < 15; i++) {
        const x = docX + Math.random() * docWidth
        const y = scanY + (Math.random() - 0.5) * 40
        const size = Math.random() * 2 + 1
        const opacity = Math.random() * 0.6 + 0.2

        ctx.fillStyle = `rgba(100, 150, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw progress indicator text
      ctx.fillStyle = 'rgba(55, 65, 255, 0.8)'
      ctx.font = 'bold 24px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${Math.round(progress * 100)}%`, canvas.width / 2, docY - 30)

      progress += 0.005
      if (progress > 1) {
        progress = 0
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 to-primary/5 overflow-hidden"
    />
  )
}
