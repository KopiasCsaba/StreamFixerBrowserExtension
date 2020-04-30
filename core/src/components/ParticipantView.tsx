import { useGlobal } from "reactn";
import { useEffect } from "react";
import React from "reactn";
import { StateParticipant } from "../interfaces/interfaces";
import { useRef } from "react";
import { log } from "../ext/log";

export interface Props {
    participant: StateParticipant
    isGuest?: boolean
}

const style = require("./ParticipantView.css");

export function ParticipantView(props: Props) {
    if (!props.participant) {
        return <span/>;
    }

    const videoEl = useRef(null);

    useEffect(() => {
        // Set the video's stream to the one that is grabbed from the original video element & update other parameters too.
        if ((props.participant.stream instanceof MediaStream)) {
            videoEl.current.srcObject = props.participant.stream;
        }
        videoEl.current.setAttribute("playsinline", "true");
        videoEl.current.setAttribute("autoplay", "true");
        videoEl.current.setAttribute("muted", "true");
        // videoEl.current.setAttribute("controls", "false");
    });

    const [ participants, setParticipants ] = useGlobal("participants");

    /**
     * Removes this instance from the state.
     */
    const onRemove = () => {
        const newParticipants = { ...participants };
        log(newParticipants, props.participant.name);
        delete (newParticipants[ props.participant.name ]);
        setParticipants(newParticipants);
    };

    return <div className={style.participantView}>
        <div className={style.name}>
            {props.isGuest && "LATEST: "}
            {!props.isGuest && <input type="button" value="X" onClick={onRemove}/>}
            {props.participant.name}
        </div>
        <video ref={videoEl} className="sfVideo"/>
    </div>
}
