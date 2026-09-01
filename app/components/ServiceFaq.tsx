"use client";

import { useState } from "react";
import type { ServiceFaq as Faq } from "../data/services";

const GOLD = "#e3af2b";

export function ServiceFaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<boolean[]>(faqs.map(() => false));

  const toggle = (i: number) => setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div style={{ borderTop: "1px solid rgba(247,245,241,.14)" }}>
      {faqs.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => toggle(i)}
            aria-expanded={open[i]}
            style={{
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              padding: "26px 4px",
              borderBottom: "1px solid rgba(247,245,241,.14)",
              background: "transparent",
              border: "none",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: "rgba(247,245,241,.14)",
              color: "#f7f5f1",
              textAlign: "left",
            }}
          >
            <span style={{ fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 22 }}>{f.q}</span>
            <span style={{ fontFamily: "var(--font-display), serif", fontSize: 26, color: GOLD, lineHeight: 1, flexShrink: 0 }}>
              {open[i] ? "−" : "+"}
            </span>
          </button>
          {open[i] && (
            <div style={{ padding: "4px 4px 28px", borderBottom: "1px solid rgba(247,245,241,.14)" }}>
              <p style={{ margin: 0, fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "rgba(247,245,241,.66)", maxWidth: 680 }}>
                {f.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
