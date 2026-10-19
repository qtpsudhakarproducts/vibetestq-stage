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
index.html            Home: Forge, Shield and RunSights
forge/                Forge: test management with the GenEx Agent
shield/               Shield: self healing and maintenance
runsights/            RunSights: results
get-started/          The install guide
contact.html          Book a demo or ask about pricing (passes ?product and ?topic to the portal's form)
about.html            Company
blog.html, blogs/     Engineering blog
tamash/privacy.html   Privacy disclosure of the earlier Chrome extension
assets/company.css    Styles of the TAMASH pages, with the component kit (moments, terminals)
styles.css, script.js Shared styles and behaviour
```

## Staging workflow

Pushing to the `stage` branch runs `.github/workflows/deploy-staging.yml`, which publishes a `noindex` build to `vibetestq-stage` (stage.vibetestq.com). It needs the `STAGE_DEPLOY_TOKEN` repository secret.
