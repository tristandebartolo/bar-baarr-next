
export interface MetatagItem {
  tag: "meta" | "link";
  attributes: Record<string, string>;
}

export interface PathItem {
  alias: string | null;
  pid: number | null;
  langcode: string;
}

export interface SommaireItem {
  id: string;
  title: string;
}

export interface WideFormat {
  url: string;
  width?: number | string;
  height?: number | string;
}

export interface TaxonomyTerm {
  tid: number;
  langcode: string;
  status: boolean;
  name: string;
  weight: number;
  parent: Array<{ target_id: number | null }>;
  path: PathItem[];
  entity_bundle?: string;
}

export interface MediaImage {
  fid: number;
  uri: Array<{
    value: string;
    url: string;
  }>;
  filemime: string;
  status: boolean;
  wide?: WideFormat;
}

export interface Vignette {
  mid: number;
  status: boolean;
  name: string;
  field_copyright: string | null;
  field_description: string | null;
  field_lien: string | null;
  field_media_image: MediaImage[];
}

export interface Author {
  picture: string | null;
  denomination: string;
  prenom: string;
  nom: string;
  uid: number;
}

export interface JournalNode {
  nid: number;
  uuid: string;
  langcode: string;
  status: boolean;
  title: string;
  created: string;
  changed: string;
  moderation_state: string;
  metatag: MetatagItem[];
  path: PathItem[];
  bundle: string;
  field_chapo: string | unknown[];
  field_collection: TaxonomyTerm[];
  promote: boolean;
  field_embed_url?: string;
  body: string | unknown[];
  field_rubriques: TaxonomyTerm[];
  field_thematiques: TaxonomyTerm[];
  field_vignette: Vignette[];
  field_visibility: number;
  field_trombinoscope: unknown[];
  count_text: number;
  author: Author;
  sommaire?: string[] | SommaireItem[];
  display: string;
  langcode_translations: unknown | null;
}

export interface JournalResponse {
  success: boolean;
  alias: string;
  display: string;
  node: JournalNode | HomeNode | null;
}

// ========================================
// 2. Layout Builder – Types génériques
// ========================================

export interface LayoutRegionSettings {
  layout_id: string;
  layout_container_font_color?: string;
  layout_container_gap?: string;
  layout_bg_color: string;
  layout_bg_color_opacity: string;
  layout_region_padding: string;
  layout_justify_horizontal: string;
  layout_justify_vertical: string;
  layout_region_width: string;
  layout_responsive_lg: string;
  layout_responsive_md?: string;
}

export interface LayoutBehaviorSettings {
  layout_id: string;
  layout_container: string;
  layout_container_responsive?: string;
  layout_container_padding: string;
  layout_container_min_height: string;
  layout_container_justify_vertical: string;
  layout_container_gap: string;
  layout_bg_color: string;
  layout_bg_color_opacity: string;
  layout_bg_img: string | number | null;
}

export interface LayoutSection {
  settings: {
    entity_bundle: string;
    id: number;
    uuid: string;
    langcode: string;
    status: boolean;
    behavior_settings: LayoutBehaviorSettings;
  };
  layout: string; // ex: "threecol_bricks", "onecol", "twocol_bricks", etc.
  regions: Record<
    string,
    {
      settings: LayoutRegionSettings;
      items?: LayoutBlock[];
    }
  >;
}

// ========================================
// 3. Tous les blocs possibles (extensible)
// ========================================

type BlockType =
  | "article"
  | "articles"
  | "text"
  | "message"
  | "video"
  | "accordions"
  | "accordion";

export interface BaseBlock {
  entity_bundle: BlockType;
  id: number;
  uuid: string;
  langcode: string;
  status: boolean;
  field_alignement: "left" | "center" | "right";
  field_font_size?: string;
  field_hn?: string;
  field_show_title?: boolean;
  field_title?: string;
  parent_uuid: string;
  region: string;
}

// Bloc Article (card)
export interface ArticleBlock extends BaseBlock {
  entity_bundle: "article";
  field_article?: ArticleReference[];
  field_mode_display?: "card" | "card_left" | "card_right";
  field_style_image?: "crop169" | "crop32" | "wide" | "crop11";
  field_template_display?: string;
}

// Bloc Articles (carrousel ou liste)
export interface ArticlesBlock extends BaseBlock {
  entity_bundle: "articles";
  field_articles: ArticleReference[];
  field_mode_display?: string;
  field_style_image?: string;
}

// Bloc Texte simple
export interface TextBlock extends BaseBlock {
  entity_bundle: "text";
  field_text: string;
}

// Bloc Message (alert)
export interface MessageBlock extends BaseBlock {
  entity_bundle: "message";
  field_status_msg: "success" | "warning" | "danger" | "primary" | "info";
  field_text: string;
}

// Bloc Vidéo embed
export interface VideoBlock extends BaseBlock {
  entity_bundle: "video";
  field_url_embed: Array<{ value: string }>;
}

// Bloc Accordéon (conteneur)
export interface AccordionsBlock extends BaseBlock {
  entity_bundle: "accordions";
  field_accordions: AccordionItem[];
  field_active_item?: string;
}

// Item d’accordéon
export interface AccordionItem {
  entity_bundle: "accordion";
  id: number;
  uuid: string;
  field_title: string;
  field_hn?: string;
  field_accordion: Array<TextBlock | ArticleBlock | MessageBlock>;
}

export type LayoutBlock =
  | ArticleBlock
  | ArticlesBlock
  | TextBlock
  | MessageBlock
  | VideoBlock
  | AccordionsBlock;

// ========================================
// 4. Référence d’article (dans les blocs)
// ========================================

export interface ArticleReference {
  entity_bundle: "article";
  nid: number;
  uuid: string;
  langcode: string;
  status: boolean;
  title: string;
  uid: Array<{
    entity_bundle: "user";
    uid: number;
    name: string;
    field_denomination?: string;
    field_nom?: string;
    field_prenom?: string;
    field_slogan?: string | null;
    user_picture?: Array<{ entity_bundle: "file"; fid: number; uri: Array<{ value: string; url: string }> }>;
  }>;
  changed: Array<{ value: string; format: string }>;
  moderation_state: string;
  path: PathItem[];
  field_chapo: string | unknown[];
  field_vignette?: Vignette[];
  field_rubriques?: TaxonomyTerm[];
  field_thematiques?: TaxonomyTerm[];
  field_visibility: number;
}

// ========================================
// 5. Node principal (page d'accueil)
// ========================================

export interface HomeNode {
  nid: number;
  uuid: string;
  langcode: string;
  status: boolean;
  title: string;
  created: string;
  changed: string;
  bundle: string;
  promote: boolean;
  default_langcode?: boolean;
  moderation_state: string;
  metatag: MetatagItem[];
  path: PathItem[];
  body: string | unknown[];
  field_chapo: string | unknown[];
  field_collection: TaxonomyTerm[];
  field_display?: LayoutSection[];           // ← LE CHAMP CLÉ : ton Layout Builder
  field_rubriques: TaxonomyTerm[];
  field_thematiques: TaxonomyTerm[];
  field_trombinoscope: unknown[];
  field_vignette: Vignette[];
  field_visibility: number;
  count_text: number;
  author: Author;
  display: string;
  langcode_translations: unknown | null;
}

// ========================================
// 6. Réponse finale
// ========================================

export interface HomePageResponse {
  success: boolean;
  alias: string;
  display: "full" | "home" | string;
  node: HomeNode;
}

export type HomePageData = HomePageResponse["node"];