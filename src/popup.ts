// Selecting and declaring all the elements on the page
const popupConnectBtnEl = document.querySelector(".connect-btn") as HTMLElement;

// Add a click listener to the connect button, and execute the content script on the current tab
popupConnectBtnEl.addEventListener("click", async () => {
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
const connectToPeople = (): void => {
  const linkendInconnectBtnEl = document.querySelectorAll<HTMLElement>(
    ".entity-result__actions .artdeco-button"
  );
  const linkendInSendBtnEl = document.querySelector(
    ".artdeco-button.ml1"
  ) as HTMLElement;
  const linkedInModalEl = document.querySelector(
    "#artdeco-modal-outlet"
  ) as HTMLElement;

  // make a mutation observer to wait for the modal to be loaded and click the send button
  const observer = new MutationObserver(() => {
    if (linkendInSendBtnEl) {
      linkendInSendBtnEl.click();
    }
  });

  // Loop through all the 'Connect' buttons and click them with a delay
  linkendInconnectBtnEl.forEach((btn, index) => {
    /* The logic here should be: first click the connect button, then wait
    for the modal to appear, then click the send button, wait for a set delay */
    if (btn.innerText === "Connect") {
      setTimeout(() => {
        btn.click();
      }, index * 1000);
    }
  });

  const config = {
    childList: true,
    subtree: true,
  };

  // Observe the modal on the page
  observer.observe(linkedInModalEl, config);
};
