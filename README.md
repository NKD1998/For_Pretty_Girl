# A birthday page for Aalooo

A small, four-screen interactive birthday site. Static — no build step, no server, no dependencies.

```
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── couple-photo.jpg      ← the finale photo
│   ├── couple-photo-2.jpg    ← the second photo (tap the frame to swap)
│   └── song.mp3              ← background music
└── README.md
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub (public is fine — the URL is unguessable enough, but see "Privacy" below).
2. Upload every file above, keeping the folder structure — `index.html` must sit at the repo root.
3. Repo → **Settings** → **Pages**.
4. Under **Build and deployment**, set Source = **Deploy from a branch**, Branch = **main**, Folder = **/ (root)**. Save.
5. Wait ~1 minute. The URL appears at the top of that same Pages screen:
   `https://<your-username>.github.io/<repo-name>/`
6. Open it on your phone first, then send it.

All asset paths are relative, so it works from a subfolder URL and refreshing any time is safe.

## Swapping the photos

Replace `assets/couple-photo.jpg` — same filename, that's it. It's the one shown first.
`assets/couple-photo-2.jpg` is the second one; she can tap the frame to flip between them.

Portrait photos work best. The frame crops to a 4:5 box from the centre — if a face gets clipped, adjust one line in `style.css`:

```css
.plate img { object-position: 50% 41%; }   /* lower the % to show more of the top */
```

## Music

`assets/song.mp3` plays quietly in the background for the whole visit — no player, no buttons, nothing to fiddle with.

Browsers don't let a page start audio on its own, so it begins the instant she taps anything (the "Tap here ✨" button), fades in, loops, and keeps going across all four screens until she closes the tab. If the file is missing, the site just runs silent.

To change the track, replace `assets/song.mp3`. The current file is ~4.2 MB — trimming it to the first 60–90 seconds (it loops anyway) makes it much lighter on mobile data.

## Editing the words

All the copy is plain text in `index.html`:

- Screen 1 — `<section id="s1">`
- Screen 2 — `<section id="s2">` (her name is in `.display-name`)
- Screen 3 — `<section id="s3">` (the letter, the numbered list, the sign-off)
- Screen 4 — `<section id="s4">` (the reveal and closing lines)

The four numbered items on screen 3 are the most worth personalising — swap in things only he'd know.

## Privacy

The link preview shown in WhatsApp is deliberately vague ("Hey, you.") so the surprise isn't spoiled in the chat. There's no photo in the preview card. If you'd rather it show nothing at all, delete the three `og:` meta tags in `index.html`.

To keep it off search engines, add a file called `robots.txt` at the root containing:

```
User-agent: *
Disallow: /
```

## Notes

- Built mobile-first; tested down to a 375 px-wide screen.
- Respects `prefers-reduced-motion` — animations collapse for anyone who's asked for that.
- Safe-area insets are handled for notched iPhones.
- No fonts are bundled; Instrument Serif and Manrope load from Google Fonts. If you'd rather have zero external requests, download the two families into `assets/fonts/` and swap the `<link>` in `index.html` for local `@font-face` rules.
