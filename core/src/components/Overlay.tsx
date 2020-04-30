import { useGlobal } from "reactn";
import { useEffect } from "react";
import React from "reactn";
import { ParticipantView } from "./ParticipantView";
import { Toolbar } from "./Toolbar";
import { useRef } from "react";
import { updateWindowSize } from "../ext/bridge";

const style = require("./Overlay.css");

/**
 * This is the main overlay container.
 * This holds the buttons and the participant video elements.
 *
 * @constructor
 */
export function Overlay() {
    const overlayEl = useRef(null);

    const [ isMinimised ] = useGlobal("overlayMinimised");
    const [ isSmall ] = useGlobal("overlaySmall");
    const [ participants ] = useGlobal("participants");
    const [ guestMode ] = useGlobal("guestMode");

    // Order participants by their index
    const orderedParticipants: string[] = Object.keys(participants).sort((a, b) => participants[ a ].index - participants[ b ].index);

    // Manage guest mode
    const latestParticipantName = orderedParticipants[ orderedParticipants.length - 1 ];
    const guest = guestMode && <ParticipantView participant={participants[ latestParticipantName ]} key={-1} isGuest={true}/>

    useEffect(() => {
        // Signal browser window size update after render
        updateWindowSize(isMinimised || isSmall, overlayEl.current.offsetHeight);
    });

    // Compile class list
    let overlayClasses: string[] = [ style.customOverlay ];
    if (isMinimised) {
        overlayClasses.push(style.minimised)
    }
    if (isSmall) {
        overlayClasses.push(style.small)
    }

    return <div ref={overlayEl} className={overlayClasses.join(" ")}>
        <Toolbar/>
        <div className={style.ovlcontainer}>
            {guest}
            {orderedParticipants.map((p, i) => <ParticipantView participant={participants[ p ]} key={i}/>)}
        </div>
    </div>
}
