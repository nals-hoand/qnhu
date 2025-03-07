document.getElementById("magicButton").addEventListener("click", function () {
    let surpriseDiv = document.getElementById("surprise");
    surpriseDiv.classList.remove("hidden");
    // scroll to the bottom
    window.scrollTo(0, document.body.scrollHeight);

    // Giới hạn số lượng trái tim bay lên
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            let heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.top = "100vh";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 200); // Xuất hiện dần dần
    }

    startFireworks();
});

// Fix iPhone không tự động phát nhạc
document.addEventListener("click", function() {
    let music = document.getElementById("background-music");
    if (music.paused) {
        music.play().catch(error => console.log("iOS autoplay policy blocked:", error));
    }
});

// **Pháo hoa nổ trên cao**
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.4; // Giới hạn chỉ nổ ở phần trên

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height / 2); // Chỉ nổ ở trên
        this.size = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.lifespan = 30;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.lifespan--;
    }
}

let fireworksArray = [];

function startFireworks() {
    setInterval(() => {
        if (fireworksArray.length < 10) {
            fireworksArray.push(new Firework());
        }
    }, 200);

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworksArray.forEach((fw, index) => {
            fw.draw();
            fw.update();
            if (fw.lifespan <= 0) {
                fireworksArray.splice(index, 1);
            }
        });
        requestAnimationFrame(animateFireworks);
    }
    animateFireworks();
}
