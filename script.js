async function loadGallery() {
  const gallery = document.getElementById('gallery');

  try {
    const response = await fetch('projects.txt');
    const text = await response.text();
    const lines = text.trim().split('\n');

    lines.forEach((line, index) => {
      const [filename, url] = line.split('|');

      if (!filename || !url) return;

      const card = document.createElement('a');
      card.href = url;
      card.className = 'card';
      card.target = '_blank';

      card.innerHTML = `
        <img src="images/${filename.trim()}" alt="Project ${index + 1}">
        <div class="card-text">Visit Project ${index + 1}</div>
      `;

      gallery.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
    gallery.innerHTML = "<p style='color: red;'>Failed to load projects.</p>";
  }
}

loadGallery();
