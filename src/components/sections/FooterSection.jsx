// ─── FooterSection ────────────────────────────────────────────────────────────
//

import { useForm, ValidationError } from "@formspree/react";
import { formspreeId }              from "../../constants/contact";

// ─── ContactForm ──────────────────────────────────────────────────────────────
function ContactForm({ activeTheme }) {
  const [state, handleSubmit] = useForm(formspreeId);

  // ── Shared input style — reads from activeTheme ──────────────────────────
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: `1px solid ${activeTheme.badgeBorderColor}`,
    background: activeTheme.badgeBg,
    color: activeTheme.primaryNameColor,
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: activeTheme.navLinkColor,
    marginBottom: 6,
    display: "block",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  };

  const errorStyle = {
    fontSize: 11,
    color: activeTheme.accentNameColor,
    marginTop: 4,
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (state.succeeded) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          borderRadius: 16,
          border: `1px solid ${activeTheme.badgeBorderColor}`,
          background: activeTheme.badgeBg,
          maxWidth: 520,
          width: "100%",
        }}
      >
        <p style={{ fontSize: 20, marginBottom: 8 }} aria-hidden="true">✓</p>
        <p style={{ fontSize: 15, fontWeight: 600, color: activeTheme.primaryNameColor, margin: 0 }}>
          Message sent
        </p>
        <p style={{ fontSize: 13, color: activeTheme.navLinkColor, marginTop: 6 }}>
          I'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
      aria-label="Contact form"
      noValidate
    >
      {/* ── Honeypot — hidden from humans, catches bots ── */}
      <input autoComplete="off"
        type="text"
        name="_gotcha"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: "none" }}
      />

      {/* ── Name and Email side by side ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

        {/* Name */}
        <div style={fieldStyle}>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input autoComplete="name"
            id="name"
            type="text"
            name="name"
            placeholder="Abraham Ogundare"
            required
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = activeTheme.accentNameColor)}
            onBlur={(e)  => (e.currentTarget.style.borderColor = activeTheme.badgeBorderColor)}
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} style={errorStyle} />
        </div>

        {/* Email */}
        <div style={fieldStyle}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input autoComplete="email"
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = activeTheme.accentNameColor)}
            onBlur={(e)  => (e.currentTarget.style.borderColor = activeTheme.badgeBorderColor)}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} style={errorStyle} />
        </div>
      </div>

      {/* ── Subject ── */}
      <div style={fieldStyle}>
        <label htmlFor="subject" style={labelStyle}>Subject</label>
        <input autoComplete="off"
          id="subject"
          type="text"
          name="subject"
          placeholder="Job opportunity / Collaboration / General enquiry"
          required
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = activeTheme.accentNameColor)}
          onBlur={(e)  => (e.currentTarget.style.borderColor = activeTheme.badgeBorderColor)}
        />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} style={errorStyle} />
      </div>

      {/* ── Message ── */}
      <div style={fieldStyle}>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about the opportunity or project..."
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          onFocus={(e) => (e.currentTarget.style.borderColor = activeTheme.accentNameColor)}
          onBlur={(e)  => (e.currentTarget.style.borderColor = activeTheme.badgeBorderColor)}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} style={errorStyle} />
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={state.submitting}
        style={{
          padding: "12px 28px",
          borderRadius: 10,
          border: "none",
          background: state.submitting ? activeTheme.badgeBg : activeTheme.primaryBtnBg,
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: state.submitting ? "not-allowed" : "pointer",
          opacity: state.submitting ? 0.6 : 1,
          boxShadow: state.submitting ? "none" : `0 4px 14px ${activeTheme.primaryBtnShadow}`,
          transition: "opacity 0.2s ease, box-shadow 0.2s ease",
          alignSelf: "flex-start",
        }}
        aria-label={state.submitting ? "Sending message..." : "Send message"}
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

// ─── FooterSection ────────────────────────────────────────────────────────────
export function FooterSection({ activeTheme, isDarkMode }) {
  return (
    <footer
      aria-label="Contact and footer"
      style={{
        position: "relative",
        width: "100%",
        padding: "5rem 2rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        background: "transparent",
      }}
    >
      {/* Divider */}
      <div
        aria-hidden="true"
        style={{
          width: 120,
          height: 2,
          borderRadius: 999,
          background: activeTheme.dividerGradient,
        }}
      />

      {/* Heading */}
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: activeTheme.primaryNameColor,
          margin: 0,
          textAlign: "center",
        }}
      >
        Let's Build Something Great
      </h2>

      {/* Contact form */}
      <ContactForm activeTheme={activeTheme} />

      {/* Copyright */}
      <p
        style={{
          fontSize: 12,
          color: activeTheme.navLinkColor,
          margin: "1rem 0 0",
          textAlign: "center",
          letterSpacing: "0.03em",
        }}
      >
        © 2026 Abraham Ogundare
      </p>
    </footer>
  );
}
