"use client"

import { useEffect, useRef } from "react"
import type { ServiceMetrics } from "@/types/status"

interface ServiceMetricsChartProps {
  metrics: ServiceMetrics
}

export default function ServiceMetricsChart({ metrics }: ServiceMetricsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 20

    // Generate sample data for the chart
    // In a real app, this would come from the metrics data
    const responseTimeData = generateSampleData(24, metrics.responseTime, 20)
    const errorRateData = generateSampleData(24, metrics.errorRate * 10, 5)

    // Draw response time line (primary metric)
    drawLine(ctx, responseTimeData, width, height, padding, "#3b82f6", 2)

    // Draw error rate line (secondary metric)
    drawLine(ctx, errorRateData, width, height, padding, "#ef4444", 1.5)

    // Draw time axis
    drawTimeAxis(ctx, width, height, padding)
  }, [metrics])

  // Helper function to generate sample data
  const generateSampleData = (points: number, average: number, variance: number) => {
    const data = []
    for (let i = 0; i < points; i++) {
      // Create some random variation around the average
      const randomVariance = (Math.random() - 0.5) * variance
      data.push(Math.max(0, average + randomVariance))
    }
    return data
  }

  // Helper function to draw a line chart
  const drawLine = (
    ctx: CanvasRenderingContext2D,
    data: number[],
    width: number,
    height: number,
    padding: number,
    color: string,
    lineWidth: number,
  ) => {
    const drawWidth = width - padding * 2
    const drawHeight = height - padding * 2

    const max = Math.max(...data) * 1.1 // Add 10% padding at the top

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color

    data.forEach((value, index) => {
      const x = padding + index * (drawWidth / (data.length - 1))
      const y = height - padding - (value / max) * drawHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  }

  // Helper function to draw time axis
  const drawTimeAxis = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number) => {
    const drawWidth = width - padding * 2

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = "#e2e8f0"

    // Draw horizontal axis line
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)

    // Draw time markers
    const hours = [0, 6, 12, 18, 23]
    hours.forEach((hour) => {
      const x = padding + (hour / 23) * drawWidth

      // Draw tick
      ctx.moveTo(x, height - padding)
      ctx.lineTo(x, height - padding + 5)

      // Draw time label
      ctx.fillStyle = "#94a3b8"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${hour}:00`, x, height - padding + 15)
    })

    ctx.stroke()
  }

  return (
    <div className="w-full h-40 relative">
      <canvas ref={canvasRef} width={800} height={160} className="w-full h-full"></canvas>
    </div>
  )
}
