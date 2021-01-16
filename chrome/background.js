// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "XXX from a content script:" + sender.tab.url :
//             "XXX from the extension");
//         if (request.greeting == "hello")
//             sendResponse({ farewell: "goodbye" });
//     });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.type === "resize") {
        sendResponse({ "result": "OK", "type": request.type });

        chrome.windows.getCurrent(function (targetWindow) {

            chrome.windows.update(targetWindow.id, {
                width: request.content.w,
                height: request.content.h
            });
        });
    }
});

// Check whether new version is installed
function handleInstalled(details) {
    console.log(details);


    if (details.reason !== "update" && details.reason !== "install") {
        return;
    }


    if (details.previousVersion !== undefined && details.previousVersion.split('.').length === 4) {
        console.log("Skipping changelog upon update.");
        return;
    }


    chrome.tabs.create({
        url: chrome.runtime.getURL('changelog/index.html#' + details.reason)
    });
}

chrome.runtime.onInstalled.addListener(handleInstalled);
