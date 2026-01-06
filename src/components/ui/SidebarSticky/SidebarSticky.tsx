"use client";
// Libs
import { useEffect } from "react";
import UIkit from "uikit";
// Types
interface SidebarStickyOptionsProps {
  offset?: number;
  end?: string;
  media?: number;
  id?: string;
}

interface SidebarStickyProps {
  children: React.ReactNode;
  options?: SidebarStickyOptionsProps;
}
// Styles
import "./SidebarSticky.scss";
// Component
export default function StickySidebar({
  children,
  options,
}: SidebarStickyProps) {

  const stickyId = options?.id || "js-sidebar"; 

  useEffect(() => {
    const sticky = UIkit.sticky(`#${stickyId}`, {
      offset: options?.offset || 90,
      media: options?.media || 960,
      end: options?.end,
      overflowEnd: 90,
      position: "top"
    });

    return () => {
      sticky?.$destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={stickyId} className="oo-sticky">
      {children}
    </div>
  );
}