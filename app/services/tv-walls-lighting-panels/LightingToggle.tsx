"use client";

import { useState, useCallback, useId } from "react";
import { DraftTag } from "../../components/DraftTag";

import { GOLD } from "../../data/theme";

interface LightingToggleProps {
  initialMode?: "daylight" | "cinema" | "evening";
}

export function LightingToggle({ initialMode = "evening" }: LightingToggleProps) {
  // Lighting level from 0 (off / daylight) to 100 (full warm evening backlighting)
  const [level, setLevel] = useState<number>(initialMode === "daylight" ? 0 : initialMode === "cinema" ? 45 : 100);
  const [activePreset, setActivePreset] = useState<"daylight" | "cinema" | "evening">(initialMode);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  const sliderId = useId();

  const handlePreset = useCallback((preset: "daylight" | "cinema" | "evening") => {
    setActivePreset(preset);
    if (preset === "daylight") setLevel(0);
    else if (preset === "cinema") setLevel(45);
    else setLevel(100);
  }, []);

  const handleSliderChange = useCallback((newLevel: number) => {
    setLevel(newLevel);
    if (newLevel <= 10) setActivePreset("daylight");
    else if (newLevel >= 80) setActivePreset("evening");
    else setActivePreset("cinema");
  }, []);

  // Opacity and intensity helpers
  const glowOpacity = level / 100;
  const isDarkAtmosphere = level > 25;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1180,
        margin: "0 auto",
        background: "#080706",
        border: "1px solid rgba(247, 245, 241, 0.12)",
        position: "relative",
        boxShadow: "0 24px 64px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Top Header / Control Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: "24px 32px",
          borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
          background: "#0d0b09",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 4,
            }}
          >
            <span>Interactive Lighting Simulation</span>
            <DraftTag needs="owner's on/off photography pair per shot list" />
          </div>
          <div
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(20px, 2.4vw, 26px)",
              color: "#f7f5f1",
              fontWeight: 300,
            }}
          >
            Daylight Ambient vs. Concealed 2700K Architectural LED
          </div>
        </div>

        {/* Preset Controls */}
        <div
          role="group"
          aria-label="Lighting scene presets"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: 4,
            background: "#050404",
            border: "1px solid rgba(247, 245, 241, 0.12)",
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => handlePreset("daylight")}
            aria-pressed={activePreset === "daylight"}
            style={{
              cursor: "pointer",
              padding: "10px 18px",
              background: activePreset === "daylight" ? "rgba(247, 245, 241, 0.12)" : "transparent",
              color: activePreset === "daylight" ? "#f7f5f1" : "rgba(247, 245, 241, 0.6)",
              border: activePreset === "daylight" ? "1px solid rgba(247, 245, 241, 0.25)" : "1px solid transparent",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: activePreset === "daylight" ? 500 : 300,
              transition: "all .2s ease",
            }}
          >
            Daylight Off
          </button>

          <button
            type="button"
            onClick={() => handlePreset("cinema")}
            aria-pressed={activePreset === "cinema"}
            style={{
              cursor: "pointer",
              padding: "10px 18px",
              background: activePreset === "cinema" ? "rgba(227, 175, 43, 0.16)" : "transparent",
              color: activePreset === "cinema" ? GOLD : "rgba(247, 245, 241, 0.6)",
              border: activePreset === "cinema" ? "1px solid rgba(227, 175, 43, 0.4)" : "1px solid transparent",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: activePreset === "cinema" ? 500 : 300,
              transition: "all .2s ease",
            }}
          >
            Cinema 45%
          </button>

          <button
            type="button"
            onClick={() => handlePreset("evening")}
            aria-pressed={activePreset === "evening"}
            style={{
              cursor: "pointer",
              padding: "10px 18px",
              background: activePreset === "evening" ? GOLD : "transparent",
              color: activePreset === "evening" ? "#0a0908" : "rgba(247, 245, 241, 0.6)",
              border: "1px solid transparent",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: activePreset === "evening" ? 600 : 300,
              transition: "all .2s ease",
            }}
          >
            2700K Glow 100%
          </button>
        </div>
      </div>

      {/* Interactive Visual Stage */}
      <div
        style={{
          position: "relative",
          minHeight: 460,
          background: isDarkAtmosphere
            ? `radial-gradient(ellipse at 50% 35%, rgba(26, 20, 14, 0.95) 0%, #030302 100%)`
            : `radial-gradient(ellipse at 50% 35%, rgba(45, 41, 37, 0.4) 0%, #080706 100%)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "54px 28px 48px",
          transition: "background 0.5s ease",
        }}
      >
        {/* Soft Ambient Wall Glow Layer behind entire millwork assembly */}
        <div
          style={{
            position: "absolute",
            inset: "10% 8%",
            background: `radial-gradient(ellipse at 50% 45%, rgba(227, 175, 43, ${glowOpacity * 0.42}) 0%, rgba(243, 196, 88, ${glowOpacity * 0.18}) 42%, transparent 75%)`,
            filter: "blur(42px)",
            opacity: glowOpacity > 0 ? 1 : 0,
            transition: "opacity 0.45s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Outer Perimeter LED Glow Blades (Left and Right Flanks) */}
        <div
          style={{
            position: "absolute",
            top: "14%",
            bottom: "22%",
            left: "calc(50% - 370px)",
            width: 80,
            background: `linear-gradient(90deg, transparent 0%, rgba(227, 175, 43, ${glowOpacity * 0.7}) 100%)`,
            filter: "blur(18px)",
            opacity: glowOpacity,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14%",
            bottom: "22%",
            right: "calc(50% - 370px)",
            width: 80,
            background: `linear-gradient(270deg, transparent 0%, rgba(227, 175, 43, ${glowOpacity * 0.7}) 100%)`,
            filter: "blur(18px)",
            opacity: glowOpacity,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* The Architectural Millwork Elevation Container */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: 760,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Slat Wall Main Board with TV & Soundbar */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 310,
              background: "#12100e",
              border: "1px solid rgba(247, 245, 241, 0.14)",
              boxShadow: glowOpacity > 0
                ? `0 0 ${glowOpacity * 36}px rgba(227, 175, 43, ${glowOpacity * 0.38}), 0 16px 38px rgba(0,0,0,0.85)`
                : "0 16px 38px rgba(0,0,0,0.85)",
              transition: "box-shadow 0.45s ease",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Acoustic Slat Texture Pattern (White Oak vertical battens over black PET felt) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(90deg, #1b1713 0px, #1b1713 14px, #0a0908 14px, #0a0908 24px)`,
                opacity: 0.88,
              }}
            />

            {/* Subtle warmth bounce on slats when LED is illuminated */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, rgba(227, 175, 43, ${glowOpacity * 0.16}) 0%, transparent 40%, rgba(227, 175, 43, ${glowOpacity * 0.18}) 100%)`,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
              }}
            />

            {/* Center Stone/Sintered Accent Centerband */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "60%",
                background: "#0f0e0c",
                borderLeft: "1px solid rgba(227, 175, 43, 0.25)",
                borderRight: "1px solid rgba(227, 175, 43, 0.25)",
                boxShadow: "0 0 24px rgba(0, 0, 0, 0.6)",
                backgroundImage: `radial-gradient(circle at 50% 40%, #171512 0%, #0d0c0a 100%)`,
              }}
            />

            {/* TV Unit (77" Flush Architectural Display) */}
            <div
              style={{
                position: "relative",
                zIndex: 4,
                width: "52%",
                height: 175,
                background: "#030303",
                border: "2px solid #1a1816",
                boxShadow: glowOpacity > 0
                  ? `0 0 ${glowOpacity * 24}px rgba(227, 175, 43, ${glowOpacity * 0.4}), 0 12px 28px rgba(0,0,0,0.9)`
                  : "0 10px 24px rgba(0,0,0,0.85)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "box-shadow 0.45s ease",
                overflow: "hidden",
              }}
            >
              {/* Screen Ambient Wallpaper Graphic */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDarkAtmosphere
                    ? "radial-gradient(circle at 50% 60%, rgba(42, 33, 24, 0.8) 0%, #040404 90%)"
                    : "radial-gradient(circle at 50% 60%, rgba(70, 65, 58, 0.4) 0%, #080808 90%)",
                  transition: "background 0.5s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "rgba(247, 245, 241, 0.7)",
                    letterSpacing: ".04em",
                  }}
                >
                  SS Architectural Display
                </div>
                <div
                  style={{
                    fontSize: 9.5,
                    letterSpacing: ".26em",
                    textTransform: "uppercase",
                    color: "rgba(227, 175, 43, 0.85)",
                    marginTop: 4,
                  }}
                >
                  Zero Visible Cables · Flush Mount
                </div>
              </div>

              {/* Status Indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: 6,
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: level > 0 ? GOLD : "rgba(247, 245, 241, 0.3)",
                  boxShadow: level > 0 ? `0 0 6px ${GOLD}` : "none",
                }}
              />
            </div>

            {/* Recessed Soundbar Niche */}
            <div
              style={{
                position: "relative",
                zIndex: 4,
                width: "36%",
                height: 18,
                marginTop: 12,
                background: "#080706",
                border: "1px solid rgba(247, 245, 241, 0.12)",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: 6,
                  background: "#141311",
                  borderRadius: 1,
                  border: "1px solid rgba(247, 245, 241, 0.05)",
                }}
              />
            </div>

            {/* Interactive Detail Hotspots */}
            <button
              type="button"
              onClick={() => setActiveAnnotation(activeAnnotation === "led" ? null : "led")}
              aria-label="Highlight 45-degree aluminum LED channel details"
              style={{
                position: "absolute",
                top: 15,
                right: 19,
                zIndex: 6,
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeAnnotation === "led" ? GOLD : "rgba(0, 0, 0, 0.75)",
                  color: activeAnnotation === "led" ? "#000" : GOLD,
                  border: `1px solid ${GOLD}`,
                  fontSize: 11,
                  fontWeight: 600,
                  transition: "all .2s ease",
                }}
              >
                1
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAnnotation(activeAnnotation === "slats" ? null : "slats")}
              aria-label="Highlight acoustic oak slats and felt backing details"
              style={{
                position: "absolute",
                top: 15,
                left: 19,
                zIndex: 6,
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeAnnotation === "slats" ? GOLD : "rgba(0, 0, 0, 0.75)",
                  color: activeAnnotation === "slats" ? "#000" : GOLD,
                  border: `1px solid ${GOLD}`,
                  fontSize: 11,
                  fontWeight: 600,
                  transition: "all .2s ease",
                }}
              >
                2
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAnnotation(activeAnnotation === "conduit" ? null : "conduit")}
              aria-label="Highlight concealed in-wall conduit chase"
              style={{
                position: "absolute",
                bottom: 15,
                zIndex: 6,
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeAnnotation === "conduit" ? GOLD : "rgba(0, 0, 0, 0.75)",
                  color: activeAnnotation === "conduit" ? "#000" : GOLD,
                  border: `1px solid ${GOLD}`,
                  fontSize: 11,
                  fontWeight: 600,
                  transition: "all .2s ease",
                }}
              >
                3
              </span>
            </button>
          </div>

          {/* Wall-Hung Floating Media Credenza */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              width: "88%",
              height: 48,
              marginTop: 18,
              background: "#181410",
              border: "1px solid rgba(227, 175, 43, 0.35)",
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            {/* Waterfall Edge Profile Lines */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, opacity: 0.6 }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "rgba(247, 245, 241, 0.75)",
                }}
              >
                Floating Oak Credenza · 45° Mitred Edge
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveAnnotation(activeAnnotation === "driver" ? null : "driver")}
              aria-label="Highlight concealed driver bay"
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeAnnotation === "driver" ? GOLD : "rgba(0,0,0,0.6)",
                  color: activeAnnotation === "driver" ? "#000" : GOLD,
                  border: `1px solid ${GOLD}`,
                  fontSize: 10,
                  fontWeight: 600,
                  transition: "all .2s ease",
                }}
              >
                4
              </span>
            </button>
          </div>

          {/* Under-Console Downward Floor Wash Glow */}
          <div
            style={{
              position: "relative",
              width: "74%",
              height: 38,
              background: `radial-gradient(ellipse at 50% 0%, rgba(227, 175, 43, ${glowOpacity * 0.85}) 0%, rgba(243, 196, 88, ${glowOpacity * 0.35}) 45%, transparent 75%)`,
              filter: "blur(12px)",
              opacity: glowOpacity,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Dynamic Annotation Callout Card */}
        {activeAnnotation && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 28,
              right: 28,
              zIndex: 10,
              background: "#0c0a09",
              border: `1px solid ${GOLD}`,
              padding: "16px 20px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
              boxShadow: "0 16px 36px rgba(0,0,0,0.85)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 4,
                }}
              >
                {activeAnnotation === "led" && "01. Concealed LED Channels"}
                {activeAnnotation === "slats" && "02. Acoustic Slat Assembly"}
                {activeAnnotation === "conduit" && "03. In-Wall Cable Routing"}
                {activeAnnotation === "driver" && "04. Concealed 24V Driver Bay"}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(247, 245, 241, 0.85)",
                }}
              >
                {activeAnnotation === "led" &&
                  "45° recessed aluminum extrusions with opal silicone diffusers deliver a uniform 2700K warm glow with zero visible diodes or hot spots."}
                {activeAnnotation === "slats" &&
                  "Hand-finished white oak or walnut battens on 9mm recycled PET felt absorb ambient flutter echo while delivering rich architectural depth."}
                {activeAnnotation === "conduit" &&
                  "Dual separated conduit chases isolate high-voltage power from HDMI 2.1 and optical audio lines, guaranteeing 100% hidden wires."}
                {activeAnnotation === "driver" &&
                  "Serviceable low-voltage Class-2 power supply safely concealed inside the floating cabinet with passive ventilation and Lutron smart dimming."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveAnnotation(null)}
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "none",
                color: "rgba(247, 245, 241, 0.6)",
                fontSize: 18,
                padding: "0 4px",
                lineHeight: 1,
              }}
              aria-label="Close callout"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Bottom Tactile Dimmer Slider Bar */}
      <div
        style={{
          padding: "24px 32px",
          borderTop: "1px solid rgba(247, 245, 241, 0.08)",
          background: "#0c0a09",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ flex: "1 1 300px", display: "flex", alignItems: "center", gap: 18 }}>
          <label
            htmlFor={sliderId}
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 11,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "rgba(247, 245, 241, 0.7)",
              minWidth: 130,
            }}
          >
            Dimmer Level: <span style={{ color: GOLD, fontWeight: 500 }}>{level}%</span>
          </label>

          <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
            <input
              id={sliderId}
              type="range"
              min="0"
              max="100"
              step="1"
              value={level}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              aria-label="Concealed LED lighting intensity"
              style={{
                width: "100%",
                height: 4,
                WebkitAppearance: "none",
                appearance: "none",
                background: `linear-gradient(90deg, ${GOLD} ${level}%, rgba(247, 245, 241, 0.15) ${level}%)`,
                outline: "none",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* Live Lighting Specs / Note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 12,
            fontWeight: 300,
            color: "rgba(247, 245, 241, 0.6)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: level > 0 ? GOLD : "rgba(247, 245, 241, 0.3)",
                boxShadow: level > 0 ? `0 0 8px ${GOLD}` : "none",
              }}
            />
            {level === 0 ? "Natural Ambient Mode" : "2700K Warm Architectural Glow"}
          </span>
          <span style={{ color: "rgba(247, 245, 241, 0.3)" }}>|</span>
          <span>90+ CRI High-Fidelity Diodes</span>
        </div>
      </div>
    </div>
  );
}
