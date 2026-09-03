"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import type { ProjectImage } from "../data/projects";

type LightboxProps = {
  images: ProjectImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

import { GOLD } from "../data/theme";

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Reset to the requested photo when the lightbox transitions to open.
  // Done during render (React's documented "adjusting state" pattern)
  // rather than in an effect, to avoid an extra cascading render.
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }

  // Focus management and body-scroll lock — genuine side effects, so these
  // stay in an effect; they no longer need `initialIndex` since the index
  // reset above is handled at render time.
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Touch swipe support
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery fullscreen preview"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(6, 5, 4, 0.94)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 24px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header bar: Counter + Close */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          paddingBottom: 12,
        }}
      >
        <div
          aria-live="polite"
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(247, 245, 241, 0.75)",
          }}
        >
          Photo <span style={{ color: GOLD, fontWeight: 600 }}>{currentIndex + 1}</span> of {images.length}
        </div>

        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close photo preview (Escape)"
          style={{
            minWidth: 44,
            minHeight: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(247, 245, 241, 0.08)",
            border: "1px solid rgba(247, 245, 241, 0.2)",
            color: "#f7f5f1",
            cursor: "pointer",
            borderRadius: 4,
            fontSize: 20,
            transition: "all 0.2s ease",
          }}
        >
          ✕
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          overflow: "hidden",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo (Left arrow)"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              minWidth: 48,
              minHeight: 48,
              borderRadius: "50%",
              background: "rgba(10, 9, 8, 0.7)",
              border: "1px solid rgba(227, 175, 43, 0.35)",
              color: "#f7f5f1",
              fontSize: 22,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
          >
            &#8249;
          </button>
        )}

        {/* Current Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            maxHeight: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo (Right arrow)"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              minWidth: 48,
              minHeight: 48,
              borderRadius: "50%",
              background: "rgba(10, 9, 8, 0.7)",
              border: "1px solid rgba(227, 175, 43, 0.35)",
              color: "#f7f5f1",
              fontSize: 22,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
          >
            &#8250;
          </button>
        )}
      </div>

      {/* Caption & Controls Info */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          paddingTop: 14,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(247, 245, 241, 0.9)",
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.5,
            fontFamily: "var(--font-sans), sans-serif",
          }}
        >
          {currentImage.caption}
        </p>
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "rgba(247, 245, 241, 0.5)",
          }}
        >
          Use arrow keys to navigate · Esc to close · Swipe on mobile
        </div>
      </div>
    </div>
  );
}
