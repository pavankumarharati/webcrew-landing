"use client"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger) }

export default function SmoothScroll() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null
    let rafId: number
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      lenis.on("scroll", () => ScrollTrigger.update())
      const raf = (t: number) => { lenis!.raf(t); rafId = requestAnimationFrame(raf) }
      rafId = requestAnimationFrame(raf)
    })
    return () => { cancelAnimationFrame(rafId); lenis?.destroy() }
  }, [])
  return null
}
