# Development

# Stack

The extension consists of 2 main parts:

* content script (the code that is injected to the supported sites by the extension)
* background.js (Browser specific implementations of features e.g. window resizing)

The content script part is a [React](https://reactjs.org/) app using [Reactn](https://github.com/CharlesStover/reactn) and React hooks written in Typescript.

The content script can be broken up into three parts:

* React app (entry point: core/src/components/App.tsx)
* Bridge (core/src/ext/bridge.tsx): For sending requests to background.js features
* DOM query (core/src/ext/ext.tsx): These functions work on the targeted page itself

# Overview of how it works

* This extension locates <video> elements on the page
* For every video element it tries to get the participant's name
* Creates an overlay
* Adds a new <video> per participant
* With [captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream) gets the original video's stream and assigns it to the new video.

This way we don't touch the original DOM of the page too much, and we only need to assume the relation between a video element and the element that contains the participant's name. Everything else can change on the page, even dynamically and it will not break.

There is an index maintained in the localstorage, where we save the participant's name and index (order), and by this we restore it every time the site is loaded.

# Directories

* /builds: Temporary, unsigned chrome & firefox extensions
* /firefox: Firefox extension
* /chrome: Chrome extension
* /tools: Scripts for building/compiling stuff
* /core: Common code amongst the extensions
    * /dist: the compiled content script
* /docs: documentation

# Tools

The tooling currently copies the core/dist/prod/main.js into the firefox and chrome extensions, that is how compilation begins.

# Start the development environment

```bash

./core/setup.sh # npm installs stuff
./core/compile.sh # (this builds the react app on file change)

# In another terminal:
watch -n 2 tools/compile.sh  # (this compiles the extensions continously)
```

# Tips and tricks

* If you update the extension version to contain three dots, then the changelog will not pop into your face on every update.
  Don't leave it as that...

## Firefox

- Open about:debugging
- Click on "This firefox"
- Load temporary add-on
- Locate the firefox/manifest.json

## Chrome

- Open chrome://extensions
- Enable Developer mode (top right)
- Load unpacked
- Locate the directory "chrome" in here.
 