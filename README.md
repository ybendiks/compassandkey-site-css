# compassandkey-site-css

Site stylesheet for [compassandkeygroup.com](https://compassandkeygroup.com) (Lofty CMS).

Lofty caps its Custom Style field at 5,000 characters server-side, so the full
stylesheet lives here and is served via jsDelivr:

```
https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css@<tag>/ckg.css
```

Lofty references a **tagged** version. To ship a change: edit `ckg.css`, commit,
create a new tag (`v1.0.1`, …), then bump the tag in Lofty.

`lofty-style-backup-2026-10-30.css` is the exact Lofty Style-field content at
migration time (8,703 chars), kept for rollback.
