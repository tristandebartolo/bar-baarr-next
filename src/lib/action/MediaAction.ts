"use server";
import {signIn} from "@/auth/auth";
import {decrypt} from "@/auth/session";
import {Session} from "next-auth";
import {AuthError} from "next-auth";
import {
	baseHome,
	basePath,
	baseArticles,
	baseArticle,
	baseRs,
	baseArticleMeta,
	baseParagraphEmbed,
	hostUrlRedirect
} from "@/lib/helpers/index";
import {SdUserType} from "../types";

/**
 * getData()
 * @returns
 */
export async function getData() {
	let posts = null;
	const pth = `${basePath}${baseArticles}?dpl=list`;
	// "https://yamn.baarr.fr/iop0hgt5674/67gtrd450olkgp/rtcls"
	const data = await fetch(pth, {
		headers: {
			Authorization: `Basic ${baseRs}`
		},
		cache: "no-cache"
	});

	if (! data.ok) {
		return null;
	}

	posts = await data.json();

	return posts;
}

/**
 * getData()
 * @returns
 */
export async function getDataEmbed(type : string = "paragraph", uuid : string, lancode : string = "fr") {
	let posts = null;
	const pth = `${basePath}${baseParagraphEmbed}?tp=${type}&id=${uuid}&lngcd=${lancode}`;
	const data = await fetch(pth, {
		headers: {
			Authorization: `Basic ${baseRs}`
		},
		cache: "no-cache"
	});

	if (! data.ok) {
		return null;
	}

	posts = await data.json();

	return posts;
}

/**
 * getAccueil()
 *
 * @param {string} $lancode
 * @returns
 */
export async function getAccueil($lancode : string = "fr") {
	const pth = `${basePath}${baseHome}?lngcd=${$lancode}`;
	console.log('pth', pth)
	const data = await fetch(pth, {
		headers: {
			Authorization: `Basic ${baseRs}`
		},
		cache: "no-cache"
	});

	if (! data.ok) {
		return null;
	}

	return await data.json();
}

/**
 * getMetatags()
 *
 * @param {string} $lancode
 * @returns
 */
export async function getMetatags(alias : string = '', type : string = 'alias', display : string = 'alias', langcode : string = "fr") {
	const baseRsHs = baseRs;
	const pth = `${basePath}${baseArticleMeta}?alias=${alias}&tp=${type}&dpl=${display}&lngcd=${langcode}`;
	console.log('pth', pth);
	const data = await fetch(pth, {
		headers: {
			Authorization: `Basic ${baseRsHs}`
		},
		cache: "no-cache"
	});

	if (! data.ok) {
		return null;
	}

	return await data.json();
}

/**
 * getMetatags()
 *
 * @param {string} $lancode
 * @returns
 */
export async function getMenu(name : string = 'main', langcode : string = 'fr') {
	const baseRsHs = baseRs;
	const pth = `${basePath}/${langcode}/system/menu/${name}/linkset`;
	const data = await fetch(pth, {
		headers: {
			Authorization: `Basic ${baseRsHs}`
		},
		cache: "no-cache"
	});

	if (! data.ok) {
		return null;
	}

	return await data.json();
}

/**
 * getDataByAlias()
 * 
 * @param alias 
 * @param session 
 * @param langcode 
 * @returns 
 */
export async function getDataByAlias(alias : string, session : Session | null, langcode : string) {
	let baseRsHs = baseRs;

	if (session ?. user) {
		const {
			user = null
		} = session;
		if (user) {
			const {
				email = null
			} = user;
			if (email) {
				const basicHash = await decrypt(email);

				if (basicHash && basicHash.sd) {
					const sdf: SdUserType = basicHash.sd || {};
					if (sdf) {
						baseRsHs = sdf.hash;
					}
				}
			}
		}
	}

	const pth = `${basePath}${baseArticle}?alias=${alias}&langcode=${langcode}`;
	const data = await fetch(pth, {
		headers: {
			Authorization: `Basic ${baseRsHs}`
		},
		cache: "no-cache"
	});

	if (! data.ok) {
		return null;
	}

	const post = await data.json();
	return post;
}

/**
 * authenticate()
 * @param prevState 
 * @param formData 
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData, // FormData natif
) {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
	  redirectTo: hostUrlRedirect + '/fr'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Identifiants incorrects.";
        default:
          return "Une erreur est survenue.";
      }
    }
    throw error;
  }
}