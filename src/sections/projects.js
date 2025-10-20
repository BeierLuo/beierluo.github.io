import { renderInlineMarkdown } from "../utils/markdown.js";

const buildPublication = ({ title, taglineMarkdown, descriptionMarkdown, href, badge }) => {
  const isAnchor = href.startsWith("#");
  const attrs = isAnchor
    ? `href="${href}"`
    : `href="${href}" target="_blank" rel="noopener noreferrer"`;

  const subtitle = taglineMarkdown
    ? `<span class="publication-tagline">${renderInlineMarkdown(taglineMarkdown)}</span>`
    : "";
  const description = descriptionMarkdown
    ? `<p>${renderInlineMarkdown(descriptionMarkdown)}</p>`
    : "";

  return `
    <a class="writing-item publication-item" ${attrs}>
      <div>
        <span class="writing-title">${renderInlineMarkdown(title)}</span>
        ${subtitle}
        ${description}
      </div>
      <span class="writing-meta">${renderInlineMarkdown(badge ?? "")}</span>
    </a>
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
