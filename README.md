Hosted at:  https://keithrieck.github.io/vibe_codex_bouncer/index.html

# vibe_codex_bouncer

This was another quick test of vibe coding, this time using [OpenAI's Codex](https://chatgpt.com/codex/).

1. First Prompt:

Create a project in ES2020 and using the Phaser game library (version 4) that displays 64 small circles that bounce around the screen.
* The project should not be dependent on any server side code and should execute entirely in a browser.
* It should easily display on tablets as well as web browsers.
* It should be a Progressive Web app, so it wil cache files locally and execute on a browser or phone or tablet even if there is no internet connection.
* It should be a purely static project that does not depend on Node.js or any other application server.  It will be deployed locally for testing and later deployed within Github Pages.
* Make good use of object orientation.  
    * There should be an abstract Bouncer class that extends from Phaser's Sprite class.
    * There should be a Circle class that extends from the Bouncer class.  Circles should be 50 pixels in diameter.  When they are created, they should have a random color.

Codex didn't get the Javscript module setup correct.  I had to tweak the `index.html` and delete some `import` statements from code.  The result did not work with version 4 of Phaser, so I had to downgrade to version 3.6.

---

Browser-only ES2020 project using Phaser 4 to render 64 bouncing circles as an offline-capable PWA.

## Structure

- `index.html` bootstraps the app and defines an import map for Phaser 4.
- `js/` contains plain ES modules with no build step.
- `sw.js` and `manifest.webmanifest` make the app installable and offline-capable.

## Notes

- `Bouncer` is an abstract class implemented with a `new.target` guard.
- `Circle` extends `Bouncer`, renders at 50px diameter, and gets a random tint when created.
- Phaser is loaded from the jsDelivr CDN at `4.0.0-rc.5`, and the service worker caches it for offline reuse after the first successful load.
- For GitHub Pages project sites, the app uses relative URLs so it can run from a repository subpath.
- The site is fully static, but PWA features still need `http://` or `https://`; opening `index.html` via `file://` will not activate the service worker.
