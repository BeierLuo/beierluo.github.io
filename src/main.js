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

const layout = document.querySelector(".layout");
const app = document.querySelector("#app");

if (!app) {
  throw new Error('Root container with id "app" was not found.');
}

if (!layout) {
  throw new Error('Layout container with class "layout" was not found.');
}

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

  if (persist) {
    persistTheme(nextTheme);
  }
};

const initialTheme = readStoredTheme() || "light";
applyTheme(initialTheme);

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
