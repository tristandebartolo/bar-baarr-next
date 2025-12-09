// Fonction native, 0 dépendance, safe SSR + CSR
export const formatDate = (dateString: string | undefined, locale: string): string => {
  if (!dateString) return "Date inconnue";

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris", // important pour éviter les décalages
  }).format(new Date(dateString));
};