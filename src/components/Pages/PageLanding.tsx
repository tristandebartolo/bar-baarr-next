// "use client";
// Types
import { HomeNode, LayoutSection } from "@/lib/types";
// Ui
import LayoutRenderer from "../ui/LayoutRenderer/LayoutRenderer";
// Tools
import {
  containerMax,
  containerCol,
  regionWidth,
  gap,
} from "@/lib/helpers/index";
// Component
function PageLanding({ node, locale }: { node: HomeNode, locale: string }) {
  const sections = node.field_display || null;

  return (
    <main className="min-h-screen">
      {sections?.map((section: LayoutSection) => {
        // console.log("section", section);
        // if (region.items.lenght === 0) return null;

        const bgColor =
          section?.settings?.behavior_settings?.layout_bg_color || null;
        const bgColorOpacity =
          section?.settings?.behavior_settings?.layout_bg_color_opacity || 0;
        const sectionContainer =
          section?.settings?.behavior_settings?.layout_container || "max-w-7xl";
        const sectionContainerCol =
          section?.settings?.behavior_settings?.layout_container_responsive ||
          "4";

        const sectionContainerGap =
          section?.settings?.behavior_settings?.layout_container_gap || "4";

        const sectionStyles = {};
        Object.assign(sectionStyles, {position: 'relative'});
        if (bgColor) {
          const bg = { backgroundColor: `rgba(${bgColor},${bgColorOpacity})` };
          Object.assign(sectionStyles, bg);
        }

        return (
          <section key={section.settings.uuid} style={sectionStyles}>
            <div className={`mx-auto px-5 ${containerMax(sectionContainer)} ${locale}`}>
              <div
                className={`grid grid-cols-1 ${containerCol(sectionContainerCol)} ${gap(sectionContainerGap)}`}
              >
                {Object.entries(section.regions).map(([regionName, region]) => {
                  const regionResponsive_lg =
                    region?.settings?.layout_responsive_lg || "1";
                  const regionResponsive_md =
                    region?.settings?.layout_responsive_md || "1";
                  const regionGap =
                    region?.settings?.layout_container_gap || "0";

                  return (
                    <div
                      key={regionName}
                      className={`${regionWidth(regionResponsive_md, "md")} ${regionWidth(regionResponsive_lg, "lg")} ${gap(regionGap)}`}
                    >
                      <LayoutRenderer
                        blocks={region.items || []}
                        settings={region.settings || {}}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
export default PageLanding;
