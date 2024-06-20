chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { likeCount, commentCount } = request;
  
    function getRandomElements(arr, count) {
      const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    function likePosts(posts, count) {
      const randomPosts = getRandomElements(posts, count);
      randomPosts.forEach(post => {
        const likeButton = post.querySelector('.react-button__trigger');
        if (likeButton) {
          likeButton.click();
        }
      });
    }
  
    function commentOnPosts(posts, count) {
      const randomPosts = getRandomElements(posts, count);
      randomPosts.forEach(post => {
        const commentButton = post.querySelector('.comments-comment-box__submit-button');
        if (commentButton) {
          commentButton.click();
          setTimeout(() => {
            const commentBox = post.querySelector('textarea.comments-comment-box__editor');
            const submitButton = post.querySelector('button.comments-comment-box__submit-button');
            if (commentBox && submitButton) {
              commentBox.value = 'CFBR';
              submitButton.removeAttribute('disabled');
              submitButton.click();
            }
          }, 1000);
        }
      });
    }
  
    window.addEventListener('load', () => {
      // Scrape the required data
      const name = document.querySelector('.pv-top-card-section__name').innerText.trim();
      const location = document.querySelector('.pv-top-card-section__location').innerText.trim();
      const about = document.querySelector('.pv-about-section .pv-about__summary-text').innerText.trim();
  
      // Create an object with the scraped data
      const profileData = {
        name,
        location,
        about,
      };
  
      // Send the scraped data to the background script
      chrome.runtime.sendMessage({ action: 'scrapedData', data: profileData });
  
      const posts = document.querySelectorAll('.occludable-update');
      likePosts(posts, likeCount);
      commentOnPosts(posts, commentCount);
  
      sendResponse({ status: 'completed' });
    });
  });
  
