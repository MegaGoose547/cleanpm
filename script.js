let projects = [];
let sortNewestFirst = true;

async function loadGallery() {
  const gallery = document.getElementById('gallery');
  const randomBtn = document.getElementById('random-btn');
  const sortNewestBtn = document.getElementById('sort-newest');
  const sortOldestBtn = document.getElementById('sort-oldest');

  try {
    const response = await fetch('projects.txt');
    const text = await response.text();
    const lines = text.trim().split('\n');

    projects = lines.map((line) => {
      const [filename, url, customText] = line.split('|');
      return {
        filename: filename?.trim(),
        url: url?.trim(),
        text: customText?.trim() || '',
      };
    }).filter(p => p.filename && p.url);

    renderGallery();

    // Random button
    randomBtn.addEventListener('click', () => {
      if (projects.length === 0) return;
      const random = projects[Math.floor(Math.random() * projects.length)];
      window.open(random.url, '_blank');
    });

    // Sort buttons
    sortNewestBtn.addEventListener('click', () => {
      sortNewestFirst = true;
      renderGallery();
    });

    sortOldestBtn.addEventListener('click', () => {
      sortNewestFirst = false;
      renderGallery();
    });

  } catch (err) {
    console.error("Failed to load gallery:", err);
    gallery.innerHTML = "<p style='color: red;'>Failed to load projects.</p>";
  }
}

function renderGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear current gallery

  const list = sortNewestFirst ? [...projects].reverse() : [...projects];

  list.forEach((proj, index) => {
    const card = document.createElement('a');
    card.href = proj.url;
    card.className = 'card';
    card.target = '_blank';

    const displayText = proj.text || `Visit Project ${index + 1}`;

    card.innerHTML = `
      <img src="images/${proj.filename}" alt="${displayText}">
      <div class="card-text">${displayText}</div>
    `;

    gallery.appendChild(card);
  });
}

loadGallery();
