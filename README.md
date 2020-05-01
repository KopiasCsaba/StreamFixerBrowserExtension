# Stream Fixer Firefox & Chrome extension
 	
This extension is for you, if you want to broadcast a video chat to your audience from a streaming software like  [OBS](http://obsproject.com), vMix, XSplit, Wirecast.

By extracting every video stream on supported webpages and putting them in a fixed order into an overlay,
you'll have a much easier time grabbing the required part of the window.

Because the order is fixed, joining or quitting users will not change the layout.

Also, the overlays are placed in a 16:9 full-width box therefore the quality of the video is as high as it can be.

 +TODO video+
 
# The problem this solves
When you want to broadcast participants from a video call, you will face the problem, 
that you have no real and reliable way to get every participant's stream separately into your streaming software.

Skype offers [NDI](https://support.skype.com/en/faq/FA34853/what-is-skype-for-content-creators), that is almost a awesome, but it has two problems:
 * It only works on windows
 * It resizes if the participant's network quality changes drastically
 * ... and you might want to use another service wich offers better A/V quality

You can "window capture" any video conferencing solution, but they are usually not designed with that in mind.
When participants joining, leaving (or just speaking) the layout usually changes, not to mention if
you close the window and start it again tomorrow. 
The participant's streams are not always as big as they could be, therefore losing quality.

See, how the layout changes when someone joins:

![Problem](docs/resources/problem.gif)

# The solution
StreamFixer offers a solution for that problem by creating a full-width fixed order single column list from the streams available.

When someone joins, they will be put to the end of the stack.
If they were already here, they will be put back where they were before. (Matched by name)

![Problem](docs/resources/solution.gif)

# Screenshots


<a href="https://raw.githubusercontent.com/KopiasCsaba/StreamFixerBrowserExtension/master/docs/resources/screenshots/gr_minimised.png"><img src="docs/resources/screenshots/gr_minimised.png" height="200"></a>
<a href="https://raw.githubusercontent.com/KopiasCsaba/StreamFixerBrowserExtension/master/docs/resources/screenshots/gr_maximised2.png"><img src="docs/resources/screenshots/gr_maximised2.png" height="200"></a>
<a href="https://raw.githubusercontent.com/KopiasCsaba/StreamFixerBrowserExtension/master/docs/resources/screenshots/gr_ui.png"><img src="docs/resources/screenshots/gr_ui.png" height="200"></a>


# How to use it?
TODO ADD VIDEO

Feel free to open issues with ideas or bugs or feature requests, and share this with others!


# Supported sites
 * [http://whereby.com](http://whereby.com)
 * [http://meet.jit.si](http://meet.jit.si)
 
Suggest other services as issue if you need them, it is easy to add support for a page that fits the conditions.

# Known bugs
 * Flashing when two or more participants have the same name
    * Solution: Never have participants with the same name.

# Setup
 * Install the Firefox extension here: [https://addons.mozilla.org/en-US/firefox/addon/streamfixer/](https://addons.mozilla.org/en-US/firefox/addon/streamfixer/)
 * Install the Chrome extension here: *coming soon*


# More information
 * [docs/development.md](docs/development.md)