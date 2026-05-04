# Mood Indigo 2005

**Mood Indigo 2005 back online after 21 years.**

Live: <https://saurabhdas.github.io/mi05/>

This is the official festival website for Mood Indigo 2005, IIT Bombay's
annual cultural festival. It was built almost entirely in Flash. When the
Flash plugin was retired in 2020, the site went dark; this repo brings it
back, running through [Ruffle](https://ruffle.rs) — an open-source Flash
emulator written in Rust + WebAssembly.

## Repo layout

```
.
├── original/    pristine 2005 codebase (untouched archive)
└── ruffled/     modernized version served by GitHub Pages
```

`original/` is a safety copy. `ruffled/` is what the live site serves.

## What was changed to make it run

The site is mostly the same — same SWFs, same content, same page bg color
(`#4499EE`). The shell around it had to change:

- **Bundled Ruffle locally** under `ruffled/ruffle/` so the page works
  without a CDN dependency.
- **New `index.html`** that embeds the main `blob_big.swf` and an HTML/CSS
  navigation overlay sitting on top of the icon strip — original SWF click
  handlers don't fire reliably under Ruffle, so HTML overlays load each
  section's SWF directly.
- **Auto-loads the mascot splash** (`content_mi/mi0.swf`) on first visit.
- **Binary-patched `blob_big.swf`** to claw back performance:
  - Renamed the constant `createTextField` → `XreateTextField` so the AS2
    method lookup fails silently. The SWF originally created ~28 dynamic
    text-field labels per frame around the wobble points; under Ruffle
    these were the dominant per-frame cost (and showed up as `p0/q0/...`
    placeholders because their default text is the variable name).
  - Bumped the stage frame rate from 30 fps → 60 fps. Wobble physics
    integrate per-frame, so doubling the rate makes the cursor-driven
    wobble feel snappy again.
- **Constrained the player to 880px wide centered** with the page bg
  matching the SWF stage color. Side gutters become plain HTML, so the
  WebGL canvas only paints the area the bubble actually occupies.
- **Pinned `devicePixelRatio` to 1** before Ruffle loads, so the backing
  canvas isn't blown up 2× on Retina displays — about 4× fewer pixels
  per frame. Slight loss of crispness, but the blob is mostly soft shapes.
- **Removed the inline CDN-Ruffle loader** from `main.js` (legacy attempt
  that conflicted with the bundled copy).

The live site uses GitHub Actions (`.github/workflows/pages.yml`) to
deploy `ruffled/` whenever `main` is updated.

## Credits

- Original site, design, and content: the Mood Indigo 2005 organizing
  team, IIT Bombay (2005).
- Flash → modern web bridge: [Ruffle](https://ruffle.rs), MIT/Apache-2.0.
- This repo, modernization, and binary patches: Saurabh Das (2026), with
  AI assistance from Claude.

## License

MIT — see [`LICENSE`](LICENSE). Ruffle's own MIT/Apache-2.0 licenses are
preserved in [`ruffled/ruffle/`](ruffled/ruffle/).
