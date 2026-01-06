// src/components/cookies/CookieSystem.tsx
"use client";

import { useEffect, useState } from "react";
import { cookieConsent } from "@/lib/helpers/cookieConsent";
import CookieBanner from "./CookieBanner";
import CookieModal from "./CookieModal";
import CookiePreferencesButton from "./CookiePreferencesButton";

export default function CookieSystem() {
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const update = () => {
      setHasConsented(cookieConsent.hasConsented());
    };

    // Premier appel
    update();

    // Abonnement
    const unsubscribe = cookieConsent.subscribe(update);

    // === NOUVEAU : Détection de l'URL pour ouvrir la modale ===
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      console.log('url', url)
      // Option 1 : hash #cookies
      const shouldOpenFromHash = url.hash === "#cookies" || url.hash === "#cookies-preferences";

      if (shouldOpenFromHash) {
        setShowModal(true);
        // Optionnel : nettoyer l'URL après ouverture (sans recharger la page)
        // Pour une URL propre après ouverture
        if (shouldOpenFromHash) {
          // Supprime le hash sans recharger
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    }

    // Nettoyage
    return () => {
      unsubscribe();
    };
  }, []); // ← dépendances vides

  // Pendant SSR + premier rendu → on affiche la bannière
  if (!isMounted) {
    return <CookieBanner onOpenPreferences={() => {}} />;
  }

  return (
    <>
      {!hasConsented && <CookieBanner onOpenPreferences={() => setShowModal(true)} />}

      {showModal && <CookieModal onClose={() => setShowModal(false)} />}

      {hasConsented && <CookiePreferencesButton onClick={() => setShowModal(true)} />}
    </>
  );
}
