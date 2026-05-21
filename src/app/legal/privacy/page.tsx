import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — WebCrew",
  description: "How WebCrew collects, uses, and protects your information.",
}

const S: React.CSSProperties = { color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "15px" }
const H2: React.CSSProperties = { fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginTop: "40px", marginBottom: "12px" }
const LI: React.CSSProperties = { color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "6px" }

export default function PrivacyPolicy() {
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
        <Link href="/legal/terms" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>Terms of Service →</Link>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-1px", color: "#fff", marginBottom: "8px" }}>Privacy Policy</h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "48px" }}>Last updated: May 2026</p>

        <p style={S}>
          WebCrew (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates webcrew.app. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <h2 style={H2}>1. Information We Collect</h2>
        <p style={S}>We collect information you provide directly:</p>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}><strong style={{ color: "#fff" }}>Contact info</strong> — name, email address, phone number</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Business info</strong> — business name, niche, city/location</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Payment info</strong> — processed by Stripe; we never store card numbers</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Communications</strong> — messages you send us via email or contact forms</li>
        </ul>
        <p style={{ ...S, marginTop: "16px" }}>We also automatically collect:</p>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}>IP address, browser type, device type, referring URL</li>
          <li style={LI}>Pages viewed, time spent, click behavior (via analytics)</li>
        </ul>

        <h2 style={H2}>2. How We Use Your Information</h2>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}>Build and deliver your website demo and live site</li>
          <li style={LI}>Process payments and send billing communications</li>
          <li style={LI}>Send service updates, reports, and support responses</li>
          <li style={LI}>Send SMS updates and notifications — <strong style={{ color: "#f97316" }}>only if you explicitly opt in</strong></li>
          <li style={LI}>Improve our platform and analyze usage patterns</li>
          <li style={LI}>Comply with legal obligations</li>
        </ul>

        <h2 style={H2}>3. SMS / Text Message Communications</h2>
        <p style={S}>
          We only send SMS messages to users who have explicitly opted in by checking the SMS consent box during sign-up.
          Message frequency varies. Message and data rates may apply.
        </p>
        <p style={{ ...S, marginTop: "12px" }}>
          <strong style={{ color: "#fff" }}>To opt out:</strong> Reply <strong style={{ color: "#f97316" }}>STOP</strong> to any message.
          To get help, reply <strong style={{ color: "#f97316" }}>HELP</strong> or email <a href="mailto:hello@webcrew.app" style={{ color: "#f97316", textDecoration: "none" }}>hello@webcrew.app</a>.
        </p>
        <p style={{ ...S, marginTop: "12px" }}>We do not share your phone number with third parties for their marketing purposes.</p>

        <h2 style={H2}>4. Data Sharing</h2>
        <p style={S}>We share data with:</p>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}><strong style={{ color: "#fff" }}>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" style={{ color: "#f97316", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>)</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Twilio</strong> — SMS delivery when opted in (<a href="https://www.twilio.com/en-us/legal/privacy" style={{ color: "#f97316", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">Twilio Privacy Policy</a>)</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Cloudflare</strong> — hosting and CDN (<a href="https://www.cloudflare.com/privacypolicy/" style={{ color: "#f97316", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">Cloudflare Privacy Policy</a>)</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Resend</strong> — transactional email delivery</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Google</strong> — Maps API for business data, Analytics for site usage</li>
        </ul>
        <p style={{ ...S, marginTop: "16px" }}>We do not sell your personal information to third parties.</p>

        <h2 style={H2}>5. Data Retention</h2>
        <p style={S}>
          We retain your data for as long as your account is active or as needed to provide services.
          After cancellation, data is retained for 90 days, then deleted. You may request deletion at any time.
        </p>

        <h2 style={H2}>6. Your Rights (GDPR / CCPA)</h2>
        <ul style={{ paddingLeft: "24px", marginTop: "12px" }}>
          <li style={LI}><strong style={{ color: "#fff" }}>Access</strong> — request a copy of your data</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Correction</strong> — update inaccurate data</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Deletion</strong> — request erasure of your data</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Portability</strong> — receive your data in a machine-readable format</li>
          <li style={LI}><strong style={{ color: "#fff" }}>Opt out of SMS</strong> — reply STOP to any message</li>
        </ul>
        <p style={{ ...S, marginTop: "16px" }}>Email <a href="mailto:hello@webcrew.app" style={{ color: "#f97316", textDecoration: "none" }}>hello@webcrew.app</a> to exercise any of these rights.</p>

        <h2 style={H2}>7. Cookies</h2>
        <p style={S}>
          We use minimal cookies for session management and analytics. We do not use advertising cookies or cross-site trackers.
        </p>

        <h2 style={H2}>8. Security</h2>
        <p style={S}>
          We use HTTPS/TLS, encrypted databases, and access controls to protect your data. No system is 100% secure;
          we cannot guarantee absolute security.
        </p>

        <h2 style={H2}>9. Children</h2>
        <p style={S}>
          Our services are not directed to individuals under 18. We do not knowingly collect data from children.
        </p>

        <h2 style={H2}>10. Changes</h2>
        <p style={S}>
          We may update this policy. We&apos;ll notify active customers by email. Continued use after changes = acceptance.
        </p>

        <h2 style={H2}>11. Contact</h2>
        <p style={S}>
          WebCrew<br />
          <a href="mailto:hello@webcrew.app" style={{ color: "#f97316", textDecoration: "none" }}>hello@webcrew.app</a>
        </p>

        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "24px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>← Back to home</Link>
          <Link href="/legal/terms" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>Terms of Service →</Link>
        </div>
      </div>
    </div>
  )
}
