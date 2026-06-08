// Let Me Browse — popup script (MV3, Chrome + Firefox compatible)
// Runs immediately on popup open — no button needed.

const statusEl   = document.getElementById("status");
const statusText = document.getElementById("statusText");
const hint       = document.getElementById("hint");

function showStatus(state, msg, sub) {
  statusEl.className = "status " + state;
  statusText.textContent = msg;
  hint.textContent = sub || "";
}

// MV3: chrome.scripting.executeScript instead of tabs.executeScript
// Firefox supports this since Firefox 101 with MV3.
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs && tabs[0];

  if (!tab) {
    showStatus("err", "No active tab found", "");
    return;
  }

  const url = tab.url || "";
  const restricted =
    url.startsWith("about:") ||
    url.startsWith("chrome://") ||
    url.startsWith("moz-extension://") ||
    url.startsWith("chrome-extension://") ||
    url === "";

  if (restricted) {
    showStatus("err", "Cannot unlock this page", "Browser pages can't be modified.");
    return;
  }

  // MV3 uses chrome.scripting.executeScript with a files array
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["content.js"]
    },
    (_results) => {
      if (chrome.runtime.lastError) {
        showStatus("err", "Cannot unlock this page", chrome.runtime.lastError.message || "");
        console.warn("[Let Me Browse]", chrome.runtime.lastError.message);
      } else {
        showStatus("ok", "Page unlocked", "Scroll locks and overlays removed.");
      }
    }
  );
});
