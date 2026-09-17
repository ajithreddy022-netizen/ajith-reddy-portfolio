---
name: GitHub Pages deployment
description: Deployment workflow and repository setup requirements for the portfolio.
---

GitHub Pages must be enabled for the repository with the build source set to GitHub Actions before `actions/configure-pages` can complete.

**Why:** A valid workflow and successful static build still fail at the Pages configuration step when a newly created repository has no Pages site configured.

**How to apply:** For a fresh repository, enable Pages with the workflow build type before rerunning the deployment workflow. The workflow builds the portfolio from the workspace root and uploads `artifacts/ajith-reddy-portfolio/dist/public`.

## GitHub App credential bridge

After reconnecting the GitHub App, run `gh auth setup-git` if `gh auth status` is healthy but `git push` still reports an invalid username or token.

**Why:** The OAuth connection can refresh the GitHub CLI while Git continues using an older credential path until the CLI credential helper is registered.

**How to apply:** Use this only after confirming the GitHub App connection is active and `gh auth status` succeeds; do not request or handle a personal access token.