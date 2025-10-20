import { renderInlineMarkdown } from "../utils/markdown.js";

const buildWriting = ({ title, descriptionMarkdown, date, href }) => {
  const isAnchor = href.startsWith("#");
  const attrs = isAnchor
    ? `href="${href}"`
    : `href="${href}" target="_blank" rel="noopener noreferrer"`;
  const description = descriptionMarkdown
    ? `<p>${renderInlineMarkdown(descriptionMarkdown)}</p>`
    : "";

  return `
    <a class="writing-item" ${attrs}>
      <div>
        <span class="writing-title">${renderInlineMarkdown(title)}</span>
        ${description}
      </div>
      <span class="writing-meta">${renderInlineMarkdown(date)}</span>
    </a>
  `;
};

export default function renderWriting({ id = "writing", label = "写作与分享", entries = [] }) {
  const items = entries.map(buildWriting).join("");
  const headingId = `${id}-label`;

  return `
    <section id="${id}" class="section" aria-labelledby="${headingId}">
      <h2 id="${headingId}" class="section-label">${renderInlineMarkdown(label)}</h2>
      <div class="writing">
        ${items}
      </div>
    </section>
  `;
}
