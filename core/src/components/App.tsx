import React, { useGlobal, getGlobal, setGlobal } from 'reactn';
import { useEffect } from "react";
import { Overlay } from "./Overlay";
import { getPageParticipants } from "../ext/ext";
import { updateStateParticipants } from "../ext/ext";

let interval: number = null;

/**
 * Starts an interval calling on update(), and returns a clearInterval callback.
 */
const startWatching = () => {
    interval = window.setInterval(update, 500);
    return () => {
        window.clearInterval(interval);
    };
};

/**
 * Manages the participant updating from the DOM to the State.
 */
const update = () => {
    const sc = getGlobal().siteConfig;

    // These are the current participants in the original page itself.
    const pageParticipants = getPageParticipants(sc.getVideoName);

    // These are the participants we know about.
    const stateParticipants = getGlobal().participants;

    // log("Updating", stateParticipants);

    // Merge the page participants into the state participants.
    const updatedStateParticipants = updateStateParticipants(stateParticipants, pageParticipants);
    // log(updatedStateParticipants);

    if (updatedStateParticipants !== null) {
        // Update participant list if needed.
        setGlobal({ participants: updatedStateParticipants });
    }

};

/**
 * This is the main container.
 * As an effect it starts the watching of the DOM.
 * @constructor
 */
export function App() {
    useEffect(startWatching);
    return <div>
        <Overlay/>
    </div>
}
