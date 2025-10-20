import { renderInlineMarkdown, renderMarkdown } from "../utils/markdown.js";

const buildBullet = (item) => `<li>${renderInlineMarkdown(item)}</li>`;

export default function renderNow(now) {
  const bulletItems = Array.isArray(now.bullets) ? now.bullets.map(buildBullet) : [];
  const bulletList = bulletItems.length ? `<ul>${bulletItems.join("")}</ul>` : "";
  const sectionId = now.id || "now";

  return `
    <section id="${sectionId}" class="section" aria-labelledby="now-label">
      <h2 id="now-label" class="section-label">${renderInlineMarkdown(now.label)}</h2>
      <div class="now-card">
        ${renderMarkdown(now.summaryMarkdown)}
        ${bulletList}
      </div>
    </section>
  `;
}
