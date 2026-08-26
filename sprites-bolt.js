// legacy bolt sprites (unchanged from main.js v4.51)
function drawZap(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 132 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 34, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 14, cy + 28, 28, 24);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 16, cy - 4, 32, 28);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 16, cy + 6);
    petCtx.lineTo(cx + 26, cy + 10);
    petCtx.lineTo(cx + 16, cy + 14);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 10, cy + 2, 8, 8);
    petCtx.fillRect(cx + 2, cy + 2, 8, 8);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 7, cy + 4, 4, 4);
    petCtx.fillRect(cx + 5, cy + 4, 4, 4);

    petCtx.fillStyle = '#ca8a04';
    petCtx.beginPath();
    petCtx.rect(cx - 20, cy + 20, 8, 14);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 12, cy + 20, 8, 14);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 8, cy - 8, 3, 6);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 5, cy - 8, 3, 6);
    petCtx.fill();

    drawLightningBolt(cx + 14, cy + 52, 16, 4, 0.3, '#eab308');
}

function drawSpark(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 120 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 16, cy + 22, 32, 32);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 14, cy - 6, 28, 26);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 14, cy + 4);
    petCtx.lineTo(cx + 24, cy + 8);
    petCtx.lineTo(cx + 14, cy + 12);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 9, cy + 0, 7, 7);
    petCtx.fillRect(cx + 2, cy + 0, 7, 7);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 6, cy + 2, 3, 3);
    petCtx.fillRect(cx + 5, cy + 2, 3, 3);

    petCtx.fillStyle = '#ca8a04';
    petCtx.beginPath();
    petCtx.rect(cx - 24, cy + 18, 10, 18);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 14, cy + 18, 10, 18);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 8, cy - 10, 3, 6);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 5, cy - 10, 3, 6);
    petCtx.fill();

    drawLightningBolt(cx + 16, cy + 54, 20, 5, 0.25, '#eab308');
}

function drawBolt(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 112 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 72, 42, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 18, cy + 16, 36, 38);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 13, cy - 8, 26, 24);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 13, cy + 2);
    petCtx.lineTo(cx + 26, cy + 6);
    petCtx.lineTo(cx + 13, cy + 10);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 8, cy - 2, 7, 7);
    petCtx.fillRect(cx + 1, cy - 2, 7, 7);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 5, cy + 0, 3, 3);
    petCtx.fillRect(cx + 4, cy + 0, 3, 3);

    petCtx.fillStyle = '#ca8a04';
    petCtx.beginPath();
    petCtx.rect(cx - 28, cy + 14, 12, 22);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 16, cy + 14, 12, 22);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 26, cy + 16, 4, 10);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 22, cy + 16, 4, 10);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 9, cy - 12, 4, 8);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 5, cy - 12, 4, 8);
    petCtx.fill();

    drawLightningBolt(cx + 18, cy + 54, 26, 6, 0.2, '#eab308');
}

function drawStorm(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 100 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 82, 48, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.moveTo(cx, cy - 8);
    petCtx.lineTo(cx - 22, cy + 52);
    petCtx.lineTo(cx + 22, cy + 52);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 14, cy - 14, 28, 22);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 14, cy - 4);
    petCtx.lineTo(cx + 26, cy);
    petCtx.lineTo(cx + 14, cy + 4);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 8, cy - 10, 6, 6);
    petCtx.fillRect(cx + 2, cy - 10, 6, 6);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 5, cy - 8, 3, 3);
    petCtx.fillRect(cx + 5, cy - 8, 3, 3);

    petCtx.fillStyle = '#ca8a04';

    petCtx.beginPath();
    petCtx.moveTo(cx - 20, cy + 6);
    petCtx.lineTo(cx - 48, cy - 10);
    petCtx.lineTo(cx - 14, cy + 24);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 20, cy + 6);
    petCtx.lineTo(cx + 48, cy - 10);
    petCtx.lineTo(cx + 14, cy + 24);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';

    petCtx.beginPath();
    petCtx.moveTo(cx - 42, cy - 8);
    petCtx.lineTo(cx - 56, cy - 28);
    petCtx.lineTo(cx - 30, cy + 4);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 42, cy - 8);
    petCtx.lineTo(cx + 56, cy - 28);
    petCtx.lineTo(cx + 30, cy + 4);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx - 36, cy - 2);
    petCtx.lineTo(cx - 50, cy - 20);
    petCtx.lineTo(cx - 24, cy + 10);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 36, cy - 2);
    petCtx.lineTo(cx + 50, cy - 20);
    petCtx.lineTo(cx + 24, cy + 10);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx - 30, cy + 4);
    petCtx.lineTo(cx - 44, cy - 14);
    petCtx.lineTo(cx - 18, cy + 16);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 30, cy + 4);
    petCtx.lineTo(cx + 44, cy - 14);
    petCtx.lineTo(cx + 18, cy + 16);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx - 24, cy + 10);
    petCtx.lineTo(cx - 36, cy - 6);
    petCtx.lineTo(cx - 14, cy + 20);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 24, cy + 10);
    petCtx.lineTo(cx + 36, cy - 6);
    petCtx.lineTo(cx + 14, cy + 20);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 8, cy - 16, 4, 10);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 4, cy - 16, 4, 10);
    petCtx.fill();

    drawLightningBolt(cx + 20, cy + 54, 32, 7, 0.15, '#eab308');

    petCtx.fillStyle = '#fef08c';
    petCtx.beginPath();
    petCtx.rect(cx - 28, cy + 14, 4, 8);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 24, cy + 14, 4, 8);
    petCtx.fill();
}
