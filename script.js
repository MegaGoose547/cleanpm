let projects = [];
let sortNewestFirst = true;

const supabaseUrl = 'https://ubrsdotiwcmiyznvzhcw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnNkb3Rpd2NtaXl6bnZ6aGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODEwMzksImV4cCI6MjA2OTU1NzAzOX0.n5p9dxhNv5u7GyvJ3e2xignsJDyOcBjsFWV6FCwxeVQ';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadGallery() {
  const gallery = document.getElementById('gallery');
  const randomBtn = document.getElementById('random-btn');
  const sortNewestBtn = document.getElementById('sort-newest');
  const sortOldestBtn = document.getElementById('sort-oldest');

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    console.log("Fetched data:", data);

    if (error) throw error;

    projects = data.map((p) => ({
      filename: p.filename,
      url: p.url,
      text: p.text || '',
      created_at: p.created_at,
    }));

    renderGallery();

    randomBtn.addEventListener('click', () => {
      if (projects.length === 0) return;
      const random = projects[Math.floor(Math.random() * projects.length)];
      window.open(random.url, '_blank');
    });

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
  gallery.innerHTML = '';

  const sorted = sortNewestFirst
    ? [...projects].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [...projects].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  sorted.forEach((proj, index) => {
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
