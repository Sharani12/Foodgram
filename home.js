document.addEventListener('DOMContentLoaded', () => {
    const recentRestaurantsList = document.getElementById('recent-restaurants-list');
    const suggestionsList = document.getElementById('suggestions-list');
  
    // Fetch recent restaurants
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => {
        data.forEach((item, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          recentRestaurantsList.appendChild(listItem);
        });
      });
  
    // Fetch suggestions (assuming a similar endpoint exists)
    fetch('http://localhost:3000/suggestions')
      .then(response => response.json())
      .then(data => {
        data.forEach((item, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          suggestionsList.appendChild(listItem);
        });
      });
  });
  