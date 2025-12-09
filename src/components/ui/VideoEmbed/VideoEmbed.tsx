// components/ui/VideoEmbed/VideoEmbed.tsx
import React, { useState, useRef, useEffect } from "react";

// Props du composant (intègre à JournalNode)
interface VideoEmbedProps {
  field_embed_url?: string; // URL de la vidéo (chaîne optionnelle)
  width?: number; // Largeur iframe (défaut 560)
  height?: number; // Hauteur iframe (défaut 315)
  className?: string; // Classes Tailwind
  fallback?: React.ReactNode; // Si URL invalide (défaut : rien)
}

// Composant Embed Vidéo (conversion du formatter PHP)
export default function VideoEmbed({
  field_embed_url,
  width = 560,
  height = 315,
  className = "",
  fallback = null,
}: VideoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Réinitialise l'état de chargement si l'URL change
    setIsLoading(true);
  }, [field_embed_url]);

  if (!field_embed_url) return fallback || null;

  let embedUrl = "";
  let id = "";

  // 1. Dailymotion
  const dailymotionMatch = field_embed_url.match(/^https?:\/\/(www\.)?dailymotion\.com\/video\/([0-9A-Za-z_-]*)/);
  if (dailymotionMatch) {
    id = dailymotionMatch[2];
    embedUrl = `https://www.dailymotion.com/embed/video/${id}`;
  }

  // 2. Archive.org
  const archiveMatch = field_embed_url.match(/^https?:\/\/(www\.)?archive\.org\/details\/([0-9A-Za-z_-]*)/);
  if (archiveMatch) {
    id = archiveMatch[2];
    embedUrl = `https://archive.org/embed/${id}`;
  }

  // 3. Vimeo
  const vimeoMatch = field_embed_url.match(/^https?:\/\/(www\.)?vimeo\.com\/(channels\/[a-zA-Z0-9]*\/)?([0-9]*)(\/[a-zA-Z0-9]+)?(\#t=(\d+)s)?$/);
  if (vimeoMatch) {
    id = vimeoMatch[3];
    embedUrl = `https://player.vimeo.com/video/${id}`;
  }

  // 4. YouTube Playlist
  const ytPlaylistMatch = field_embed_url.match(/^https?:\/\/(www\.)?(youtube\.com\/playlist\?list=)([0-9A-Za-z_-]*)/);
  if (ytPlaylistMatch) {
    id = ytPlaylistMatch[3];
    embedUrl = `https://www.youtube.com/embed/videoseries?list=${id}&controls=1`;
  }

  // 5. YouTube Single Video
  const ytVideoMatch = field_embed_url.match(/^https?:\/\/(www\.)?((?!.*list=)youtube\.com\/watch\?.*v=|youtu\.be\/)([0-9A-Za-z_-]*)/);
  if (ytVideoMatch) {
    id = ytVideoMatch[3];
    embedUrl = `https://www.youtube.com/embed/${id}?controls=1`;
  }

  // 6. RTS
  const rtsMatch = field_embed_url.match(/^https?:\/\/(www\.)?rts\.ch\/([0-9A-Za-z_-]*)\/([0-9A-Za-z_-]*)\/([0-9A-Za-z_-]*)\/([0-9A-Za-z_-]*)\/([0-9]*)-([0-9A-Za-z_-]*)\./);
  if (rtsMatch) {
    id = rtsMatch[6];
    const slug = rtsMatch[7];
    embedUrl = `https://www.rts.ch/play/embed?urn=urn:rts:video:${id}-${slug}&subdivisions=false`;
  }

  // 7. INA (URL complète)
  if (field_embed_url.match(/(player\.ina)/i)) {
    embedUrl = field_embed_url; // Utilise l'URL directe (embed INA)
  }

  // Si pas de match → fallback
  if (!embedUrl) return fallback || null;

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      {isLoading && (
        // Placeholder animé
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
          <svg
            className="w-12 h-12 text-gray-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        width={width}
        height={height}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="Vidéo embarquée"
        className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
        onLoad={() => setIsLoading(false)} // Détecte la fin du chargement
      />
    </div>
  );
}