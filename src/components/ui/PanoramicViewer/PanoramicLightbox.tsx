'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type PanoramicLightboxProps = {
  thumbnailSrc: string;
  fullSrc: string;
  alt?: string;
  thumbnailHeight?: string;
};

export default function PanoramicLightbox({
  thumbnailSrc,
  fullSrc,
  alt = "Image panoramique",
  thumbnailHeight = "60vh",
}: PanoramicLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);

  // Dimensions naturelles de l'image (on les charge une seule fois)
  const [imageRatio, setImageRatio] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  // Chargement du ratio une seule fois
  useEffect(() => {
    const img = new window.Image();
    img.src = fullSrc;
    img.onload = () => {
      setImageRatio(img.naturalWidth / img.naturalHeight);
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [fullSrc]);

  // Bloquer scroll body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Recalcul de travelDistance à l'ouverture + à chaque resize
  const updateTravelDistance = () => {
    if (!imageRatio || !isOpen) return;

    const visibleHeight = window.innerHeight;
    const displayedWidth = imageRatio * visibleHeight;
    const distance = Math.max(0, displayedWidth - window.innerWidth);
    setTravelDistance(distance);
  };

  useEffect(() => {
    if (!isOpen) {
      setTravelDistance(0);
      return;
    }

    updateTravelDistance(); // calcul initial

    window.addEventListener('resize', updateTravelDistance);
    return () => {
      window.removeEventListener('resize', updateTravelDistance);
    };
  }, [isOpen, imageRatio]);

  // GSAP + ScrollTrigger : animation mise à jour à chaque changement
  useGSAP(() => {
    if (!isOpen || travelDistance === 0 || !imageWrapperRef.current || !scrollerRef.current || !imageRatio) {
      return;
    }

    // On tue toute animation existante pour éviter les doublons
    ScrollTrigger.getAll().forEach(st => st.kill());

    gsap.set(imageWrapperRef.current, { x: 0 });

    const st = ScrollTrigger.create({
      trigger: scrollerRef.current,
      scroller: scrollerRef.current,
      start: "top top",
      end: `+=${travelDistance}`,
      scrub: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(imageWrapperRef.current, {
        x: -travelDistance,
        ease: "none",
      }),
    });

    // Rafraîchissement forcé au montage et à chaque resize
    st.refresh();

    return () => {
      st.kill();
    };
  }, [isOpen, travelDistance, imageRatio]);

  return (
    <>
      {/* Vignette cliquable */}
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl z-1000000"
        style={{ height: thumbnailHeight }}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={thumbnailSrc}
          alt={alt}
          fill
          // quality={95}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          priority
          // placeholder="empty" 
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-1000000000 bg-black flex flex-col"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur rounded-full p-4 text-white hover:bg-black/90 transition"
            aria-label="Fermer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 h-screen overflow-hidden">
              <div ref={imageWrapperRef} className="h-full flex items-center">
                <Image
                  src={fullSrc}
                  alt={alt}
                  width={dimensions?.width}
                  height={dimensions?.height}
                  // sizes="100vw"
                  // quality={100}
                  // placeholder="empty" 
                  className="h-screen w-auto object-cover object-top-left shrink-0 max-w-none"
                  priority
                />
              </div>
            </div>

            {/* Espace pour le scroll */}
            <div style={{ height: `${travelDistance}px` }} />
          </div>
        </div>
      )}
    </>
  );
}