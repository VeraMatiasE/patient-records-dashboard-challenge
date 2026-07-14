import { useCallback, useEffect, useRef, useState } from "react";

interface UsePatientNavigatorOptions {
  resolvePage: (id: string) => number | null;
  setPage: (page: number) => void;
  highlightDuration?: number;
}

export function usePatientNavigator({
  resolvePage,
  setPage,
  highlightDuration = 1500,
}: UsePatientNavigatorOptions) {
  const refs = useRef(new Map<string, HTMLElement>());
  const pendingIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const clearHighlightTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scrollAndHighlight = useCallback(
    (id: string, element: HTMLElement) => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.focus({ preventScroll: true });

      setHighlightedId(id);

      clearHighlightTimeout();

      timeoutRef.current = window.setTimeout(() => {
        setHighlightedId((current) => (current === id ? null : current));
      }, highlightDuration);
    },
    [clearHighlightTimeout, highlightDuration],
  );

  const register = useCallback(
    (id: string) => (element: HTMLElement | null) => {
      if (element) {
        refs.current.set(id, element);

        if (pendingIdRef.current === id) {
          pendingIdRef.current = null;
          scrollAndHighlight(id, element);
        }
      } else {
        refs.current.delete(id);
      }
    },
    [scrollAndHighlight],
  );

  const focusPatient = useCallback(
    (id: string) => {
      const page = resolvePage(id);

      if (page === null) {
        return;
      }

      setPage(page);

      const element = refs.current.get(id);

      if (element) {
        pendingIdRef.current = null;
        scrollAndHighlight(id, element);
      } else {
        pendingIdRef.current = id;
      }
    },
    [resolvePage, setPage, scrollAndHighlight],
  );

  useEffect(() => {
    return () => {
      clearHighlightTimeout();
    };
  }, [clearHighlightTimeout]);

  return {
    focusPatient,
    highlightedId,
    register,
  };
}
