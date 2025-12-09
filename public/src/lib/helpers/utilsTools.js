"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
// Fonction native, 0 dépendance, safe SSR + CSR
const formatDate = (dateString, locale) => {
    if (!dateString)
        return "Date inconnue";
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Paris", // important pour éviter les décalages
    }).format(new Date(dateString));
};
exports.formatDate = formatDate;
