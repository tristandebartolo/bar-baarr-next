// src/app/admin/translations/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Folder, FileText, Plus, Trash2, RotateCcw } from "lucide-react";

const defaultFolders = [
  { name: "Racine", path: "", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentSection = pathname.split("/").pop() || "";

  const [sections, setSections] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [deletingSection, setDeletingSection] = useState(false); // Confirmation suppression

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
      alert("Erreur lors de la création de la section");
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
      alert("Erreur lors de la suppression de la section");
    }
  };

  const allFolders = [
    ...defaultFolders,
    ...sections.map((sec) => ({
      name: sec.charAt(0).toUpperCase() + sec.slice(1),
      path: sec,
      icon: Folder,
    })),
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 text-gray-900">Traductions</h2>

        {/* Affichage de la section courante + bouton suppression */}
        {currentSection && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Section active</p>
                <p className="font-semibold text-gray-900">
                  {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                </p>
              </div>
              {deletingSection ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDeletingSection(false)}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDeleteSection}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeletingSection(true)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{folder.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Création nouvelle section */}
      <div className="p-6 border-t border-gray-200">
        {isCreating ? (
          <div className="space-y-3">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Nom de la section (ex: footer)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateSection}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Créer
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewSectionName("");
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                  <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Nouvelle section
          </button>
        )}
      </div>
    </aside>
  );
}