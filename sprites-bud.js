// legacy bud sprites (unchanged from main.js v4.51)
function drawBud(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 132 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 34, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 34, 18, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 8, 40, 36, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 10, 13, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 17, cy - 16, 12, 11);
    petCtx.fillRect(cx + 5, cy - 16, 12, 11);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 13, cy - 12, 5, 5);
    petCtx.fillRect(cx + 9, cy - 12, 5, 5);

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 11, cy - 14, 2, 2);
    petCtx.fillRect(cx + 11, cy - 14, 2, 2);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 11, cy - 24, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 11, cy - 24, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 17, cy - 22);
        petCtx.lineTo(cx - 6, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 6, cy - 19);
        petCtx.lineTo(cx + 17, cy - 22);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 3, cy - 42, 6, 9);
    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 5, cy - 36, 3, 4);
    petCtx.fillRect(cx + 2, cy - 36, 3, 4);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 10, cy + 48, 5, 4);
    petCtx.fillRect(cx + 5, cy + 48, 5, 4);
}

function drawSprout(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 118 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 68, 40, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 26, 24, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 14, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 13, cy - 14, 10, 10);
    petCtx.fillRect(cx + 3, cy - 14, 10, 10);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 9, cy - 10, 4, 4);
    petCtx.fillRect(cx + 7, cy - 10, 4, 4);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 8, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 8, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 13, cy - 18);
        petCtx.lineTo(cx - 3, cy - 15);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 15);
        petCtx.lineTo(cx + 13, cy - 18);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 24, cy + 8, 11, 7);
    petCtx.fillRect(cx + 13, cy + 8, 11, 7);

    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 22, cy + 10, 7, 4);
    petCtx.fillRect(cx + 15, cy + 10, 7, 4);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 3, cy - 36, 6, 10);
}

function drawSprig(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 110 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 74, 46, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 16, 32, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 8, 32, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 6, 16, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 12, cy - 12, 10, 10);
    petCtx.fillRect(cx + 2, cy - 12, 10, 10);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 8, cy - 8, 4, 4);
    petCtx.fillRect(cx + 6, cy - 8, 4, 4);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 14);
        petCtx.lineTo(cx - 2, cy - 11);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 11);
        petCtx.lineTo(cx + 12, cy - 14);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 28, cy + 10, 13, 20);
    petCtx.fillRect(cx + 15, cy + 10, 13, 20);

    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 26, cy + 12, 9, 6);
    petCtx.fillRect(cx + 17, cy + 12, 9, 6);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 4, cy - 38, 8, 12);
}

function drawVerdant(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 100 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 82, 52, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 10, 36, 40, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 12, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 4, 18, 13, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 12, cy - 12, 11, 11);
    petCtx.fillRect(cx + 1, cy - 12, 11, 11);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 8, cy - 8, 5, 5);
    petCtx.fillRect(cx + 5, cy - 8, 5, 5);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 14);
        petCtx.lineTo(cx - 2, cy - 11);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 11);
        petCtx.lineTo(cx + 12, cy - 14);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 34, cy + 0, 17, 26);
    petCtx.fillRect(cx + 17, cy + 0, 17, 26);

    const flowerX = cx;
    const flowerY = cy - 48;

    petCtx.fillStyle = '#f472b6';
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const px = flowerX + Math.cos(angle) * 14;
        const py = flowerY + Math.sin(angle) * 10;

        petCtx.beginPath();
        petCtx.ellipse(px, py, 10, 7, angle, 0, Math.PI * 2);
        petCtx.fill();
    }

    petCtx.fillStyle = '#f9a8d4';
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + 0.4;
        const px = flowerX + Math.cos(angle) * 8;
        const py = flowerY + Math.sin(angle) * 6;

        petCtx.beginPath();
        petCtx.ellipse(px, py, 6, 4, angle, 0, Math.PI * 2);
        petCtx.fill();
    }

    petCtx.fillStyle = '#ec4899';
    petCtx.beginPath();
    petCtx.arc(flowerX, flowerY, 6, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 16, cy + 28, 8, 11);
    petCtx.fillRect(cx + 8, cy + 28, 8, 11);

    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 32, cy + 6, 11, 7);
    petCtx.fillRect(cx + 21, cy + 6, 11, 7);
}
