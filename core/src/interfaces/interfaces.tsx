/**
 * A participant as it is in the Sate
 */
export interface StateParticipant {
    // The order (in which we had him/her)
    index: number;

    // The displayed name of the participant.
    name: string;

    // The streamId that is currently in the preview.
    currentStreamId: string;

    // The stream that is in the preview currently.
    stream?: any;

    lastUpdate: number;
}

export type StateParticipantList = { [ key: string ]: StateParticipant };

/**
 * This defines the required configuration for a page that our extension supports.
 */
export interface SiteConfig {
    // The name of the site.
    name: string;

    // A callback that returns the display name of a participant, starting from the given <video> node.
    getVideoName: GetVideoNameCb
}

// A callback that returns the display name of a participant, starting from the given <video> node.
export type GetVideoNameCb = (videoNode: Element) => string;

// This is a list of participant
export interface CrawledParticipant {
    // The displayed name of the participant.
    name: string;

    // The <video> element of the participant
    node: HTMLVideoElement;

    // The stream id of the video's srcObject.
    streamId: string;
}