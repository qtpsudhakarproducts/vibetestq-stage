# VibeTestQ — Company Website

Source for **vibetestq.com**, the VibeTestQ company and TAMASH™ product site.

| Site | Domain | Repository |
|---|---|---|
| Company & TAMASH | vibetestq.com | this repo (`main`) |
| Staging | stage.vibetestq.com | `vibetestq-stage` (generated from the `stage` branch) |
| Learning (Academy) | academy.vibetestq.com | `vibetestq-learn` |

Training, mentorship, interview preparation and the learning docs live on the Academy. The old training pages in this repo are redirects to it.

## Layout

```
index.html            Homepage (TAMASH suite)
about.html            Company
contact.html          Book a private demo
blog.html, blogs/     Engineering blog
tamash-platform/      Platform overview
tamash-playwright/    Self-healing for Playwright
tamash-selenium/      Selenium
tamash/               Product pages
styles.css, script.js Shared styles and behaviour
```

## Staging workflow

Pushing to the `stage` branch runs `.github/workflows/deploy-staging.yml`, which publishes a `noindex` build to `vibetestq-stage` (stage.vibetestq.com). It needs the `STAGE_DEPLOY_TOKEN` repository secret.
