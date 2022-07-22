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


  connectBtn.forEach((btn, index) => {
    // first click the connect button, the wait for the modal to appear, then click the send button
    if (btn.innerText === "Connect") {
      setTimeout(() => {
        btn.click();
      }, index * 5000);

      setTimeout(() => {
        const send = document.querySelectorAll<HTMLElement>(
          ".artdeco-modal__actionbar .ml1"
        )[0];
        send.click();
      }, index * 5000 + 1000);
    } else {
      console.log("not connect");
    }
  });
}
