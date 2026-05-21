import type { Metadata } from "next"
import "./globals.css"
import ScrollProgress from "@/components/scroll-progress"
import Cursor from "@/components/cursor"

export const metadata: Metadata = {
  title: "WebCrew — AI-Powered Websites for Local Businesses",
  description:
    "We build fast, professional websites for HVAC, roofing, dental, and other local service businesses. Up in 24 hours. Starting at $49/month.",
  keywords: "local business website, HVAC website, roofing website, AI website builder, small business website",
  openGraph: {
    title: "WebCrew — AI-Powered Websites for Local Businesses",
    description: "Professional websites built for local service businesses. $49/month. Live in 24 hours.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#030712", color: "#fff", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
