---
name: GitHub Pages deployment
description: Deployment workflow and repository setup requirements for the portfolio.
---

GitHub Pages must be enabled for the repository with the build source set to GitHub Actions before `actions/configure-pages` can complete.

**Why:** A valid workflow and successful static build still fail at the Pages configuration step when a newly created repository has no Pages site configured.

**How to apply:** For a fresh repository, enable Pages with the workflow build type before rerunning the deployment workflow. The workflow builds the portfolio from the workspace root and uploads `artifacts/ajith-reddy-portfolio/dist/public`.