// components/paragraphs/MessageParagraph.tsx
"use client";

import { MessageParagraphDataProps } from "@/lib/types/typesParagraphEmbed";
import { useState, useEffect, JSX } from "react";

export default function MessageParagraph({ node }: { node: MessageParagraphDataProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  // Simule un chargement (par exemple, pour le rendu du texte)
  useEffect(() => {
    // Simule un délai de chargement (ajustable selon tes besoins)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 seconde de chargement, modifiable

    // Nettoyage
    return () => clearTimeout(timer);
  }, [node.field_text]); // Dépendance sur le texte pour recharger si ça change

  // Styles basés sur le statut
  const statusStyles = {
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  if (isLoading) {
    return (
      <div className={`my-12`}>
        <div className={`flex h-64 items-center justify-center ${statusStyles[node.field_status_msg]} rounded-lg`}>
          <svg className="h-12 w-12 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-12`}>
      <div className={`${statusStyles[node.field_status_msg]} rounded-lg p-6`}>
        {node.field_show_title && node.field_title && <TitleTag className={`mb-6 text-xl font-bold`}>{node.field_title}</TitleTag>}
        <div className={`prose text-sm`} dangerouslySetInnerHTML={{ __html: node.field_text }} />
      </div>
    </div>
  );
}
