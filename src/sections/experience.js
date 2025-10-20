import { renderInlineMarkdown } from "../utils/markdown.js";
import slugify from "../utils/slugify.js";

const buildItem = ({ role, company, period, descriptionMarkdown }) => `
  <article class="timeline-item">
    <span class="timeline-marker"></span>
    <div class="timeline-content">
      <div class="timeline-heading">
        <span class="timeline-role">${renderInlineMarkdown(`${role} · ${company}`)}</span>
        <span class="timeline-date">${renderInlineMarkdown(period)}</span>
      </div>
      <p>${renderInlineMarkdown(descriptionMarkdown)}</p>
    </div>
  </article>
`;

const buildSection = ({ label, entries, id }) => {
  const sectionId = id || slugify(label ?? "experience");
  const headingId = `${sectionId}-label`;
  return `
    <section id="${sectionId}" class="section" aria-labelledby="${headingId}">
      <h2 id="${headingId}" class="section-label">${renderInlineMarkdown(label ?? "")}</h2>
      <div class="timeline">
        ${entries.map(buildItem).join("")}
      </div>
    </section>
  `;
};

export default function renderExperience(groups) {
  return groups.map(buildSection).join("\n");
}
