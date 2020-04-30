// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "XXX from a content script:" + sender.tab.url :
//             "XXX from the extension");
//         if (request.greeting == "hello")
//             sendResponse({ farewell: "goodbye" });
//     });

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.type === "resize") {
        sendResponse({ "result": "OK", "type": request.type });

        browser.windows.getCurrent(function (targetWindow) {

            browser.windows.update(targetWindow.id, {
                width: request.content.w,
                height: request.content.h
            });
        });
    }
});
