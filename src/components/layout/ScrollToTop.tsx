import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the page to the top whenever the route changes.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};
