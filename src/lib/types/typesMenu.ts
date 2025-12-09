import { LinkInterface } from "@drupal/linkset/dist/core/link";

export type MenuType = {
	linkset?: MenuLinksetType[];
};

export type MenuLinksetType = {
	anchor?: string;
	item?: MenuLinkType[];
}

export type MenuLinkType = {
	children: MenuLinkType[] | null;
	link: LinkInterface;
	title: string;
}

export type MenuLinksDisplayType = {
  ul: string;
  li: string;
};