// Initialize button with user's preferred color
const connectEl = document.getElementById("connect");

connectEl!.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: connect,
  });
});

async function connect(): Promise<void> {
  const connectBtn = document.querySelectorAll<HTMLElement>(
    ".entity-result__actions .artdeco-button"
  );

  // make a mutation observer to wait for the modal to be loaded
  const observer = new MutationObserver(() => {
    if (document.querySelector(".entity-result__actions")) {
      const send = document.querySelectorAll<HTMLElement>(
        ".artdeco-button.ml1"
      )[0];
      console.log(send);

      if (send.innerText === "Send") {
        send.click();
      }
    }
  });

  connectBtn.forEach((btn, index) => {
    // first click the connect button, the wait for the modal to appear, then click the send button
    if (btn.innerText === "Connect") {
      setTimeout(() => {
        btn.click();
      }, index * 1000);
    } else {
      console.log("not connect");
    }
  });

  observer.observe(
    document.querySelector("#artdeco-modal-outlet") as HTMLElement,
    {
      childList: true,
      subtree: true,
    }
  );
}
