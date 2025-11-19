const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const heartsContainer = document.getElementById('heartsContainer');

let noClickCount = 0;
let lastMoveTime = 0;

const messages = [
    'tuana beni seviyor musun?',
    'lütfen sev',
    'sevmen lazım ama',
    'cidden',
    'bak hala devam ediyo',
    'EVETE BASSANA İŞTE',
    'cok inatsın',
    'cidden sevmiyon mu beni',
    'basma artık of',
    'evete baaaasss söz evimizi kedi doldurcm'
];

let heartColumns = [10, 25, 40, 55, 70, 85];
let currentColumn = 0;

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
    
    heart.style.left = heartColumns[currentColumn] + '%';
    currentColumn = (currentColumn + 1) % heartColumns.length;
    
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 1 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 12000);
}

let mainHeartInterval = setInterval(createHeart, 500);

for (let i = 0; i < heartColumns.length; i++) {
    setTimeout(createHeart, i * 400);
}

yesBtn.style.zIndex = '9999';

let heartBurstInterval = null;

function createButtonHeart() {
    if (!yesBtn) return;
    const btnRect = yesBtn.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.classList.add('button-heart');
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
    
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;
    
    heart.style.position = 'fixed';
    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';
    heart.style.fontSize = '25px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9998';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance - 50;
    
    document.body.appendChild(heart);
    
    const animation = heart.animate([
        {
            transform: 'translate(0, 0) scale(0.5)',
            opacity: 1
        },
        {
            transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1.2)`,
            opacity: 0
        }
    ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => heart.remove();
}

yesBtn.addEventListener('mouseenter', () => {
    if (!heartBurstInterval) {
        heartBurstInterval = setInterval(() => {
            createButtonHeart();
            setTimeout(createButtonHeart, 50);
        }, 200);
    }
});

yesBtn.addEventListener('mouseleave', () => {
    if (heartBurstInterval) {
        clearInterval(heartBurstInterval);
        heartBurstInterval = null;
    }
});

yesBtn.addEventListener('click', () => {
    if (heartBurstInterval) {
        clearInterval(heartBurstInterval);
        heartBurstInterval = null;
    }
    if (mainHeartInterval) {
        clearInterval(mainHeartInterval);
        mainHeartInterval = null;
    }
    
    document.body.innerHTML = `
        <style>
            body {
                background: #ffc0cb;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes fall {
                0% {
                    top: -10%;
                    opacity: 1;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    top: 100%;
                    opacity: 0.5;
                }
            }
            .celebration-container {
                animation: fadeIn 0.5s ease-out;
            }
            .heart {
                position: absolute;
                font-size: 30px;
                opacity: 0;
                animation: fall linear infinite;
            }
        </style>
        <div class="hearts-container" id="heartsContainerFinal" style="overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></div>
        <div style="text-align: center; padding: 40px; max-width: 500px; width: 90%; z-index: 2; position: relative; background: white; border-radius: 20px; border: 8px solid #ff69b4; box-shadow: 0 10px 40px rgba(255, 105, 180, 0.3); margin: 0 auto;" class="celebration-container">
            <h1 style="color: #dc143c; font-size: 2.5rem; margin-bottom: 20px; font-family: 'Comic Sans MS', cursive;">SONUNDA BE</h1>
            <img src="jumping_cat.gif" style="width: 250px; height: auto; border-radius: 15px; margin: 20px auto; display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <p style="font-size: 1.5rem; color: #ff69b4; font-family: 'Comic Sans MS', cursive; margin-top: 20px;">beni sevdigini biliyodum 💗</p>
        </div>
    `;
    
    const finalContainer = document.getElementById('heartsContainerFinal');
    let finalColumns = [10, 25, 40, 55, 70, 85];
    let finalCurrentColumn = 0;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
        heart.style.left = finalColumns[finalCurrentColumn] + '%';
        finalCurrentColumn = (finalCurrentColumn + 1) % finalColumns.length;
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        finalContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 12000);
    }, 500);
});

noBtn.style.zIndex = '10';

function getRandomPosition() {
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const margin = 40;
    
    const positions = [
        { top: margin + 'px', left: margin + 'px' },
        { top: margin + 'px', left: (windowWidth - btnWidth - margin) + 'px' },
        { top: (windowHeight - btnHeight - margin) + 'px', left: margin + 'px' },
        { top: (windowHeight - btnHeight - margin) + 'px', left: (windowWidth - btnWidth - margin) + 'px' },
        { top: (windowHeight / 2 - btnHeight / 2) + 'px', left: margin + 'px' },
        { top: (windowHeight / 2 - btnHeight / 2) + 'px', left: (windowWidth - btnWidth - margin) + 'px' },
        { top: margin + 'px', left: (windowWidth / 2 - btnWidth / 2) + 'px' },
        { top: (windowHeight - btnHeight - margin) + 'px', left: (windowWidth / 2 - btnWidth / 2) + 'px' }
    ];
    
    return positions[Math.floor(Math.random() * positions.length)];
}

function checkMouseProximity(e) {
    const now = Date.now();
    if (now - lastMoveTime < 300) return;
    
    const btnRect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX || (e.touches && e.touches[0].clientX);
    const mouseY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (!mouseX || !mouseY) return;
    
    const proximityThreshold = 50;
    
    const distance = Math.sqrt(
        Math.pow(mouseX - (btnRect.left + btnRect.width / 2), 2) +
        Math.pow(mouseY - (btnRect.top + btnRect.height / 2), 2)
    );
    
    if (distance < proximityThreshold) {
        lastMoveTime = now;
        noClickCount++;
        
        noBtn.classList.add('moved');
        
        if (noClickCount < messages.length) {
            message.textContent = messages[noClickCount];
        }
        
        const newPos = getRandomPosition();
        
        noBtn.style.top = newPos.top;
        noBtn.style.left = newPos.left;
        noBtn.style.bottom = 'auto';
        noBtn.style.right = 'auto';
        noBtn.style.zIndex = '10';
    }
}

document.addEventListener('mousemove', checkMouseProximity);
document.addEventListener('touchmove', checkMouseProximity);

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
});
