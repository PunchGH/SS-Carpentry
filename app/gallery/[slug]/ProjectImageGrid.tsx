"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "../../components/Lightbox";
import type { ProjectImage } from "../../data/projects";

type ProjectImageGridProps = {
  images: ProjectImage[];
};

export function ProjectImageGrid({ images }: ProjectImageGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            onClick={() => openLightbox(idx)}
            aria-label={`Open photo ${idx + 1}: ${img.caption}`}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#0f0d0b",
              border: "1px solid rgba(247, 245, 241, 0.1)",
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
              overflow: "hidden",
              transition: "all 0.25s ease",
            }}
            className="card-hover"
          >
            <div style={{ position: "relative", width: "100%", height: 320, overflow: "hidden" }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(15,13,11,0.85) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 14,
                  background: "rgba(10, 9, 8, 0.75)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(227, 175, 43, 0.35)",
                  color: "#e3af2b",
                  padding: "4px 10px",
                  fontSize: 10,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                }}
              >
                Click to expand ↗
              </div>
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(247, 245, 241, 0.8)",
                  fontFamily: "var(--font-sans), sans-serif",
                }}
              >
                {img.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        initialIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
