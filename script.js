function showSurprise() {
    document.getElementById("surprise").style.display = "block";
}

// Auto play nhạc khi chạm vào màn hình (fix iPhone không auto-play)
document.addEventListener("click", function() {
    let music = document.getElementById("background-music");
    if (music.paused) {
        music.play().catch(error => console.log("iOS autoplay policy blocked:", error));
    }
});

// Hiệu ứng trái tim bay
setInterval(() => {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}, 500);
