// Types
export interface PathItem {
	alias: string | null;
	pid: number | null;
	langcode: string;
}

export interface WideFormat {
	url: string;
	full?: string;
	width?: number | string;
	height?: number | string;
}

export interface TaxonomyTerm {
	tid: number;
	langcode: string;
	status: boolean;
	name: string;
	weight: number;
	parent: Array < {
		target_id: number | null
	} >;
	path: PathItem[];
	entity_bundle?: string;
}

export interface MediaImage {
	fid: number;
	uri: Array < {
		value: string;
		url: string;
	} >;
	filemime: string;
	status: boolean;
	wide?: WideFormat;
}

export interface Vignette {
	mid: number;
	status: boolean;
	name: string;
	field_copyright?: string | null;
	field_description?: string | null;
	field_lien?: string | null;
	field_media_image: MediaImage[];
}

export interface ArticleType {
	entity_bundle: "article";
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
	field_visibility: number;
}

export type ArticlesParagraphProps = {
	node: {
		bundle: string;
		field_hn: "h2" | "h3" | "h4" | "h5" | "h6";
		field_alignement: string;
		field_font_size: string;
		field_show_title: boolean;
		field_title: string;
		field_mode_display: | "card" | "card_left" | "card_right" | "tiny" | "tiny_left" | "tiny_right";
		field_style_image: string; // Ignoré
		field_template_display: "tmp1" | "tmp2" | "tmp3" | "tmp4" | "tmp5";
		field_articles: ArticleType[];
		id: number;
		status: boolean;
		uuid: string;
	};
};

export type MessageParagraphProps = {
	node: {
		bundle: "message";
		field_alignement: "left" | "center" | "right";
		field_font_size: string; // ex: "6xl", "4xl", etc.
		field_hn: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		field_show_title: boolean;
		field_status_msg: "primary" | "success" | "warning" | "danger"; // Statuts possibles
		field_text: string;
		field_title: string;
		id: number;
		status: boolean;
		uuid: string;
	};
	langcode?: string;
	theme?: string;
};

export type GalerieParagraphProps = {
	node: {
		field_hn: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		field_mode: "grid" | "slideshow" | "normal";
		field_mode_grid: "2" | "3" | "4";
		field_show_title: boolean;
		field_lightbox: boolean;
		field_title: string;
		field_galerie: Array < {
			name: string;
			field_description: string | null;
			field_copyright: string | null;
			field_media_image: Array < {
				uri: Array < {
					url: string
				} >;
				wide?: {
					url: string;
					full: string
				};
			} >;
		} >;
	};
  langcode?: string;
	theme?: string;
};


export type TwitterPostParagraphProps = {
	node: {
		bundle: "post_x";
		field_url_embed: string;
		id: number;
		status: boolean;
		uuid: string;
	};
	langcode?: string;
	theme?: string;
};

export type VideoParagraphProps = {
	node: {
		field_alignement: "left" | "center" | "right";
		field_font_size: string; // ex: "6xl", "4xl", etc.
		field_hn: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		field_show_title: boolean;
		field_title: string;
		field_url_embed: string;
		id: number;
		status: boolean;
		uuid: string;
	};
	langcode?: string;
	success?: boolean;
	theme?: boolean;
};
