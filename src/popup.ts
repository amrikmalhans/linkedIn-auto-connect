// Initialize button with user's preferred color
const upVote = document.getElementById("upvote");

upVote!.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: voteUp,
  });
});

function voteUp(): void {
  const voteUpBtn = document.querySelectorAll<HTMLElement>(
    ".entity-result__actions .artdeco-button"
  );

  voteUpBtn[0].click();

  setTimeout(() => {
    const upVote = document.querySelectorAll<HTMLElement>(
      ".artdeco-modal__actionbar .ml1"
    );
    upVote[0].click();
  }, 500);

}
