"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LoadingScreen  from "@/components/loading-screen"
import SmoothScroll   from "@/components/smooth-scroll"

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger) }

// ─── DATA ────────────────────────────────────────────────────────────────────

const NICHES = ["HVAC", "Roofing", "Plumbing", "Dental", "Med Spa", "Cleaning", "Law Firm", "Auto Detailing"]

const DEMOS = [
  { name: "HVAC Heating & Cooling",   niche: "HVAC",        city: "Tracy, CA",      url: "https://site-hvac-heating-cooling-llc.pages.dev",              img: "/showcase/hvac-real.jpg",              rating: "4.9", reviews: "200+" },
  { name: "Clearwater Dentistry",     niche: "Dentistry",   city: "Clearwater, FL", url: "https://site-clearwater-dentistry.pages.dev",                  img: "/showcase/dentist-real.jpg",           rating: "4.9", reviews: "180+" },
  { name: "Happy Junk Removal",       niche: "Junk Removal",city: "San Jose, CA",   url: "https://site-happy-junk-removal.pages.dev",                    img: "/showcase/junk-removal-real.jpg",      rating: "4.8", reviews: "95+"  },
  { name: "San Jose Daycare",         niche: "Daycare",     city: "San Jose, CA",   url: "https://site-san-jose-daycare.pages.dev",                      img: "/showcase/daycare-real.jpg",           rating: "5.0", reviews: "60+"  },
  { name: "Luxury Homes Riverside",   niche: "Real Estate", city: "Riverside, CA",  url: "https://site-luxury-homes-in-riverside.pages.dev",             img: "/showcase/luxury-realestate-real.jpg", rating: "4.8", reviews: "120+" },
  { name: "Dell's Heating & Air",     niche: "HVAC",        city: "Tracy, CA",      url: "https://site-dell-s-heating-air-conditioning.pages.dev",       img: "/showcase/dells-hvac-real.jpg",        rating: "4.9", reviews: "200+" },
]

const STEPS = [
  { n: "01", title: "We find your business",   desc: "AI scans Google Maps and builds your site automatically — no forms, no calls, no waiting." },
  { n: "02", title: "Your site goes live",      desc: "A professional website deploys in minutes. Live preview link hits your inbox instantly." },
  { n: "03", title: "Customers start calling", desc: "SEO-optimized, mobile-first, click-to-call — built to turn visitors into paying customers." },
]

const FEATURES = [
  ["⚡", "Lightning fast",    "Sub-second load on mobile. Google rewards speed."],
  ["📱", "Mobile-first",      "70% of your customers search from their phone."],
  ["🔍", "SEO built in",      "Sitemap, schema markup, keyword-optimized copy."],
  ["⭐", "Review showcase",   "Your Google rating, front and center."],
  ["📞", "Click-to-call",     "One tap to call — the most important button."],
  ["🤖", "AI hero images",    "Professional photos generated for your business."],
  ["📊", "Monthly reports",   "Google Search Console data, emailed monthly."],
  ["💬", "Review replies",    "We reply to your Google reviews automatically."],
  ["🌐", "Custom domain",     "We connect your domain or get you one."],
  ["🔒", "SSL & hosting",     "Cloudflare CDN, 99.99% uptime, free SSL."],
  ["✏️", "Unlimited edits",   "Change anything, any time. Just ask."],
  ["📧", "Lead capture",      "Contact form → your email + CRM."],
]

const FAQS = [
  { q: "Do I need to do anything to get started?", a: "Nothing. We build your site using your Google Maps data. You just review it and approve." },
  { q: "Can I use my own domain?",                  a: "Yes. We'll connect your existing domain for free, or help you get a new one for ~$10/year." },
  { q: "What if I don't like the design?",          a: "We offer unlimited revision requests in the first 30 days. Not happy? Full refund, no questions." },
  { q: "How fast will I see results?",              a: "Most clients see new inbound calls within the first 2–4 weeks as Google indexes the new site." },
  { q: "Do you update the site for me?",            a: "Yes. Monthly SEO updates, Google review replies, and content refreshes are included." },
  { q: "What happens if I cancel?",                 a: "Cancel any time — no contracts. Your site stays live through the end of your billing period." },
]

const TICKER_ITEMS = [
  "⚡ Live in 24 hours","📱 Mobile-first design","🔍 Google-optimized",
  "⭐ Review showcase","📞 Click-to-call","🔒 Free SSL",
  "🤖 AI-generated images","📊 Monthly SEO report","💬 Google review replies",
  "🌐 Custom domain","🚀 Cloudflare CDN","♾️ Unlimited edits",
]

// ─── UTILS ───────────────────────────────────────────────────────────────────

function splitWords(text: string, gradient?: boolean) {
  const gradStyle: React.CSSProperties = gradient ? {
    background: "linear-gradient(135deg,#fb923c,#f97316,#fb923c)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "gradient-shimmer 4s linear infinite",
    display: "inline-block",
  } : {}
  return text.split(" ").map((w, i) => (
    <span key={i} className="word-wrap" style={{ marginRight: "0.22em" }}>
      <span className="word-inner" style={gradStyle}>{w}</span>
    </span>
  ))
}

function useReveal(ref: React.RefObject<HTMLElement | null>, opts?: { start?: string; stagger?: boolean }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = opts?.stagger ? el.querySelectorAll(".word-inner") : el.querySelectorAll(".word-inner")
    if (!targets.length) return
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        yPercent: 110, opacity: 0,
        stagger: 0.045, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: el, start: opts?.start ?? "top 85%" },
      })
    })
    return () => ctx.revert()
  }, [])
}

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)
    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.4, a: Math.random() * 0.35 + 0.08,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = canvas.width
        if (d.x > canvas.width) d.x = 0
        if (d.y < 0) d.y = canvas.height
        if (d.y > canvas.height) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${d.a})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function NicheRotator() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % NICHES.length); setVisible(true) }, 300)
    }, 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{ color: "#f97316", display: "inline-block", minWidth: "180px", transition: "opacity 0.3s", opacity: visible ? 1 : 0 }}>
      {NICHES[idx]}
    </span>
  )
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 0", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ display: "flex", gap: "48px", animation: "ticker 30s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {items.map((item, i) => <span key={i} style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", fontWeight: 500 }}>{item}</span>)}
      </div>
    </div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px",
      background: scrolled ? "rgba(3,7,18,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg,#f97316,#ea580c)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: 900 }}>W</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "18px", letterSpacing: "-0.5px" }}>WebCrew</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="#how"     style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>How it works</a>
          <a href="#demos"   style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>Examples</a>
          <a href="#pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>Pricing</a>
          <Link href="/auth/signup" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", textDecoration: "none", padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 700 }}>
            Get your free site →
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const labelRef = useRef<HTMLDivElement>(null)
  const h1Ref    = useRef<HTMLHeadingElement>(null)
  const paraRef  = useRef<HTMLParagraphElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const tagRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return
    const tl = gsap.timeline({ delay: 2.0 }) // after loading screen
    tl.from(labelRef.current,  { opacity: 0, y: -16, duration: 0.5, ease: "power3.out" })
      .from(h1Ref.current?.querySelectorAll(".word-inner") ?? [], { yPercent: 110, opacity: 0, stagger: 0.05, duration: 0.85, ease: "power3.out" }, "-=0.2")
      .from(paraRef.current,   { opacity: 0, y: 24, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .from(ctaRef.current,    { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" }, "-=0.4")
      .from(Array.from(statsRef.current?.children ?? []), { opacity: 0, y: 16, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .from(tagRef.current,    { opacity: 0, duration: 0.4 }, "-=0.2")
  }, [])

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "140px 24px 80px", position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg,#030712 0%,#0a0f1e 50%,#030712 100%)",
    }}>
      <ParticleCanvas />
      {/* Aurora blobs */}
      <div className="aurora-drift" style={{ position: "absolute", top: "-200px", right: "-200px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(249,115,22,0.2),transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div className="aurora-drift-slow" style={{ position: "absolute", bottom: "-200px", left: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(59,130,246,0.18),transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%,transparent 30%,rgba(0,0,0,0.65) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "1100px" }}>
        <div ref={labelRef} style={{ marginBottom: "24px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)",
            color: "#fb923c", fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "7px 18px", borderRadius: "999px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f97316", display: "inline-block", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
            Early Bird — $49/mo · Limited spots
          </span>
        </div>

        <h1 ref={h1Ref} style={{ fontSize: "clamp(2.6rem,8.5vw,7.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "32px" }}>
          {splitWords("AI-Powered Websites")}
          <br />
          {splitWords("for Local Businesses.", true)}
        </h1>

        <p ref={paraRef} style={{ fontSize: "clamp(1.05rem,1.6vw,1.35rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto 48px", fontWeight: 400 }}>
          We find your business, build the site, deploy it, optimize it.
          <br />
          All automatically. <span style={{ color: "#fff", fontWeight: 600 }}>One new customer pays for the whole year.</span>
        </p>

        <div ref={ctaRef} style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "56px" }}>
          <a href="#pricing" style={{ background: "linear-gradient(135deg,#f97316,#ea580c,#f97316)", backgroundSize: "200% auto", color: "#fff", textDecoration: "none", padding: "18px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, letterSpacing: "0.02em", boxShadow: "0 12px 48px -12px rgba(249,115,22,0.6)", animation: "gradient-shimmer 3s linear infinite" }}>
            See your free demo →
          </a>
          <a href="#demos" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)", textDecoration: "none", padding: "18px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600 }}>
            View live examples
          </a>
        </div>

        <div ref={statsRef} style={{ display: "flex", gap: "48px", justifyContent: "center", flexWrap: "wrap" }}>
          {[["24h","Live in 24 hours"],["$0","No setup fee"],["4.9★","Average rating"],["100%","Money-back guarantee"]].map(([val,label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#f97316", letterSpacing: "-0.04em", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        <div ref={tagRef} style={{ marginTop: "56px", fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Built for <NicheRotator />
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.querySelectorAll(".word-inner") ?? [], {
        yPercent: 110, opacity: 0, stagger: 0.045, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      })
      gsap.from(headRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 88%" } })
      gsap.from(cardsRef.current?.children ?? [], {
        y: 60, opacity: 0, scale: 0.95, stagger: 0.1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="how" ref={sectionRef} style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={headRef} style={{ textAlign: "center", marginBottom: "64px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", display: "block", marginBottom: "12px" }}>How it works</span>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "16px" }}>
          {splitWords("Your site is live before you even sign up")}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "17px", maxWidth: "520px", margin: "0 auto" }}>
          No forms. No meetings. No waiting. We build it, then we show you.
        </p>
      </div>
      <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px" }}>
        {STEPS.map((step, i) => (
          <div key={i} className="hover-lift" style={{ background: "linear-gradient(135deg,#0f172a,#111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "36px 32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20px", right: "24px", fontSize: "64px", fontWeight: 900, color: "rgba(249,115,22,0.06)", lineHeight: 1, userSelect: "none" }}>{step.n}</div>
            <div style={{ width: "48px", height: "48px", background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <span style={{ color: "#f97316", fontSize: "20px", fontWeight: 800 }}>{step.n}</span>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.3px", marginBottom: "12px" }}>{step.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "15px", margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── DEMO CARD ────────────────────────────────────────────────────────────────

function DemoCard({ demo }: { demo: (typeof DEMOS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const setRX = gsap.quickTo(el, "rotationX", { duration: 0.45, ease: "power2.out" })
    const setRY = gsap.quickTo(el, "rotationY", { duration: 0.45, ease: "power2.out" })
    const setSC = gsap.quickTo(el, "scale",     { duration: 0.35, ease: "power2.out" })
    gsap.set(el, { transformPerspective: 1000, transformStyle: "preserve-3d" })
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
      setRY(dx * 9); setRX(-dy * 6); setSC(1.02)
      gsap.to(el, { duration: 0.3, borderColor: "rgba(249,115,22,0.4)", boxShadow: "0 32px 80px rgba(0,0,0,0.7),0 0 40px rgba(249,115,22,0.12)" })
    }
    const onLeave = () => {
      setRX(0); setRY(0); setSC(1)
      gsap.to(el, { duration: 0.4, borderColor: "rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" })
    }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
  }, [])

  return (
    <a href={demo.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <div ref={cardRef} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden", willChange: "transform", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", cursor: "pointer" }}>
        {/* Browser chrome */}
        <div style={{ height: "180px", background: "#0a0f1e", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, height: "28px", background: "rgba(10,15,30,0.95)", display: "flex", alignItems: "center", padding: "0 10px", gap: "5px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
              <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, opacity: 0.75 }} />
            ))}
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginLeft: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {demo.url.replace("https://","")}
            </span>
          </div>
          <img src={demo.img} alt={demo.name} style={{ position: "absolute", top: "28px", left: 0, width: "100%", height: "calc(100% - 28px)", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        </div>
        {/* Card body */}
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.2px", marginBottom: "3px" }}>{demo.name}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{demo.city}</div>
            </div>
            <span style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)", color: "#fb923c", fontSize: "11px", fontWeight: 700, padding: "2px 10px", borderRadius: "999px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {demo.niche}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#fbbf24", fontSize: "13px" }}>★</span>
            <span style={{ fontSize: "13px", fontWeight: 700 }}>{demo.rating}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>({demo.reviews} reviews)</span>
            <span style={{ marginLeft: "auto", fontSize: "12px", color: "#f97316", fontWeight: 600 }}>Live ↗</span>
          </div>
        </div>
      </div>
    </a>
  )
}

// ─── DEMOS SECTION ────────────────────────────────────────────────────────────

function Demos() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.querySelectorAll(".word-inner") ?? [], {
        yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      })
      gsap.from(gridRef.current?.children ?? [], {
        y: 70, opacity: 0, scale: 0.94, stagger: 0.07, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="demos" ref={sectionRef} style={{ padding: "80px 24px", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", display: "block", marginBottom: "12px" }}>Live examples</span>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "16px" }}>
            {splitWords("Real sites. Real businesses. Live right now.")}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "17px" }}>Click any site to see it live.</p>
        </div>
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" }}>
          {DEMOS.map((demo, i) => <DemoCard key={i} demo={demo} />)}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURES ────────────────────────────────────────────────────────────────

function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.querySelectorAll(".word-inner") ?? [], {
        yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      })
      gsap.from(gridRef.current?.children ?? [], {
        y: 40, opacity: 0, stagger: 0.04, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={headRef} style={{ textAlign: "center", marginBottom: "56px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", display: "block", marginBottom: "12px" }}>Everything included</span>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-1px" }}>
          {splitWords("We handle everything. You handle calls.")}
        </h2>
      </div>
      <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px" }}>
        {FEATURES.map(([icon, title, desc]) => (
          <div key={title as string} className="hover-lift" style={{ background: "linear-gradient(135deg,#0f172a,#111827)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "24px 20px" }}>
            <div style={{ fontSize: "26px", marginBottom: "12px" }}>{icon}</div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{title as string}</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{desc as string}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

const TIERS = [
  {
    label: "Launch",
    badge: "🔥 Early Bird — First 100",
    price: "$49",
    sub: "/month · locked forever",
    pitch: "One new customer pays for 8 years.",
    features: [
      "Site live in 24 hours — see it before you pay",
      "Custom domain connected free",
      "AI-generated hero images (your business)",
      "Click-to-call + lead capture form",
      "Monthly SEO + PageSpeed report",
      "Google review replies — automated",
      "Unlimited edit requests",
      "30-day money-back — no questions",
    ],
    cta: "Claim Early Bird Spot →",
    href: "/auth/signup?plan=early",
    highlight: true,
  },
  {
    label: "Grow",
    badge: null,
    price: "$99",
    sub: "/month",
    pitch: "Everything in Launch, plus retention.",
    features: [
      "Everything in Launch",
      "Monthly Google Business Profile posts",
      "Competitor tracking report",
      "SMS lead follow-up automation",
      "AI Reception add-on ready (calls, SMS, bookings)",
      "Quarterly design refresh",
      "Dedicated Slack channel",
    ],
    cta: "Get started →",
    href: "/auth/signup?plan=grow",
    highlight: false,
  },
  {
    label: "Scale",
    badge: "Custom",
    price: "Let's talk",
    sub: "starting from $299/mo",
    pitch: "Multi-location. Agency. White-label.",
    features: [
      "Up to 10 locations — one dashboard",
      "White-label option (your brand, not ours)",
      "Agency reseller rights",
      "Priority build queue (24h → 6h)",
      "Dedicated account manager",
      "CRM + booking system integrations",
      "Custom AI Reception (full voice + SMS)",
      "API access to pipeline data",
    ],
    cta: "Book a call →",
    href: "mailto:hello@webcrew.app?subject=Scale%20Plan%20Enquiry",
    highlight: false,
  },
]

function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.querySelectorAll(".word-inner") ?? [], {
        yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      })
      gsap.from(cardsRef.current?.children ?? [], {
        y: 60, opacity: 0, scale: 0.96, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", display: "block", marginBottom: "12px" }}>Pricing</span>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "12px" }}>
            {splitWords("Less than one customer pays for itself")}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "17px", marginBottom: "8px" }}>No contracts. No setup fees. Cancel any time.</p>
          {/* No-brainer hook */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "999px", padding: "8px 20px", marginTop: "12px" }}>
            <span style={{ color: "#4ade80", fontSize: "13px" }}>●</span>
            <span style={{ color: "#86efac", fontSize: "13px", fontWeight: 600 }}>We build your site free. You see it live. You only pay if you love it.</span>
          </div>
        </div>

        <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px", marginTop: "48px" }}>
          {TIERS.map((tier) => (
            <div key={tier.label} style={{
              background: tier.highlight
                ? "linear-gradient(135deg,rgba(249,115,22,0.13),rgba(249,115,22,0.04))"
                : "#0f172a",
              border: tier.highlight ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px", padding: "36px 32px", position: "relative",
              boxShadow: tier.highlight ? "0 0 60px -20px rgba(249,115,22,0.3)" : "none",
            }}>
              {tier.badge && (
                <div style={{ position: "absolute", top: "-12px", left: "28px", background: tier.highlight ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(255,255,255,0.1)", color: "#fff", fontSize: "11px", fontWeight: 800, padding: "4px 14px", borderRadius: "999px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {tier.badge}
                </div>
              )}
              <div style={{ marginBottom: "6px", paddingTop: tier.badge ? "8px" : "0" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: tier.highlight ? "#fb923c" : "rgba(255,255,255,0.4)" }}>{tier.label}</span>
              </div>
              <div style={{ fontSize: tier.price === "Let's talk" ? "36px" : "52px", fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1, marginBottom: "4px" }}>
                {tier.price}<span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: 0 }}> {tier.sub}</span>
              </div>
              <p style={{ color: tier.highlight ? "rgba(251,146,60,0.8)" : "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 600, marginBottom: "24px", marginTop: "6px" }}>{tier.pitch}</p>

              <ul style={{ listStyle: "none", marginBottom: "28px", display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
                {tier.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: "10px", fontSize: "13.5px", color: "rgba(255,255,255,0.7)", alignItems: "flex-start" }}>
                    <span style={{ color: "#22c55e", fontSize: "15px", flexShrink: 0, marginTop: "1px" }}>✓</span>{f}
                  </li>
                ))}
              </ul>

              <a href={tier.href} style={{
                display: "block", textDecoration: "none", textAlign: "center",
                padding: "15px", borderRadius: "12px", fontWeight: 700, fontSize: "15px",
                background: tier.highlight ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(255,255,255,0.06)",
                border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                boxShadow: tier.highlight ? "0 8px 32px -8px rgba(249,115,22,0.5)" : "none",
              }}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "28px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.13)", borderRadius: "14px", padding: "18px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "28px" }}>🛡️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "3px" }}>30-Day Money-Back Guarantee — Zero Risk</div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", margin: 0 }}>Not happy in your first 30 days? Full refund, no questions. We take all the risk so you don't have to.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", textAlign: "left" }}>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{q}</span>
        <span style={{ color: "#f97316", fontSize: "20px", flexShrink: 0, transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <div style={{ padding: "0 24px 20px", color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.7 }}>{a}</div>}
    </div>
  )
}

function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current?.children ?? [], {
        y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 85%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: "100px 24px", maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-1px" }}>Frequently asked questions</h2>
      </div>
      <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const [email, setEmail]       = useState("")
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(innerRef.current?.children ?? [], {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: innerRef.current, start: "top 85%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: "80px 24px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Subtle glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse,rgba(249,115,22,0.08),transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div ref={innerRef} style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "20px" }}>
          Stop losing customers<br />to your competitors
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", marginBottom: "40px", lineHeight: 1.6 }}>
          Your site is already built. All you have to do is say yes.<br />
          First month free if you sign up today.
        </p>
        {submitted ? (
          <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px", padding: "20px", color: "#86efac", fontWeight: 600 }}>
            ✓ Got it! We'll email your free demo within 24 hours.
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ flex: 1, minWidth: "220px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 18px", color: "#fff", fontSize: "15px", outline: "none" }} />
            <button type="submit" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 8px 32px -8px rgba(249,115,22,0.5)" }}>
              Get my free demo →
            </button>
          </form>
        )}
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", marginTop: "16px" }}>No credit card required. See your site in 24 hours.</p>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px", background: "rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#f97316,#ea580c)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: 900 }}>W</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px" }}>WebCrew</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", marginLeft: "8px" }}>© 2026</span>
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/legal/privacy" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>Privacy Policy</Link>
          <Link href="/legal/terms"   style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>Terms of Service</Link>
          <a href="mailto:hello@webcrew.app" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>hello@webcrew.app</a>
          <Link href="/auth/signin" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "13px" }}>Client login</Link>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ background: "#030712", minHeight: "100vh" }}>
      <LoadingScreen />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <HowItWorks />
        <Demos />
        <Features />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
