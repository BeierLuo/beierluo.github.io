# Personal Website

This project renders a single page personal site that is assembled from small, maintainable modules.

## Development

- Serve the site through a local web server to avoid ES module CORS issues, e.g. `python3 -m http.server 4173`.
- Visit `http://localhost:4173/index.html` (replace the port if you picked a different one).

## Structure

- `index.html` &mdash; loads shared styles and bootstraps the JavaScript entry point.
- `styles/` &mdash; split into design tokens, base layout (including the sidebar grid), and component styles.
- `src/data/` &mdash; plain JavaScript objects containing the site content (now written in Markdown) plus section IDs.
- `src/sections/` &mdash; renderer functions that map data to HTML fragments (including the sidebar).
- `src/utils/markdown.js` &mdash; lightweight Markdown renderer used across the sections.
- `src/utils/slugify.js` &mdash; helper that creates stable anchor IDs when one is not supplied.

## Navigation

The sticky sidebar is rendered by `src/sections/sidebar.js` and configured in `src/main.js`. Each major section exposes an `id` (for example `profile.id`, `now.id`, `projects.id`, `writing.id`, and `site.id`), and those IDs are referenced in the `navigationItems` array. Update the labels or add/remove entries there to change the menu. If you rename an `id`, make sure the corresponding navigation target matches.

The toggle button at the top of the sidebar collapses the directory on larger screens. The behaviour is wired up in `src/main.js` (`setSidebarCollapsed`). Adjust the copy or icon by editing `src/sections/sidebar.js` and the related styles in `styles/components.css`.

## Profile Photo

The hero section will render a circular portrait when `src/data/profile.js` defines a `photo` object (e.g. `src: "assets/profile.jpg"`). Place the image file under the referenced path (create the `assets/` directory if needed) or change the `src` field to point to your preferred location. Images are displayed as 120×120px circles on desktop and shrink on smaller viewports.

## Writing Content in Markdown

Every string that ends with `Markdown` in the data modules is parsed through the custom renderer. Supported syntax:

- Paragraphs: separate with a blank line.
- Unordered lists: prefix lines with `- `.
- Blockquotes: start lines with `> `.
- Inline formatting: `**bold**`, `*italic*`, `` `code` ``, `[links](https://example.com)`.

Short labels (e.g. link text, dates) also support the same inline formatting.

After editing content under `src/data/`, refresh the browser to see the changes.
