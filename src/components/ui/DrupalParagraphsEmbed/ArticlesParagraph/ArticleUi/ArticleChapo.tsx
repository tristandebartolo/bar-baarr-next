"use client";
// Types
import { ArticleType } from "@/lib/types/typesParagraphEmbed";
type ArticleChapoType = {
  chapo: Pick<ArticleType, "field_chapo">
  tiny?: boolean
};
// Composent
export default function ArticleChapo({ chapo, tiny = false }: ArticleChapoType) {
  const chapoArticle = Array.isArray(chapo.field_chapo) ? chapo.field_chapo.join("") : chapo.field_chapo || null;
  const isTiny =  tiny ? 'text-sm line-clamp-3' : 'text-md line-clamp-7';
  return (
    <>
      {chapoArticle && chapoArticle !== '' && (
        <div
          className={`mb-3 ${isTiny}`}
          dangerouslySetInnerHTML={{
            __html: chapoArticle,
          }}
        />
      )}
    </>
  );
}
