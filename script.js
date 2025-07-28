async function loadGallery() {
  const gallery = document.getElementById('gallery');

  // Fetch project links
  const response = await fetch('projects.txt');
  const text = await response.text();
  const links = text.trim().split('\n');

  // Assume images are named img1.jpg, img2.jpg, etc.
  links.forEach((url, index) => {
    const imgIndex = index + 1;
    const imgPath = `images/img${imgIndex}.jpg`;

    const card = document.createElement('a');
    card.href = url;
    card.className = 'card';
    card.target = '_blank';

    card.innerHTML = `
      <img src="${imgPath}" alt="Project ${imgIndex}">
      <div class="card-text">Visit Project ${imgIndex}</div>
    `;

    gallery.appendChild(card);
  });
}

loadGallery();
