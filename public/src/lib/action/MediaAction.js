"use strict";
"use server";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = getData;
exports.getDataEmbed = getDataEmbed;
exports.getAccueil = getAccueil;
exports.getMetatags = getMetatags;
exports.getMenu = getMenu;
exports.getDataByAlias = getDataByAlias;
exports.authenticate = authenticate;
const auth_1 = require("@/auth/auth");
const session_1 = require("@/auth/session");
const next_auth_1 = require("next-auth");
const index_1 = require("@/lib/helpers/index");
/**
 * getData()
 * @returns
 */
async function getData() {
    let posts = null;
    const pth = `${index_1.basePath}${index_1.baseArticles}?dpl=list`;
    // "https://yamn.baarr.fr/iop0hgt5674/67gtrd450olkgp/rtcls"
    const data = await fetch(pth, {
        headers: {
            Authorization: `Basic ${index_1.baseRs}`
        },
        cache: "no-cache"
    });
    if (!data.ok) {
        return null;
    }
    posts = await data.json();
    return posts;
}
/**
 * getData()
 * @returns
 */
async function getDataEmbed(type = "paragraph", uuid, lancode = "fr") {
    let posts = null;
    const pth = `${index_1.basePath}${index_1.baseParagraphEmbed}?tp=${type}&id=${uuid}&lngcd=${lancode}`;
    const data = await fetch(pth, {
        headers: {
            Authorization: `Basic ${index_1.baseRs}`
        },
        cache: "no-cache"
    });
    if (!data.ok) {
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
async function getAccueil($lancode = "fr") {
    const pth = `${index_1.basePath}${index_1.baseHome}?lngcd=${$lancode}`;
    console.log('pth', pth);
    const data = await fetch(pth, {
        headers: {
            Authorization: `Basic ${index_1.baseRs}`
        },
        cache: "no-cache"
    });
    if (!data.ok) {
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
async function getMetatags(alias = '', type = 'alias', display = 'alias', langcode = "fr") {
    const baseRsHs = index_1.baseRs;
    const pth = `${index_1.basePath}${index_1.baseArticleMeta}?alias=${alias}&tp=${type}&dpl=${display}&lngcd=${langcode}`;
    console.log('pth', pth);
    const data = await fetch(pth, {
        headers: {
            Authorization: `Basic ${baseRsHs}`
        },
        cache: "no-cache"
    });
    if (!data.ok) {
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
async function getMenu(name = 'main', langcode = 'fr') {
    const baseRsHs = index_1.baseRs;
    const pth = `${index_1.basePath}/${langcode}/system/menu/${name}/linkset`;
    const data = await fetch(pth, {
        headers: {
            Authorization: `Basic ${baseRsHs}`
        },
        cache: "no-cache"
    });
    if (!data.ok) {
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
async function getDataByAlias(alias, session, langcode) {
    let baseRsHs = index_1.baseRs;
    if (session === null || session === void 0 ? void 0 : session.user) {
        const { user = null } = session;
        if (user) {
            const { email = null } = user;
            if (email) {
                const basicHash = await (0, session_1.decrypt)(email);
                if (basicHash && basicHash.sd) {
                    const sdf = basicHash.sd || {};
                    if (sdf) {
                        baseRsHs = sdf.hash;
                    }
                }
            }
        }
    }
    const pth = `${index_1.basePath}${index_1.baseArticle}?alias=${alias}&langcode=${langcode}`;
    const data = await fetch(pth, {
        headers: {
            Authorization: `Basic ${baseRsHs}`
        },
        cache: "no-cache"
    });
    if (!data.ok) {
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
async function authenticate(prevState, formData) {
    try {
        await (0, auth_1.signIn)("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirectTo: formData.get("redirectTo"),
        });
    }
    catch (error) {
        if (error instanceof next_auth_1.AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Identifiants incorrects.";
                default:
                    return "Une erreur est survenue.";
            }
        }
        throw error; // important : Next.js gère la redirection si erreur
    }
}
