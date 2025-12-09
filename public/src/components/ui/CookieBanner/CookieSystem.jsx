"use strict";
// src/components/cookies/CookieSystem.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CookieSystem;
const react_1 = require("react");
const cookieConsent_1 = require("@/lib/helpers/cookieConsent");
const CookieBanner_1 = __importDefault(require("./CookieBanner"));
const CookieModal_1 = __importDefault(require("./CookieModal"));
const CookiePreferencesButton_1 = __importDefault(require("./CookiePreferencesButton"));
function CookieSystem() {
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [hasConsented, setHasConsented] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
        const update = () => {
            setHasConsented(cookieConsent_1.cookieConsent.hasConsented());
        };
        // Premier appel
        update();
        // Abonnement
        const unsubscribe = cookieConsent_1.cookieConsent.subscribe(update);
        // Nettoyage
        return () => {
            unsubscribe();
        };
    }, []); // ← dépendances vides
    // Pendant SSR + premier rendu → on affiche la bannière
    if (!isMounted) {
        return <CookieBanner_1.default onOpenPreferences={() => { }}/>;
    }
    return (<>
      {!hasConsented && <CookieBanner_1.default onOpenPreferences={() => setShowModal(true)}/>}

      {showModal && <CookieModal_1.default onClose={() => setShowModal(false)}/>}

      {hasConsented && <CookiePreferencesButton_1.default onClick={() => setShowModal(true)}/>}
    </>);
}
