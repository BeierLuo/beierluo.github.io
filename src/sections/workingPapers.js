import { renderInlineMarkdown } from "../utils/markdown.js";

const buildPaper = ({ title, authorsMarkdown }) => {
  const authors = authorsMarkdown
    ? `<span class="publication-tagline">${renderInlineMarkdown(authorsMarkdown)}</span>`
    : "";

  return `
    <div class="writing-item working-paper-item">
      <div>
        <span class="writing-title">${renderInlineMarkdown(title)}</span>
        ${authors}
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
