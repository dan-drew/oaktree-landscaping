# Oaktree Landscaping repository guidance

## Product and content

- This repository is the conversion-focused marketing site for Oaktree Landscaping. Preserve clear estimate, phone, email, and directions calls to action.
- The public information architecture has five pages: Home, About Us, Services, Our Projects, and Contact Us.
- Bluffton, Beaufort, and Hardeeville coverage is integrated into the main pages and footer; do not recreate a thin Service Areas page.
- `design/prd.md` is the original visitor-facing content reference. `design/assets/` contains the selected company, project, owner, and service imagery.
- Do not restore the removed Blog or Pixelated Technologies references.
- Before publishing factual content changes, verify the business name, address, phone, hours, service areas, and offered services against the Google Business Profile. Confirm testimonial names and publication permission.

## Stack and commands

- Use pnpm exclusively. Do not use npm or create another lockfile.
- The site uses Eleventy 3 with Nunjucks templates and builds from `src/` to the ignored `_site/` directory.
- Use `pnpm dev` for local development and `pnpm build` for a production build.
- Normal builds verify committed optimized images and do not process images.
- Run `pnpm images:generate` only when source images or image references change, then review and commit the generated assets.
- Page templates live in `src/*.njk`; shared layouts and partials live in `src/_includes/`; structured content lives in `src/_data/`.

## Design and behavior

- Preserve the modern evergreen/cream design system and shared component styles in `src/assets/css/styles.css`. Extend existing tokens and components instead of introducing page-specific visual systems.
- Keep layouts responsive and accessible. The project gallery lightbox and navigation behavior live in `src/assets/js/site.js`.
- The contact form intentionally opens a pre-populated `mailto:` request; there is no server-side form submission.
- Bootstrap Icons are copied and hosted locally for UI and social-profile icons.
- Large originals remain in `design/assets/` and must not be served at runtime.
- `scripts/generate-images.mjs` creates stable optimized JPEG assets under `src/assets/images/`: one hero, one owner portrait, one image per service, and thumbnail/full-size pairs for projects.
- The gallery displays project thumbnails and loads the matching full-size image only when the lightbox opens.
- Generated 1200x630 social cards under `src/assets/social/` are separate from Bootstrap Icons. They provide Open Graph/Twitter previews and are generated without source image metadata.
- Do not reintroduce build-time format/width matrices. The intentionally simple pipeline produces 81 committed runtime images.

## SEO and analytics

- All pages use the shared Nunjucks base layout for titles, descriptions, canonical URLs, Open Graph/Twitter metadata, and `LocalBusiness` JSON-LD.
- Keep `src/sitemap.njk` and `src/robots.njk` aligned with the public site URL.
- Configure GA4 through `analyticsId` in `src/_data/site.js`; a blank value intentionally disables analytics.
- Preserve the existing event hooks for estimate requests, phone and email clicks, CTA clicks, directions, social links, form starts, and gallery engagement.
- `estimate_request`, `phone_click`, and `email_click` are the intended GA4 key-event candidates. The mailto flow measures intent, not confirmed email delivery.

## GitHub Pages deployment

- GitHub Pages publishes at `https://dan-drew.github.io/oaktree-landscaping/`.
- `.github/workflows/build-deploy.yaml` builds pull requests targeting `main` without publishing. Pushes to `main` and manual runs on `main` build and deploy through the `github-pages` environment.
- Pages builds set `SITE_URL=https://dan-drew.github.io/oaktree-landscaping` and `PATH_PREFIX=/oaktree-landscaping/`. Local development defaults to `/`.
- Eleventy’s HTML base plugin rewrites root-relative links and assets for the Pages project path. When adding URLs, verify both a normal local build and a Pages-mode build.
- GitHub repository Pages settings must use GitHub Actions as the deployment source.
- There is no `CNAME` because the current target is the GitHub project URL. A future custom-domain migration must update Pages/DNS settings, the workflow URL and prefix, canonical metadata, sitemap, robots file, and this document together.
- Never commit `_site/`, `node_modules/`, credentials, or generated deployment artifacts.
