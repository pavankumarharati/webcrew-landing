"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const nameRef    = useRef<HTMLDivElement>(null)
  const tagRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.from(nameRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" })
      .from(tagRef.current,  { opacity: 0, y: 12, duration: 0.4, ease: "power3.out" }, "-=0.2")
      .to(barRef.current, { width: "100%", duration: 1.1, ease: "power2.inOut" }, "+=0.1")
      .to(overlayRef.current, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "+=0.15")
      .set(overlayRef.current, { display: "none" })
  }, [])

  return (
    <div ref={overlayRef} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(160deg,#020510,#0a0f1e)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "28px",
    }}>
      {/* Aurora blobs */}
      <div style={{ position: "absolute", top: "-150px", right: "-150px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(249,115,22,0.25),transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-150px", left: "-150px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(59,130,246,0.2),transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div ref={nameRef} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "44px", height: "44px", background: "linear-gradient(135deg,#f97316,#ea580c)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: "22px", fontWeight: 900 }}>W</span>
        </div>
        <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-1px", color: "#fff" }}>WebCrew</span>
      </div>

      <div ref={tagRef} style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        AI-Powered Websites
      </div>

      {/* Progress bar */}
      <div style={{ width: "200px", height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
        <div ref={barRef} style={{ width: "0%", height: "100%", background: "linear-gradient(90deg,#f97316,#fb923c)", borderRadius: "2px" }} />
      </div>
    </div>
  )
}
