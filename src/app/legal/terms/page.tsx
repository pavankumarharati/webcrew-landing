import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — WebCrew",
  description: "Terms and conditions for using WebCrew services.",
}

const S: React.CSSProperties = { color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "15px" }
const H2: React.CSSProperties = { fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginTop: "40px", marginBottom: "12px" }
const LI: React.CSSProperties = { color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "6px" }

export default function TermsOfService() {
  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "0 24px 80px" }}>
      {/* Nav */}
      <nav style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#f97316,#ea580c)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: 900 }}>W</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px", color: "#fff" }}>WebCrew</span>
        </Link>
        <Link href="/legal/privacy" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>Privacy Policy →</Link>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-1px", color: "#fff", marginBottom: "8px" }}>Terms of Service</h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "48px" }}>Last updated: May 2026</p>

        <p style={S}>
          These Terms of Service (&quot;Terms&quot;) govern your use of WebCrew (&quot;Service&quot;), operated by WebCrew
          (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). By using the Service, you agree to these Terms.
        </p>

        <h2 style={H2}>1. Service Description</h2>
        <p style={S}>
          WebCrew builds, hosts, and maintains professional websites for local service businesses.
          Services include website design, AI-generated content, SEO optimization, monthly reporting,
          Google review management, and related digital marketing services.
        </p>

        <h2 style={H2}>2. Eligibility</h2>
        <p style={S}>
          You must be at least 18 years old and legally authorized to enter into contracts. By using the Service
          you represent that you meet these requirements.
        </p>

        <h2 style={H2}>3. Free Demo</h2>
        <p style={S}>
          We may build a free demo website for your business using publicly available information (Google Maps data,
          your existing website if any). This demo is built before you sign up. <strong style={{ color: "#fff" }}>You are under no obligation
          to pay unless you choose to subscribe.</strong> We only charge when you explicitly agree to a paid plan.
        </p>

        <h2 style={H2}>4. Payment Terms</h2>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}>Plans are billed monthly or annually as selected</li>
          <li style={LI}>Payment is processed by Stripe. By subscribing you agree to Stripe&apos;s Terms of Service</li>
          <li style={LI}>All fees are in USD and exclusive of applicable taxes</li>
          <li style={LI}>Early Bird pricing ($49/mo) is locked for the lifetime of your subscription if subscribed during the promotional period</li>
          <li style={LI}>We reserve the right to change pricing with 30 days&apos; notice to existing customers</li>
        </ul>

        <h2 style={H2}>5. Cancellation & Refunds</h2>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}>Cancel any time — no contracts, no cancellation fees</li>
          <li style={LI}>Your site stays live through the end of the current billing period</li>
          <li style={LI}><strong style={{ color: "#fff" }}>30-day money-back guarantee</strong> — full refund if requested within 30 days of first payment, no questions asked</li>
          <li style={LI}>After cancellation, your website and all associated data will be deleted within 90 days</li>
          <li style={LI}>We do not provide refunds for partial months after the 30-day window</li>
        </ul>

        <h2 style={H2}>6. Website Ownership</h2>
        <p style={S}>
          While subscribed, you have a license to use the website we build for you. WebCrew retains ownership of
          the website design, code, and AI-generated assets. <strong style={{ color: "#fff" }}>Your business content (name, address,
          services, photos you provide) remains yours.</strong> Upon cancellation, we can provide an export of your
          content on request.
        </p>

        <h2 style={H2}>7. Your Responsibilities</h2>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}>Provide accurate business information</li>
          <li style={LI}>Ensure you have rights to any content you supply (logos, photos, text)</li>
          <li style={LI}>Keep your account credentials secure</li>
          <li style={LI}>Not use the Service for illegal purposes or to host prohibited content</li>
          <li style={LI}>Notify us promptly of any unauthorized account access</li>
        </ul>

        <h2 style={H2}>8. SMS Communications</h2>
        <p style={S}>
          If you provide a phone number and opt in to SMS during sign-up, you consent to receive transactional
          and marketing SMS from WebCrew. You can opt out at any time by replying <strong style={{ color: "#f97316" }}>STOP</strong>.
          Message and data rates may apply. Message frequency varies based on your account activity.
        </p>

        <h2 style={H2}>9. Acceptable Use</h2>
        <p style={S}>You may not use the Service to:</p>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}>Violate any applicable law or regulation</li>
          <li style={LI}>Infringe on intellectual property rights of others</li>
          <li style={LI}>Distribute spam, malware, or malicious code</li>
          <li style={LI}>Impersonate any person or entity</li>
          <li style={LI}>Interfere with or disrupt the Service infrastructure</li>
        </ul>

        <h2 style={H2}>10. Uptime & Service Levels</h2>
        <p style={S}>
          We target 99.9% uptime, leveraging Cloudflare&apos;s global CDN. We are not liable for downtime caused by
          Cloudflare, DNS providers, or force majeure events. Scheduled maintenance will be communicated in advance.
        </p>

        <h2 style={H2}>11. Limitation of Liability</h2>
        <p style={S}>
          To the maximum extent permitted by law, WebCrew&apos;s total liability for any claim arising from the Service
          is limited to the amount you paid in the 3 months preceding the claim. We are not liable for indirect,
          incidental, consequential, or punitive damages.
        </p>

        <h2 style={H2}>12. Disclaimer of Warranties</h2>
        <p style={S}>
          The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee specific SEO
          rankings, lead volume, or business outcomes. Results vary by market, competition, and business factors
          outside our control.
        </p>

        <h2 style={H2}>13. Indemnification</h2>
        <p style={S}>
          You agree to indemnify and hold WebCrew harmless from any claims, losses, or expenses (including
          attorney fees) arising from your use of the Service, violation of these Terms, or infringement of
          any third-party rights.
        </p>

        <h2 style={H2}>14. Governing Law</h2>
        <p style={S}>
          These Terms are governed by the laws of the State of California, USA. Disputes will be resolved
          in the courts of California.
        </p>

        <h2 style={H2}>15. Changes to Terms</h2>
        <p style={S}>
          We may update these Terms with 30 days&apos; notice to active customers. Continued use after notice
          constitutes acceptance of the updated Terms.
        </p>

        <h2 style={H2}>16. Contact</h2>
        <p style={S}>
          WebCrew<br />
          <a href="mailto:hello@webcrew.app" style={{ color: "#f97316", textDecoration: "none" }}>hello@webcrew.app</a>
        </p>

        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "24px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>← Back to home</Link>
          <Link href="/legal/privacy" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>Privacy Policy →</Link>
        </div>
      </div>
    </div>
  )
}
