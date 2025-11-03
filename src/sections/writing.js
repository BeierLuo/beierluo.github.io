import { renderInlineMarkdown } from "../utils/markdown.js";

const buildWriting = ({ title, descriptionMarkdown, date, href, linkLabel = "Link" }) => {
  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const description = descriptionMarkdown
    ? `<p>${renderInlineMarkdown(descriptionMarkdown)}</p>`
    : "";
  const linkMarkup = href
    ? (() => {
        const safeHref = escapeHtml(href);
        const safeLabel = escapeHtml(linkLabel);
        const isAnchor = href.startsWith("#");
        const attrs = isAnchor
          ? `href="${safeHref}"`
          : `href="${safeHref}" target="_blank" rel="noopener noreferrer"`;

        return `<a class="link-button writing-link" ${attrs}>${safeLabel}</a>`;
      })()
    : "";
  const dateMarkup = date ? `<span class="writing-meta">${renderInlineMarkdown(date)}</span>` : "";
  const metaMarkup =
    linkMarkup || dateMarkup
      ? `<div class="writing-meta-row">${[linkMarkup, dateMarkup].filter(Boolean).join("")}</div>`
      : "";

  return `
    <div class="writing-item">
      <div>
        <span class="writing-title">${renderInlineMarkdown(title)}</span>
        ${description}
        ${metaMarkup}
      </div>
    </div>
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
