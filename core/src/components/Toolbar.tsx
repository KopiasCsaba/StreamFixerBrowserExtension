import { useGlobal } from "reactn";
import React from "reactn";

export interface Props {
}

const style = require("./Toolbar.css");

/**
 * This renders the toolbar buttons
 * @param props
 * @constructor
 */
export function Toolbar(props: Props) {

    const [ isMinimised, setMinimised ] = useGlobal("overlayMinimised");
    const [ isSmall, setSmall ] = useGlobal("overlaySmall");
    const [ _, setParticipants ] = useGlobal("participants");
    const [ guestMode, setGuestMode ] = useGlobal("guestMode");

    const onMinimiseClick = () => {
        setMinimised(!isMinimised);
    };
    const onResizeClick = () => {
        setSmall(!isSmall);
    };
    const onResetClick = () => {
        setParticipants({});
    };
    const onToggleGuest = () => {
        setGuestMode(!guestMode)
    };

    return <div className={style.toolbarAlign}>
        <div className={style.toolbar}>
            <input type="button" className={style.item} value="G" title="Toggle guest mode" onClick={onToggleGuest}/>
            <input type="button" className={style.item} value="R" title="Reset" onClick={onResetClick}/>
            <input type="button" className={style.item} value="[]" title="Resize" onClick={onResizeClick}/>
            <input type="button" className={style.item} value="_" title="Minimise" onClick={onMinimiseClick}/>
        </div>
    </div>
}
