// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';
// import gsap from 'gsap';
// import { Draggable } from 'gsap/Draggable';
// import { useGSAP } from '@gsap/react';
// import InertiaPlugin from 'gsap/InertiaPlugin';

// gsap.registerPlugin(Draggable, InertiaPlugin);

// type PanoramicBannerProps = {
//   imageSrc: string;
//   alt?: string;
//   height?: '25vh' | '50vh' | '75vh' | '100vh';
// };

// export default function PanoramicBanner({
//   imageSrc,
//   alt = "Banner panoramique",
//   height = '75vh',
// }: PanoramicBannerProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const bigImageRef = useRef<HTMLDivElement>(null);
//   const miniMapContainerRef = useRef<HTMLDivElement>(null);
//   const miniMapImageRef = useRef<HTMLImageElement>(null); // pour mesurer l'image affichée
//   const markerRef = useRef<HTMLDivElement>(null);

//   const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
//   const [miniMapSize, setMiniMapSize] = useState<{ width: number; height: number }>({ width: 280, height: 200 });

//   const MAX_MINIMAP_WIDTH = 280; // 280px max

//   // Récupération des dimensions naturelles de l'image
//   useEffect(() => {
//     const img = new window.Image();
//     img.src = imageSrc;
//     img.onload = () => {
//       const naturalWidth = img.naturalWidth;
//       const naturalHeight = img.naturalHeight;

//       setDimensions({ width: naturalWidth, height: naturalHeight });

//       // Calcul de la taille de la mini-map : largeur max 280px, hauteur proportionnelle
//       const scale = Math.min(MAX_MINIMAP_WIDTH / naturalWidth, 1);
//       const miniWidth = naturalWidth * scale;
//       const miniHeight = naturalHeight * scale;

//       setMiniMapSize({ width: miniWidth, height: miniHeight });
//     };
//   }, [imageSrc]);

//   const heightClassMap: Record<string, string> = {
//     '25vh': 'h-[25vh]',
//     '50vh': 'h-[50vh]',
//     '75vh': 'h-[75vh]',
//     '100vh': 'h-screen',
//   };
//   const heightClass = heightClassMap[height] || 'h-[75vh]';

//   useGSAP(() => {
//     const container = containerRef.current;
//     const bigImage = bigImageRef.current;
//     const miniContainer = miniMapContainerRef.current;
//     const miniImage = miniMapImageRef.current;
//     const marker = markerRef.current;

//     if (!container || !bigImage || !miniContainer || !miniImage || !marker || !dimensions) return;

//     let scaleX = miniImage.offsetWidth / dimensions.width;
//     let scaleY = miniImage.offsetHeight / dimensions.height;

//     const updateScales = () => {
//       scaleX = miniImage.offsetWidth / dimensions.width;
//       scaleY = miniImage.offsetHeight / dimensions.height;
//     };

//     const updateMarker = () => {
//       updateScales();

//       const markerWidth = container.offsetWidth * scaleX;
//       const markerHeight = container.offsetHeight * scaleY;

//       gsap.set(marker, {
//         width: markerWidth,
//         height: markerHeight,
//       });
//     };

//     updateMarker();

//     const resizeObserver = new ResizeObserver(() => {
//       updateMarker();
//     });
//     resizeObserver.observe(container);
//     resizeObserver.observe(miniContainer);

//     const smallX = gsap.quickSetter(marker, "x", "px");
//     const smallY = gsap.quickSetter(marker, "y", "px");
//     const bigX = gsap.quickSetter(bigImage, "x", "px");
//     const bigY = gsap.quickSetter(bigImage, "y", "px");

//     const bigDraggable = Draggable.create(bigImage, {
//       type: "x,y",
//       bounds: container,
//       inertia: true,
//       onDrag: syncMarker,
//       onThrowUpdate: syncMarker,
//     })[0];

//     function syncMarker() {
//       smallX(-bigDraggable.x * scaleX);
//       smallY(-bigDraggable.y * scaleY);
//     }

//     const smallDraggable = Draggable.create(marker, {
//       type: "x,y",
//       bounds: miniContainer,
//       inertia: true,
//       onDrag: syncBig,
//       onThrowUpdate: syncBig,
//     })[0];

//     function syncBig() {
//       bigX(-smallDraggable.x / scaleX);
//       bigY(-smallDraggable.y / scaleY);
//     }

//     // Centrage initial
//     gsap.set(bigImage, {
//       x: (container.offsetWidth - dimensions.width) / 2,
//       y: (container.offsetHeight - dimensions.height) / 2,
//     });
//     bigDraggable.update();
//     syncMarker();

//     return () => {
//       resizeObserver.disconnect();
//       bigDraggable?.kill();
//       smallDraggable?.kill();
//     };
//   }, [dimensions, miniMapSize]);

//   if (!dimensions || !miniMapSize) {
//     return (
//       <div className={`w-full ${heightClass} bg-gray-200 flex items-center justify-center`}>
//         Chargement...
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className={`relative w-full ${heightClass} overflow-hidden bg-black`}>
//       {/* Mini-map avec width et height dynamiques en pixels */}
//       <div
//         ref={miniMapContainerRef}
//         className="absolute bottom-4 left-4 z-99999 rounded-xl shadow-2xl overflow-hidden border-0 border-white bg-black"
//         style={{
//           width: `${miniMapSize.width}px`,
//           height: `${miniMapSize.height}px`,
//         }}
//       >
//         <Image
//           ref={miniMapImageRef}
//           src={imageSrc}
//           alt={`${alt} - mini-map`}
//           width={miniMapSize.width}
//           height={miniMapSize.height}
//           className="pointer-events-none select-none"
//           priority
//           style={{ objectFit: 'contain' }}
//         />

//         {/* Marker */}
//         <div
//           ref={markerRef}
//           className="absolute top-0 left-0 border-4 border-white/80 pointer-events-auto cursor-move bg-white/10 backdrop-blur-sm rounded-md"
//         />
//       </div>

//       {/* Grande image */}
//       <div
//         ref={bigImageRef}
//         className="absolute"
//         style={{ width: dimensions.width, height: dimensions.height }}
//       >
//         <Image
//           src={imageSrc}
//           alt={alt}
//           width={dimensions.width}
//           height={dimensions.height}
//           priority
//           className="max-w-none pointer-events-none select-none"
//           draggable={false}
//         />
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';
// import gsap from 'gsap';
// import { Draggable } from 'gsap/Draggable';
// import { useGSAP } from '@gsap/react';
// import InertiaPlugin from 'gsap/InertiaPlugin';

// gsap.registerPlugin(Draggable, InertiaPlugin);

// type PanoramicBannerProps = {
//   imageSrc: string;
//   alt?: string;
//   height?: '25vh' | '50vh' | '75vh' | '100vh';
//   /** Position X initiale du centre de la vue (en pixels dans l'image originale) */
//   initialCenterX?: number;
//   /** Position Y initiale du centre de la vue (en pixels dans l'image originale) */
//   initialCenterY?: number;
// };

// export default function PanoramicBanner({
//   imageSrc,
//   alt = "Banner panoramique",
//   height = '75vh',
//   initialCenterX,
//   initialCenterY,
// }: PanoramicBannerProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const bigImageRef = useRef<HTMLDivElement>(null);
//   const miniMapContainerRef = useRef<HTMLDivElement>(null);
//   const miniMapImageRef = useRef<HTMLImageElement>(null);
//   const markerRef = useRef<HTMLDivElement>(null);

//   const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
//   const [miniMapSize, setMiniMapSize] = useState<{ width: number; height: number }>({ width: 280, height: 200 });

//   const MAX_MINIMAP_WIDTH = 280;

//   useEffect(() => {
//     const img = new window.Image();
//     img.src = imageSrc;
//     img.onload = () => {
//       const naturalWidth = img.naturalWidth;
//       const naturalHeight = img.naturalHeight;

//       setDimensions({ width: naturalWidth, height: naturalHeight });

//       const scale = Math.min(MAX_MINIMAP_WIDTH / naturalWidth, 1);
//       const miniWidth = naturalWidth * scale;
//       const miniHeight = naturalHeight * scale;

//       setMiniMapSize({ width: miniWidth, height: miniHeight });
//     };
//   }, [imageSrc]);

//   const heightClassMap: Record<string, string> = {
//     '25vh': 'h-[25vh]',
//     '50vh': 'h-[50vh]',
//     '75vh': 'h-[75vh]',
//     '100vh': 'h-screen',
//   };
//   const heightClass = heightClassMap[height] || 'h-[75vh]';

//   useGSAP(() => {
//     const container = containerRef.current;
//     const bigImage = bigImageRef.current;
//     const miniContainer = miniMapContainerRef.current;
//     const miniImage = miniMapImageRef.current;
//     const marker = markerRef.current;

//     if (!container || !bigImage || !miniContainer || !miniImage || !marker || !dimensions) return;

//     let scaleX = miniImage.offsetWidth / dimensions.width;
//     let scaleY = miniImage.offsetHeight / dimensions.height;

//     const updateScales = () => {
//       scaleX = miniImage.offsetWidth / dimensions.width;
//       scaleY = miniImage.offsetHeight / dimensions.height;
//     };

//     const updateMarker = () => {
//       updateScales();

//       const markerWidth = container.offsetWidth * scaleX;
//       const markerHeight = container.offsetHeight * scaleY;

//       gsap.set(marker, {
//         width: markerWidth,
//         height: markerHeight,
//       });
//     };

//     updateMarker();

//     const resizeObserver = new ResizeObserver(updateMarker);
//     resizeObserver.observe(container);
//     resizeObserver.observe(miniContainer);

//     const smallX = gsap.quickSetter(marker, "x", "px");
//     const smallY = gsap.quickSetter(marker, "y", "px");
//     const bigX = gsap.quickSetter(bigImage, "x", "px");
//     const bigY = gsap.quickSetter(bigImage, "y", "px");

//     const bigDraggable = Draggable.create(bigImage, {
//       type: "x,y",
//       bounds: container,
//       inertia: true,
//       onDrag: syncMarker,
//       onThrowUpdate: syncMarker,
//     })[0];

//     function syncMarker() {
//       smallX(-bigDraggable.x * scaleX);
//       smallY(-bigDraggable.y * scaleY);
//     }

//     const smallDraggable = Draggable.create(marker, {
//       type: "x,y",
//       bounds: miniContainer,
//       inertia: true,
//       onDrag: syncBig,
//       onThrowUpdate: syncBig,
//     })[0];

//     function syncBig() {
//       bigX(-smallDraggable.x / scaleX);
//       bigY(-smallDraggable.y / scaleY);
//     }

//     // === POSITION INITIALE PERSONNALISÉE ===
//     let initialX: number;
//     let initialY: number;

//     if (initialCenterX !== undefined && initialCenterY !== undefined) {
//       // On centre la vue sur (initialCenterX, initialCenterY)
//       initialX = initialCenterX - container.offsetWidth / 2;
//       initialY = initialCenterY - container.offsetHeight / 2;

//       // On borne pour ne pas sortir de l'image
//       initialX = Math.max(bigDraggable.minX, Math.min(bigDraggable.maxX, -initialX));
//       initialY = Math.max(bigDraggable.minY, Math.min(bigDraggable.maxY, -initialY));
//     } else {
//       // Comportement par défaut : centrage classique
//       initialX = (container.offsetWidth - dimensions.width) / 2;
//       initialY = (container.offsetHeight - dimensions.height) / 2;
//     }

//     gsap.set(bigImage, { x: initialX, y: initialY });
//     bigDraggable.update();
//     syncMarker();

//     return () => {
//       resizeObserver.disconnect();
//       bigDraggable?.kill();
//       smallDraggable?.kill();
//     };
//   }, [dimensions, miniMapSize, initialCenterX, initialCenterY]); // ← dépendances ajoutées

//   if (!dimensions || !miniMapSize) {
//     return (
//       <div className={`w-full ${heightClass} bg-gray-200 flex items-center justify-center`}>
//         Chargement...
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className={`relative w-full ${heightClass} overflow-hidden bg-black`}>
//       {/* Mini-map */}
//       <div
//         ref={miniMapContainerRef}
//         className="absolute bottom-4 left-4 z-999999 rounded-xl shadow-2xl overflow-hidden bg-black"
//         style={{
//           width: `${miniMapSize.width}px`,
//           height: `${miniMapSize.height}px`,
//         }}
//       >
//         <Image
//           ref={miniMapImageRef}
//           src={imageSrc}
//           alt={`${alt} - mini-map`}
//           width={miniMapSize.width}
//           height={miniMapSize.height}
//           className="pointer-events-none select-none"
//           priority
//           style={{ objectFit: 'contain' }}
//         />

//         <div
//           ref={markerRef}
//           className="absolute top-0 left-0 border-4 border-white/80 pointer-events-auto cursor-move bg-white/10 backdrop-blur-sm rounded-md"
//         />
//       </div>

//       {/* Grande image */}
//       <div
//         ref={bigImageRef}
//         className="absolute"
//         style={{ width: dimensions.width, height: dimensions.height }}
//       >
//         <Image
//           src={imageSrc}
//           alt={alt}
//           width={dimensions.width}
//           height={dimensions.height}
//           priority
//           className="max-w-none pointer-events-none select-none"
//           draggable={false}
//         />
//       </div>
//     </div>
//   );
// }




'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import InertiaPlugin from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

type PanoramicBannerProps = {
  imageSrc: string;
  alt?: string;
  height?: '25vh' | '50vh' | '75vh' | '100vh';
  /** Position X initiale du centre de la vue (en pixels dans l'image originale) */
  initialCenterX?: number;
  /** Position Y initiale du centre de la vue (en pixels dans l'image originale) */
  initialCenterY?: number;
  /** Afficher ou masquer la mini-map (true par défaut) */
  showMiniMap?: boolean;
};

export default function PanoramicBanner({
  imageSrc,
  alt = "Banner panoramique",
  height = '75vh',
  initialCenterX,
  initialCenterY,
  showMiniMap = true, // activée par défaut
}: PanoramicBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigImageRef = useRef<HTMLDivElement>(null);
  const miniMapContainerRef = useRef<HTMLDivElement>(null);
  const miniMapImageRef = useRef<HTMLImageElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [miniMapSize, setMiniMapSize] = useState<{ width: number; height: number } | null>(null);

  const MAX_MINIMAP_WIDTH = 280;

  // Chargement des dimensions de l'image
  useEffect(() => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      setDimensions({ width: naturalWidth, height: naturalHeight });

      // On calcule la taille de la mini-map seulement si elle sera affichée
      if (showMiniMap) {
        const scale = Math.min(MAX_MINIMAP_WIDTH / naturalWidth, 1);
        const miniWidth = naturalWidth * scale;
        const miniHeight = naturalHeight * scale;
        setMiniMapSize({ width: miniWidth, height: miniHeight });
      } else {
        setMiniMapSize(null);
      }
    };
  }, [imageSrc, showMiniMap]);

  const heightClassMap: Record<string, string> = {
    '25vh': 'h-[25vh]',
    '50vh': 'h-[50vh]',
    '75vh': 'h-[75vh]',
    '100vh': 'h-screen',
  };
  const heightClass = heightClassMap[height] || 'h-[75vh]';

  useGSAP(() => {
    const container = containerRef.current;
    const bigImage = bigImageRef.current;

    if (!container || !bigImage || !dimensions) return;

    // Si la mini-map est désactivée → on skip tout le code lié à la mini-map
    if (!showMiniMap || !miniMapContainerRef.current || !miniMapImageRef.current || !markerRef.current) {
      // On configure seulement le draggable principal (sans sync mini-map)
      const bigDraggable = Draggable.create(bigImage, {
        type: "x,y",
        bounds: container,
        inertia: true,
      })[0];

      // Position initiale personnalisée ou centrée
      let initialX: number;
      let initialY: number;

      if (initialCenterX !== undefined && initialCenterY !== undefined) {
        initialX = initialCenterX - container.offsetWidth / 2;
        initialY = initialCenterY - container.offsetHeight / 2;
        initialX = Math.max(bigDraggable.minX, Math.min(bigDraggable.maxX, -initialX));
        initialY = Math.max(bigDraggable.minY, Math.min(bigDraggable.maxY, -initialY));
      } else {
        initialX = (container.offsetWidth - dimensions.width) / 2;
        initialY = (container.offsetHeight - dimensions.height) / 2;
      }

      gsap.set(bigImage, { x: initialX, y: initialY });
      bigDraggable.update();

      return () => {
        bigDraggable?.kill();
      };
    }

    // === Mode avec mini-map activée ===
    const miniContainer = miniMapContainerRef.current;
    const miniImage = miniMapImageRef.current;
    const marker = markerRef.current;

    if (!miniContainer || !miniImage || !marker) return;

    let scaleX = miniImage.offsetWidth / dimensions.width;
    let scaleY = miniImage.offsetHeight / dimensions.height;

    const updateScales = () => {
      scaleX = miniImage.offsetWidth / dimensions.width;
      scaleY = miniImage.offsetHeight / dimensions.height;
    };

    const updateMarker = () => {
      updateScales();
      const markerWidth = container.offsetWidth * scaleX;
      const markerHeight = container.offsetHeight * scaleY;

      gsap.set(marker, {
        width: markerWidth,
        height: markerHeight,
      });
    };

    updateMarker();

    const resizeObserver = new ResizeObserver(updateMarker);
    resizeObserver.observe(container);
    resizeObserver.observe(miniContainer);

    const smallX = gsap.quickSetter(marker, "x", "px");
    const smallY = gsap.quickSetter(marker, "y", "px");
    const bigX = gsap.quickSetter(bigImage, "x", "px");
    const bigY = gsap.quickSetter(bigImage, "y", "px");

    const bigDraggable = Draggable.create(bigImage, {
      type: "x,y",
      bounds: container,
      inertia: true,
      onDrag: syncMarker,
      onThrowUpdate: syncMarker,
    })[0];

    function syncMarker() {
      smallX(-bigDraggable.x * scaleX);
      smallY(-bigDraggable.y * scaleY);
    }

    const smallDraggable = Draggable.create(marker, {
      type: "x,y",
      bounds: miniContainer,
      inertia: true,
      onDrag: syncBig,
      onThrowUpdate: syncBig,
    })[0];

    function syncBig() {
      bigX(-smallDraggable.x / scaleX);
      bigY(-smallDraggable.y / scaleY);
    }

    // Position initiale
    let initialX: number;
    let initialY: number;

    if (initialCenterX !== undefined && initialCenterY !== undefined) {
      initialX = initialCenterX - container.offsetWidth / 2;
      initialY = initialCenterY - container.offsetHeight / 2;
      initialX = Math.max(bigDraggable.minX, Math.min(bigDraggable.maxX, -initialX));
      initialY = Math.max(bigDraggable.minY, Math.min(bigDraggable.maxY, -initialY));
    } else {
      initialX = (container.offsetWidth - dimensions.width) / 2;
      initialY = (container.offsetHeight - dimensions.height) / 2;
    }

    gsap.set(bigImage, { x: initialX, y: initialY });
    bigDraggable.update();
    syncMarker();

    return () => {
      resizeObserver.disconnect();
      bigDraggable?.kill();
      smallDraggable?.kill();
    };
  }, [dimensions, miniMapSize, initialCenterX, initialCenterY, showMiniMap]);

  if (!dimensions) {
    return (
      <div className={`w-full ${heightClass} bg-gray-200 flex items-center justify-center`}>
        Chargement...
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full ${heightClass} overflow-hidden bg-black`}>
      {/* Mini-map conditionnelle */}
      {showMiniMap && miniMapSize && (
        <div
          ref={miniMapContainerRef}
          className="absolute bottom-4 left-4 z-99999 rounded-xl shadow-2xl overflow-hidden bg-black"
          style={{
            width: `${miniMapSize.width}px`,
            height: `${miniMapSize.height}px`,
          }}
        >
          <Image
            ref={miniMapImageRef}
            src={imageSrc}
            alt={`${alt} - mini-map`}
            width={miniMapSize.width}
            height={miniMapSize.height}
            className="pointer-events-none select-none"
            priority
            style={{ objectFit: 'contain' }}
          />

          <div
            ref={markerRef}
            className="absolute top-0 left-0 border-4 border-white/80 pointer-events-auto cursor-move bg-white/10 backdrop-blur-sm rounded-md"
          />
        </div>
      )}

      {/* Grande image */}
      <div
        ref={bigImageRef}
        className="absolute"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="max-w-none pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}


