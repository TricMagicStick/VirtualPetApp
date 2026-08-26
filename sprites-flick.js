// legacy flick sprites (unchanged from main.js v4.51)
function drawFlick(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 126 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 40, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx - 11, cy + 28, 22, 18);
    petCtx.fillRect(cx - 7, cy + 44, 14, 16);

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 6, cy + 12, 12, 10);

    petCtx.fillStyle = '#b91c1c';
    petCtx.beginPath();
    petCtx.moveTo(cx - 16, cy + 6);
    petCtx.lineTo(cx + 16, cy + 6);
    petCtx.lineTo(cx + 12, cy - 18);
    petCtx.lineTo(cx - 12, cy - 18);
    petCtx.fill();

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 6, cy - 14, 12, 8);

    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 10, cy - 10, 4, 4);
    petCtx.fillRect(cx + 6, cy - 10, 4, 4);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 7, cy - 7, 2, 2);
    petCtx.fillRect(cx + 8, cy - 7, 2, 2);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 8, cy - 20, 3, 5);
    petCtx.fillRect(cx + 5, cy - 20, 3, 5);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.beginPath();
    petCtx.moveTo(cx - 28, cy + 14);
    petCtx.lineTo(cx - 6, cy + 8);
    petCtx.lineTo(cx - 6, cy + 22);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 28, cy + 14);
    petCtx.lineTo(cx + 6, cy + 8);
    petCtx.lineTo(cx + 6, cy + 22);
    petCtx.fill();

    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx + 3, cy + 58, 9, 12);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 16, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 16, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 11, cy - 14);
        petCtx.lineTo(cx - 3, cy - 11);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 11);
        petCtx.lineTo(cx + 11, cy - 14);
        petCtx.stroke();
    }
}

function drawCharling(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 120 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 62, 44, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx - 12, cy + 18, 24, 15);
    petCtx.fillRect(cx - 10, cy + 31, 20, 15);
    petCtx.fillRect(cx - 6, cy + 44, 12, 14);

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 5, cy + 8, 10, 10);

    petCtx.fillStyle = '#b91c1c';
    petCtx.beginPath();
    petCtx.moveTo(cx - 14, cy + 4);
    petCtx.lineTo(cx + 14, cy + 4);
    petCtx.lineTo(cx + 11, cy - 20);
    petCtx.lineTo(cx - 11, cy - 20);
    petCtx.fill();

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 5, cy - 16, 10, 8);

    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 8, cy - 10, 4, 4);
    petCtx.fillRect(cx + 4, cy - 10, 4, 4);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 6, cy - 7, 2, 2);
    petCtx.fillRect(cx + 6, cy - 7, 2, 2);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 8, cy - 22, 4, 7);
    petCtx.fillRect(cx + 4, cy - 22, 4, 7);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.beginPath();
    petCtx.moveTo(cx - 24, cy + 10);
    petCtx.lineTo(cx - 6, cy + 6);
    petCtx.lineTo(cx - 6, cy + 18);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 24, cy + 10);
    petCtx.lineTo(cx + 6, cy + 6);
    petCtx.lineTo(cx + 6, cy + 18);
    petCtx.fill();

    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx + 2, cy + 56, 10, 16);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 5, cy - 18, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 5, cy - 18, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 9, cy - 16);
        petCtx.lineTo(cx - 1, cy - 13);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 1, cy - 13);
        petCtx.lineTo(cx + 9, cy - 16);
        petCtx.stroke();
    }
}

function drawDrakEmber(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 112 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 70, 50, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx - 14, cy + 14, 28, 14);
    petCtx.fillRect(cx - 12, cy + 26, 24, 13);
    petCtx.fillRect(cx - 10, cy + 37, 20, 13);
    petCtx.fillRect(cx - 6, cy + 48, 12, 12);

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 6, cy + 6, 12, 10);

    petCtx.fillStyle = '#b91c1c';
    petCtx.beginPath();
    petCtx.moveTo(cx - 16, cy + 2);
    petCtx.lineTo(cx + 16, cy + 2);
    petCtx.lineTo(cx + 13, cy - 22);
    petCtx.lineTo(cx - 13, cy - 22);
    petCtx.fill();

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 6, cy - 18, 12, 9);

    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 9, cy - 10, 4, 4);
    petCtx.fillRect(cx + 5, cy - 10, 4, 4);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 7, cy - 7, 2, 2);
    petCtx.fillRect(cx + 7, cy - 7, 2, 2);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 10, cy - 26, 5, 9);
    petCtx.fillRect(cx + 5, cy - 26, 5, 9);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.beginPath();
    petCtx.moveTo(cx - 30, cy + 8);
    petCtx.lineTo(cx - 6, cy + 2);
    petCtx.lineTo(cx - 6, cy + 20);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 30, cy + 8);
    petCtx.lineTo(cx + 6, cy + 2);
    petCtx.lineTo(cx + 6, cy + 20);
    petCtx.fill();

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 14, cy + 48, 5, 6);
    petCtx.fillRect(cx + 9, cy + 48, 5, 6);

    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx + 2, cy + 58, 12, 20);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 6, cy - 20, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 6, cy - 20, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 10, cy - 18);
        petCtx.lineTo(cx - 2, cy - 15);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 15);
        petCtx.lineTo(cx + 10, cy - 18);
        petCtx.stroke();
    }
}

function drawInfernyx(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 100 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 82, 56, 13, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 16, cy + 8, 32, 12);
    petCtx.fillRect(cx - 14, cy + 18, 28, 11);
    petCtx.fillRect(cx - 12, cy + 27, 24, 11);
    petCtx.fillRect(cx - 10, cy + 36, 20, 11);
    petCtx.fillRect(cx - 8, cy + 45, 16, 11);
    petCtx.fillRect(cx - 6, cy + 54, 12, 10);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 7, cy + 2, 14, 10);

    petCtx.fillStyle = '#991b1b';
    petCtx.beginPath();
    petCtx.moveTo(cx - 18, cy);
    petCtx.lineTo(cx + 18, cy);
    petCtx.lineTo(cx + 15, cy - 26);
    petCtx.lineTo(cx - 15, cy - 26);
    petCtx.fill();

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 7, cy - 22, 14, 10);

    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 10, cy - 12, 4, 4);
    petCtx.fillRect(cx + 6, cy - 12, 4, 4);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 8, cy - 9, 2, 2);
    petCtx.fillRect(cx + 8, cy - 9, 2, 2);

    petCtx.fillStyle = '#450a0a';
    petCtx.fillRect(cx - 12, cy - 32, 6, 12);
    petCtx.fillRect(cx + 6, cy - 32, 6, 12);

    petCtx.fillStyle = '#7f1d1d';
    petCtx.beginPath();
    petCtx.moveTo(cx - 42, cy - 4);
    petCtx.lineTo(cx - 6, cy - 10);
    petCtx.lineTo(cx - 6, cy + 22);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 42, cy - 4);
    petCtx.lineTo(cx + 6, cy - 10);
    petCtx.lineTo(cx + 6, cy + 22);
    petCtx.fill();

    petCtx.fillStyle = '#450a0a';
    petCtx.fillRect(cx - 16, cy + 52, 6, 8);
    petCtx.fillRect(cx + 10, cy + 52, 6, 8);

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx + 2, cy + 62, 14, 26);

    petCtx.fillStyle = '#f59e0b';
    petCtx.fillRect(cx + 6, cy + 84, 6, 8);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 24, 3.5, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 24, 3.5, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 22);
        petCtx.lineTo(cx - 2, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 19);
        petCtx.lineTo(cx + 12, cy - 22);
        petCtx.stroke();
    }
}
