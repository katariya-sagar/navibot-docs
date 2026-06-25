# NaviBot Docs

A polished, responsive static documentation website for NaviBot, an intelligent navigation assistant concept.

## What is included

- Modern product overview homepage
- Dark and light mode with saved preference
- Mobile responsive navigation and layouts
- Documentation pages for overview, product requirements, architecture, user flows, API direction, and roadmap
- GitHub Pages deployment workflow
- Static files only: no build step required

## Local preview

Open `index.html` directly in a browser, or run a simple local server from the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project structure

```text
.
├── index.html
├── styles.css
├── script.js
├── docs/
│   ├── index.html
│   ├── overview.html
│   ├── product.html
│   ├── architecture.html
│   ├── user-flows.html
│   ├── api.html
│   └── roadmap.html
└── .github/workflows/pages.yml
```

## Deploying to GitHub Pages

The repository includes a GitHub Actions workflow that publishes the static site to GitHub Pages. In repository settings, set Pages to deploy from GitHub Actions, then push to `main`.

## Editing docs

Each documentation page is plain HTML and shares the same `styles.css` and `script.js` files. Add new pages inside `docs/` and link them from `docs/index.html` and the homepage documentation section.
