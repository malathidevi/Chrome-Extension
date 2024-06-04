document.addEventListener('DOMContentLoaded', function () {
    const likeCountInput = document.getElementById('likeCount');
    const commentCountInput = document.getElementById('commentCount');
    const automateButton = document.getElementById('automateButton');
document.getElementById('getTitleButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log(activeTab)
          
        const title = activeTab.title;
        document.getElementById('demo').textContent = "Current Tab Title is: "
          document.getElementById('title').textContent = title;
        });
      });
    function toggleButtonState() {
        automateButton.disabled = !(likeCountInput.value && commentCountInput.value);
    }

    likeCountInput.addEventListener('input', toggleButtonState);
    commentCountInput.addEventListener('input', toggleButtonState);

    automateButton.addEventListener('click', function () {
        const likeCount = parseInt(likeCountInput.value, 10);
        const commentCount = parseInt(commentCountInput.value, 10);

        chrome.runtime.sendMessage({ action: 'automate', likeCount, commentCount });

        chrome.tabs.create({ url: 'https://www.linkedin.com/feed/' });
    });

    getTitleButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id },
                        function: () => document.title
                    },
                    (results) => {
                        if (results && results[0] && results[0].result) {
                            titleDiv.textContent = 'Title: ' + results[0].result;
                        } else {
                            titleDiv.textContent = 'Could not retrieve title';
                        }
                    }
                );
            }
        });
    });

    // Initialize the button state on load
    toggleButtonState();
});
