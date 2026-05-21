"use client"
import { useEffect, useRef } from "react"

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let raf: number
    const tick = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12)
      if (dotRef.current)  { dotRef.current.style.transform  = `translate(${mx}px,${my}px)` }
      if (ringRef.current) { ringRef.current.style.transform = `translate(${rx}px,${ry}px)` }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf) }
  }, [])

  const base: React.CSSProperties = { position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9997, willChange: "transform" }
  return (
    <>
      <div ref={dotRef}  style={{ ...base, width: "6px",  height: "6px",  borderRadius: "50%", background: "#f97316", marginLeft: "-3px",  marginTop: "-3px"  }} />
      <div ref={ringRef} style={{ ...base, width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid rgba(249,115,22,0.5)", marginLeft: "-16px", marginTop: "-16px", transition: "border-color 0.3s" }} />
    </>
  )
}
