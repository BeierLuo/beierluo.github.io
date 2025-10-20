import { renderMarkdown, renderInlineMarkdown } from "../utils/markdown.js";

const buildLink = ({ label, href }) => {
  const isMailto = href.startsWith("mailto:");
  const attrs = isMailto
    ? `href="${href}"`
    : `href="${href}" target="_blank" rel="noopener noreferrer"`;
  return `<a class="pill" ${attrs}>${renderInlineMarkdown(label)}</a>`;
};

export default function renderHero(profile) {
  const links = profile.links.map(buildLink).join("");
  const introHtml = renderMarkdown(profile.introMarkdown);
  const introContent = introHtml.replace(/<p>/g, '<p class="intro-blurb">');
  const sectionId = profile.id || "hero";
  const photo = profile.photo;
  const photoMarkup =
    photo && photo.src
      ? `
        <div class="hero-portrait">
          <img src="${photo.src}" alt="${renderInlineMarkdown(photo.alt ?? "") || "Profile photo"}" />
        </div>
      `
      : "";

  return `
    <section id="${sectionId}" class="hero" aria-labelledby="hero-heading">
      <div class="hero-header">
        <span id="hero-heading" class="intro-greeting">${renderInlineMarkdown(profile.greeting)}</span>
        ${photoMarkup}
      </div>
      <div class="hero-intro">
        ${introContent}
      </div>
      <div class="intro-actions">
        ${links}
      </div>
    </section>
  `;
}
