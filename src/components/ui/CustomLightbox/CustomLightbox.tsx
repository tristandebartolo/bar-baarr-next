// components/ui/CustomLightbox.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type LightboxItem = {
  src: string;
  full: string;
  thumb: string;
  caption?: string;
  title?: string;
  copyright?: string | null;
};

type CustomLightboxProps = {
  items: LightboxItem[];
  initialIndex: number;
  onClose: () => void;
};

export default function CustomLightbox({
  items,
  initialIndex,
  onClose,
}: CustomLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(0.4); // 40% par défaut
  const [targetZoom, setTargetZoom] = useState(0.4);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrame = useRef<number | null>(null);

  const current = items[index];

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );
  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length],
  );

  // Reset à chaque changement d’image (centré + 40%)
  useEffect(() => {
    setZoom(0.4);
    setTargetZoom(0.4);
    setPan({ x: 0, y: 0 });
  }, [index]);

  // Animation fluide du zoom
  useEffect(() => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    const animate = () => {
      setZoom((currentZoom) => {
        const diff = targetZoom - currentZoom;
        if (Math.abs(diff) < 0.001) return targetZoom;
        return currentZoom + diff * 0.15;
      });
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [targetZoom]);

  // Clavier
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  // Zoom molette + pinch-to-zoom (mobile) — stable sous le curseur / centre des doigts
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    let pinchStartDistance = 0;
    let pinchStartZoom = 0;
    let pinchStartPan = { x: 0, y: 0 };

    const getPinchCenter = (touches: TouchList) => {
      const t1 = touches[0];
      const t2 = touches[1];
      return {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = img.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const relX = (cursorX / rect.width) - 0.5;
      const relY = (cursorY / rect.height) - 0.5;

      const delta = -e.deltaY * 0.0015;
      const newZoom = Math.max(0.2, Math.min(8, targetZoom + delta * targetZoom));

      if (newZoom !== targetZoom) {
        const scaleRatio = newZoom / targetZoom;

        setPan((prev) => ({
          x: prev.x - relX * rect.width * (scaleRatio - 1),
          y: prev.y - relY * rect.height * (scaleRatio - 1),
        }));
        setTargetZoom(newZoom);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();

        const center = getPinchCenter(e.touches);
        const rect = img.getBoundingClientRect();

        const relX = (center.x - rect.left) / rect.width - 0.5;
        const relY = (center.y - rect.top) / rect.height - 0.5;

        pinchStartDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        pinchStartZoom = targetZoom;
        pinchStartPan = pan;

        // On mémorise le point de pinch pour garder le centre fixe
        const scaleRatio = pinchStartZoom / pinchStartZoom; // 1 au départ
        setPan({
          x: pinchStartPan.x - relX * rect.width * (scaleRatio - 1),
          y: pinchStartPan.y - relY * rect.height * (scaleRatio - 1),
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartDistance > 0) {
        e.preventDefault();

        const newDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );

        const scale = newDistance / pinchStartDistance;
        const newZoom = Math.max(0.2, Math.min(8, pinchStartZoom * scale));

        setTargetZoom(newZoom);
      }
    };

    const handleTouchEnd = () => {
      pinchStartDistance = 0;
    };

    img.addEventListener("wheel", handleWheel, { passive: false });
    img.addEventListener("touchstart", handleTouchStart, { passive: false });
    img.addEventListener("touchmove", handleTouchMove, { passive: false });
    img.addEventListener("touchend", handleTouchEnd);
    img.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      img.removeEventListener("wheel", handleWheel);
      img.removeEventListener("touchstart", handleTouchStart);
      img.removeEventListener("touchmove", handleTouchMove);
      img.removeEventListener("touchend", handleTouchEnd);
      img.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [zoom, targetZoom, pan]);

  // Boutons + / − : zoom sans recentrage (pas de pan modifié)
  const handleButtonZoom = (delta: number) => {
    const newZoom = Math.max(0.2, Math.min(8, targetZoom + delta));
    if (Math.abs(newZoom - targetZoom) > 0.001) {
      setTargetZoom(newZoom);
    }
  };

  // Pan simple
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX - pan.x;
    const startY = e.clientY - pan.y;

    const handleMove = (e: MouseEvent) => {
      setPan({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const resetZoomAndPan = () => {
    setTargetZoom(0.4);
    setPan({ x: 0, y: 0 });
  };

  const centerImage = () => {
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className="bg-bgcontainer fixed inset-0 z-[9999] flex flex-col dark:text-white"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between bg-bghcontainer px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-white/40 p-3 transition hover:bg-white/60"
            aria-label="Fermer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-white/10 px-4 py-2">
            <span className="block text-xs opacity-70">
              {index + 1} / {items.length}
            </span>
            <div className="mx-2 h-6 w-px bg-white/30" />
            <button
              onClick={() => handleButtonZoom(-0.2)}
              className="rounded p-1 transition hover:bg-white/20"
              aria-label="Zoom arrière"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            <button onClick={resetZoomAndPan} className="min-w-[4rem] px-3 text-sm font-medium">
              {(zoom * 100).toFixed(0)}%
            </button>

            <button
              onClick={() => handleButtonZoom(0.2)}
              className="rounded p-1 transition hover:bg-white/20"
              aria-label="Zoom avant"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <div className="mx-2 h-6 w-px bg-white/30" />

            <button
              onClick={centerImage}
              className="rounded p-1 transition hover:bg-white/20"
              aria-label="Recentrer"
              title="Recentrer l’image"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m0 12.728l1.414-1.414m12.728 0l1.414-1.414"
                />
              </svg>
            </button>
          </div>

          {items.length > 1 && (
            <button
              onClick={goPrev}
              className="rounded-full bg-white/20 p-3 transition hover:bg-white/40"
              aria-label="Précédent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {items.length > 1 && (
            <button
              onClick={goNext}
              className="rounded-full bg-white/20 p-3 transition hover:bg-white/40"
              aria-label="Suivant"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Zone image */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 overflow-auto">
          <div className="flex h-full w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
            <img
              ref={imageRef}
              src={current.full}
              alt={current.caption}
              draggable={false}
              className="max-w-none select-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.08s cubic-bezier(0.25, 0.8, 0.25, 1)",
                cursor: isDragging ? "grabbing" : zoom > 1 ? "grab" : "default",
              }}
              onMouseDown={handleMouseDown}
              onDoubleClick={resetZoomAndPan}
            />
          </div>
        </div>
      </div>

      {/* Caption + vignettes */}
      <div className="shrink-0 bg-black/80 px-6 py-4">
        <div className="mb-4 text-center">
          {current.caption && (
            <p className="mx-auto max-w-3xl truncate px-4 text-sm opacity-90">
              {current.caption}
            </p>
          )}
        </div>

        {items.length > 1 && (
          <div className="scrollbar-thin scrollbar-thumb-white/30 overflow-x-auto">
            <div className="flex min-w-max gap-4 py-2">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`shrink-0 overflow-hidden rounded-lg border-4 transition-all ${
                    i === index
                      ? "scale-110 border-white opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
                  <img
                    src={item.src}
                    alt=""
                    className="h-20 w-20 object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}