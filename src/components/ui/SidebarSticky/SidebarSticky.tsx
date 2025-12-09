// src/components/ui/SidebarSticky/SidebarSticky.tsx
"use client";

import { useEffect } from "react";
import UIkit from "uikit";

interface SidebarStickyOptionsProps {
  offset?: number;
  end?: string;
  media?: number;
}

interface SidebarStickyProps {
  children: React.ReactNode;
  options?: SidebarStickyOptionsProps;
}

export default function StickySidebar({
  children,
  options,
}: SidebarStickyProps) {
  useEffect(() => {
    const sticky = UIkit.sticky("#js-sidebar", {
      offset: options?.offset || 90,
      media: options?.media || 960,
      end: options?.end,
    });

    return () => {
      sticky?.$destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← on garde [] car les options ne changent jamais après le mount

  return (
    <div id="js-sidebar" className="uk-sticky">
      {children}
    </div>
  );
}