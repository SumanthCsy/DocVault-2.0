'use client'

import { useEffect, useRef } from 'react'

export default function ResultsAnimation3D({ authentic }: { authentic: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = document.createElement('canvas')
    containerRef.current.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = containerRef.current.clientWidth
    canvas.height = 350

    let animationFrameId: number
    let progress = 0

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      if (authentic) {
        // Success animation - expanding circles and checkmark
        const maxRadius = 150
        const radius = Math.min(progress * maxRadius, maxRadius)

        // Outer circles
        for (let i = 0; i < 3; i++) {
          const offset = i * 20
          const r = radius - offset
          if (r > 0) {
            ctx.strokeStyle = `rgba(34, 197, 94, ${(1 - (r - offset) / maxRadius) * 0.6})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
            ctx.stroke()
          }
        }

        // Draw checkmark if progress > 0.3
        if (progress > 0.3) {
          const checkProgress = Math.min((progress - 0.3) / 0.7, 1)
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)'
          ctx.lineWidth = 6
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          // Checkmark left part
          ctx.beginPath()
          ctx.moveTo(centerX - 40, centerY + 10)
          ctx.lineTo(
            centerX - 10 + (centerX - 10 - (centerX - 40)) * (1 - checkProgress),
            centerY - 10 + (centerY - 10 - (centerY + 10)) * (1 - checkProgress)
          )
          ctx.stroke()

          // Checkmark right part
          ctx.beginPath()
          ctx.moveTo(centerX - 10, centerY - 10)
          ctx.lineTo(
            centerX - 10 + (40) * (checkProgress),
            centerY - 10 - (30) * (checkProgress)
          )
          ctx.stroke()
        }

        // Particle burst effect
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 * i) / 20
          const distance = progress * 200
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance
          const opacity = Math.max(0, 1 - progress * 1.5)

          ctx.fillStyle = `rgba(34, 197, 94, ${opacity * 0.6})`
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        // Alert animation - warning symbol
        const maxRadius = 120
        const radius = Math.min(progress * maxRadius, maxRadius)

        // Outer circles - red
        for (let i = 0; i < 3; i++) {
          const offset = i * 20
          const r = radius - offset
          if (r > 0) {
            ctx.strokeStyle = `rgba(239, 68, 68, ${(1 - (r - offset) / maxRadius) * 0.6})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
            ctx.stroke()
          }
        }

        // Draw warning triangle if progress > 0.3
        if (progress > 0.3) {
          const warnProgress = Math.min((progress - 0.3) / 0.7, 1)
          const size = 50 * warnProgress

          ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(centerX, centerY - size)
          ctx.lineTo(centerX + size * 0.866, centerY + size * 0.5)
          ctx.lineTo(centerX - size * 0.866, centerY + size * 0.5)
          ctx.closePath()
          ctx.stroke()

          // Exclamation mark
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)'
          ctx.beginPath()
          ctx.arc(centerX, centerY - 15 * warnProgress, 4, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillRect(centerX - 2, centerY + 5 * warnProgress, 4, 20 * warnProgress)
        }

        // Particle burst effect - red
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 * i) / 20
          const distance = progress * 200
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance
          const opacity = Math.max(0, 1 - progress * 1.5)

          ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.6})`
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw confidence bars at bottom
      const barY = canvas.height - 50
      ctx.fillStyle = 'rgba(100, 150, 255, 0.2)'
      ctx.fillRect(centerX - 100, barY, 200, 4)

      ctx.fillStyle = authentic
        ? 'rgba(34, 197, 94, 0.8)'
        : 'rgba(239, 68, 68, 0.8)'
      ctx.fillRect(centerX - 100, barY, 200 * progress, 4)

      progress += 0.008
      if (progress > 1) {
        progress = 1
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
  }, [authentic])

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-2xl border-2 overflow-hidden ${
        authentic
          ? 'border-green-500/30 bg-gradient-to-b from-green-500/10 to-green-500/5'
          : 'border-red-500/30 bg-gradient-to-b from-red-500/10 to-red-500/5'
      }`}
    />
  )
}
