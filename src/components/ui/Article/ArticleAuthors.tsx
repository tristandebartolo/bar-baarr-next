import { AuthorArticle } from "@/lib/types/typesPageJournal";

export default function ArticleAuthors({
  authors,
}: {
  authors: AuthorArticle[] | null;
}) {

  if (!authors?.length) {
    return <div className="font-bold text-red-500">no authors</div>;
  }

  const formatAuthors = () => {
    return authors.map((author, i) => {
      const name = (
        <>
          {author.field_prenom && <span>{author.field_prenom} </span>}
          <span className="font-bold">{author.field_nom}</span>
        </>
      );

      // Cas : un seul auteur → juste le nom
      if (authors.length === 1) return name;

      // Cas : plusieurs auteurs
      if (i === 0) return name; // premier → pas de préfixe
      if (i === authors.length - 1) {
        // dernier → " et "
        return <> et {name}</>;
      }
      // au milieu → ", "
      return <>, {name}</>;
    });
  };

  return (
    <div className="flex items-end gap-1 text-sm">
      <p>Par </p>
      {formatAuthors().map((part, i) => (
        <p key={i} className="text-sm">
          {part}
        </p>
      ))}
    </div>
  );
}
