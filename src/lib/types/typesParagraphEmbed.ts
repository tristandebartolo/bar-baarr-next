import {AlignType, ColonnesTypes, HnType, ModeDisplayType, TemplateCardType} from "./typesOptionsJournal";
import {AuthorArticle, Vignette, TaxonomyTerm, PathItem} from "./typesPageJournal";

// Types
// export interface PathItem {
// alias: string | null;
// pid: number | null;
// langcode: string;
// }

// export interface WideFormat {
// url: string;
// full: string;
// width?: number | string;
// height?: number | string;
// mobile?: string;
// }

// export interface TaxonomyTerm {
// tid: number;
// langcode: string;
// status: boolean;
// name: string;
// weight: number;
// parent: Array < {
// target_id: number | null
// } >;
// path: PathItem[];
// entity_bundle?: string;
// }

// export interface MediaImage {
// fid: number;
// uri: Array < {
// value: string;
// url: string;
// } >;
// filemime: string;
// status: boolean;
// wide?: WideFormat;
// }

// export interface Vignette {
// mid: number;
// status: boolean;
// name: string;
// field_copyright?: string | null;
// field_description?: string | null;
// field_lien?: string | null;
// field_media_image: MediaImage[];
// }

export interface ArticleType {
	entity_bundle: string;
	entity_type: string;
	nid: number;
	uuid: string;
	langcode: string;
	status: boolean;
	title: string;
	changed: string;
	created: string;
	moderation_state: string;
	path: PathItem[];
	field_chapo: string | unknown[];
	field_vignette?: Vignette[];
	field_collection?: TaxonomyTerm[];
	field_rubriques?: TaxonomyTerm[];
	field_thematiques?: TaxonomyTerm[];
	field_visibility?: number;
	field_authors?: AuthorArticle[];
}

export interface PageType {
	entity_bundle: string;
	entity_type: string;
	nid: number;
	uuid: string;
	langcode: string;
	status: boolean;
	title: string;
	changed: string;
	created: string;
	moderation_state: string;
	path: PathItem[];
	field_chapo: string | unknown[];
	field_vignette?: Vignette[];
	field_collection?: TaxonomyTerm[];
	field_rubriques?: TaxonomyTerm[];
	field_thematiques?: TaxonomyTerm[];
	field_visibility?: number;
}

export interface PollType {
	entity_bundle: string;
	entity_type: string;
	id: number;
	question: string;
	langcode: string;
	status: boolean;
	changed?: string;
	created?: string;
	choice?: PollChoiceType[];
	runtime: number;
	auto_submit?: boolean;
	order_results?: string;
	anonymous_vote_allow?: boolean;
	anonymous_vote_restriction?: string;
	cancel_vote_allow?: boolean;
	result_vote_allow?: boolean;
	active?: boolean;
	path: PathItem[];
	field_chapo?: string | unknown[];
	field_vignette?: Vignette[];
}

export interface PollChoiceType {
	entity_bundle: string;
	entity_type: string;
	choice?: string;
	id: number;
	uuid?: string;
	langcode?: string;
	default_langcode?: string;
}

// ========================================
// 2. Layout Builder – Types génériques
// ========================================
export interface ParagraphProps {
	entity_bundle?: string;
	entity_type?: string;
	id: number;
	status: boolean;
	uuid: string;
	langcode?: string;
	parent_uuid?: string;
	region?: string;
};

export interface LayoutParagraphRegionSettings {
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

export type OptionStringValueType = {
[key: string]: string | number;
};

export interface LayoutParagraphBehaviorSettings {
	layout_id: string;
	layout_container: string;
	layout_container_responsive?: string;
	layout_container_padding: string;
	layout_container_min_height: string;
	layout_region_min_height: OptionStringValueType;
	layout_container_justify_vertical: string;
	layout_container_gap: string;
	layout_bg_color: string | null;
	layout_bg_color_opacity: string;
	layout_bg_img: string | number | null;
}

export interface LayoutParagraphSection {
	settings: {
		entity_bundle: string;
		id: number;
		uuid: string;
		langcode: string;
		status: boolean;
		behavior_settings: LayoutParagraphBehaviorSettings;
	};
	layout: string;
	regions: Record < string, {
		settings: LayoutParagraphRegionSettings;
		items?: ItemsParagraphProps[];
	} >;
}

export interface TitleIconParagraphDataProps extends ParagraphProps {
	field_hn: HnType;
	field_title: string;
	field_alignement: string;
	field_font_size: string;
	field_show_title: boolean;
	field_icon: string;
	field_disposition: string;
};

export interface TexteParagraphProps extends ParagraphProps {
	field_hn: HnType;
	field_title: string;
	field_alignement: string;
	field_font_size: string;
	field_text: string;
	field_show_title: boolean;
};

export interface ArticleParagraphProps extends ParagraphProps {
	field_hn: HnType;
	field_alignement: string;
	field_font_size: string;
	field_mode_display: ModeDisplayType;
	field_style_image: string;
	field_template_display: TemplateCardType;
	field_article: ArticleType[] | PageType[];
	field_min_height?: string;
};

export interface ArticlesParagraphDataProps extends ParagraphProps {
	field_hn: HnType;
	field_alignement: string;
	field_font_size: string;
	field_show_title: boolean;
	field_gap?: string;
	field_title: string;
	field_mode_display: ModeDisplayType;
	field_mode?: "grid" | "slideshow" | "normal" | "slider";
	field_mode_grid?: ColonnesTypes;
	field_mode_grid_md?: ColonnesTypes;
	field_style_image: string;
	field_template_display: TemplateCardType;
	field_articles: ArticleType[] | PageType[];
	field_min_height?: string;
};

export interface ArticleByTermParagraphDataProps extends ParagraphProps {
	field_hn: HnType;
	field_alignement: string;
	field_font_size: string;
	field_show_title: boolean;
	field_gap?: string;
	field_title: string;
	field_mode_display: ModeDisplayType;
	field_mode?: "grid" | "slideshow" | "normal" | "slider";
	field_mode_grid?: ColonnesTypes;
	field_mode_grid_md?: ColonnesTypes;
	field_min_height?: string;
	field_style_image: string;
	field_template_display: TemplateCardType;
	field_articles: ArticleType[];
	field_vocabulary?: string;
};

export interface MessageParagraphDataProps extends ParagraphProps {
	field_alignement: AlignType;
	field_font_size: string;
	field_hn: HnType;
	field_show_title: boolean;
	field_status_msg: "primary" | "success" | "warning" | "danger"; // Statuts possibles
	field_text: string;
	field_title: string;
};

export interface GalerieParagraphDataProps extends ParagraphProps {
	field_hn: HnType;
	field_show_title: boolean;
	field_mode: "grid" | "slideshow" | "normal" | "slider";
	field_mode_grid?: ColonnesTypes;
	field_mode_grid_md?: ColonnesTypes;
	field_style_vignette: string;
	field_lightbox: boolean;
	field_title: string;
	field_galerie: Vignette[];
	field_gap?: string;
};

export interface ImageParagraphDataProps extends ParagraphProps {
	field_hn: HnType;
	field_show_title: boolean;
	field_alignement?: "left" | "center" | "right";
	field_image: Vignette[];
	field_font_size?: string;
	field_title: string;
	field_style_image?: string;
	field_lightbox: boolean;
};

export interface TwitterParagrapDataProps extends ParagraphProps {
	field_url_embed: string;
};

export interface VideoParagraphDataProps extends ParagraphProps {
	field_alignement: AlignType;
	field_font_size: string;
	field_hn: HnType;
	field_show_title: boolean;
	field_title: string;
	field_url_embed: string;
	field_text?: string;
};

export interface PollParagraphDataProps extends ParagraphProps {
	field_alignement: AlignType;
	field_font_size: string;
	field_hn: HnType;
	field_show_title: boolean;
	field_title: string;
	field_poll: PollType[];
};

export type ItemsParagraphProps = |TexteParagraphProps | ImageParagraphDataProps | ArticleParagraphProps | ArticlesParagraphDataProps | ArticleByTermParagraphDataProps | MessageParagraphDataProps | GalerieParagraphDataProps | TwitterParagrapDataProps | VideoParagraphDataProps | PollParagraphDataProps | TitleIconParagraphDataProps;

export interface OngletsDataProps extends ParagraphProps {
	field_onglets: OngletDataProps[];
	field_active_item?: string;
	field_alignement?: "left" | "center" | "right";
	field_font_size?: string;
	field_hn?: string;
	field_show_title?: boolean;
	field_title?: string;
};

export interface OngletDataProps extends ParagraphProps {
	field_title: string;
	field_hn?: string;
	field_onglet: ItemsParagraphProps[];
};

export interface AccordionsDataProps extends ParagraphProps {
	field_accordions: AccordionDataProps[];
	field_active_item?: string;
	field_alignement?: "left" | "center" | "right";
	field_font_size?: string;
	field_hn?: string;
	field_show_title?: boolean;
	field_title?: string;
};

export interface AccordionDataProps extends ParagraphProps {
	field_title: string;
	field_hn?: string;
	field_accordion: ItemsParagraphProps[];
};

export type ItemsArticlesParagraphProps = |ArticlesParagraphDataProps | ArticleByTermParagraphDataProps;
