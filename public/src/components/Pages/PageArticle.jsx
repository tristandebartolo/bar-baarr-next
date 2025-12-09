"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageArticle = PageArticle;
const image_1 = __importDefault(require("next/image"));
// Components
const JournalSommaire_1 = require("../ui/JournalSommaire/JournalSommaire");
const SidebarSticky_1 = __importDefault(require("../ui/SidebarSticky/SidebarSticky"));
// Styles
const PageArticle_module_css_1 = __importDefault(require("./PageArticle.module.css"));
const VideoWithConsent_1 = __importDefault(require("../ui/VideoEmbed/VideoWithConsent"));
const DrupalEntities_1 = __importDefault(require("../ui/DrupalEntities/DrupalEntities"));
// import { formatDate } from "@/lib/helpers/utilsTools";
// Cette fonction marche maintenant en français côté serveur !
const formatDate = (dateString, locale) => {
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Paris",
    }).format(new Date(dateString));
};
// Component
function PageArticle({ node, locale, theme }) {
    var _a;
    const publishedDate = node.created ? formatDate(node.created, locale) : null;
    const portraitAuthor = ((_a = node === null || node === void 0 ? void 0 : node.author) === null || _a === void 0 ? void 0 : _a.picture) || null;
    const timeOfRead = (node === null || node === void 0 ? void 0 : node.count_text) || null;
    return (<>
      <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container) dark:text-cyan-50">
        <div className="flex gap-4 px-5 py-24">
          <main className="w-1/1">
            {node && (<>
                <h1 className={PageArticle_module_css_1.default.h1}>{node.title}</h1>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Par {node.author.prenom} {node.author.nom} • {publishedDate}{" "}
                  {timeOfRead
                ? ` • Temps de lecture: ${timeOfRead} minutes`
                : ``}
                </div>
                {/* Chapô */}
                {node.field_chapo && (<div className="prose prose-lg dark:prose-invert mt-12 max-w-none" dangerouslySetInnerHTML={{ __html: node.field_chapo }}/>)}

                {portraitAuthor && (<div className="relative">
                    <image_1.default priority src={portraitAuthor} alt={node.title} width={100} height={100} className=""/>
                  </div>)}
              </>)}
          </main>
        </div>
      </div>
      {node.field_embed_url && (<div className="my-16">
          <VideoWithConsent_1.default url={node.field_embed_url}/>
        </div>)}
      <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container) dark:text-cyan-50">
        <div className="gap-4 px-5 md:flex" id="js-oversized">
          {/* Sidebar Sticky */}
          <div className="w-full md:w-1/4">
            <SidebarSticky_1.default options={{
            offset: 90,
            end: "#js-oversized",
            media: 768,
        }}>
              <div>
                Visuellement, The Addiction est un bijou brut, grâce à la
                photographie en noir et blanc de Ken Kelsch, qui évoque les
                films noirs des années 50 tout en capturant un New York
                crasseux, juste avant sa gentrification. La bande-son, mêlant le
                score de Joe Delia à des éclats de rap comme Cypress Hill
              </div>
            </SidebarSticky_1.default>
          </div>
          <div className="md:w-3/4">
            <div className="gg-body">
              <div className="flex flex-col gap-3">
                {node.body && (<DrupalEntities_1.default langcode={locale} theme={theme}>
                    <div dangerouslySetInnerHTML={{ __html: node.body }}/>
                  </DrupalEntities_1.default>)}
                {/* {node?.body && (
          <div dangerouslySetInnerHTML={{ __html: node.body }} />
        )} */}
              </div>
            </div>
          </div>
          {/* Sidebar Sticky */}
          <div className="max-md:hidden md:w-1/4">
            <SidebarSticky_1.default options={{
            offset: 90,
            end: "#js-oversized",
            media: 768,
        }}>
              {(node === null || node === void 0 ? void 0 : node.sommaire) && <JournalSommaire_1.JournalSommaire sommaire={node.sommaire}/>}
            </SidebarSticky_1.default>
          </div>
        </div>
      </div>
    </>);
}
exports.default = PageArticle;
