// legacy puff sprites (unchanged from main.js v4.51)
function drawPuff(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 126 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.15)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 58, 38, 8, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy, 36, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx - 7, cy - 5, 18, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 20, cy - 16);
    petCtx.lineTo(cx - 36, cy - 40);
    petCtx.lineTo(cx - 10, cy - 20);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 20, cy - 16);
    petCtx.lineTo(cx + 36, cy - 40);
    petCtx.lineTo(cx + 10, cy - 20);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.moveTo(cx - 18, cy - 18);
    petCtx.lineTo(cx - 28, cy - 34);
    petCtx.lineTo(cx - 12, cy - 20);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 18, cy - 18);
    petCtx.lineTo(cx + 28, cy - 34);
    petCtx.lineTo(cx + 12, cy - 20);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 16, cy - 8, 10, 8);
    petCtx.fillRect(cx + 6, cy - 8, 10, 8);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 12, cy - 5, 4, 4);
    petCtx.fillRect(cx + 10, cy - 5, 4, 4);

    petCtx.fillStyle = '#475569';
    petCtx.fillRect(cx - 2, cy + 2, 4, 2);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 1.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx, cy + 6, 3, 0, Math.PI);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx + 26, cy + 20, 24, 7, -0.55, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 42, cy + 26, 18, 5, -0.25, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 54, cy + 30, 10, 4, 0, 0, Math.PI * 2);
    petCtx.fill();
}

function drawWhisp(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 118 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 44, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 52, 30, 11, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx - 14, cy + 48, 15, 7, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 16, cy + 50, 13, 6, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 2, 30, 26, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx - 5, cy - 8, 14, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 16, cy - 16);
    petCtx.lineTo(cx - 28, cy - 34);
    petCtx.lineTo(cx - 8, cy - 18);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 16, cy - 16);
    petCtx.lineTo(cx + 28, cy - 34);
    petCtx.lineTo(cx + 8, cy - 18);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 12, cy - 6, 8, 7);
    petCtx.fillRect(cx + 4, cy - 6, 8, 7);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 9, cy - 3, 3, 3);
    petCtx.fillRect(cx + 7, cy - 3, 3, 3);

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx + 22, cy + 16, 20, 6, -0.5, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 36, cy + 22, 14, 5, -0.2, 0, 0, Math.PI * 2);
    petCtx.fill();
}

function drawWhisk(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 110 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 74, 52, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 38, 14, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx - 20, cy + 50, 18, 9, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 20, cy + 52, 16, 8, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx - 8, cy + 46, 12, 6, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 10, cy + 48, 10, 5, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 24, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx - 3, cy + 2, 11, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 12, 20, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 12, cy - 20);
    petCtx.lineTo(cx - 20, cy - 34);
    petCtx.lineTo(cx - 4, cy - 22);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 12, cy - 20);
    petCtx.lineTo(cx + 20, cy - 34);
    petCtx.lineTo(cx + 4, cy - 22);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 8, cy - 14, 5, 5);
    petCtx.fillRect(cx + 3, cy - 14, 5, 5);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 5, cy - 11, 2, 2);
    petCtx.fillRect(cx + 6, cy - 11, 2, 2);

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx + 20, cy + 18, 18, 7, -0.4, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 34, cy + 24, 14, 5, -0.1, 0, 0, Math.PI * 2);
    petCtx.fill();
}

function drawNimbrix(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 100 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 88, 64, 13, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 50, 52, 26, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx - 24, cy + 40, 24, 13, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 24, cy + 42, 22, 12, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx - 10, cy + 34, 18, 10, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 12, cy + 36, 16, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx - 14, cy + 20, 18, 10, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 14, cy + 22, 16, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx - 4, cy - 4, 18, 15, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 14, cy - 14);
    petCtx.lineTo(cx - 22, cy - 28);
    petCtx.lineTo(cx - 6, cy - 16);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 6, cy - 14);
    petCtx.lineTo(cx + 14, cy - 28);
    petCtx.lineTo(cx + 0, cy - 16);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 11, cy - 8, 4, 4);
    petCtx.fillRect(cx - 1, cy - 8, 4, 4);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 8, cy - 5, 2, 2);
    petCtx.fillRect(cx + 2, cy - 5, 2, 2);

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx + 26, cy + 32, 20, 8, -0.35, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 40, cy + 38, 16, 6, -0.1, 0, 0, Math.PI * 2);
    petCtx.fill();
}
