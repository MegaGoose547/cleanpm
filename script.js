async function loadGallery() {
  const gallery = document.getElementById('gallery');

  try {
    const response = await fetch('projects.txt');
    const text = await response.text();
    const lines = text.trim().split('\n').reverse(); // Newest first

    lines.forEach((line, index) => {
      const parts = line.split('|');
      if (parts.length < 2) return;

      const filename = parts[0].trim();
      const url = parts[1].trim();
      const customText = parts[2]?.trim() || `Visit Project ${index + 1}`;

      const card = document.createElement('a');
      card.href = url;
      card.className = 'card';
      card.target = '_blank';

      card.innerHTML = `
        <img src="images/${filename}" alt="${customText}">
        <div class="card-text">${customText}</div>
      `;

      gallery.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
    gallery.innerHTML = "<p style='color: red;'>Failed to load projects.</p>";
  }
}

loadGallery();
