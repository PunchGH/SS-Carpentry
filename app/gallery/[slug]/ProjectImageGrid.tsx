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
        className="project-image-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }}
      >
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            type="button"
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
              gridColumn: idx === 0 ? "1 / -1" : undefined,
            }}
            className="card-hover"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: idx === 0 ? "16 / 9" : "4 / 3",
                overflow: "hidden",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={idx === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              />
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
