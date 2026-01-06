"use client";
// Libs
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// Context
import { useToast } from "@/lib/helpers/toastContext";
// defaultFolders
const defaultFolders = [{ name: "/", path: "", icon: "icon-gm-container" }];
// Composent
export default function Sidebar() {
  const pathname = usePathname();
  const currentSection = pathname.split("/").pop() || "";

  const [sections, setSections] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [deletingSection, setDeletingSection] = useState(false); // Confirmation suppression
  const { addToast } = useToast();

  // Chargement des sections
  useEffect(() => {
    async function loadSections() {
      const res = await fetch("/api/admin/translations/sections");
      if (res.ok) {
        const data = await res.json();
        setSections(data.sections || []);
      }
    }
    loadSections();
  }, []);

  const handleCreateSection = async () => {
    if (!newSectionName.trim()) return;

    const res = await fetch("/api/admin/translations/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSectionName.trim() }),
    });

    if (res.ok) {
      setSections((prev) => [...prev, newSectionName.trim()]);
      setNewSectionName("");
      setIsCreating(false);
    } else {
      addToast("Erreur lors de la création de la section", "error");
    }
  };

  const handleDeleteSection = async () => {
    if (!currentSection) return;

    const res = await fetch("/api/admin/translations/sections", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: currentSection }),
    });

    if (res.ok) {
      setSections((prev) => prev.filter((s) => s !== currentSection));
      setDeletingSection(false);
      // Redirection vers la racine
      window.location.href = "/fr/admin/translations";
    } else {
      addToast("Erreur lors de la suppression de la section", "error");
    }
  };

  const allFolders = [
    ...defaultFolders,
    ...sections.map((sec) => ({
      name: sec.charAt(0).toUpperCase() + sec.slice(1),
      path: sec,
      icon: "icon-gm-split-vertical",
    })),
  ];

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="mb-8 text-xl font-bold text-gray-900">Traductions</h2>
        {/* Affichage de la section courante + bouton suppression */}
        {currentSection && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Section active</p>
                <p className="font-semibold text-gray-900">{currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}</p>
              </div>

              {currentSection !== "translations" && (
                <>
                  {deletingSection ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeletingSection(false)}
                        className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                      >
                        <span className="icon-gm-arrow_back"></span>
                      </button>
                      <button
                        onClick={handleDeleteSection}
                        className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        <span className="icon-gm-delete"></span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingSection(true)}
                      className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      <span className="icon-gm-delete"></span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <nav className="space-y-2">
          {allFolders.map((folder) => {
            const isActive = currentSection === folder.path;
            const Icon = folder.icon;

            return (
              <Link
                key={folder.path}
                href={`/fr/admin/translations/${folder.path}`}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive ? "bg-blue-50 font-medium text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } `}
              >
                <span className={`h-5 w-5 ${Icon}`} />
                <span>{folder.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Création nouvelle section */}
      <div className="border-t border-gray-200 p-6">
        {isCreating ? (
          <div className="space-y-3">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Nom de la section (ex: footer)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={handleCreateSection} className="flex-1 rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Créer
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewSectionName("");
                }}
                className="flex-1 rounded-md bg-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                <span className="icon-gm-arrow_back"></span>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
          >
            <span className="icon-gm-add"></span>
            Nouvelle section
          </button>
        )}
      </div>
    </aside>
  );
}
