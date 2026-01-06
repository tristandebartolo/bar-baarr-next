"use client";
// Lib
import { FC } from "react";
// Types
interface JournalSommaireSnippetProps {
  sommaire: string[];
  className?: string;
}
// Component
export const JournalSommaireSnippet: FC<JournalSommaireSnippetProps> = ({
  sommaire,
  className = "",
}) => {
 
  return (
    <nav className={className} aria-label="Sommaire de l'article">
      <div>
        <h2 className="mt-12  font-semibold tracking-widest text-3xl uppercase">
          Sommaire
        </h2>
        <ul className="space-y-1">
          {sommaire.map((item, i) => 
            <li key={i} className="mb-1 md:text-lg"><div dangerouslySetInnerHTML={{ __html: item }} /></li>
          )}
        </ul>
      </div>
    </nav>
  );
};
