import { renderInlineMarkdown } from "../utils/markdown.js";

const buildPaper = ({ title, authorsMarkdown, href, linkLabel = "Paper" }) => {
  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const authors = authorsMarkdown
    ? `<span class="publication-tagline">${renderInlineMarkdown(authorsMarkdown)}</span>`
    : "";
  const linkMarkup = href
    ? (() => {
        const safeHref = escapeHtml(href);
        const safeLabel = escapeHtml(linkLabel);
        const isExternal = /^https?:\/\//i.test(href);
        const attrs = isExternal ? `href="${safeHref}" target="_blank" rel="noopener noreferrer"` : `href="${safeHref}"`;

        return `<a class="link-button writing-link" ${attrs}>${safeLabel}</a>`;
      })()
    : "";
  const metaMarkup = linkMarkup ? `<div class="writing-meta-row">${linkMarkup}</div>` : "";

  return `
    <div class="writing-item working-paper-item">
      <div>
        <span class="writing-title">${renderInlineMarkdown(title)}</span>
        ${authors}
        ${metaMarkup}
      </div>
    </div>
  `;
};

export default function renderWorkingPapers({ id = "working-papers", label = "Working Papers", entries = [] }) {
  if (!entries.length) {
    return "";
  }

  const headingId = `${id}-label`;
  const items = entries.map(buildPaper).join("");

  return `
    <section id="${id}" class="section" aria-labelledby="${headingId}">
      <h2 id="${headingId}" class="section-label">${renderInlineMarkdown(label)}</h2>
      <p class="section-subtext">${renderInlineMarkdown("† means equal contribution")}</p>
      <div class="writing working-papers">
        ${items}
      </div>
    </section>
  `;
}
