/* ===============================
   1. DATA GALERI STATIS
================================= */
const galleryData = [
    { type: 'img', src: 'img/Black White.png', title: 'Senja Pantai', date: '12 Jan 2026', desc: 'Momen ketenangan saat matahari terbenam.' },
    { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Big Buck Bunny', date: '15 Jan 2026', desc: 'Video animasi pendek kualitas tinggi.' },
    { type: 'img', src: 'img/Black White.png', title: 'Hutan Berkabut', date: '20 Feb 2026', desc: 'Suasana magis hutan pinus di pagi hari.' },
    { type: 'img', src: 'img/Black White.png', title: 'Cahaya Alam', date: '22 Feb 2026', desc: 'Sinar matahari menembus celah pepohonan.' }
];


/* ===============================
   2. RENDER GALERI
================================= */
function renderGallery(filterType = 'all') {
    const container = document.getElementById('gallery-container');
    container.innerHTML = '';

    const filtered = filterType === 'all'
        ? galleryData
        : galleryData.filter(item => item.type === filterType);

    if (filtered.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; width:100%; opacity:0.5; padding:20px;">
                Tidak ada konten.
            </p>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.addEventListener('click', () => openLightbox(item.type, item.src));

        card.innerHTML = `
        <div class="media-wrapper">
            ${item.type === 'img' ? 
                `<img src="${item.src}" alt="${item.title}" loading="lazy">` : 
                `<video 
                    src="${item.src}" 
                    loop 
                    autoplay 
                    muted 
                    playsinline 
                    preload="metadata"
                    controlslist="nodownload noremoteplayback"
                    disablepictureinpicture>
                </video>`}
            <div class="date-badge">${item.date}</div>
        </div>
        <div class="info">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `;
        container.appendChild(card);
    });

    container.scrollLeft = 0;
}


/* ===============================
   3. FILTER MEDIA
================================= */
function filterMedia(type, event) {
    document.querySelectorAll('.filter-btn')
        .forEach(btn => btn.classList.remove('active'));

    if (event) event.target.classList.add('active');

    renderGallery(type);
}


/* ===============================
   DARK MODE SYSTEM (FULL)
================================= */

// Jalankan saat halaman selesai load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        const icon = document.getElementById("theme-icon");
        if (icon) icon.innerText = "light_mode";
    }
});

// Toggle Theme
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    if (themeIcon) {
        themeIcon.innerText = isDark ? "light_mode" : "dark_mode";
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
}


/* ===============================
   5. LIGHTBOX
================================= */
function openLightbox(type, src) {
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightbox-content');

    content.innerHTML = type === 'img'
        ? `<img src="${src}">`
        : `<video 
                src="${src}" 
                controls 
                autoplay 
                loop 
                playsinline>
           </video>`;

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-content').innerHTML = '';
    document.body.style.overflow = 'auto';
}


/* ===============================
   6. MOBILE MENU
================================= */
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}


/* ===============================
   7. SMART AUTOPLAY (Pause jika tab tidak aktif)
================================= */
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');

    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        videos.forEach(video => {
            if (video.hasAttribute('loop')) {
                video.play();
            }
        });
    }
});


/* ===============================
   8. INIT SAAT LOAD
================================= */
document.addEventListener('DOMContentLoaded', () => {
    renderGallery('all');

    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.innerText = 'light_mode';
    }
});