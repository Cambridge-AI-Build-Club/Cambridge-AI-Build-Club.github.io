# Deployment and recovery runbook

Last reconciled: 11 October 2026. The Jekyll-to-Next.js cutover is complete. This file describes current release operations; the original parity migration and proposed PR description are historical Git records, not pending work.

## Normal release

1. Inspect the checkout, remote, PR head, CI and Pages settings. The expected repository is `Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io`, served at the [organisation root](https://cambridge-ai-build-club.github.io/). The Pages API was verified as `build_type: workflow` on 11 October 2026; the stale `gh-pages` branch was deleted the same day, so publishing is workflow-only.
2. Make changes on a dedicated Conventional Branch and open a PR into main. Follow [AGENTS.md](../AGENTS.md): site changes require a built local preview and owner approval of that implementation. Documentation-only PRs may merge without preview. All PRs must pass **Build Next.js site (no deploy)**.
3. Squash-merge the reviewed PR. Never push a source change or rollback directly to main.
4. Wait for **Deploy Next.js site to Pages** (`nextjs.yml`) and verify its `headSha` and conclusion. The workflow builds `web/out` with Node 20 and uploads the Pages artifact. Its concurrency permits the active deployment to finish; intermediate pending runs can be skipped when newer commits arrive.
5. Verify affected production routes with a fresh query such as `?verify=<merge-sha>-<timestamp>`. Check the intended content and interactions; HTTP 200 alone does not establish the expected release. Pages HTML can remain cached for up to ten minutes.
6. Record PR, merge SHA, CI/deploy links and actual live checks in the [release ledger](../docs/README.md#release-ledger) and relevant QA record. Keep local QA separate from CI and publication evidence.

The export defaults to an empty base path and preserves pretty URLs plus generated `/CUABC-Web/...` stubs. `web/public/.nojekyll` is included in the export to protect `_next/` if branch publishing is used. `netlify.toml` builds the same Next.js export; no Netlify deployment was verified by this cleanup.

## Recover a recent Next.js release

Prefer a focused fix or revert PR that preserves the current hosting and content model. Identify the exact faulty merge and a known-good baseline, inspect the revert diff for newer dependencies, build it and obtain the required local preview approval. Pass PR CI, squash-merge and verify the deployment normally.

For an explicitly requested temporary restoration, a recent successful `nextjs.yml` run can be rerun for its known-good commit. A rerun uses the original event's SHA/ref and executes the workflow again; it is **not** an instant redeploy of a guaranteed retained artifact. Confirm workflow eligibility, dependencies, Pages mode and permission to restore that version before dispatch. A later main deployment will replace it. See [GitHub's rerun semantics](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs).

## Legacy Jekyll recovery

The Jekyll presentation layer retired from `main` on 11 October 2026. The complete legacy site — Jekyll sources, its `images/` tree, `Gemfile` and layouts — is preserved on the `archive/jekyll-legacy` branch (cut from `main` at `a99f355`). `.github/workflows/jekyll.yml` on `main` stays `workflow_dispatch`-only and exists to rebuild that branch, so recovery needs no new files.

1. Review the required recovery scope and source divergence, especially navigation, Projects, recruitment, portraits and calendar. Do not assume current content or design parity with Next.js or with later `main` content.
2. Check out `archive/jekyll-legacy` and build locally with `bundle install` and `bundle exec jekyll build`; inspect affected routes, assets and the current schedule before requesting publication approval.
3. For a temporary approved restore, dispatch `jekyll.yml` against the archive ref (Actions UI branch selector, or `gh workflow run jekyll.yml --ref archive/jekyll-legacy`). Verify Pages is in workflow mode and inspect the resulting live site. Re-running an old Jekyll job rebuilds its original commit; it does not automatically select current content.
4. For a sustained switch, create a dedicated branch/PR that coordinates both workflows: enable the intended Jekyll trigger and disable automatic Next.js deployment together. Follow preview, CI and approval requirements. Do not restore the retired presentation into `main` without an explicit owner decision.
5. Record the restored SHA, deployment method, known divergence and recovery plan. Restore Next.js through the reviewed workflow/configuration and verify it again.

No Jekyll build or rollback has been performed since the retirement.

## Emergency branch publishing

Use only for an owner-authorized outage response after a reviewed export exists. This was used historically during the 5 October 2026 runner incident; it is not the normal publication path. The stale `gh-pages` branch was deleted on 11 October 2026 — recreate a publisher branch deliberately when this procedure is needed. It bypasses the repository's custom build workflow, but availability of GitHub's Pages publishing infrastructure must still be checked.

1. Build the approved source ref locally from `web/` with the intended base path and origin. Inspect the static export, assets and redirect stubs; record the source SHA and retain the export receipt.
2. Check current Pages mode and whether a `gh-pages` branch exists; create it only as part of this procedure. Copy `web/out/` into an isolated temporary publisher directory; commit the static files there, with `index.html`, `.nojekyll` and `_next/` at its root. Never stage generated output into the source branch.
3. Push the prepared export to `gh-pages`. Replacing an existing publisher history requires explicit authorization and a lease tied to its verified tip; do not prescribe an unconditional force-push.
4. Set Settings → Pages → Deploy from a branch → `gh-pages / (root)`. API equivalent: update the repository Pages endpoint with `build_type: legacy` and source branch/path `gh-pages` / `/`. Preserve the previous configuration in the incident receipt.
5. Wait for publication and verify cache-busted production routes. A `.nojekyll` export avoids Jekyll processing; it does not establish that every Pages service is healthy. See [GitHub's publishing-source guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [the no-Jekyll publishing path](https://github.blog/changelog/2024-07-08-pages-legacy-worker-sunset/).
6. When ready to return, restore Pages to GitHub Actions (`build_type: workflow`) and dispatch `nextjs.yml` on the intended reviewed main SHA. Wait for success, verify live routes and record the restoration. Do not leave the branch deployment setting active accidentally.
