// main.js

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let halfCirclePosition = 0;

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function fadeIn(element) {
    if (element.alpha < 1) {
        element.alpha += 0.01;
    }
}

setCanvasSize();

const numDots = 50;
const dots = [];

for (let i = 0; i < numDots; i++) {
    dots.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        depth: Math.random() * 100,
        radius: 2 + Math.random(),
        angle: Math.random() * (2 * Math.PI),
        speed: Math.random(),
        distance: 50 + Math.random() * 100,
        trail: [],
        trailLength: Math.random() * 100,
        alpha: 0,
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fadeIn({});

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, Math.PI + halfCirclePosition, Math.PI * 2 + halfCirclePosition);
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(255, 165, 0, ${dots[0].alpha})`;
    ctx.stroke();

    halfCirclePosition += 0.005;

    for (let i = 0; i < numDots; i++) {
        fadeIn(dots[i]);

        dots[i].angle += dots[i].speed;
        dots[i].x = centerX + dots[i].distance * Math.cos(dots[i].angle);
        dots[i].y = centerY + dots[i].distance * Math.sin(dots[i].angle);

        dots[i].trail.push({ x: dots[i].x, y: dots[i].y });

        ctx.fillStyle = `rgba(0, 255, 255, ${dots[i].alpha})`;
        for (let j = 0; j < dots[i].trail.length; j++) {
            const sizeFactor = 1 - dots[i].depth / 100;
            const scaledRadius = dots[i].radius * sizeFactor;
            ctx.beginPath();
            ctx.arc(dots[i].trail[j].x, dots[i].trail[j].y, scaledRadius, 0, 2 * Math.PI);
            ctx.fill();
        }

        if (dots[i].trail.length > dots[i].trailLength) {
            dots[i].trail.shift();
        }

        const sizeFactor = 1 - dots[i].depth / 100;
        const scaledRadius = dots[i].radius * sizeFactor;
        ctx.fillStyle = `rgba(0, 0, 0, ${dots[i].alpha})`;
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, scaledRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', function () {
    setCanvasSize();

    for (let i = 0; i < numDots; i++) {
        dots[i].x = canvas.width / 2;
        dots[i].y = canvas.height / 2;
        dots[i].depth = Math.random() * 100;
        dots[i].trail.length = 0;
        dots[i].alpha = 0;
    }

    draw();
});
