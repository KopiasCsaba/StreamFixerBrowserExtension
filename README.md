# Table of contents
 * [Install](#install)
 * [StreamFixer Firefox & Chrome extension](#streamfixer-firefox---chrome-extension)
 * [Screenshots](#screenshots)
 * [Supported sites](#supported-sites)
 * [The problem this extension solves](#the-problem-this-extension-solves)
 * [The solution](#the-solution)
 * [Tips](#tips)
 * [Known bugs](#known-bugs)
 * [Contribute](#contribute)


# Install
Install the extension from the official stores of Firefox and Chrome:

<table border=0>
 <tr>
  <td>
<a title="Install StreamFixer Firefox Addon" href="https://addons.mozilla.org/en-US/firefox/addon/streamfixer">
 <img src="docs/resources/stores/firefox.png" height="58">
 </a>
  </td>
  <td>
 
<a title="Install StreamFixer Chrome Extension" href="https://chrome.google.com/webstore/detail/streamfixer/koalccjpkobjlelaicppccppcffoikld">
 <img src="docs/resources/stores/chrome.png" height="58">
 </a>
 </td>
 </tr>
 </table>
 

# StreamFixer Firefox & Chrome extension
 	
This extension is for you, if you want to broadcast a video chat to your audience from a streaming software like  [OBS](http://obsproject.com), vMix, XSplit or Wirecast.

By extracting every video stream on supported webpages and putting them in a fixed order into an overlay,
you'll have a much easier time grabbing the required part of the window.

Because the order is fixed, joining or quitting users will not change the layout therefore your grabbed areas remain as you have set them.

Also, the overlays are placed in a 16:9 full-width box therefore the quality of the video is as high as it can be.

Watch how to live stream an online meeting:

[![How to live stream an online conference](docs/resources/youtube.png)]( https://youtu.be/IbEqSYezKOM )
 
# Screenshots
<a href="https://raw.githubusercontent.com/KopiasCsaba/StreamFixerBrowserExtension/master/docs/resources/screenshots/gr_minimised.png"><img src="docs/resources/screenshots/gr_minimised.png" height="200"></a>
<a href="https://raw.githubusercontent.com/KopiasCsaba/StreamFixerBrowserExtension/master/docs/resources/screenshots/gr_maximised2.png"><img src="docs/resources/screenshots/gr_maximised2.png" height="200"></a>
<a href="https://raw.githubusercontent.com/KopiasCsaba/StreamFixerBrowserExtension/master/docs/resources/screenshots/gr_ui.png"><img src="docs/resources/screenshots/gr_ui.png" height="200"></a>
 
# Supported sites
This is the list of online video conferencing applications that are supported by this extension:

  * [http://whereby.com](http://whereby.com)
  * [http://meet.jit.si](http://meet.jit.si)
  
Suggest other services if you need them, it is easy to add support for a page fits a few conditions.

# The problem this extension solves
When you want to broadcast participants from a video call, you will face the problem, 
that you have no real and reliable way to get every participant's stream separately into your streaming software.

Skype offers [NDI](https://support.skype.com/en/faq/FA34853/what-is-skype-for-content-creators), that is almost a awesome, but it has two problems:
 * It only works on windows
 * It automatically resizes if the participant's network quality changes drastically
 * ... and you might want to use another service which offers better A/V quality

You can "window capture" any video conferencing solution, but they are usually not designed with that in mind.
 * When participants join, leave (or just speaking) the layout usually changes
 * If you close the window and start the application again it change again
 * The participant's streams are not always as big as they could be, therefore you lose quality.

See, how the layout changes when someone joins:

<a href="docs/resources/problem.gif"><img src="docs/resources/problem.gif" height="300"></a>

# The solution
StreamFixer offers a solution for that problem by creating a full-width, fixed order, single column list from all the streams available above everything else.

When someone joins, they will be added to the end of the stack.
If they were already there, they will be added back where they were before originally. Matching happens by their name.

<a href="docs/resources/solution.gif"><img src="docs/resources/solution.gif" height="300"></a>



# Tips
 * You might find it handy to be able to able to drag the window around easily while it is several times bigger than your screen.
    * Many linux window manager supports this out of the box by pressing Alt & Dragging with the mouse. (XFCE, KDE for sure, let me know yours)
    * For MAC: [Easy Move+Resize](https://github.com/dmarcotte/easy-move-resize) (I did not test this, let me know your results)
    * For Windows: [AltDrag](https://stefansundin.github.io/altdrag/) (I did not test this, let me know your results)
 
 * Don't minimize the browser while you capturing it, at least on linux the window capture pauses while the window is minimized.
 
# Known bugs

 * Flashing when two or more participants have the same name
    * Solution: Never have participants with the same name.
 * When someone joins every view flashes once
    * Solution: there is none yet
 * When someone leaves, the overlay image remains there, but upon the next event it turns to black. I'm not even sure what would be good: keep it there, or turn it to black immediately.
    * Solution: there is none yet

# Contribute
Feel free to open issues, PR-s or just leave your comments or ideas in the issues.

More information about development can be found in the [docs/development.md](docs/development.md) file.
