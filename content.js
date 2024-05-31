// content.js

// Wait for the page to fully load before scraping
window.addEventListener('load', () => {
  // Scrape the required data
  const name = document.querySelector('.pv-top-card-section__name').innerText.trim();
  const location = document.querySelector('.pv-top-card-section__location').innerText.trim();
  const about = document.querySelector('.pv-about-section .pv-about__summary-text').innerText.trim();
  const bio = document.querySelector('.pv-about-section .pv-about__summary').innerText.trim();
  const followerCount = document.querySelector('.pv-recent-activity-section-v2 .pv-recent-activity-section-v2__follower-count').innerText.trim();
  const connectionCount = document.querySelector('.pv-top-card-v2-section__connections .pv-top-card-v2-section__connections-count').innerText.trim();

  // Create an object with the scraped data
  const profileData = {
      name,
      location,
      about,
      bio,
      followerCount,
      connectionCount
  };

  // Send the scraped data to the background script
  chrome.runtime.sendMessage({ action: 'scrapedData', data: profileData });
});
