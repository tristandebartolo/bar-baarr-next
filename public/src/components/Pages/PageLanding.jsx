"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ui
const LayoutRenderer_1 = __importDefault(require("../ui/LayoutRenderer/LayoutRenderer"));
// Tools
const index_1 = require("@/lib/helpers/index");
// Component
function PageLanding({ node, locale }) {
    const sections = node.field_display || null;
    return (<main className="min-h-screen">
      {sections === null || sections === void 0 ? void 0 : sections.map((section) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            console.log("section", section);
            // if (region.items.lenght === 0) return null;
            const bgColor = ((_b = (_a = section === null || section === void 0 ? void 0 : section.settings) === null || _a === void 0 ? void 0 : _a.behavior_settings) === null || _b === void 0 ? void 0 : _b.layout_bg_color) || null;
            const bgColorOpacity = ((_d = (_c = section === null || section === void 0 ? void 0 : section.settings) === null || _c === void 0 ? void 0 : _c.behavior_settings) === null || _d === void 0 ? void 0 : _d.layout_bg_color_opacity) || 0;
            const sectionContainer = ((_f = (_e = section === null || section === void 0 ? void 0 : section.settings) === null || _e === void 0 ? void 0 : _e.behavior_settings) === null || _f === void 0 ? void 0 : _f.layout_container) || "max-w-7xl";
            const sectionContainerCol = ((_h = (_g = section === null || section === void 0 ? void 0 : section.settings) === null || _g === void 0 ? void 0 : _g.behavior_settings) === null || _h === void 0 ? void 0 : _h.layout_container_responsive) ||
                "4";
            const sectionContainerGap = ((_k = (_j = section === null || section === void 0 ? void 0 : section.settings) === null || _j === void 0 ? void 0 : _j.behavior_settings) === null || _k === void 0 ? void 0 : _k.layout_container_gap) || "4";
            const sectionStyles = {};
            Object.assign(sectionStyles, { position: 'relative' });
            if (bgColor) {
                const bg = { backgroundColor: `rgba(${bgColor},${bgColorOpacity})` };
                Object.assign(sectionStyles, bg);
            }
            return (<section key={section.settings.uuid} style={sectionStyles}>
            <div className={`mx-auto px-5 ${(0, index_1.containerMax)(sectionContainer)} ${locale}`}>
              <div className={`grid grid-cols-1 ${(0, index_1.containerCol)(sectionContainerCol)} ${(0, index_1.gap)(sectionContainerGap)}`}>
                {Object.entries(section.regions).map(([regionName, region]) => {
                    var _a, _b, _c;
                    const regionResponsive_lg = ((_a = region === null || region === void 0 ? void 0 : region.settings) === null || _a === void 0 ? void 0 : _a.layout_responsive_lg) || "1";
                    const regionResponsive_md = ((_b = region === null || region === void 0 ? void 0 : region.settings) === null || _b === void 0 ? void 0 : _b.layout_responsive_md) || "1";
                    const regionGap = ((_c = region === null || region === void 0 ? void 0 : region.settings) === null || _c === void 0 ? void 0 : _c.layout_container_gap) || "0";
                    return (<div key={regionName} className={`${(0, index_1.regionWidth)(regionResponsive_md, "md")} ${(0, index_1.regionWidth)(regionResponsive_lg, "lg")} ${(0, index_1.gap)(regionGap)}`}>
                      <LayoutRenderer_1.default blocks={region.items || []} settings={region.settings || {}}/>
                    </div>);
                })}
              </div>
            </div>
          </section>);
        })}
    </main>);
}
exports.default = PageLanding;
