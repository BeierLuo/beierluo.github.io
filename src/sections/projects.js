import { renderInlineMarkdown } from "../utils/markdown.js";

const buildPublication = ({
  title,
  taglineMarkdown,
  descriptionMarkdown,
  linkMarkdown,
  links = [],
  badge
}) => {
  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const buildLinkButton = ({ label, href }) => {
    if (!label || !href) {
      return "";
    }

    const safeLabel = escapeHtml(label);
    const safeHref = escapeHtml(href);
    const isExternal = /^https?:\/\//i.test(href);
    const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";

    return `<a class="publication-button" href="${safeHref}"${attrs}>${safeLabel}</a>`;
  };

  const subtitle = taglineMarkdown
    ? `<span class="publication-tagline">${renderInlineMarkdown(taglineMarkdown)}</span>`
    : "";
  const description = descriptionMarkdown
    ? `<p>${renderInlineMarkdown(descriptionMarkdown)}</p>`
    : "";
  const linkButtons = Array.isArray(links)
    ? links.map(buildLinkButton).filter(Boolean).join("")
    : "";
  const linkMarkup = linkButtons
    ? `<p class="publication-link">${linkButtons}</p>`
    : linkMarkdown
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
