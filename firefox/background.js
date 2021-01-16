// console.log("INITIALISED");
// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log("INCOMNG", request, sender, sendResponse);
//     if (request.type === "resize") {
//         sendResponse({ "result": "OK", "type": request.type });
//
//         browser.windows.getCurrent(function (targetWindow) {
//             console.log(targetWindow);
//             browser.windows.update(targetWindow.id, {
//                 width: request.content.w,
//                 height: request.content.h
//             });
//         });
//     }
// });

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
browser.runtime.onMessage.addListener(
    (request, sender) => {
        console.log("INCOMING MESSAGE: ", request, sender);
        if (request.type === "resize") {
            browser.windows.getCurrent().then(function (targetWindow) {
                browser.windows.update(targetWindow.id, {
                    width: request.content.w,
                    height: request.content.h
                });
            });
            return Promise.resolve('done');
        }
    }
);

// Check whether new version is installed
function handleInstalled(details) {

    if (details.reason !== "update" && details.reason !== "install") {
        return;
    }


    if (details.previousVersion !== undefined && details.previousVersion.split('.').length === 4) {
        console.log("Skipping changelog upon update.");
        return;
    }


    browser.tabs.create({
        url: browser.runtime.getURL('changelog/index.html#' + details.reason)
    });
}

browser.runtime.onInstalled.addListener(handleInstalled);