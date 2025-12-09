"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
// Actions
const action_1 = require("@/lib/action");
// Auth
const auth_1 = require("@/auth/auth");
// Next
const navigation_1 = require("next/navigation");
const PageLanding_1 = __importDefault(require("@/components/Pages/PageLanding"));
const PageArticle_1 = __importDefault(require("@/components/Pages/PageArticle"));
// Page
async function Page({ params }) {
    const session = await (0, auth_1.auth)();
    const { locale, alias } = await params;
    const currentTheme = (await (0, action_1.ccCookies)("theme")) || "dark";
    const buildedAlias = `/journal/${alias.join("/")}`;
    const post = await (0, action_1.getDataByAlias)(buildedAlias, session, locale);
    if ((post === null || post === void 0 ? void 0 : post.success) && !(post === null || post === void 0 ? void 0 : post.node)) {
        return (0, navigation_1.notFound)();
    }
    const { node } = post;
    // Si node est null → 404 (ou tu peux afficher un loader)
    if (!node) {
        return (0, navigation_1.notFound)();
    }
    console.log("post", post);
    // const Component = node?.bundle === "article" ? PageArticle : PageLanding;
    return (<>
     {node.bundle === "article" ? (<PageArticle_1.default node={node} locale={locale} theme={currentTheme}/>) : (<PageLanding_1.default node={node} locale={locale}/>)}
    </>);
}
