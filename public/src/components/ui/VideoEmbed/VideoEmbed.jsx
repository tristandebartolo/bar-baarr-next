"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideoEmbed;
// components/ui/VideoEmbed/VideoEmbed.tsx
const react_1 = __importStar(require("react"));
// Composant Embed Vidéo (conversion du formatter PHP)
function VideoEmbed({ field_embed_url, width = 560, height = 315, className = "", fallback = null, }) {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const iframeRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // Réinitialise l'état de chargement si l'URL change
        setIsLoading(true);
    }, [field_embed_url]);
    if (!field_embed_url)
        return fallback || null;
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
    if (!embedUrl)
        return fallback || null;
    return (<div className={`relative w-full aspect-video ${className}`}>
      {isLoading && (
        // Placeholder animé
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
          <svg className="w-12 h-12 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>)}
      <iframe ref={iframeRef} src={embedUrl} width={width} height={height} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Vidéo embarquée" className="absolute inset-0 w-full h-full rounded-lg shadow-lg" onLoad={() => setIsLoading(false)} // Détecte la fin du chargement
    />
    </div>);
}
