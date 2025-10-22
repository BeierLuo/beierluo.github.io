import profile from "./data/profile.js";
import now from "./data/now.js";
import experience from "./data/experience.js";
import projects from "./data/projects.js";
import workingPapers from "./data/workingPapers.js";
import writing from "./data/writing.js";
import site from "./data/site.js";

import renderHero from "./sections/hero.js";
import renderNow from "./sections/now.js";
import renderExperience from "./sections/experience.js";
import renderProjects from "./sections/projects.js";
import renderWorkingPapers from "./sections/workingPapers.js";
import renderWriting from "./sections/writing.js";
import renderFooter from "./sections/footer.js";
import renderSidebar from "./sections/sidebar.js";
import slugify from "./utils/slugify.js";

const layout = document.querySelector(".layout");
const app = document.querySelector("#app");
const sidebarRoot = document.querySelector("#sidebar");

if (!app) {
  throw new Error('Root container with id "app" was not found.');
}

if (!sidebarRoot) {
  throw new Error('Sidebar container with id "sidebar" was not found.');
}

if (!layout) {
  throw new Error('Layout container with class "layout" was not found.');
}

const navigationItems = [
  { label: "About Me", target: profile.id || "hero" },
  { label: now.label, target: now.id || "now" },
  ...experience.map((group) => ({
    label: group.label,
    target: group.id || slugify(group.label)
  })),
  { label: workingPapers.label, target: workingPapers.id || "working-papers" },
  { label: projects.label, target: projects.id || "projects" },
  { label: writing.label, target: writing.id || "writing" }
].filter((item) => item.label && item.target);

sidebarRoot.innerHTML = renderSidebar(navigationItems);

const toggleButton = sidebarRoot.querySelector(".sidebar-toggle");
const toggleLabel = toggleButton?.querySelector(".sidebar-toggle-label");
const themeToggleButton = sidebarRoot.querySelector(".theme-toggle");
const themeToggleLabel = themeToggleButton?.querySelector(".theme-toggle-label");

const THEME_STORAGE_KEY = "personal-site-theme";
const rootElement = document.documentElement;

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch (error) {
    return null;
  }
};

const persistTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Ignore storage errors (e.g., private mode)
  }
};

const applyTheme = (theme, { persist = false } = {}) => {
  const nextTheme = theme === "light" ? "light" : "dark";
  rootElement.dataset.theme = nextTheme;

  if (themeToggleButton) {
    const isDark = nextTheme === "dark";
    const labelText = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    themeToggleButton.setAttribute("aria-pressed", isDark ? "true" : "false");
    themeToggleButton.setAttribute("aria-label", labelText);

    if (themeToggleLabel) {
      themeToggleLabel.textContent = labelText;
    }
  }

  if (persist) {
    persistTheme(nextTheme);
  }
};

const initialTheme = readStoredTheme() || "dark";
applyTheme(initialTheme);

const setSidebarCollapsed = (collapsed) => {
  if (!toggleButton) return;

  if (collapsed) {
    layout.classList.add("sidebar-collapsed");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Expand navigation");
    if (toggleLabel) {
      toggleLabel.textContent = "Expand";
    }
  } else {
    layout.classList.remove("sidebar-collapsed");
    toggleButton.setAttribute("aria-expanded", "true");
    toggleButton.setAttribute("aria-label", "Collapse navigation");
    if (toggleLabel) {
      toggleLabel.textContent = "Collapse";
    }
  }
};

if (toggleButton) {
  setSidebarCollapsed(true);

  toggleButton.addEventListener("click", () => {
    const collapsed = !layout.classList.contains("sidebar-collapsed");
    setSidebarCollapsed(collapsed);
  });
}

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
    const currentTheme = rootElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, { persist: true });
  });
}

const sections = [
  renderHero(profile),
  renderNow(now),
  renderExperience(experience),
  renderWorkingPapers(workingPapers),
  renderProjects(projects),
  renderWriting(writing),
  renderFooter(site)
];

app.innerHTML = sections.join("\n");
