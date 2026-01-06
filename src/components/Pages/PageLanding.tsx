// Types
import { attriRegion, HomeNode } from "@/lib/types";
// Ui
import LayoutRenderer from "../ui/LayoutRenderer/LayoutRenderer";
import { LayoutParagraphBehaviorSettings, LayoutParagraphRegionSettings, LayoutParagraphSection } from "@/lib/types/typesParagraphEmbed";
// Component
function PageLanding({ node, locale }: { node: HomeNode; locale: string }) {
  const sections = node?.field_display || null;

  return (
    <main className="min-h-screen">
      {sections?.map((section: LayoutParagraphSection) => {
        if (!section) return null;
        if (!section.settings) return null;
        if (!section.settings.behavior_settings) return null;
        // console.log("section", section);
        const {
          layout_id = "",
          layout_bg_color = null,
          layout_bg_color_opacity,
          layout_container = "max-w-7xl",
          layout_container_responsive = "4",
          layout_container_justify_vertical = "start",
          layout_container_gap = "0",
          layout_container_padding = "0",
          layout_container_min_height = "1",
          layout_region_min_height = { rht: 0 },
        }: LayoutParagraphBehaviorSettings = section.settings.behavior_settings;

        // console.log("|||||", section);

        const layoutType = section?.layout || "no-layout";
        const srMinHeight = layout_region_min_height.rht || 0;

        const sAttributes: attriRegion = {};
        Object.assign(sAttributes, {
          className: `${layoutType} relative`,
        });

        if (layout_id !== "") {
          const sIdToSet = { id: layout_id };
          Object.assign(sAttributes, sIdToSet);
        }

        if (layout_bg_color) {
          const bg = {
            backgroundColor: `rgba(${layout_bg_color},${layout_bg_color_opacity})`,
          };
          Object.assign(sAttributes, { style: bg });
        }

        return (
          <section key={section.settings.uuid} {...sAttributes}>
            <div
              className={`mx-auto flex items-${layout_container_justify_vertical} min-h-${layout_container_min_height} py-${layout_container_padding} ${layout_container !== "max-w-full" ? `container xl:${layout_container}` : "max-w-full" } ff-${locale} ${layout_container !== "max-w-full" ? "px-5" : ""}`}
            >
              <div className={`w-full grid grid-cols-1 md:grid-cols-${layout_container_responsive} ${layout_container_gap === '0' ? 'gap-0' : 'gap-5'} md:gap-${layout_container_gap}`}>
                {Object.entries(section.regions).map(([regionName, region]) => {
                  if (!region) return null;
                  if (!region.settings) return null;
                  const {
                    layout_responsive_lg = "1",
                    layout_responsive_md = "1",
                    layout_container_gap = "0",
                    layout_region_padding = "0",
                    layout_region_width = "1/1",
                    layout_justify_horizontal = "start",
                    layout_justify_vertical = "start",
                    layout_id = "",
                    layout_bg_color = "",
                    layout_bg_color_opacity = "0",
                  }: LayoutParagraphRegionSettings = region.settings;

                  const rAttributes: attriRegion = {};
                  Object.assign(rAttributes, {
                    className: `${srMinHeight ? `min-h-${layout_container_min_height}` : ""} flex items-stretch h-full p-${layout_region_padding} md:col-span-${layout_responsive_md} lg:col-span-${layout_responsive_lg}`,
                  });

                  if (layout_bg_color) {
                    Object.assign(rAttributes, {
                      style: {
                        backgroundColor: `rgba(${layout_bg_color},${layout_bg_color_opacity})`,
                      },
                    });
                  }

                  if (layout_id !== "") {
                    const rIdToSet = { id: layout_id };
                    Object.assign(rAttributes, rIdToSet);
                  }

                  const rAttributesWrapper = {};
                  Object.assign(rAttributesWrapper, {});

                  const wrapperAttri: attriRegion = {
                    className: `w-full flex flex-col justify-${layout_justify_horizontal}`,
                  };

                  return (
                    <div key={regionName} {...rAttributes}>
                      <div {...wrapperAttri}>
                        <div
                          className={`flex flex-col gap-${layout_container_gap} w-1/1 md:w-${layout_region_width} self-${layout_justify_vertical}`}
                        >
                          <LayoutRenderer blocks={region.items || []} settings={region.settings || {}} />
                        </div>
                      </div>
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
