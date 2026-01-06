"use client";
// Types
import { ArticleType } from "@/lib/types/typesParagraphEmbed";
type ArticleChapoType = {
  chapo: Pick<ArticleType, "field_chapo">
};
// Composent
export default function ArticleChapo({ chapo }: ArticleChapoType) {
  const chapoArticle = Array.isArray(chapo.field_chapo) ? chapo.field_chapo.join("") : chapo.field_chapo || null;
  return (
    <>
      {chapoArticle && chapoArticle !== '' && (
        <div
          className="mb-3 text-md line-clamp-5 md:line-clamp-7"
          dangerouslySetInnerHTML={{
            __html: chapoArticle,
          }}
        />
      )}
    </>
  );
}
