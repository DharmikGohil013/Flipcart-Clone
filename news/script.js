const API_KEY = '3039a48e289b4a978499d2a28d40a748'; // Your API key
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
const BASE_URL = `https://newsapi.org/v2/everything?q=*&from=${today}&to=${today}&sortBy=publishedAt&apiKey=${API_KEY}`;

const newsContainer = document.getElementById('news-container');
const modal = document.getElementById('news-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const readMoreLink = document.getElementById('read-more');
const closeModal = document.querySelector('.close-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Fetch Today's News Data
async function fetchNews() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        if (data.articles.length > 0) {
            renderNews(data.articles);
        } else {
            newsContainer.innerHTML = `<p>No news articles found for today.</p>`;
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `<p>Failed to fetch news. Please try again later.</p>`;
    }
}

// Render News Cards
function renderNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
        `;
        newsCard.addEventListener('click', () => openModal(article));
        newsContainer.appendChild(newsCard);
    });
}

// Open Modal with News Details
function openModal(article) {
    modalTitle.innerText = article.title;
    modalContent.innerText = article.content || 'Full content not available.';
    readMoreLink.href = article.url;
    modal.style.display = 'flex';
}

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Toggle Hamburger Menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Initialize
fetchNews();
