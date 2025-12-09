"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetadata = generateMetadata;
exports.default = Page;
const navigation_1 = require("next/navigation");
// Actions
const action_1 = require("@/lib/action");
// Composents
const PageLanding_1 = __importDefault(require("@/components/Pages/PageLanding"));
// generateMetadata
async function generateMetadata({ params }) {
    // const locale = (await params).locale
    const { locale } = await params;
    const accueil = await (0, action_1.getMetatags)("0", "nid", "home", locale);
    // console.log('accueil', accueil)
    return accueil && accueil.node
        ? accueil.node
        : {
            title: "home",
        };
}
// Page
async function Page({ params, }) {
    const { locale } = await params;
    const accueil = await (0, action_1.getAccueil)(locale);
    if (!(accueil === null || accueil === void 0 ? void 0 : accueil.success) && !(accueil === null || accueil === void 0 ? void 0 : accueil.node)) {
        return (0, navigation_1.notFound)();
    }
    console.log("accueil", accueil);
    return (<PageLanding_1.default node={accueil.node} locale={locale}/>);
}
