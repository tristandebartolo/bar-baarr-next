'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type ViewportHeight = 25 | 50 | 75 | 100;

type PanoramicViewerProps = {
  imageSrc: string;
  imageAlt?: string;
  heightPercentage?: ViewportHeight;
  headerHeight?: string;
};

export default function PanoramicViewer({
  imageSrc,
  imageAlt = "Panorama",
  heightPercentage = 100,
  headerHeight = "0px",
}: PanoramicViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  }, [imageSrc]);

  useGSAP(() => {
    if (!dimensions || !containerRef.current || !imageWrapperRef.current) return;

    const ratio = dimensions.width / dimensions.height;
    const visibleVh = heightPercentage;
    const visibleHeightPx = (visibleVh / 100) * window.innerHeight;
    const displayedWidth = ratio * visibleHeightPx;
    const travelDistance = Math.max(0, displayedWidth - window.innerWidth);

    if (travelDistance === 0) return;

    gsap.set(imageWrapperRef.current, { x: 0 });

    gsap.to(imageWrapperRef.current, {
      x: -travelDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${travelDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true, // ← Clé : permet au scroll de continuer après le panorama
        invalidateOnRefresh: true,
        anticipatePin: 1,
        immediateRender: false,
      },
    });
  }, { scope: containerRef, dependencies: [dimensions, heightPercentage] });

  if (!dimensions) {
    return <div className={`h-[${heightPercentage}vh] bg-gray-200 flex items-center justify-center`}>Chargement...</div>;
  }

  const heightClassMap: Record<ViewportHeight, string> = {
    25: "h-[25vh]",
    50: "h-[50vh]",
    75: "h-[75vh]",
    100: "h-screen",
  };

  const visibleClass = heightClassMap[heightPercentage];
  const stickyTop = headerHeight !== "0px" ? `top-[${headerHeight}]` : "top-0";

  return (
    <section ref={containerRef} className={`relative ${stickyTop} ${visibleClass} overflow-hidden bg-black`}>
      <div ref={imageWrapperRef} className="h-full flex items-start">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="h-full w-auto object-cover object-left-top flex-shrink-0 max-w-none"
        />
      </div>
    </section>
  );
}