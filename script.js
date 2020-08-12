// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// EventListeners
addEventListener('resize', () => {
canvas.width = innerWidth;
canvas.height = innerHeight;

c.fillStyle = '#204060';
c.fillRect(0, 0, canvas.width, canvas.height);
drawAxis();
drawCircle();
});

// Utillities

border = 30;

r = 300;

points = [];

inCount = 0;
allCount = 0;

// Objects

function drawAxis() {

    c.beginPath();
    c.strokeStyle = '#ffffff';
    c.moveTo(innerWidth / 2, innerHeight / 2 - 300);
    c.lineTo(innerWidth / 2, innerHeight / 2 + 300);
    c.moveTo(innerWidth / 2 - 300, innerHeight / 2);
    c.lineTo(innerWidth / 2 + 300, innerHeight / 2);
    c.rect(innerWidth / 2 - r, innerHeight / 2 - r, r * 2, r * 2)
    c.stroke();
}

function drawCircle() {

    c.beginPath();
    c.arc(innerWidth / 2, innerHeight / 2, r, 0, 2 * Math.PI, false);
    c.strokeStyle = '#ff9999';
    c.stroke();
}

function Point(x, y, type) {
        
    this.x = x;
    this.y = y;
    this.type = type;

    this.distCenter = () => {

        return Math.sqrt(Math.pow(innerWidth / 2 - this.x, 2) + Math.pow(innerHeight / 2 - this.y, 2));
    }
}

function createNewPoint() {

    p = new Point(Math.round(innerWidth / 2 - r + 2 * r * Math.random()), Math.round(innerHeight / 2 - r + 2 * r * Math.random()), null);
    p.distCenter() <= r ? (p.type = true, inCount++) : (p.type = false);
    allCount++;
    drawPoint(p);
}

function drawPoint(p) {
        c.beginPath();
        p.type ? c.fillStyle = '#ff9999' : c.fillStyle = '#0099cc';
        c.arc(p.x, p.y, 2, 0, 2 * Math.PI, false);
        c.fill();
        c.closePath();
}

function drawPointCounter() {

    c.font = "20px Century Gothic";
    c.fillStyle = '#ff9999';
    c.fillText("inside: " + inCount, border, border);
    c.fillStyle = '#ffffff';
    c.fillText("all: " + allCount, border, border * 2)
}

function drawPiCalculation() {

    c.font = "20px Century Gothic";
    c.fillStyle = '#ffcc66';
    c.fillText("π = (inside × 4) / all = " + inCount * 4 / allCount, border * 8, border);
}

// Animation Loop

c.fillStyle = '#204060';
c.fillRect(0, 0, canvas.width, canvas.height);
drawAxis();
drawCircle();

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, border * 2);

    c.fillStyle = '#204060';
    c.fillRect(0, 0, canvas.width, border * 2);
    
    createNewPoint();
    drawPointCounter();
    drawPiCalculation();
}

animate();
