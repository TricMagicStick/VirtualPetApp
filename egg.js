// egg.js - v4.50 Procedural Egg Hatching System
let activeCracks = [];
let eggShake = 0;

function spawnSeedCracks() {
    activeCracks = [];
    activeCracks.push({ x: 82, y: 68, angle: -0.55, remainingLength: 42, thickness: 1.9, depth: 0 });
    activeCracks.push({ x: 118, y: 72, angle: 0.65, remainingLength: 38, thickness: 1.7, depth: 0 });
    if (Math.random() > 0.4) {
        activeCracks.push({ x: 98, y: 88, angle: 2.1, remainingLength: 28, thickness: 1.5, depth: 0 });
    }
}

function growCracks() {
    const newCracks = [];
    for (let i = activeCracks.length - 1; i >= 0; i--) {
        const c = activeCracks[i];
        if (c.remainingLength <= 0) { activeCracks.splice(i, 1); continue; }

        const grow = 2.4 + Math.random() * 0.7;
        const nx = c.x + Math.cos(c.angle) * grow;
        const ny = c.y + Math.sin(c.angle) * grow;

        eggCtx.strokeStyle = '#854d0e';
        eggCtx.lineWidth = c.thickness;
        eggCtx.lineCap = 'round';
        eggCtx.beginPath();
        eggCtx.moveTo(c.x, c.y);
        eggCtx.lineTo(nx, ny);
        eggCtx.stroke();

        c.x = nx; c.y = ny;
        c.remainingLength -= grow;
        c.thickness = Math.max(0.9, c.thickness - 0.07);

        if (c.depth < 2 && c.remainingLength > 10 && Math.random() < 0.25) {
            newCracks.push({
                x: c.x, y: c.y,
                angle: c.angle + (Math.random() - 0.5) * 1.2,
                remainingLength: c.remainingLength * 0.6,
                thickness: Math.max(0.9, c.thickness * 0.82),
                depth: c.depth + 1
            });
        }
    }
    activeCracks.push(...newCracks);
}

function drawEggBase(shakeX = 0) {
    eggCtx.clearRect(0, 0, eggCanvas.width, eggCanvas.height);
    const cx = 100 + shakeX;
    const cy = 100;

    eggCtx.fillStyle = 'rgba(0,0,0,0.3)';
    eggCtx.beginPath();
    eggCtx.ellipse(cx, cy + 55, 55, 18, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.fillStyle = '#fefce8';
    eggCtx.beginPath();
    eggCtx.ellipse(cx, cy, 48, 62, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.fillStyle = '#e7e5d9';
    eggCtx.beginPath();
    eggCtx.ellipse(cx + 12, cy, 36, 58, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.fillStyle = '#fefce8';
    eggCtx.beginPath();
    eggCtx.ellipse(cx - 18, cy - 20, 18, 24, 0, 0, Math.PI * 2);
    eggCtx.fill();
}

function hatchAnimation() {
    if (eggAnimating) return;
    eggAnimating = true;
    activeCracks = [];
    eggShake = 0;
    spawnSeedCracks();

    let ticks = 0;
    const maxTicks = 36;

    const interval = setInterval(() => {
        ticks++;
        eggShake = Math.sin(ticks * 1.4) * 1.6;

        drawEggBase(eggShake);
        growCracks();

        if (ticks >= maxTicks || activeCracks.length === 0) {
            clearInterval(interval);
            eggShake = 0;
            drawEggBase(0);

            setTimeout(() => {
                hasHatched = true;
                currentStage = 0;
                lastEvolutionAge = 0;

                const rand = Math.random();
                let randomPet = (rand < 0.2) ? 'flick' : (rand < 0.4) ? 'puff' : (rand < 0.6) ? 'bud' : (rand < 0.8) ? 'bolt' : 'ceph';
                localStorage.setItem('hatchedPetType', randomPet);

                const eggScreen = document.getElementById('egg-screen');
                const petScreen = document.getElementById('pet-screen');

                eggScreen.style.transition = 'opacity 160ms ease';
                eggScreen.style.opacity = '0';

                setTimeout(() => {
                    eggScreen.style.display = 'none';
                    eggScreen.style.opacity = '1';
                    eggScreen.style.transition = '';
                    petScreen.style.display = 'block';

                    drawPet('happy', 0, 0);
                    updateUI();
                    startDecay();
                    requestAnimationFrame(animate);
                    eggAnimating = false;
                }, 160);
            }, 380);
        }
    }, 33);