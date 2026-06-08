# Let Me Browse (Version 1.0)
A browser extension that when clicked, gets rid of intrusive popups and unlocks your scrolling so you can browse websites unbothered.

Some websites like Pinterest and LinkedIn let you browse for an inconsistent amount of time, then suddenly make a popup that keeps you from browsing and demands you log in. With this extension, when that happens, just click the extension's icon, and it'll go away.

**Useage Guide**
- When a popup appears and your scrolling gets locked, just click the extension, and it'll go away.
- *Note: If used on a page that does not have disruptive popups and no reason to unlock the page, it sometimes will remove elements not expected to count as popups. Intended to only be used on pages where a disruptive popup occurs, and when they occur.*

This extension is known to support Chromium (Google Chrome, Brave, etc) and Firefox (LibreWolf, etc), but it likely supports more browsers like Edge, they just haven't been tested. It has not been tested on mobile.

**How to Install for Chromium (Google Chrome, Brave, etc)**
1. From the files above, click the green 'Code' button, and download as zip. Extract the let-me-browse folder found in the Let-Me-Browse-Extension-main folder.
2. Go to ```chrome://extensions/``` in your address bar, and enable the Developer Mode switch in the top right.
3. Click 'Load unpacked' and go in the let-me-browse folder, then click Open.
- *It's important you keep the let-me-browse folder in a place to keep, as the browser directly uses that folder.*
- *The extension in Chromium may show a warning for `background.scripts` using manifest version 2, but that's just for Firefox. Chromium is just bothered by Firefox being supported, it doesn't actually effect Chromium.*

**How to Install for Firefox (LibreWolf, etc)**
- *Since this is a raw, unpackaged extension, it requires a setting to be changed to allow it. Some versions of Firefox may not have this setting available.*
1. From the files above, click the green 'Code' button, and download as zip. Extract the let-me-browse folder found in the Let-Me-Browse-Extension-main folder.
2. Compress the files in let-me-browse into a .zip (not the folder itself, just its contents).
3. Go to ```about:config``` in your address bar, then search for ```xpinstall.signatures.required``` and set it to false.
4. Go to ```about:addons```, drag-and-drop let-me-browse.zip into the page. On the page, a popup is made, click the 'Add' button.

*This project's code was coded by [Claude](https://claude.com), then edited by me.*

*This project is dedicated to the public domain [(CC0)](https://creativecommons.org/publicdomain/zero/1.0/). Feel free to copy, modify, distribute, or do whatever you want with it.*

*Disclaimer: This project is independent and is not affiliated with, endorsed by, or associated with Pinterest, LinkedIn, or any other website mentioned.*
