import { renderInlineMarkdown } from "../utils/markdown.js";

const buildNavItem = ({ label, target }) => {
  const href = `#${target}`;
  return `
    <li>
      <a class="sidebar-link" href="${href}">${renderInlineMarkdown(label)}</a>
    </li>
  `;
};

export default function renderSidebar(items, title = "Contents") {
  const listItems = items.map(buildNavItem).join("");

  return `
    <nav class="sidebar-nav" aria-label="页面章节导航">
      <button class="sidebar-toggle" type="button" aria-expanded="true" aria-label="Collapse navigation">
        <span class="sidebar-toggle-icon" aria-hidden="true"></span>
        <span class="sidebar-toggle-label">Collapse</span>
      </button>
      <p class="sidebar-title">${renderInlineMarkdown(title)}</p>
      <ul class="sidebar-list">
        ${listItems}
      </ul>
    </nav>
  `;
}
