"use client";

import { useEffect, useRef } from "react";

interface StickyProps {
  children: React.ReactNode;
  offset?: number;
  media?: number;
  activeClass?: string;
  className?: string;
}

export default function Sticky({
  children,
  offset = 0,
  media,
  activeClass = "shadow-lg bg-white/95 backdrop-blur border-b",
  className = "",
}: StickyProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  const state = useRef({
    naturalTop: 0,
    height: 0,
    isFixed: false,
    isVisible: true,
    scrollDirection: "down" as "up" | "down" | null,
    lastScrollY: 0,
    hideTriggerScrollY: 0,
    hideTriggerTime: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const element = elementRef.current;
    const wrapper = wrapperRef.current;
    if (!element || !wrapper || (media && window.innerWidth < media)) return;

    // Placeholder pour éviter le saut de layout
    if (!placeholderRef.current) {
      const placeholder = document.createElement("div");
      // placeholder.style.height = "0";
      // placeholder.style.width = "100%";
      placeholder.classList.add('plshldr')
      wrapper.parentNode?.insertBefore(placeholder, wrapper);
      placeholderRef.current = placeholder;
    }
    const placeholder = placeholderRef.current!;

    const updateDimensions = () => {
      const rect = element.getBoundingClientRect();
      state.current.height = rect.height;
      state.current.naturalTop = window.scrollY + rect.top - offset;
      placeholder.style.height = `${state.current.height}px`;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const prevScrollY = state.current.lastScrollY;
      const scrollingUp = scrollY < prevScrollY;
      const newDirection = scrollingUp ? "up" : "down";

      state.current.scrollDirection = scrollY === prevScrollY ? state.current.scrollDirection : newDirection;
      state.current.lastScrollY = scrollY;

      // Doit-on être fixed ?
      const shouldBeFixed = scrollY + offset >= state.current.naturalTop;
      state.current.isFixed = shouldBeFixed;

      // Visibilité (disparaît en scroll down quand fixed)
      let shouldBeVisible = true;
      if (shouldBeFixed) {
        const now = Date.now();
        if (Math.abs(scrollY - state.current.hideTriggerScrollY) > 30 || now - state.current.hideTriggerTime > 300) {
          state.current.hideTriggerScrollY = scrollY;
          state.current.hideTriggerTime = now;
        }
        shouldBeVisible = scrollingUp || Math.abs(scrollY - state.current.hideTriggerScrollY) <= 30;
      }
      state.current.isVisible = shouldBeVisible;

      // === Gestion optimisée des classes (un seul bloc) ===
      const classesToAdd: string[] = [];
      const classesToRemove: string[] = [];

      // Classes de direction
      if (state.current.scrollDirection === "up") {
        classesToAdd.push("up");
        classesToRemove.push("down");
      } else if (state.current.scrollDirection === "down") {
        classesToAdd.push("down");
        classesToRemove.push("up");
      }

      // Classe natural
      if (!shouldBeFixed) {
        classesToRemove.push("up", "down");
        classesToAdd.push("natural");
      } else {
        classesToRemove.push("natural");
      }

      // Application efficace
      if (classesToAdd.length > 0) element.classList.add(...classesToAdd);
      if (classesToRemove.length > 0) element.classList.remove(...classesToRemove);
    };

    updateDimensions();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
      placeholderRef.current?.remove();
    };
  }, [offset, media, activeClass]);

  return (
    <div className="relative min-h-16 hh-navbar-sti">
      <div ref={wrapperRef} className="w-full">
        <div ref={elementRef} className={`transition-discrete duration-600 ease-out ii-nav relative w-full ${className} `}>
          {children}
        </div>
      </div>
    </div>
  );
}
