"use client"
import { useEffect } from "react"

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-bar")
    if (!bar) return
    const fn = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      bar.style.width = `${Math.min(pct * 100, 100)}%`
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 9998, background: "transparent" }}>
      <div id="scroll-bar" style={{ height: "100%", width: "0%", background: "linear-gradient(90deg,#f97316,#fb923c,#f97316)", backgroundSize: "200% auto", boxShadow: "0 0 10px rgba(249,115,22,0.6)", transition: "width 0.05s linear" }} />
    </div>
  )
}
