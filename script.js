const pattern = [
    "      00000     00000      ",
    "    000000000 000000000    ",
    "   000000000000000000000   ",
    "  00000000000000000000000  ",
    "  00000000000000000000000  ",
    "   000000000000000000000   ",
    "    0000000000000000000    ",
    "     00000000000000000     ",
    "      000000000000000      ",
    "       0000000000000       ",
    "        00000000000        ",
    "         000000000         ",
    "          0000000          ",
    "           00000           ",
    "            000            ",
    "             0             "
];

const hearts = [];
const startX = 360;
const startY = 80;
const cellSize = 18;

// Parse the pattern to get target coordinates for each small heart
for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
        if (pattern[r][c] === '0') {
            hearts.push({
                x: startX + c * cellSize,
                y: startY + r * cellSize
            });
        }
    }
}

// Origin position (tip of the character's finger)
const originX = 330;
const originY = 260;

const container = document.getElementById('heartContainer');
const loveText = document.getElementById('loveText');
let currentIndex = 0;

function shootHearts() {
    if (currentIndex >= hearts.length) {
        // Animation finished, show the text
        setTimeout(() => {
            loveText.classList.add('show');
        }, 500);
        return;
    }

    const target = hearts[currentIndex];

    const heart = document.createElement('div');
    heart.className = 'small-heart';
    heart.innerHTML = '❤️'; // Little heart emoji

    // Style adjustments for correct sizing
    heart.style.fontSize = '14px';
    heart.style.lineHeight = '14px';
    heart.style.width = '14px';
    heart.style.height = '14px';

    // Set initial position at character's hand
    heart.style.left = originX + 'px';
    heart.style.top = originY + 'px';

    container.appendChild(heart);

    // Force a reflow to ensure the transition happens
    void heart.offsetWidth;

    // Move heart to its destination
    heart.style.opacity = '1';
    heart.style.left = target.x + 'px';
    heart.style.top = target.y + 'px';

    currentIndex++;

    // Shoot next heart quickly (25ms delay)
    setTimeout(shootHearts, 25);
}

// Wait for SVG line drawing animation to complete (approx 2.4s) before starting to shoot hearts
window.onload = () => {
    setTimeout(() => {
        shootHearts();
    }, 2800);
};
