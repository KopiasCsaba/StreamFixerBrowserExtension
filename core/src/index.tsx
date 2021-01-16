import React from 'reactn';
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import { initState } from "./state/state";
import { getSiteConfig } from "./ext/ext";
import { log } from "./ext/log";

const w = window as any;
/**
 * This is the entrypoint of the injected content script.
 */


const sc = getSiteConfig();

if (sc != null) {
    // This means, that are on a site/sub page that we support.

    log("CONFIG", sc.name);
    initState(sc);

    const c = document.createElement("div");
    window.document.body.appendChild(c);
    ReactDOM.render(<App/>, c);
}

