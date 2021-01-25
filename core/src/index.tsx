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
    setTimeout(() => window.document.body.prepend(c), 2000);
    // ^^ This was needed for golighstream, it was clearing body onload...
    ReactDOM.render(<App/>, c);
}

