"use client";
// Libs
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/lib/helpers/toastContext";

type Translations = Record<string, string>;
const itemsPerPage = 30;

export default function TranslationManager({ section }: { section: string }) {
  const [translations, setTranslations] = useState<
    Record<string, Translations>
  >({});
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const [selectedLang, setSelectedLang] = useState("fr");
  const [page, setPage] = useState(1);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState<
    Record<string, "saving" | "saved" | null>
  >({});

  // État pour la confirmation inline de suppression
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>(["fr", "en"]);
  const { addToast } = useToast();

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const res = await fetch("/api/admin/translations/languages", {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setLanguages(data.languages || ["fr", "en"]);
        }
      } catch (e) {
        console.warn("Impossible de charger les langues", e);
        setLanguages(["fr", "en"]);
      }
    };

    loadLanguages();
  }, [section]);

  // Chargement des traductions — dépend maintenant de languages ET section
  useEffect(() => {
    async function loadTranslations() {
      setLoading(true);
      const data: Record<string, Translations> = {};
      for (const lang of languages) {
        try {
          const res = await fetch(
            `/api/admin/translations?section=${section}&lang=${lang}`,
            { cache: "no-store" }, // Important pour éviter le cache
          );
          if (res.ok) {
            data[lang] = await res.json();
          } else {
            data[lang] = {};
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          data[lang] = {};
        }
      }
      setTranslations(data);
      setLoading(false);
    }

    if (languages.length > 0) {
      loadTranslations();
    }
  }, [languages, section]);

  const currentTranslations = translations[selectedLang] || {};
  const keys = Object.keys(currentTranslations).sort();
  const totalPages = Math.ceil(keys.length / itemsPerPage);
  const paginatedKeys = keys.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handleSave = async (lang: string, key: string, value: string) => {
    await fetch("/api/admin/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, lang, key, value }),
    });

    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [key]: value },
    }));
  };

  // Ajout d'une clé : français avec valeur, autres langues avec vide
  const handleAdd = async () => {
    if (!newKey.trim()) {
      addToast("La clé est obligatoire", "error");
      return;
    }

    const trimmedKey = newKey.trim();
    const frenchValue = newValue.trim() || trimmedKey;

    // On propage la MÊME valeur française dans TOUTES les langues
    const promises = languages.map((lang) => {
      return handleSave(lang, trimmedKey, frenchValue);
    });

    await Promise.all(promises);

    setNewKey("");
    setNewValue("");

    addToast(`Clé "${trimmedKey}" ajoutée avec le texte français dans tous les onglets !`, "info");
  };

  // Gestion de la saisie avec debounce + indicateur
  const handleInputChange = (lang: string, key: string, value: string) => {
    const uniqueId = `${lang}-${key}`;

    // Si l'utilisateur efface tout → on bloque et on garde l'ancienne valeur
    if (value.trim() === "") {
      // Option 1 : Alert simple
      addToast("La traduction ne peut pas être vide. Veuillez saisir au moins un caractère.", "error");
      // Option 2 : Plus discret (recommandé) - on ne change rien et on sort
      return;
    }

    // Mise à jour immédiate de l'UI (seulement si non vide)
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [key]: value },
    }));

    setSavingStatus((prev) => ({ ...prev, [uniqueId]: "saving" }));

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      const res = await fetch("/api/admin/translations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, lang, key, value }),
      });

      if (res.ok) {
        setSavingStatus((prev) => ({ ...prev, [uniqueId]: "saved" }));
        setTimeout(() => {
          setSavingStatus((prev) => {
            const newStatus = { ...prev };
            delete newStatus[uniqueId];
            return newStatus;
          });
        }, 2000);
      } else {
        setSavingStatus((prev) => {
          const newStatus = { ...prev };
          delete newStatus[uniqueId];
          return newStatus;
        });
      }

    }, 1000);
  };

  // Fonctions pour la suppression inline
  const startDelete = (key: string) => {
    setDeletingKey(key);
  };

  const confirmDelete = async () => {
    if (!deletingKey) return;

    const key = deletingKey;

    await fetch("/api/admin/translations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, key }),
    });

    setTranslations((prev) => {
      const updated = { ...prev };

      languages.forEach((lang) => {
        if (updated[lang] && updated[lang][key] !== undefined) {
          delete updated[lang][key];
        }
      });

      return updated;
    });

    setDeletingKey(null);
    addToast("Traduction supprimée", "info");
  };

  const cancelDelete = () => {
    setDeletingKey(null);
  };

  if (loading) {
    return (
      <div className="py-10 text-center">Chargement des traductions...</div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Gestion des traductions {section ? `> ${section}` : "(racine)"}
      </h1>

      {/* Onglets langues */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLang(lang);
                setPage(1);
              }}
              className={`border-b-2 px-1 py-3 text-sm font-medium capitalize ${
                selectedLang === lang
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } `}
            >
              {lang}
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Formulaire ajout langue */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Code langue (ex: it, de, es)"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            id="new-lang-input"
          />
          <button
            onClick={async () => {
              const input = document.getElementById(
                "new-lang-input",
              ) as HTMLInputElement;
              const code = input?.value.trim().toLowerCase();

              if (!code || !/^[a-z]{2,3}$/.test(code)) {
                addToast("Code langue invalide (ex: it, de, es)", "error");
                return;
              }

              const res = await fetch("/api/admin/translations/languages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
              });

              if (res.ok) {
                const data = await res.json();
                // Mise à jour directe de l'état avec la nouvelle liste
                setLanguages(data.languages);
                input.value = "";
                addToast(`Langue "${code.toUpperCase()}" ajoutée ! L'onglet est maintenant disponible.`, "success");
              } else {
                // const error = await res.json();
                // alert(error.error || "");
                addToast("Erreur lors de l'ajout de la langue", "error");
              }
            }}
            className="rounded-md bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
          >
            Ajouter langue
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout (seulement sur fr) */}
      {selectedLang === "fr" && (
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Ajouter une nouvelle clé
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Clé (ex: welcome_message)
              </label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="welcome_message"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Valeur (français)
              </label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Bienvenue sur le site !"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAdd}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des traductions */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Clé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Valeur ({selectedLang})
              </th>
              {selectedLang === "fr" && (
                <th className="w-32 px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedKeys.length === 0 ? (
              <tr>
                <td
                  colSpan={selectedLang === "fr" ? 3 : 2}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Aucune traduction dans cette section.
                </td>
              </tr>
            ) : (
              paginatedKeys.map((key) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-700">
                    {key}
                  </td>
                  <td className="relative px-6 py-4">
                    <input
                      type="text"
                      value={currentTranslations[key] || ""}
                      onChange={(e) =>
                        handleInputChange(selectedLang, key, e.target.value)
                      }
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="Entrez la traduction..."
                      disabled={
                        savingStatus[`${selectedLang}-${key}`] === "saving"
                      } // optionnel : désactive pendant l'enregistrement
                    />
                    {savingStatus[`${selectedLang}-${key}`] && (
                      <span
                        className={`absolute top-1/2 right-6 mr-4 -translate-y-1/2 text-sm font-medium ${
                          savingStatus[`${selectedLang}-${key}`] === "saving"
                            ? "text-gray-500"
                            : "text-green-600"
                        }`}
                      >
                        {savingStatus[`${selectedLang}-${key}`] === "saving" ? (
                         <span className="icon-gm-create"></span>
                        ) : (
                          <span className="icon-gm-check"></span>
                        )}
                      </span>
                    )}
                  </td>
                  {selectedLang === "fr" && (
                    <td className="px-6 py-4 text-right">
                      {deletingKey === key ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={cancelDelete}
                            className="rounded bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
                          >
                            <span className="icon-gm-arrow_back"></span>
                          </button>
                          <button
                            onClick={confirmDelete}
                            className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                          >
                            <span className="icon-gm-delete"></span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startDelete(key)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          <span className="icon-gm-delete"></span>
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-600">
              Page {page} sur {totalPages} ({keys.length} clés au total)
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
