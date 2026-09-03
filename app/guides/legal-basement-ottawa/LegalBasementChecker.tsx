"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { PRIMARY_PHONE } from "../../data/company";

import { GOLD } from "../../data/theme";

type Question = {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
  }[];
};

const QUESTIONS: Question[] = [
  {
    id: "ceilingHeight",
    title: "1. Clear Ceiling Height",
    subtitle:
      "Measured from the finished concrete floor to the underside of ceiling joists or lowest ductwork.",
    options: [
      {
        label: "Under 6'4\" (below 1.95 m)",
        description: "Below the mandatory Ontario Building Code Compliance Alternative 102 threshold.",
        value: "under-6-4",
      },
      {
        label: "6'4\" to 6'8\" (1.95 m to 2.03 m)",
        description: "Meets the Ontario Building Code 1.95 m (6' 4¾\") baseline for basement suites.",
        value: "6-4-to-6-8",
      },
      {
        label: "6'8\" or higher (2.03 m+)",
        description: "Generous height; comfortably exceeds minimum basement headroom requirements.",
        value: "over-6-8",
      },
      {
        label: "Not sure / Need measurement",
        description: "Ceiling has ducts, drop ceilings, or uneven spots that require laser verification.",
        value: "not-sure",
      },
    ],
  },
  {
    id: "egressWindow",
    title: "2. Bedroom Egress Windows",
    subtitle:
      "Every basement bedroom requires an unobstructed escape window (min 0.38 m² / 4.1 sq ft clear opening).",
    options: [
      {
        label: "Large existing window with window well",
        description: "Appears close to or exceeds 0.38 m² openable area with outdoor clearance.",
        value: "large-window",
      },
      {
        label: "Small standard slider or hopper window",
        description: "Typical older basement window; will require concrete saw-cutting and a new well.",
        value: "small-window",
      },
      {
        label: "No window in proposed bedroom space",
        description: "Requires cutting a new foundation opening, structural lintel, and drainage well.",
        value: "no-window",
      },
    ],
  },
  {
    id: "entrance",
    title: "3. Suite Entrance & Access",
    subtitle:
      "Ottawa secondary suites require ground-floor separate access or code-compliant exterior travel.",
    options: [
      {
        label: "Existing exterior door / Walkout to grade",
        description: "Independent entrance directly to the outdoors already exists.",
        value: "existing-door",
      },
      {
        label: "Walk-up space available on lot",
        description: "Sufficient side or rear yard space exists to excavate an exterior stairwell.",
        value: "walkup-possible",
      },
      {
        label: "Interior stairs only (shared front/side vestibule)",
        description: "Access currently relies on shared interior stairs from the main house entry.",
        value: "interior-only",
      },
    ],
  },
  {
    id: "homeType",
    title: "4. Home Structure Type",
    subtitle:
      "Dwelling configuration determines exterior setback options and party-wall fire ratings.",
    options: [
      {
        label: "Single detached",
        description: "Standalone home with yard access on multiple sides.",
        value: "detached",
      },
      {
        label: "Semi-detached",
        description: "Shares one structural demising wall with a neighbouring property.",
        value: "semi-detached",
      },
      {
        label: "Row townhouse",
        description: "Interior or end-row unit with shared side walls and narrower lot width.",
        value: "townhouse",
      },
      {
        label: "Duplex / Multi-unit",
        description: "Existing multi-unit building with established separate tenancies.",
        value: "duplex",
      },
    ],
  },
  {
    id: "utilities",
    title: "5. Water & Wastewater Services",
    subtitle:
      "Ottawa permits up to 2 ADUs on city services, but limits private septic lots to 1 additional unit.",
    options: [
      {
        label: "City municipal water & sewer",
        description: "Full municipal servicing; permits up to two additional dwelling units.",
        value: "municipal",
      },
      {
        label: "Private well & septic system",
        description: "Limited to 1 additional unit; septic capacity review required by Ottawa Septic Office.",
        value: "septic",
      },
    ],
  },
  {
    id: "basementState",
    title: "6. Current Basement Condition",
    subtitle:
      "Starting condition informs permit category, demolition needs, and inspection scope.",
    options: [
      {
        label: "Unfinished concrete",
        description: "Exposed foundation, studs, and subfloor overhead; straightforward blank canvas.",
        value: "unfinished",
      },
      {
        label: "Partially finished",
        description: "Recreation room or drywalled areas requiring partial opening for trade rough-ins.",
        value: "partially-finished",
      },
      {
        label: "Older existing suite (finished/previously rented)",
        description: "Finished suite requiring Change of Use permit and Fire Code / OBC alignment.",
        value: "existing-suite",
      },
    ],
  },
];

type Outcome = {
  tier: "promising" | "viable-with-work" | "structural-work";
  heading: string;
  badge: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  summary: string;
  details: {
    positive: string[];
    actionItems: string[];
  };
};

function calculateOutcome(answers: Record<string, string>): Outcome {
  const height = answers.ceilingHeight;
  const windowAnswer = answers.egressWindow;
  const entrance = answers.entrance;
  const services = answers.utilities;

  // Severe blocker: ceiling under 6'4" requires major structural lowering/underpinning
  if (height === "under-6-4") {
    return {
      tier: "structural-work",
      heading: "Unlikely without major structural work",
      badge: "Major Structural Scope",
      badgeBg: "rgba(180, 40, 40, 0.12)",
      badgeBorder: "rgba(220, 80, 80, 0.4)",
      badgeColor: "#f87171",
      summary:
        "Ontario Building Code (Compliance Alternative 102) strictly requires a minimum 1.95 m (6' 4¾\") clear ceiling height over the entire required floor area and route to the exit. At under 6'4\", this property cannot achieve legal status without underpinning the foundation walls or bench-footing and excavating the concrete slab.",
      details: {
        positive: [
          services === "municipal"
            ? "Municipal water and sewer permits up to two additional dwelling units."
            : "Lot zoning permits secondary unit exploration.",
          entrance === "existing-door"
            ? "Direct exterior ground access is already present."
            : "Layout planning can address secondary suite circulation.",
        ],
        actionItems: [
          "A licensed structural engineer must evaluate footing depth and soil conditions for underpinning or benching.",
          "Floor lowering requires breaking the existing concrete slab, excavating earth, and pouring a new reinforced slab.",
          "Alternative option: examine whether finishing the basement for personal family use (which does not carry secondary suite rental height minimums) better matches your budget.",
        ],
      },
    };
  }

  // Intermediate tier: ceiling is viable, but specific physical modifications are required
  const needsWindowCutting = windowAnswer === "small-window" || windowAnswer === "no-window";
  const needsSepticCheck = services === "septic";
  const needsWalkup = entrance === "walkup-possible" || entrance === "interior-only";
  const heightUnconfirmed = height === "not-sure";

  if (needsWindowCutting || needsSepticCheck || needsWalkup || heightUnconfirmed) {
    return {
      tier: "viable-with-work",
      heading: "Worth a look",
      badge: "Viable with planned modifications",
      badgeBg: "rgba(227, 175, 43, 0.12)",
      badgeBorder: "rgba(227, 175, 43, 0.45)",
      badgeColor: GOLD,
      summary:
        "Your basement has a viable path to legal secondary suite status, but will require specific site modifications to satisfy the Ontario Building Code and City of Ottawa regulations.",
      details: {
        positive: [
          height === "6-4-to-6-8" || height === "over-6-8"
            ? "Existing headroom appears to clear the 1.95 m (6' 4¾\") minimum height threshold."
            : "Potential headroom exists, subject to laser-measuring ductwork clearance.",
          services === "municipal"
            ? "Municipal servicing supports legal secondary dwelling units under Ottawa by-laws."
            : "Private services permit one additional dwelling unit, pending septic review.",
        ],
        actionItems: [
          needsWindowCutting
            ? "Concrete saw-cutting is needed to install a compliant 0.38 m² (4.1 sq ft) bedroom egress window and window well."
            : "Verify bedroom window clear opening dimensions against 460 mm (18\") minimum width/height.",
          needsSepticCheck
            ? "Submit septic evaluation to the Ottawa Septic Office to verify reserve wastewater capacity for the added bedroom."
            : "Confirm property boundary setbacks for exterior ground-floor access.",
          needsWalkup
            ? "Design an exterior walk-up stairwell with frost footings and area drain, or obtain City approval for interior travel."
            : "Map mechanical bulkheads to verify continuous 1.95 m headroom along the entire path of travel.",
        ],
      },
    };
  }

  // Best tier: baseline geometry is highly promising
  return {
    tier: "promising",
    heading: "Looks promising",
    badge: "Meets key baseline geometry",
    badgeBg: "rgba(46, 125, 50, 0.15)",
    badgeBorder: "rgba(76, 175, 80, 0.45)",
    badgeColor: "#4ade80",
    summary:
      "Your basement meets the key baseline geometric requirements under the 2024 Ontario Building Code (O. Reg. 163/24) and City of Ottawa standards. Headroom, egress, and access all align with standard compliance pathways.",
    details: {
      positive: [
        "Reported ceiling height exceeds the 1.95 m (6' 4¾\") clear requirement over required floor space.",
        "Existing window geometry appears capable of meeting the 0.38 m² (4.1 sq ft) escape criteria.",
        "Independent ground-floor access is already established.",
        "Municipal servicing allows up to two additional dwelling units under Ottawa planning rules.",
      ],
      actionItems: [
        "Book an on-site feasibility inspection to measure clearances beneath duct bulkheads and plumbing drops.",
        "Assess soundproofing and 30-minute fire separation assemblies (or 15-minute with interconnected CAN/ULC S531 alarms).",
        "Confirm zoning compliance under the City of Ottawa dual by-law condition (By-laws 2008-250 and 2026-50).",
      ],
    },
  };
}

export function LegalBasementChecker() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const baseId = useId();

  const currentQuestion = QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  const handleSelect = (value: string) => {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (isCompleted) {
      setIsCompleted(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const outcome = isCompleted ? calculateOutcome(answers) : null;

  return (
    <div
      style={{
        background: "#0b0a09",
        border: "1px solid rgba(227, 175, 43, 0.28)",
        borderRadius: 2,
        padding: "clamp(24px, 4vw, 44px)",
        maxWidth: 820,
        margin: "0 auto",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
      }}
      role="region"
      aria-label="Ottawa Legal Basement Qualification Checker"
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          paddingBottom: 22,
          borderBottom: "1px solid rgba(247, 245, 241, 0.1)",
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 4,
            }}
          >
            Interactive Feasibility Check
          </div>
          <div
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(20px, 3vw, 26px)",
              color: "#f7f5f1",
            }}
          >
            Can Your Basement Become a Legal Suite?
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {(currentStep > 0 || isCompleted) && (
            <button
              onClick={handleReset}
              type="button"
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(247, 245, 241, 0.55)",
                fontSize: 12,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "6px 10px",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = GOLD)}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "rgba(247, 245, 241, 0.55)")
              }
            >
              Reset
            </button>
          )}

          <div
            style={{
              fontSize: 12,
              fontFamily: "var(--font-sans), sans-serif",
              letterSpacing: ".14em",
              color: "rgba(247, 245, 241, 0.7)",
              background: "#0f0d0b",
              border: "1px solid rgba(247, 245, 241, 0.12)",
              padding: "6px 14px",
              borderRadius: 2,
            }}
          >
            {isCompleted
              ? "Completed"
              : `Step ${currentStep + 1} of ${QUESTIONS.length}`}
          </div>
        </div>
      </div>

      {/* Progress track */}
      {!isCompleted && (
        <div
          style={{
            width: "100%",
            height: 3,
            background: "rgba(247, 245, 241, 0.08)",
            marginBottom: 32,
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: GOLD,
              transition: "width 0.35s ease",
            }}
          />
        </div>
      )}

      {/* QUESTION FLOW */}
      {!isCompleted && currentQuestion && (
        <div>
          <div style={{ marginBottom: 26 }}>
            <h3
              id={`${baseId}-question-title`}
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(22px, 3.2vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#f7f5f1",
              }}
            >
              {currentQuestion.title}
            </h3>
            <p
              id={`${baseId}-question-desc`}
              style={{
                margin: 0,
                fontSize: 14.5,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(247, 245, 241, 0.65)",
              }}
            >
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Options list */}
          <div
            role="radiogroup"
            aria-labelledby={`${baseId}-question-title`}
            aria-describedby={`${baseId}-question-desc`}
            style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}
          >
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: "18px 20px",
                    background: isSelected ? "rgba(227, 175, 43, 0.08)" : "#0f0d0b",
                    border: isSelected
                      ? `1px solid ${GOLD}`
                      : "1px solid rgba(247, 245, 241, 0.12)",
                    borderRadius: 2,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(227, 175, 43, 0.5)";
                      (e.currentTarget as HTMLButtonElement).style.background = "#14120f";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(247, 245, 241, 0.12)";
                      (e.currentTarget as HTMLButtonElement).style.background = "#0f0d0b";
                    }
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD;
                  }}
                  onBlur={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(247, 245, 241, 0.12)";
                    }
                  }}
                >
                  {/* Radio Indicator */}
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: isSelected
                        ? `6px solid ${GOLD}`
                        : "2px solid rgba(247, 245, 241, 0.3)",
                      background: isSelected ? "#0a0908" : "transparent",
                      flexShrink: 0,
                      marginTop: 2,
                      transition: "border 0.2s ease",
                    }}
                    aria-hidden="true"
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        color: "#f7f5f1",
                        marginBottom: 4,
                      }}
                    >
                      {opt.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 300,
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: "rgba(247, 245, 241, 0.55)",
                      }}
                    >
                      {opt.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
            }}
          >
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                type="button"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(247, 245, 241, 0.2)",
                  color: "#f7f5f1",
                  fontSize: 12,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                &larr; Previous
              </button>
            ) : (
              <div />
            )}

            <div
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "rgba(247, 245, 241, 0.4)",
              }}
            >
              Select an option to advance
            </div>
          </div>
        </div>
      )}

      {/* OUTCOME SCREEN (No email gating!) */}
      {isCompleted && outcome && (
        <div aria-live="polite">
          {/* Badge */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 500,
                background: outcome.badgeBg,
                border: `1px solid ${outcome.badgeBorder}`,
                color: outcome.badgeColor,
              }}
            >
              {outcome.badge}
            </span>
          </div>

          <h3
            style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(26px, 4vw, 36px)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#f7f5f1",
            }}
          >
            {outcome.heading}
          </h3>

          <p
            style={{
              margin: "0 0 28px",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.8)",
            }}
          >
            {outcome.summary}
          </p>

          {/* Assessment Breakdown Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {/* Positives */}
            <div
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                  marginBottom: 12,
                }}
              >
                Key Baseline Strengths
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {outcome.details.positive.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: 14.5,
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    <span style={{ color: "#4ade80", flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items / Requirements */}
            <div
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 12,
                }}
              >
                Specific Items to Verify on Site
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {outcome.details.actionItems.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: 14.5,
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    <span style={{ color: GOLD, flexShrink: 0 }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div
            style={{
              padding: "26px 24px",
              background: "rgba(227, 175, 43, 0.05)",
              border: "1px solid rgba(227, 175, 43, 0.3)",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 8,
              }}
            >
              Next Step: Physical Verification
            </div>
            <p
              style={{
                margin: "0 0 20px",
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(247, 245, 241, 0.8)",
              }}
            >
              Online self-checks identify baseline patterns, but cannot confirm beam clearances,
              soil conditions, or plumbing vent routes. We perform on-site feasibility assessments
              across Ottawa before drawings or permit applications proceed.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                className="gold-btn"
                style={{
                  background: GOLD,
                  color: "#0a0908",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  padding: "15px 28px",
                  display: "inline-block",
                }}
              >
                Book a Feasibility Check
              </Link>

              <a
                href={PRIMARY_PHONE.href}
                className="outline-btn"
                style={{
                  border: "1px solid rgba(227, 175, 43, 0.5)",
                  color: "#f7f5f1",
                  fontWeight: 400,
                  fontSize: 11,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  padding: "15px 24px",
                  display: "inline-block",
                }}
              >
                Call {PRIMARY_PHONE.display}
              </a>

              <Link
                href="/services/legal-basements"
                style={{
                  fontSize: 12,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginLeft: "auto",
                  padding: "8px 0",
                }}
              >
                View Service Details &rarr;
              </Link>
            </div>
          </div>

          {/* Strict Non-Legal Disclaimer */}
          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid rgba(247, 245, 241, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(247, 245, 241, 0.45)",
                maxWidth: 620,
              }}
            >
              <strong>Disclaimer:</strong> Guidance only, not a legal or building code ruling; the
              City of Ottawa Chief Building Official and inspectors have final legal authority.
            </p>

            <button
              onClick={handleReset}
              type="button"
              style={{
                background: "transparent",
                border: "none",
                color: GOLD,
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "6px 0",
              }}
            >
              Restart Checker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
