// tabs.js
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-pane");

  function switchTab(tabId) {
    tabButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tabId);
    });

    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === `${tabId}-content`);
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      switchTab(tabId);
      loadMarkdownContent(tabId);
    });
  });

  async function loadMarkdownContent(tabId) {
    const contentElement = document.getElementById(`${tabId}-content`);
    try {
      const response = await fetch(`${tabId}.md`);
      const markdown = await response.text();
      const html = marked.parse(markdown);
      contentElement.innerHTML = html;
    } catch (error) {
      console.error("Error loading Markdown content:", error);
      contentElement.innerHTML =
        "<p>Error loading content. Please try again later.</p>";
    }
  }

  // Load initial content
  loadMarkdownContent("readme");
});
