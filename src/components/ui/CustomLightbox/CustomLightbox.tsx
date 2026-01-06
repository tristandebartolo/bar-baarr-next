// components/ui/GsapLightbox.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

type LightboxItem = {
  src: string; // thumbnail pour la galerie
  full: string; // image haute résolution
  thumb: string; // non utilisé ici, mais gardé pour compatibilité
  caption?: string;
  title?: string;
  copyright?: string | null;
};

type GsapLightboxProps = {
  items: LightboxItem[];
  initialIndex: number;
  onClose: () => void;
};

export default function GsapLightbox({ items, initialIndex, onClose }: GsapLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const [currentZoom, setCurrentZoom] = useState(0.8);
  const current = items[index];

  const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setIndex((i) => (i + 1) % items.length);

  useEffect(() => {
    // Au premier montage
    setZoomLevel(0.8);
  }, []);

  // Reset zoom/pan à chaque changement d'image
  useEffect(() => {
    const defaultZoom = 0.8; // ← ta nouvelle valeur par défaut
    setZoomLevel(defaultZoom);
    gsap.set(imageWrapperRef.current, { x: 0, y: 0 });
    draggableRef.current?.update();
  }, [index]);

  useGSAP(() => {
    if (!imageWrapperRef.current || !containerRef.current) return;

    const wrapper = imageWrapperRef.current;
    const container = containerRef.current;

    // Création du Draggable
    draggableRef.current = Draggable.create(wrapper, {
      type: "x,y",
      inertia: true,
      bounds: container,
      edgeResistance: 0.8,
      dragResistance: 0.4,
      onPress: () => {
        gsap.to(wrapper, { cursor: "grabbing", duration: 0.1, overwrite: "auto" });
      },
      onRelease: () => {
        gsap.to(wrapper, { cursor: "grab", duration: 0.1 });
      },
      zIndexBoost: false,
    })[0];

    // Zoom avec molette (centré sous le curseur)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = wrapper.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const delta = e.deltaY < 0 ? 1.2 : 0.83; // zoom in/out
      const currentScale = gsap.getProperty(wrapper, "scale") as number;
      const newScale = Math.max(0.2, Math.min(8, currentScale * delta));

      if (Math.abs(newScale - currentScale) > 0.001) {
        gsap.to(wrapper, {
          scale: newScale,
          duration: 0.4,
          ease: "power2.out",
          onUpdate: () => {
            setCurrentZoom(gsap.getProperty(wrapper, "scale") as number);
          },
          modifiers: {
            scale: (val) => {
              const ratio = parseFloat(val) / currentScale;
              const offsetX = cursorX - rect.width / 2;
              const offsetY = cursorY - rect.height / 2;
              gsap.set(wrapper, {
                x: `+=${offsetX * (ratio - 1)}`,
                y: `+=${offsetY * (ratio - 1)}`,
              });
              return val;
            },
          },
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      draggableRef.current?.kill();
      container.removeEventListener("wheel", handleWheel);
    };
  }, [index]);

  const setZoomLevel = (newZoom: number) => {
    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;

    const clampedZoom = Math.max(0.2, Math.min(8, newZoom));

    gsap.to(wrapper, {
      scale: clampedZoom,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setCurrentZoom(gsap.getProperty(wrapper, "scale") as number);
      },
      onComplete: () => {
        setCurrentZoom(clampedZoom);
      },
    });
  };

  const zoomIn = () => {
    const current = gsap.getProperty(imageWrapperRef.current, "scale") as number;
    setZoomLevel(current + 0.2);
  };

  const zoomOut = () => {
    const current = gsap.getProperty(imageWrapperRef.current, "scale") as number;
    setZoomLevel(current - 0.2);
  };

  const resetZoomAndPan = () => {
    setZoomLevel(0.8); // ← ici aussi 0.8 si tu veux garder ce défaut
    gsap.to(imageWrapperRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const centerImage = () => {
    gsap.to(imageWrapperRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Clavier
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-9999 flex flex-col bg-black" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between bg-black/70 px-6 py-4 backdrop-blur-md">
        <button onClick={onClose} className="rounded-full bg-white/20 p-3 transition hover:bg-white/40" aria-label="Fermer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5">
            <span className="text-sm opacity-70">
              {index + 1} / {items.length}
            </span>
            <div className="h-6 w-px bg-white/30" />
            <button onClick={zoomOut} className="rounded p-1 hover:bg-white/20">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button onClick={resetZoomAndPan} className="min-w-16 px-4 text-sm font-medium">
              {(currentZoom * 100).toFixed(0)}%
            </button>
            <button onClick={zoomIn} className="rounded p-1 hover:bg-white/20">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div className="h-6 w-px bg-white/30" />
            <button onClick={centerImage} className="rounded p-1 hover:bg-white/20" title="Recentrer">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12a4 4 0 100-8 4 4 0 000 8z M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m0 12.728l1.414-1.414m12.728 0l1.414-1.414"
                />
              </svg>
            </button>
          </div>

          {items.length > 1 && (
            <>
              <button onClick={goPrev} className="rounded-full bg-white/20 p-3 transition hover:bg-white/40">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={goNext} className="rounded-full bg-white/20 p-3 transition hover:bg-white/40">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Zone image avec drag */}
      <div ref={containerRef} className="relative flex-1 cursor-grab overflow-hidden active:cursor-grabbing">
        <div ref={imageWrapperRef} className="absolute inset-0 flex items-center justify-center" style={{ transformOrigin: "center center" }}>
          <Image
            src={current.full}
            alt={current.caption || ""}
            fill
            className="max-w-none object-contain select-none"
            // priority
            unoptimized={true} // recommandé pour qualité max sur mobile
            draggable={false}
          />
        </div>
      </div>

      {/* Footer avec caption + thumbnails */}
      <div className="shrink-0 bg-black/80 px-6 py-4">
        {current.caption && <p className="mx-auto mb-4 max-w-3xl text-center text-sm opacity-90">{current.caption}</p>}

        {items.length > 1 && (
          <div className="scrollbar-thin scrollbar-thumb-white/30 overflow-x-auto">
            <div className="flex min-w-max justify-center gap-4 py-2">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`shrink-0 overflow-hidden rounded-lg border-4 transition-all ${
                    i === index ? "scale-110 border-white opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image src={item.src} alt="" width={80} height={80} className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
