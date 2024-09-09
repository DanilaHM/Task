const canvas = document.getElementById('basketballCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 30;
let x = canvas.width / 2;
let y = canvas.height - ballRadius;
let dx = 2;
let dy = -2;
let gravity = 0.1;
let friction = 0.99;
let rotation = 0;
let rotationSpeed = 0.1;
let isAnimating = false;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // очищаем всё
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.translate(-x, -y);

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawBallPattern();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
}

function drawBallPattern() {
    // Рисуем черные швы
    for (let i = 0; i < 8; i++) {
        let angle = (Math.PI / 4) + (i * (Math.PI / 4));
        let startX = x + ballRadius * Math.cos(angle);
        let startY = y + ballRadius * Math.sin(angle);
        let endX = x - ballRadius * Math.cos(angle);
        let endY = y - ballRadius * Math.sin(angle);
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(x, y, endX, endY); // Используем квадратичные кривые для создания дугообразных швов
    }
}

function animate() {
    if (!isAnimating) return;
    
    drawBall();
    
    x += dx;
    y += dy;
    dy += gravity;
    rotation += rotationSpeed;

    if (y + ballRadius > canvas.height) {
        y = canvas.height - ballRadius;
        dy *= -friction;
        rotationSpeed *= friction;
    }

    if (x + ballRadius > canvas.width || x - ballRadius < 0) {
        dx *= -1;
    }

    requestAnimationFrame(animate);
}

canvas.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
});

canvas.addEventListener('dblclick', () => {
    isAnimating = false;
});

drawBall();