export const apiLink = process.env.DRUPAL_HOSTNAME;
export const baseRs = process.env.JOURNAL_API;
export const baseHome = process.env.DRUPAL_LOAD_HOME;
export const basePath = process.env.DRUPAL_HOSTNAME;
export const baseArticles = process.env.DRUPAL_LOAD_ARTICLES;
export const baseArticle = process.env.DRUPAL_LOAD_ARTICLE;
export const baseArticleMeta = process.env.DRUPAL_LOAD_META;
export const baseArticleTranslations = process.env.DRUPAL_LOAD_TRANSLATIONS;
export const baseArticleUser = process.env.DRUPAL_LOAD_USER;
export const baseParagraphEmbed = process.env.DRUPAL_LOAD_EMBED;

const dev = process.env.NEXT_PUBLIC_DRUPAL_ENV !== "production";
export const hostUrlRedirect = dev ? `${process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_LOCAL}:3000` : process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_FRONT;

// CF
export const apiArticle = process.env.DRUPAL_API_ARTICLE;
