import { SiteConfig } from "../interfaces/interfaces";
import { GetVideoNameCb } from "../interfaces/interfaces";
import { StateParticipantList } from "../interfaces/interfaces";
import { CrawledParticipant } from "../interfaces/interfaces";
import { log } from "./log";

/**
 * The stuff in this file is mostly dealing with the original DOM content
 */

/**
 * Lists the current participants from the current page's DOM tree.
 * @param getvideoName
 */
export const getPageParticipants = (getvideoName: GetVideoNameCb): CrawledParticipant[] => {

    let elements: CrawledParticipant[] = [];

    document.querySelectorAll('video:not(.sfVideo)').forEach((node: HTMLVideoElement) => {
        if (!node.srcObject || !(node.srcObject as any).id) {
            return;
        }
        // log("GETTING NAME FOR ...", node)
        let name = null;
        try {
            name = getvideoName(node)
        } catch (e) {
            // log(e); // doesn't matter.
            return; // The getVideoName was unable to determine the name.
        }

        if (name === null || name === "") {
            return;
        }
        //
        // const d = {
        //     q: node.getVideoPlaybackQuality(),
        //     msFrameStep: node.msFrameStep,
        //     poster: node.poster,
        //     videoWidth: node.videoWidth,
        //     videoHeight: node.videoHeight,
        //     attributes: node.attributes,
        //     isConnected: node.isConnected,
        //     frames: node?.getVideoPlaybackQuality()?.totalVideoFrames
        //
        // }
        // log(JSON.stringify(d, null, " "));
        //
        // if (node?.getVideoPlaybackQuality()?.totalVideoFrames === undefined || node?.getVideoPlaybackQuality()?.totalVideoFrames < 50) {
        //     // There was a bug with chrome (especially in google meet) where captureStream messed up even the original stream too.
        //     // So now basically we wait a littlebit, to have the stream initialised properly.
        //
        //     log(">> skipping this node.", node?.getVideoPlaybackQuality()?.totalVideoFrames);
        //     return;
        // }

        elements.push({
            streamId: (node.srcObject as any).id,
            name,
            node
        });
    });

    elements = getUniqueListBy(elements, 'streamId');
    elements = getUniqueListBy(elements, 'name');
    // log("------------------");
    // log(JSON.stringify(elements, null, " "));
    // log(JSON.stringify(elements));
    return elements;

};

/**
 * Determines if the current site is supported, or not by our extension.
 *
 * Returns null if not, and a configured SiteConfig object if it is.
 *
 * When adding a new site, this function is the only one that should be modified with the new configuration.
 */
export function getSiteConfig(): SiteConfig {
    const url = window.location.href;
    // TEST PAGE
    if (document.getElementById('testarea') !== null) {
        return {
            name: "Test",
            getVideoName: (videoNode: Element) => videoNode.closest('div').querySelector('span').innerText
        };
    }

    // WHEREBY
    if (url.match(/.*whereby.com\/[^/]+/g) && !url.match(/.*whereby.com\/user/g)) {
        return {
            name: "whereby",
            getVideoName: (videoNode: Element) => (videoNode.closest('div[class*="content-"]').querySelector('[class*="nameBanner-"]') as any).innerText
        }
    }

    // JITSI
    if (url.match(/.*meet.jit.si\/[^/]+/g) !== null) {
        return {
            name: "jitsy",
            getVideoName: (videoNode: Element) => {
                return videoNode.closest('.videocontainer').querySelector('.displayname').innerHTML;
            }
        }
    }

    // meet.google.com
    if (url.match(/.*meet.google.com\/[^/]+/g) !== null) {
        return {
            name: "Google meet",
            getVideoName: (videoNode: Element) => {
                return videoNode.closest('div[data-requested-participant-id]').querySelector('div[data-self-name]').innerHTML;
            }
        }
    }

    // DISCORD
    if (url.match(/.*discord.com\/[^/]+/g) !== null) {
        return {
            name: "DISCORD",
            getVideoName: (videoNode: Element) => {
                if (videoNode.closest('div[class*="videoGridWrapper-"]') == null) {
                    // We should only work when in video grid mode.
                    return null;
                }
                return videoNode.closest('div[class*="tileChild-"]').querySelector('span[class*="overlayTitleText-"]').innerHTML;
            }
        }
    }
    // LIVESTORM
    if (url.match(/.*app.livestorm.co\/[^/]+\/[^/]+\/live.*/g) !== null) {
        return {
            name: "LIVESTORM",
            getVideoName: (videoNode: Element) => {

                return videoNode.closest('div.stage-item').querySelector('div.name').innerHTML;
            }
        }
    }
    // GOLIGHTSTREAM
    if (url.match(/.*studio.golightstream.com\/projects\/[^/]+.*/g) !== null) {
        return {
            name: "LIVESTORM",
            getVideoName: (videoNode: Element) => {

                // manipulator-title

                if (videoNode.closest('div.editor-item-container') !== null) {
                    const scene = videoNode.closest('.edit-scene');
                    const sceneindex = Array.prototype.indexOf.call(scene.parentNode.children, scene) + 1;
                    log("Scene index: ", sceneindex);
                    let name = videoNode.closest('div.editor-item-container').querySelector('span.manipulator-title').innerHTML;
                    log(sceneindex,name);
                    name = `SC${sceneindex}-${name}`
                    if (name !== "undefined") {
                        return name;
                    }
                }

            }
        }
    }

    log("No supported site found:(");
    return null;
}

/**
 * Handles the merging of the DOM participants into the State's participant lists.
 *
 * If a new participant arrived, it adds it, otherwise it checks if the stream is still the same.
 * So when someone reconnects, their view gets updated again.
 *
 * @param stateParticipants
 * @param pageParticipants
 */
export function updateStateParticipants(stateParticipants: StateParticipantList, pageParticipants: CrawledParticipant[]) {
    const updatedStateParticipants: StateParticipantList = { ...stateParticipants };
    let changed = false;

    for (const pp of pageParticipants) {
        if(!pp.name) {
            continue;
        }
        const now = updatedStateParticipants[ pp.name ];
        if (now) {
            // We had this participant already
            if (now.currentStreamId != pp.streamId || !(now.stream instanceof MediaStream) || now.wasMissing) {
                // But their stream is changed, or it wasn't a stream originally.
                log("Updating participant...", pp.name);
                changed = true;
                now.stream = captureStream(pp.node);
                now.currentStreamId = pp.streamId;
                now.lastUpdate = Date.now();
                now.wasMissing = false;
            }
        } else {
//             We didn't knew this participant before, add him/her.
            const stream = captureStream(pp.node);
            if (stream !== null && stream instanceof MediaStream && stream.active) {
                // There is a stream, and it is working, etc...
                changed = true;
                log("Adding new participant... ", pp.name);
                updatedStateParticipants[ pp.name ] = {
                    currentStreamId: pp.streamId,
                    index: Object.keys(updatedStateParticipants).length,
                    name: pp.name,
                    stream,
                    lastUpdate: Date.now(),
                    wasMissing: false
                }
            }
        }
    }
    for (const spName of Object.keys(updatedStateParticipants)) {
        if (pageParticipants.filter(pp => pp.name == spName).length == 0) {
            if(!spName) {
                continue;
            }
            if (!updatedStateParticipants[ spName ].wasMissing) {
                log("MISSING PARTICIPANT:", spName);
                updatedStateParticipants[ spName ].wasMissing = true;
            }
        }
    }

    if (!changed) {
        return null;
    }
    log("CHANGED:", changed);
    return updatedStateParticipants;
}

/**
 * Wrapper for firefox's mozCaptureStream and chrome's captureStream method.
 * @param node
 */
export function captureStream(node: any) {
    if (node.captureStream) {
        return node.captureStream();
    } else if (node.mozCaptureStream) {
        return node.mozCaptureStream();
    }

    console.error("This is an unsupported browser.");
    return null;
}

/**
 * Returns a unique set of elements, based on key.
 * @param arr
 * @param key
 */
function getUniqueListBy(arr: any[], key: string): any[] {
    return [ ...new Map(arr.map(item => [ item[ key ], item ])).values() ]
}