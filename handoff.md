# Yiyi Studio Portfolio — Handoff

Last reviewed: 2026-09-13  
Primary public site: <https://yiyistudio.web.app/>  
Primary repository: <https://github.com/jazzending/jazzending.github.io>

This is the working record for Yiyi's AI portfolio. Read it before changing the site. Every future update must add a dated entry to **Update log** at the end of this file.

## 1. Purpose and working principles

The site is Yiyi's public collection of AI-assisted work: useful web products, small games, music, and other experiments. It supports job applications and should show real work clearly without overstating engineering experience.

Requirements that should remain true:

- Keep the original **Monolith** feeling: high-contrast black/white, bold editorial type, simple pages, and project visuals that do the talking.
- Make the site easy to read on desktop and mobile. Improve layout only when asked; do not redesign unrelated sections while adding a project.
- Preserve each project's own image, title, order, and link unless the request explicitly changes it.
- Use clear, natural English. Avoid vague phrases such as “AI-assisted experience” when a direct explanation is possible.
- Describe AI truthfully: AI is a creative and building collaborator; do not imply unsupported technical claims.
- When a request is only for a mock-up or local review, do **not** publish it.

## 2. Canonical local setup

Use this folder as the only canonical working checkout:

```text
/Users/clarity/Documents/Codex/2026-07-30/w/portfolio-site
```

- Remote: `https://github.com/jazzending/jazzending.github.io.git`
- Branch for live releases: `main`
- GitHub account: `jazzending`
- GitHub CLI (`gh`) is installed and authenticated on this computer as of 2026-09-13. Never print, copy, or store its token in this document.

There is an older local checkout at:

```text
/Users/clarity/Documents/Codex/2026-07-30/w/outputs/ai-portfolio
```

It is on a legacy branch, has uncommitted work, and has diverged from `main`. Do not reset, delete, publish, or treat it as the source of truth. If it contains something needed (for example the unmerged `tunecue-free/` folder or newer images), compare and migrate only the required files into `portfolio-site`, test them, and record that migration in the update log.

## 3. Site architecture and underlying logic

This is a plain static site. There is no database, server application, account system, or build step.

| File / folder | Responsibility |
| --- | --- |
| `index.html` | Homepage structure: hero, archive, about, contact, footer. |
| `projects.js` | Single source of truth for homepage project cards: order, copy, tags, images, and links. |
| `app.js` | Reads `projects` and renders all homepage project cards. It also chooses special visual templates for TuneCue and the album card. |
| `styles.css` | Visual system and responsive layout for the homepage, ThisOne test page, and TuneCue overview. |
| `thisone-test.html` | Standalone ThisOne testing-video page. |
| `tunecue.html` | Standalone TuneCue project overview. |
| `images/` and `videos/` | Local project artwork and video assets. Use descriptive filenames; avoid replacing existing artwork unless requested. |
| `.github/workflows/` | Automatic Firebase deployment configuration. |
| `.firebaserc` / `firebase.json` | Firebase Hosting configuration for the `yiyistudio` project. |

### Project-card data

Each block in `projects.js` becomes one archive card. Keep the same fields unless `app.js` is also intentionally updated:

```js
{
  number, type, title, subtitle, description, role, tags,
  image, imageClass, imageAlt,
  link, linkLabel,
  internalLink, testingLink, testingLinkLabel
}
```

- Use `internalLink: true` for a page inside this portfolio, such as `tunecue.html` or `thisone-test.html`.
- Leave it out for external links. `app.js` then opens them in a new tab safely.
- Standard project covers are rendered as images. `imageClass: "tunecue-preview"` renders the bespoke TuneCue card; `imageClass: "album-cover"` renders the music-player card.
- Most images work best in a landscape crop. Use `object-fit: contain` only when the whole interface needs to stay visible, as on ThisOne and Soft Pause.

## 4. Current published project structure

The current `main` branch displays this order:

1. **ThisOne** — supermarket ingredient comparison app. Its card links to the GitHub project and to `thisone-test.html`, which shows a separate real-use video.
2. **Soft Pause** — a curated game-break web product. Live site: <https://softpausegames.web.app/>.
3. **TuneCue** — reference-track-to-prompt music tool. The main branch currently links to `tunecue.html`, an overview page. A newer free-beta version exists in the legacy local checkout and is **not yet confirmed as merged to `main`**.
4. **Little Night Forest** — AI-made children's bedtime album, linked to YouTube.

The comic project was intentionally removed. Do not add it back unless Yiyi asks.

Current archive tagline:

> Tools, sounds, and other experiments. Built from curiosity.

## 5. Publishing pipeline

`main` is the release branch. A push to `main` triggers the GitHub Actions workflow `Deploy to Firebase Hosting on merge`, which deploys the repository root to Firebase Hosting project `yiyistudio` on the live channel.

Expected live result:

```text
GitHub CLI push to main
  -> GitHub Actions Firebase deploy
  -> https://yiyistudio.web.app/
```

The repository README still describes an old GitHub Pages-only setup. That documentation is stale: Firebase is the primary live deployment path. Update the README when doing a documentation-maintenance change, but do not change the deployment setup casually.

## 6. Standard update procedure

Use this exact sequence for every portfolio change.

1. **Clarify scope.** Identify the requested copy, image/video, project order, link, and whether the user wants only a local preview or an online release.
2. **Start in the canonical checkout.** Run `git status --short`, `git pull --ff-only`, and verify the correct branch is `main`. Do not use the legacy checkout as a shortcut.
3. **Make the smallest matching edit.** Update the relevant HTML/CSS/data file. Add owned assets under `images/` or `videos/`; do not replace other project art.
4. **Local QA.** Check the changed page at desktop and narrow mobile width. Confirm project order, text readability, image crop, buttons/links, video controls, and no overlap or horizontal scroll.
5. **Show / describe the review result.** If Yiyi asked for a mock-up, stop here until a change is approved.
6. **Get explicit approval to publish.** Pushing to `main` is an external release and automatically triggers Firebase Hosting. Do not push merely because local editing is complete.
7. **Publish with GitHub CLI.** After approval, use a specific commit message, for example:

   ```bash
   git add index.html projects.js styles.css images/...
   git commit -m "Add [project] to portfolio"
   git push origin main
   ```

   Stage only files relevant to the request. Never use broad destructive Git commands.
8. **Verify the release.** Check that the GitHub Action succeeded, then open `https://yiyistudio.web.app/` and the changed page directly. Confirm the current asset version is loaded; use a cache-busting query only if an asset is demonstrably stale.
9. **Update this handoff.** Add date, request, files changed, local QA, commit (if published), live verification, and any remaining follow-up under **Update log**.

## 7. Related public profile notes

Bonjour profile: <https://bonjour.bio/fib816>

It is a profile and work collection, not a standalone project. Its verified order was:

1. `最近在做的 AI 小产品`
2. `TuneCue免费版`
3. `Soft Pause｜小游戏推荐工具`
4. `Yiyi Studio｜AI 作品集`

The Yiyi Studio description should make this distinction clear in Chinese: `个人 AI 作品集，收录正在做的工具、游戏、音乐与其他实验。`

Update Bonjour only when specifically requested, and keep each project card paired with its matching image.

## 8. Known follow-ups and risks

- The legacy checkout contains potentially useful newer TuneCue beta files and images. It requires a deliberate file-by-file comparison before moving anything to `main`.
- The live site and GitHub `main` must be checked before claiming a change is online; browser cache can make an old release appear current.
- Do not expose GitHub, Firebase, Google, or other authentication tokens/codes in commits, logs, screenshots, or this file.
- The title and deployment instructions in `README.md` are partially outdated. Treat this as a documentation task, not a reason to change hosting.

## 9. Update log

### 2026-09-13 — Release workflow and handoff baseline

- Created a clean canonical checkout at `portfolio-site` from `jazzending/jazzending.github.io`, on `main`.
- Verified GitHub CLI is installed and logged in as `jazzending`.
- Verified `main` has a Firebase Hosting GitHub Action for Firebase project `yiyistudio`.
- Reviewed the homepage renderer, project data, standalone ThisOne/TuneCue pages, deployment files, and the separate legacy checkout.
- Created this handoff. No site content, deployment configuration, commit, or live release was changed in this baseline step.
