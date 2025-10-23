"use client"

import { useEffect, useRef } from "react"

export default function CursorGlow() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120)
      gradient.addColorStop(0, "rgba(59, 130, 200, 0.5)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)")
      gradient.addColorStop(1, "rgba(236, 72, 153, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
