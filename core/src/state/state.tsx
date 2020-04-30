import { addCallback, setGlobal } from 'reactn';
import { State } from "reactn/default";
import { SiteConfig } from "../interfaces/interfaces";
import { log } from "../ext/log";

/**
 * Initiates the global state
 * @param sc
 */
export const initState = (sc: SiteConfig) => {

    // Default configuration to use when we have no saved configuration.
    const defaults: State = {
        siteConfig: sc,
        participants: {},
        overlayMinimised: false,
        overlaySmall: true,
        guestMode: false
    };

    // Load saved configuration, if there is any.
    const saved = JSON.parse(localStorage.getItem("streamFixer"));
    // log("SAVED", saved);

    // Choose between saved & default
    const cfg: State = saved || defaults;

    // Set site config for current page
    cfg.siteConfig = sc;

    setGlobal(cfg);

    addCallback(global => {
        // Save state to localstorage every time it changes.
        saveState(global);
        return null;
    });
};

/**
 * Save state to localstorage
 */
const saveState = (state: State) => {
    localStorage.setItem("streamFixer", JSON.stringify(state));
};


