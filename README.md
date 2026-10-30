# compassandkey-site-css

Site stylesheet for [compassandkeygroup.com](https://compassandkeygroup.com) (Lofty CMS).

## Why this exists
Since Oct 2026 Lofty enforces a 5,000-character server-side cap on
Settings → Tools → Custom Style (error 520025). Style and Script are saved
together, so while Style is over the cap *nothing* on that page can be saved.

## How it's wired
| Piece | Where | What |
|---|---|---|
| `ckg.css` | loaded from jsDelivr by the Lofty **Script** field (body-end) | the full stylesheet — source of truth |
| `style-field-critical.css` | pasted into the Lofty **Style** field (inline `<head>`, ≤5,000 chars) | minified first-paint subset (brand vars, type, buttons, colour flips, header, homepage hero) so the top of the page never flashes unstyled |
| `lofty-style-backup-2026-10-30.css` | — | exact pre-migration Style field (8,703 chars), for rollback |

`ckg.css` loads after the inline Style CSS, so it wins every tie; the subset only
has to be *consistent*, not complete.

## Shipping a change
1. Edit `ckg.css` (append; order matters). Commit + push.
2. In Lofty's Script field, change the commit SHA in the jsDelivr URL to the new commit:
   `https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css@<commit-sha>/ckg.css`
   (Pin to a commit, never `@main` — jsDelivr caches branch URLs for up to 7 days.)
3. If a rule is needed at first paint, also add it to `style-field-critical.css`
   and re-paste — keep it ≤5,000 chars.
