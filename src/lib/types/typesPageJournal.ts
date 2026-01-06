import { CSSProperties } from "react";
import { LayoutParagraphSection } from "./typesParagraphEmbed";

export interface attriRegion {
	style?: CSSProperties;
	className?: string;
	id?: string;
}

export interface MetatagItem {
	tag: "meta" | "link";
	attributes: Record < string,
	string >;
}

export interface PathItem {
	alias: string | null;
	pid: number | null;
	langcode: string;
}

export interface SommaireItem {
	id: string;
	title: string;
	tag: string;
	level: number;
	parent_id?: string | null;
}

export interface WideFormat {
	url: string;
	width?: number | string;
	height?: number | string;
	full: string;
	mobile?: string;
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

export interface AuthorArticle {
	picture: WideFormat;
	field_denomination: string;
	field_prenom: string | null;
	field_nom: string | null;
	field_slogan: string | null;
	uid: number;
	status: boolean;
	path: PathItem[];
}

export interface JournalNode {
	nid: number;
	uuid: string;
	langcode: string;
	status: boolean;
	ccs?: boolean;
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
	count_text_preview?: number;
	author: Author;
	field_preview?: unknown | null;
	sommaire?: string[] | SommaireItem[];
	display: string;
	langcode_translations: unknown | null;
	field_authors?: AuthorArticle[] | null;
}

export interface JournalResponse {
	success: boolean;
	alias: string;
	display: string;
	node: JournalNode | HomeNode | null;
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
	field_display?: LayoutParagraphSection[]; // ← LE CHAMP CLÉ : ton Layout Builder
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
