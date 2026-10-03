# Oaktree Landscaping

Static marketing website for Oaktree Landscaping, built with [Eleventy](https://www.11ty.dev/) and pnpm.

## Development

```sh
pnpm install
pnpm dev
```

Create a production build:

```sh
pnpm build
```

The build first creates metadata-free 1200×630 social-sharing cards, then Eleventy writes the generated site to `_site/`.

## Deployment

GitHub Actions publishes the site to [dan-drew.github.io/oaktree-landscaping](https://dan-drew.github.io/oaktree-landscaping/) from the `_site/` build output.

- Pull requests targeting `main` run a production build without deploying.
- Pushes to `main` build and deploy automatically.
- Manual runs from `main` are available through the **Build and deploy** workflow.

The Pages build sets `SITE_URL=https://dan-drew.github.io/oaktree-landscaping` and `PATH_PREFIX=/oaktree-landscaping/` so canonical metadata, internal links, and assets use the repository project path. Repository Pages settings must use **GitHub Actions** as the deployment source.

## Content and assets

- Page templates: `src/*.njk`
- Shared layouts and partials: `src/_includes/`
- Business, service, project, testimonial, and service-area data: `src/_data/`
- Design system: `src/assets/css/styles.css`
- Navigation, gallery, analytics, and mailto form behavior: `src/assets/js/site.js`
- Source images: `design/assets/`
- Social icons: Bootstrap Icons, copied locally during the Eleventy build

The public website has five content pages: Home, About Us, Services, Our Projects, and Contact Us. Bluffton, Beaufort, and Hardeeville coverage is integrated into Home, About, the footer, and structured data instead of being split into a thin Service Areas page.

## Google Analytics 4

Set `analyticsId` in `src/_data/site.js` to the production GA4 measurement ID, for example `G-XXXXXXXXXX`. Leaving it blank intentionally prevents analytics scripts from loading.

The site includes event hooks for:

| Event | Trigger | Suggested key event |
|---|---|---|
| `estimate_request` | Visitor submits the mailto estimate form | Yes |
| `phone_click` | Visitor selects a telephone link | Yes |
| `email_click` | Visitor selects a direct email link | Yes |
| `form_start` | Visitor first interacts with the estimate form | No |
| `cta_click` | Visitor selects a primary call to action | No |
| `directions_click` | Visitor requests directions | No |
| `social_click` | Visitor opens a social profile | No |
| `gallery_open` | Visitor opens a project image | No |

After deployment, mark the appropriate events as key events in GA4 Admin. The mailto form cannot confirm that an email was actually sent; `estimate_request` measures intent when the prepared email is opened.

## Launch checklist

1. Confirm the fallback production domain in `src/_data/site.js` and the deployed `SITE_URL` in `.github/workflows/build-deploy.yaml`.
2. Add the production GA4 measurement ID and enable Enhanced Measurement in GA4.
3. Build with `pnpm build` and deploy the contents of `_site/`.
4. Submit `/sitemap.xml` in Google Search Console.
5. Test the deployed pages with Google's Rich Results Test and PageSpeed Insights.
6. Verify that the name, address, phone number, hours, and service areas match the Google Business Profile.
7. Test the estimate form on desktop and mobile with the mail application used by the business.
8. Review project image filenames and alternative text as more descriptive project details become available.
