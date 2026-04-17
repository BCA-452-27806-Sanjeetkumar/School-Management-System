import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Remove Lovable branding/badge elements
const removelovableElements = () => {
  const selectors = [
    '[role="img"][aria-label*="lovable"]',
    '[aria-label*="Lovable"]',
    '[aria-label*="powered by"]',
    '[class*="lovable"]',
    '[id*="lovable"]',
    '.lovable-badge',
    '#lovable-badge',
    '[data-lovable]',
    'iframe[src*="lovable"]',
    'a[href*="lovable"]',
    'a[href*="Lovable"]',
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });
};

removelovableElements();

// Also run on interval to catch dynamically injected elements
setInterval(removelovableElements, 500);

createRoot(document.getElementById("root")!).render(<App />);
