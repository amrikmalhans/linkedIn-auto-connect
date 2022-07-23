"use strict";
// Selecting and declaring all the elements on the page
const popupConnectBtnEl = document.querySelector(".connect-btn");
// Add a click listener to the connect button, and execute the content script on the current tab
popupConnectBtnEl.addEventListener("click", async () => {
    // Apply a class to the button to show that it's being clicked and change the text
    popupConnectBtnEl.classList.add("clicked");
    popupConnectBtnEl.innerText = "Connecting...";
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        func: connectToPeople, // excute this function in the content script
    });
});
/* connectToPeople is a function that grabs all the 'Connect' buttons on the page
and clicks them. It waits for the confirmation modal to appear, and clicks the send button
using MutationObserver. There's a set delay between each 'Connect' button click.
*/
const connectToPeople = () => {
    // make a mutation observer to wait for the modal to be loaded and click the send button
    const observer = new MutationObserver(() => {
        if (document.querySelector(".artdeco-button.ml1")) {
            const linkendInSendBtnEl = document.querySelector(".artdeco-button.ml1");
            if (linkendInSendBtnEl.innerText === "Send") {
                linkendInSendBtnEl.click();
            }
        }
    });
    const linkedInModalEl = document.querySelector("#artdeco-modal-outlet");
    // Observe the modal on the page
    const config = {
        childList: true,
        subtree: true,
    };
    observer.observe(linkedInModalEl, config);
    // Click the 'Connect' buttons on the page every interval
    setInterval(() => {
        const linkendInconnectBtnEl = document.querySelector("[class='artdeco-button artdeco-button--2 artdeco-button--secondary ember-view']");
        // Loop through all the 'Connect' buttons and click them with a delay
        /* The logic here should be: first click the connect button, then wait
        for the modal to appear, then click the send button, wait for a set delay */
        if (linkendInconnectBtnEl.innerText === "Connect") {
            linkendInconnectBtnEl.click();
        }
    }, 2000);
};
