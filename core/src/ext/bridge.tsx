/**
 * This file contains stuff that is a glue between the background.js and the content script.
 *
 */
import { log } from "./log";

const w = window as any;
/**
 * Calculates the required window size & signals the resize event.
 * @param off: If the overlay is not full size. In this case we resize the browser back to fullscreen.
 * @param height
 */
export const updateWindowSize = (off: boolean, height: number) => {

    const newWidth = screen.width;
    const newHeight = off ? screen.height : Math.max(height + 300, window.outerHeight);

    sendMessage("resize", { w: newWidth, h: newHeight });

};

/**
 * Handles the communication between the content script and firefox OR chrome.
 * @param type
 * @param content
 */
const sendMessage = (type: string, content: any) => {
    if (w.chrome) {
        log("Sending to chrome",type,content);
        w.chrome.runtime.sendMessage({ type, content });
    }

    if (navigator.userAgent.indexOf("Firefox") != -1) {
        log("Sending to firefox",type,content);
        browser.runtime.sendMessage("stream-fixer2@kopias.net", { type, content });
    }
};

