# Stream Fixer Firefox & Chrome extension

This is an extension that grabs the video streams from video chat sites,
and duplicates them into an overlay.

This overlay has them in a fixed order (by name), and it is full width too.

This makes it very friendly for window capturing and post processing, e.g. from [OBS](http://obsproject.com).

# How to use it?
TODO ADD VIDEO

Feel free to open issues with ideas or bugs or feature requests, and share this with others!


# Supported sites
 * http://whereby.com
 * http://meet.jit.si
 
Suggest other services as issue if you need them, it is easy to add support for a page that fits the conditions.

# Setup
 * Install the firefox extension here: TODO
 * Install the chrome extension here: TODO

# Development

```bash

./core/setup.sh
./core/compile.sh # (this builds it continously on change)

# In another terminal
watch -n 1 tools/compile.sh (this compiles the extensions continously)
```
 
## Firefox
  - Open about:debugging 
  - This firefox
  - Load temporary add-on
  - Locate the firefox/manifest.json
  
## Chrome
 - Open chrome://extensions
 - Load unpacked
 - Locate the chrome/manifest.json
 
## General idea summary
 * This extension locates <video> elements on the page
 * For every video element it tries to get the participant's name
 * Creates an overlay
 * Adds a new <video> per participant
 * with [captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream) gets the original video's stream and assigns it to the new video.
 
This way we don't touch the original DOM of the page, and we only need to assume the relation
between a video element and the element that contains the name. Everything else can change on the page,
even dynamically and it will not break.

There is an index maintained in the localstorage, where we save the participant's name and index (order),
and by this we restore it every time the site is loaded.


