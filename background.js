chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'automate') {
        chrome.tabs.create({ url: 'https://www.linkedin.com/feed/' }, (tab) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: automateLinkedIn,
                        args: [request.likeCount, request.commentCount]
                    });
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    }
});

function automateLinkedIn(likeCount, commentCount) {
    const observer = new MutationObserver(() => {
        const posts = document.querySelectorAll('.feed-shared-update-v2');

        function getRandomIndexes(count, max) {
            const indexes = new Set();
            while (indexes.size < count) {
                indexes.add(Math.floor(Math.random() * max));
            }
            return Array.from(indexes);
        }

        const likeIndexes = getRandomIndexes(likeCount, posts.length);
        const commentIndexes = getRandomIndexes(commentCount, posts.length);

        likeIndexes.forEach(index => {
            const likeButton = posts[index].querySelector('button[aria-label*="Like"]');
            if (likeButton) {
                likeButton.click();
            }
        });

        commentIndexes.forEach(index => {
            const commentButton = posts[index].querySelector('button[aria-label*="Comment"]');
            if (commentButton) {
                commentButton.click();
                setTimeout(() => {
                    const commentBox = posts[index].querySelector('.comments-comment-box__editor');
                    const postButton = posts[index].querySelector('button.comments-comment-box__submit-button');
                    if (commentBox && postButton) {
                        commentBox.innerText = 'CFBR';
                        commentBox.dispatchEvent(new Event('input', { bubbles: true }));
                        postButton.click();
                    }
                }, 1000); // Delay to allow the comment box to open
            }
        });

        // Disconnect the observer after performing actions
        observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial trigger to handle already loaded posts
    observer.takeRecords();
}

