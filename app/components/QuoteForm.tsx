"use client";

import { useState, useTransition } from "react";
import { sendQuoteLead } from "../actions/sendQuoteLead";
import { PRIMARY_PHONE } from "../data/company";

const GOLD = "#e3af2b";

const SERVICE_OPTIONS = [
  "Kitchens & Bathrooms",
  "TV Walls & Lighting Panels",
  "Flooring & Tiling",
  "Legal Basements",
  "Custom Carpentry & Millwork",
  "Not sure yet / Whole-home Renovation",
];

const inputStyle = {
  width: "100%",
  background: "#14120f",
  border: "1px solid rgba(247,245,241,.18)",
  color: "#f7f5f1",
  fontFamily: "var(--font-sans), sans-serif",
  fontWeight: 300,
  fontSize: 15,
  padding: "16px 18px",
  outline: "none",
  transition: "border-color .2s",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  fontWeight: 300,
  fontSize: 11,
  letterSpacing: ".2em",
  textTransform: "uppercase" as const,
  color: "rgba(247,245,241,.65)",
  marginBottom: 8,
};

type QuoteFormProps = {
  source?: string;
  defaultService?: string;
};

export function QuoteForm({ source = "website", defaultService }: QuoteFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService || SERVICE_OPTIONS[0],
    details: "",
    website_hp: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("service", formData.service);
    payload.append("details", formData.details);
    payload.append("source", source);
    payload.append("website_hp", formData.website_hp);

    startTransition(async () => {
      try {
        const res = await sendQuoteLead(payload);
        if (res.success) {
          setSubmitted(true);
        } else {
          setErrorMessage(res.error || "An unexpected error occurred. Please call us directly.");
        }
      } catch (err) {
        setErrorMessage("Network error sending your request. Please call " + PRIMARY_PHONE.display);
      }
    });
  };

  if (submitted) {
    return (
      <div
        style={{
          border: "1px solid rgba(227,175,43,.4)",
          background: "rgba(227,175,43,.04)",
          padding: "48px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(227,175,43,.15)",
            border: `1px solid ${GOLD}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: GOLD,
            fontSize: 22,
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display), serif",
            fontWeight: 300,
            fontSize: 32,
            margin: "0 0 16px",
            color: "#f7f5f1",
          }}
        >
          Quote Request Received
        </h3>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(247,245,241,.8)",
            margin: "0 0 24px",
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Thank you, <strong style={{ color: "#f7f5f1" }}>{formData.name}</strong>. We have received your project details
          for <strong style={{ color: GOLD }}>{formData.service}</strong>.
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(247,245,241,.1)",
            paddingTop: 20,
            marginTop: 20,
            fontSize: 13,
            color: "rgba(247,245,241,.65)",
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: GOLD }}>Our Commitment:</strong> We reply to all inquiries within{" "}
            <strong style={{ color: "#f7f5f1" }}>one business day</strong>.
          </p>
          <p style={{ margin: 0 }}>
            Need an immediate answer? Call the owner directly at{" "}
            <a href={PRIMARY_PHONE.href} style={{ color: GOLD, textDecoration: "underline" }}>
              {PRIMARY_PHONE.display}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        background: "#0c0a08",
        border: "1px solid rgba(247,245,241,.1)",
        padding: "40px 36px",
      }}
    >
      {/* Honeypot hidden input for spam bots */}
      <input
        type="text"
        name="website_hp"
        value={formData.website_hp}
        onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
        style={{ display: "none", position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {errorMessage && (
        <div
          role="alert"
          style={{
            background: "rgba(255, 72, 72, 0.12)",
            border: "1px solid rgba(255, 110, 110, 0.5)",
            color: "#ff9d9d",
            padding: "14px 18px",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor={`name-${source}`} style={labelStyle}>
          Your Name <span style={{ color: GOLD }}>*</span>
        </label>
        <input
          id={`name-${source}`}
          type="text"
          required
          placeholder="e.g. Sarah Jenkins"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={inputStyle}
          disabled={isPending}
        />
      </div>

      {/* Email & Phone Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
        <div>
          <label htmlFor={`email-${source}`} style={labelStyle}>
            Email Address <span style={{ color: GOLD }}>*</span>
          </label>
          <input
            id={`email-${source}`}
            type="email"
            required
            placeholder="sarah@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor={`phone-${source}`} style={labelStyle}>
            Phone Number <span style={{ fontSize: 10, opacity: 0.6 }}>(Optional)</span>
          </label>
          <input
            id={`phone-${source}`}
            type="tel"
            placeholder="613-555-0199"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={inputStyle}
            disabled={isPending}
          />
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor={`service-${source}`} style={labelStyle}>
          Service Category <span style={{ color: GOLD }}>*</span>
        </label>
        <select
          id={`service-${source}`}
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          style={{ ...inputStyle, cursor: "pointer" }}
          disabled={isPending}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#14120f", color: "#f7f5f1" }}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor={`details-${source}`} style={labelStyle}>
          Project Scope &amp; Rough Timing
        </label>
        <textarea
          id={`details-${source}`}
          rows={4}
          placeholder="Describe room dimensions, ideas, or questions (e.g. kitchen remodel in Westboro, aiming for spring)..."
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          style={{ ...inputStyle, resize: "vertical" }}
          disabled={isPending}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="gold-btn"
        style={{
          cursor: isPending ? "not-allowed" : "pointer",
          background: isPending ? "rgba(227,175,43,.5)" : GOLD,
          color: "#0a0908",
          border: "none",
          fontFamily: "var(--font-sans), sans-serif",
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          padding: "20px 32px",
          marginTop: 6,
          transition: "all .25s ease",
        }}
      >
        {isPending ? "Sending Request..." : "Request a Quote &rarr;"}
      </button>

      {/* Response Guarantee Notice */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: ".08em",
          color: "rgba(247,245,241,.5)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        🔒 No spam. We reply within <strong>one business day</strong> with a clear, fixed quote.
      </div>
    </form>
  );
}
