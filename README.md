# Portfolio Deploy Guide

This folder is the deploy-ready version of the portfolio.

## Recommended deploy source

Deploy directly from this folder:

- `index.html`
- `assets/`
- `case-assets/`
- `case-studies/`
- `Logo/`

## GitHub Pages

### Option 1: publish from repo root

1. Create a new GitHub repository.
2. Upload all files inside this folder to the repository root.
3. In GitHub:
   - `Settings`
   - `Pages`
   - `Build and deployment`
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
4. Save and wait for the site URL to be generated.

### Option 2: publish from `/docs`

If you want to keep source files elsewhere, copy this whole folder into a `/docs` directory in your repo, then set:

- `Branch`: `main`
- `Folder`: `/docs`

### Notes

- `.nojekyll` is included so GitHub Pages serves the site as a plain static site.
- No build step is required.

## Cloudflare Pages

### Connect with GitHub

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, choose `Connect to Git`.
3. Select the repository.
4. Use these settings:
   - `Framework preset`: `None`
   - `Build command`: `exit 0`
   - `Build output directory`: `.`
5. Deploy.

### Direct Upload

1. Open Cloudflare Pages.
2. Choose `Upload assets`.
3. Upload the full contents of this folder.

## Existing content gaps

The site can be deployed now, but these case-study sliders still have placeholder image slots:

- `case-studies/kalite-product-communication-may-ep-cham.html`
- `case-studies/kalite-campaign-tet-khong-dau-thi-se-giau.html`
- `case-studies/lotteria-series-chau-giang-ne.html`
- `case-studies/ukg-brand-film-fly-together.html`

These do not block deployment.

## Resume file

The resume button on the homepage points to:

- `assets/duc-nguyen-cv.pdf`

If you want to replace the resume later, keep the same filename to avoid editing the homepage link.
