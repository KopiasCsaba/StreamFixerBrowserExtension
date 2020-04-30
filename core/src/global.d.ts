import 'reactn';
import { SiteConfig } from "./interfaces/interfaces";

/**
 * This is the type definition of the state
 */
declare module 'reactn/default' {

    import { StateParticipantList } from "./interfaces/interfaces";

    export interface Reducers {
    }

    export interface State {
        siteConfig: SiteConfig
        participants: StateParticipantList
        overlaySmall: boolean;
        overlayMinimised: boolean;
        guestMode: boolean;
    }
}