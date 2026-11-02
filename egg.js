// egg.js - v4.81 Pixel egg hatching (was v4.50 procedural)
let activeCracks = [];
let eggShake = 0;
// v4.81 pixel-perfect egg: 48x48 PNG (TEMPORARY art by Chassis until Sable's egg lands),
// drawn 1:1 into the 56px backing set by pixel-fit.js; cracks are 1px on the same grid.
const EGG48_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABp0lEQVR4nO2ZwW3CMBSG/5SOEKlL9JhDJTaIStkBFmACDkzAArADbZUNkHrIsUPUUi7cC+mhelUUTGK/ZydRnU9Cigxx/t//syNsYGREROSj0zSJy3pblhdenuW0UxL+/vF59d3z0yMAf0bEpElcXr6/Wj+6dCSIR6Np1HUodcJyPgXgJo07aQeAuXhidzi6eCwAoYE0iUtb8cTucNROdlvYBiTiCRcmWAZ04qPJA0uA1MQ990aiKpyuy7OSdmuMdQIuSqfOertnpyCaxLfKhltOHKwM+Bh9gpuCk/dAnxgb8Dn6BCeFcBLQcWu5HPQyOjSMDDTVf3lWfyNeveZiOw+cJdBl2VQJo4SGzGigb0YDfWNkIMuLiPZ1fLNZLax2K8JIYMgYG+iijGzLBwgpAcBvCpzRB/5BAqzNVcnfS6VOV23L+ZS90RtmAsBvCuvtXiyAW/sEO4EsL6LNasG9HYBcPODwgMMmDTLu4oDDxXnVDADSJH4Fmo1UhL9Umt8kD7c1MGv7ARnRURPehLEpUwOtwj3RaiS4ZbSrJJyXUBNSU6JJPNI3PziEzpwozzGFAAAAAElFTkSuQmCC';
const eggImg48 = new Image();
eggImg48.onload = () => { try { if (eggCtx && !eggAnimating && !hasHatched) drawEggBase(0); } catch (e) {} };
eggImg48.src = EGG48_SRC;
let crackPixels = [];
const EGG_GRID = 0.28; // old 200px crack coords -> 56px grid

function spawnSeedCracks() {
    activeCracks = [];
    crackPixels = [];
    activeCracks.push({ x: 82, y: 68, angle: -0.55, remainingLength: 42, thickness: 1.9, depth: 0 });
    activeCracks.push({ x: 118, y: 72, angle: 0.65, remainingLength: 38, thickness: 1.7, depth: 0 });
    if (Math.random() > 0.4) {
        activeCracks.push({ x: 98, y: 88, angle: 2.1, remainingLength: 28, thickness: 1.5, depth: 0 });
    }
}

function drawCrackPixels(shakeX) {
    eggCtx.fillStyle = '#4a3414';
    for (const p of crackPixels) eggCtx.fillRect(p[0] + shakeX, p[1], 1, 1);
}

function growCracks() {
    const newCracks = [];
    for (let i = activeCracks.length - 1; i >= 0; i--) {
        const c = activeCracks[i];
        if (c.remainingLength <= 0) { activeCracks.splice(i, 1); continue; }

        const grow = 2.4 + Math.random() * 0.7;
        const nx = c.x + Math.cos(c.angle) * grow;
        const ny = c.y + Math.sin(c.angle) * grow;

        const px = Math.round(nx * EGG_GRID), py = Math.round(ny * EGG_GRID);
        if (!crackPixels.some(p => p[0] === px && p[1] === py)) crackPixels.push([px, py]);

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
    drawCrackPixels(Math.round(eggShake));
}

function drawEggBase(shakeX = 0) {
    shakeX = Math.round(shakeX);
    eggCtx.imageSmoothingEnabled = false;
    eggCtx.clearRect(0, 0, eggCanvas.width, eggCanvas.height);
    const ox = Math.round((eggCanvas.width - 48) / 2) + shakeX;
    const oy = Math.round((eggCanvas.height - 48) / 2);
    if (eggImg48.complete && eggImg48.naturalWidth) eggCtx.drawImage(eggImg48, ox, oy, 48, 48);
    drawCrackPixels(shakeX);
}

function initEgg() {
    drawEggBase(0);
    eggCanvas.onclick = () => {
        if (!eggAnimating) hatchAnimation();
    };
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
        eggShake = Math.round(Math.sin(ticks * 1.4));

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

                const hatchPool = ['flick', 'puff', 'bud', 'bolt', 'ceph', 'rime', 'lantern', 'bird', 'ink', 'clockwork'];
                let randomPet = hatchPool[Math.floor(Math.random() * hatchPool.length)];
                if (typeof setHatchedPetType === 'function') {
                    setHatchedPetType(randomPet);
                } else {
                    localStorage.setItem('hatchedPetType', randomPet);
                }

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
}
