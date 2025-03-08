// Ambil elemen musik dan tombol
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

// Fungsi untuk Play/Pause Musik
musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "⏸ Pause Music"; // Ubah teks tombol
    } else {
        music.pause();
        musicBtn.textContent = "🎶 Play Music";
    }
});

// Efek Lilin Ditiup
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");

candle.addEventListener("click", () => {
    flame.style.display = "none";
    setTimeout(() => {
        flame.style.display = "block";
    }, 3000); // Lilin menyala kembali setelah 3 detik
});

// Efek Confetti Baru
const confettiBtn = document.getElementById("confetti-btn");

function launchConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        confettiContainer.appendChild(confetti);
    }

    // Hapus confetti setelah beberapa detik
    setTimeout(() => {
        confettiContainer.remove();
    }, 4000);
}

// Fungsi untuk mendapatkan warna acak
function getRandomColor() {
    const colors = ["#ff4757", "#2ed573", "#1e90ff", "#ffcc00", "#ff6b81"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Jalankan confetti saat tombol ditekan
confettiBtn.addEventListener("click", launchConfetti);

// Jalankan confetti otomatis saat halaman dimuat
window.addEventListener("load", launchConfetti);

// SWIPE GESTURE UNTUK GALERI FOTO
const slider = document.getElementById("photo-slider");
const container = document.getElementById("photo-container");
let isDown = false;
let startX, scrollLeft;

// Event Listener untuk Drag dengan Mouse
slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Sensitivitas drag
    slider.scrollLeft = scrollLeft - walk;
});

// Event Listener untuk Swipe di HP
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Seberapa jauh harus swipe untuk pindah gambar
    if (touchStartX - touchEndX > threshold) {
        // Geser ke kanan
        slider.scrollLeft += slider.clientWidth;
    } else if (touchEndX - touchStartX > threshold) {
        // Geser ke kiri
        slider.scrollLeft -= slider.clientWidth;
    }
}
