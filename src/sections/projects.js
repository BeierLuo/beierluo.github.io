import { renderInlineMarkdown } from "../utils/markdown.js";

const buildPublication = ({ title, taglineMarkdown, descriptionMarkdown, linkMarkdown, badge }) => {
  const subtitle = taglineMarkdown
    ? `<span class="publication-tagline">${renderInlineMarkdown(taglineMarkdown)}</span>`
    : "";
  const description = descriptionMarkdown
    ? `<p>${renderInlineMarkdown(descriptionMarkdown)}</p>`
    : "";
  const linkMarkup = linkMarkdown
    ? `<p class="publication-link">${renderInlineMarkdown(linkMarkdown)}</p>`
    : "";

  const badgeMarkup = badge
    ? `<span class="writing-meta">${renderInlineMarkdown(badge)}</span>`
    : "";

  return `
    <div class="writing-item publication-item">
      <div>
        <span class="writing-title">${renderInlineMarkdown(title)}</span>
        ${subtitle}
        ${description}
        ${linkMarkup}
      </div>
      ${badgeMarkup}
    </div>
  `;
};

export default function renderProjects({ id = "projects", label = "精选项目", entries = [] }) {
  const items = entries.map(buildPublication).join("");
  const headingId = `${id}-label`;

  return `
    <section id="${id}" class="section" aria-labelledby="${headingId}">
      <h2 id="${headingId}" class="section-label">${renderInlineMarkdown(label)}</h2>
      <div class="writing publications">
        ${items}
      </div>
    </section>
  `;
}
