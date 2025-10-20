const INLINE_PATTERNS = [
  { regex: /`([^`]+)`/g, replacer: (match, code) => `<code>${code.trim()}</code>` },
  { regex: /\*\*([^\*]+)\*\*/g, replacer: (match, text) => `<strong>${text}</strong>` },
  { regex: /\*([^\*]+)\*/g, replacer: (match, text) => `<em>${text}</em>` },
  {
    regex: /\[([^\]]+)\]\(([^)]+)\)/g,
    replacer: (match, label, href) => {
      const isInternal = href.startsWith("#");
      const attrs = isInternal
        ? `href="${href}"`
        : `href="${href}" target="_blank" rel="noopener noreferrer"`;
      return `<a ${attrs}>${label}</a>`;
    }
  }
];

const applyInline = (text) =>
  INLINE_PATTERNS.reduce((result, pattern) => result.replace(pattern.regex, pattern.replacer), text);

export const renderInlineMarkdown = (text = "") => applyInline(text.trim());

export const renderMarkdown = (markdown = "") => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = [];
  let paragraph = [];
  let listItems = [];
  let quoteLines = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const content = applyInline(paragraph.join(" ").trim());
    if (content) {
      html.push(`<p>${content}</p>`);
    }
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems
      .map((item) => `<li>${applyInline(item.trim())}</li>`)
      .join("");
    html.push(`<ul>${items}</ul>`);
    listItems = [];
  };

  const flushQuote = () => {
    if (quoteLines.length === 0) return;
    const items = quoteLines
      .map((line) => `<p>${applyInline(line)}</p>`)
      .join("");
    html.push(`<blockquote>${items}</blockquote>`);
    quoteLines = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      flushQuote();
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      quoteLines.push(trimmed.replace(/^>\s?/, ""));
      return;
    }

    flushList();
    flushQuote();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushQuote();

  return html.join("\n");
};
