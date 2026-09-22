# DAE

Static project page for **Diffusion Autoencoding for Fast Video Sampling**.

## Layout

- `index.html`: article and page structure.
- `assets/css/main.css`: page styles.
- `assets/js/main.js`: comparison list, pagination, language filter, and playback.
- `assets/`: only the figures, fonts, and posters referenced by the page.
- `compare/DAE_Baseline_labeled/`: 46 labeled DAE / Baseline comparison clips.
- `videos/`: 3 additional clips referenced in the article.

No framework, package installation, or build step is required.

## Local preview

Open `index.html` directly, or run the following command from this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000`.

## Publication boundary

This is a standalone website export, not the original research workspace.
Unreferenced assets, source material, generation scripts, credentials, and local
working files are not included. There is no inherited Git history.

`.gitignore` is an exact-file allowlist: new files are ignored until an explicit
entry is added. Before adding an asset:

1. Review the file contents, embedded metadata, and sharing permissions.
2. Reference it from the page or comparison script.
3. Add its exact path to `.gitignore` (escape `[` and `]` in filenames).
4. Inspect `git diff --cached --stat` and `git diff --cached` before committing.

Do not force-add an entire research directory. Do not copy local credentials or
environment files here.

The article text, experimental results, images, and video/audio content are
retained from the page. File filtering is not a confidentiality or rights
clearance for that visible content; review it before public deployment.

## Hosting

The root directory is ready for a static host. All runtime asset paths are
relative, so the page can also be served under a project subdirectory.
`.nojekyll` is included for hosts that support it.

The repository is public. GitHub Pages publishes the root of the `main` branch:

https://yubo-shankui.github.io/dae/

Push reviewed changes to `main` to update the website. The existing `noindex`
tag is retained; it is not an access-control mechanism. All files in this
repository, including the videos, are publicly accessible.
