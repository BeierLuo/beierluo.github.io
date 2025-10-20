import { renderInlineMarkdown } from "../utils/markdown.js";

export default function renderFooter({
  id = "contact",
  label = "Contact",
  email,
  invitationMarkdown,
  footerNoteMarkdown
}) {
  const headingId = `${id}-label`;
  return `
    <footer id="${id}" class="footer" aria-labelledby="${headingId}">
      <h2 id="${headingId}" class="footer-heading">${renderInlineMarkdown(label)}</h2>
      <p>
        ${renderInlineMarkdown(invitationMarkdown)}
        <a href="mailto:${email}">${email}</a>
      </p>
      <p>${renderInlineMarkdown(footerNoteMarkdown)}</p>
    </footer>
  `;
}
