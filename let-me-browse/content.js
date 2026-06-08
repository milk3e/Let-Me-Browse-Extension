// Let Me Browse — content script
// Injected on demand when the user clicks the extension icon.

(function () {
  // ── 1. Unlock scroll on <html> and <body> ─────────────────────────────────
  const scrollTargets = [document.documentElement, document.body];
  scrollTargets.forEach((el) => {
    el.style.setProperty("overflow", "auto", "important");
    el.style.setProperty("overflow-x", "auto", "important");
    el.style.setProperty("overflow-y", "auto", "important");
    el.style.setProperty("position", "static", "important");
    el.style.setProperty("height", "auto", "important");
    el.style.setProperty("max-height", "none", "important");
  });

  // ── 2. Inject a persistent <style> block to override CSS scroll locks ─────
  const style = document.createElement("style");
  style.id = "__let-me-browse__";
  style.textContent = `
    html, body {
      overflow: auto !important;
      overflow-x: auto !important;
      overflow-y: auto !important;
      position: static !important;
      height: auto !important;
      max-height: none !important;
    }

    /* Common overlay / modal / paywall patterns */
    [class*="paywall"],
    [class*="modal"],
    [class*="overlay"],
    [class*="popup"],
    [class*="gate"],
    [class*="wall"],
    [class*="cookie-banner"],
    [class*="consent"],
    [class*="newsletter"],
    [class*="subscribe"],
    [id*="paywall"],
    [id*="modal"],
    [id*="overlay"],
    [id*="popup"],
    [id*="gate"],
    [id*="wall"],
    [id*="cookie"],
    [id*="consent"],
    [id*="newsletter"],
    [id*="subscribe"] {
      display: none !important;
    }

    /* Remove fixed/sticky elements that block reading (be surgical: only
       full-viewport ones that are likely blockers, not nav bars) */
    body > [style*="position: fixed"],
    body > [style*="position:fixed"] {
      pointer-events: none !important;
      opacity: 0 !important;
    }
  `;

  // Don't inject twice
  if (!document.getElementById("__let-me-browse__")) {
    (document.head || document.documentElement).appendChild(style);
  }

  // ── 3. Re-enable pointer events and remove inline locks on all elements ───
  document.querySelectorAll("*").forEach((el) => {
    const cs = window.getComputedStyle(el);

    // Kill elements that look like full-screen blocking overlays
    if (
      (cs.position === "fixed" || cs.position === "sticky") &&
      parseInt(cs.zIndex, 10) > 100 &&
      cs.display !== "none"
    ) {
      const rect = el.getBoundingClientRect();
      const coversViewport =
        rect.width > window.innerWidth * 0.5 &&
        rect.height > window.innerHeight * 0.5;

      if (coversViewport) {
        // Only hide clearly non-nav overlays (skip thin headers/footers)
        const isSlim = rect.height < 120 || rect.width < 120;
        if (!isSlim) {
          el.style.setProperty("display", "none", "important");
        }
      }
    }
  });

  // ── 4. Remove event listeners that hijack scroll / keyboard ───────────────
  // Cloning document replaces all event listeners but is heavy; instead we
  // suppress the most common offenders via capturing listeners.
  const killEvent = (e) => {
    if (e.type === "keydown" && ![27, 9].includes(e.keyCode)) return; // allow Esc & Tab
    // Allow scroll-related keys
    if (["wheel", "touchmove"].includes(e.type)) {
      e.stopPropagation();
    }
  };

  window.addEventListener("wheel", (e) => e.stopPropagation(), {
    capture: true,
    passive: true,
  });
  window.addEventListener("touchmove", (e) => e.stopPropagation(), {
    capture: true,
    passive: true,
  });

  // ── 5. Remove scroll-lock classes commonly added by JS ────────────────────
  const lockClasses = [
    "no-scroll", "noscroll", "scroll-lock", "scrollLock",
    "modal-open", "overflow-hidden", "body-locked", "is-locked",
    "lock", "locked", "freeze", "frozen",
  ];
  lockClasses.forEach((cls) => {
    document.documentElement.classList.remove(cls);
    document.body.classList.remove(cls);
  });

  // Notify the popup that we're done
  window.postMessage({ type: "__LMB_DONE__" }, "*");
})();
