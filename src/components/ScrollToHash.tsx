import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 64; // h-16

export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Home (logo click)
    if (pathname === "/" && !hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Hash navigation
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (!element) return;

      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_HEIGHT;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [pathname, hash]);

  return null;
};
