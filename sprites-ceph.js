// legacy ceph sprites (unchanged from main.js v4.51)
function drawCephling(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 128 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 52, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 30, 22, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 2, 42, 38, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 8, cy - 8, 22, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 20, cy - 14, 14, 14);
    petCtx.fillRect(cx + 6, cy - 14, 14, 14);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 16, cy - 10, 6, 6);
    petCtx.fillRect(cx + 10, cy - 10, 6, 6);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 18, cy + 42, 6, 14);
    petCtx.fillRect(cx - 6, cy + 46, 5, 12);
    petCtx.fillRect(cx + 4, cy + 46, 5, 12);
    petCtx.fillRect(cx + 14, cy + 42, 6, 14);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 38, cy + 2, 10, 8);
    petCtx.fillRect(cx + 28, cy + 2, 10, 8);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 13, cy - 22, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 13, cy - 22, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 18, cy - 20);
        petCtx.lineTo(cx - 8, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 8, cy - 17);
        petCtx.lineTo(cx + 18, cy - 20);
        petCtx.stroke();
    }
}

function drawCephy(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 122 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 58, 42, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 28, 26, 24, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 4, 38, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 6, cy - 10, 20, 18, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 17, cy - 14, 12, 12);
    petCtx.fillRect(cx + 5, cy - 14, 12, 12);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 13, cy - 10, 5, 5);
    petCtx.fillRect(cx + 9, cy - 10, 5, 5);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 22, cy + 40, 7, 22);
    petCtx.fillRect(cx - 12, cy + 46, 6, 18);
    petCtx.fillRect(cx + 8, cy + 46, 6, 18);
    petCtx.fillRect(cx + 16, cy + 40, 7, 22);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 36, cy - 2, 12, 10);
    petCtx.fillRect(cx + 24, cy - 2, 12, 10);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 10, cy - 22, 3.5, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 10, cy - 22, 3.5, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 15, cy - 20);
        petCtx.lineTo(cx - 5, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 5, cy - 17);
        petCtx.lineTo(cx + 15, cy - 20);
        petCtx.stroke();
    }
}

function drawCephalon(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 114 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 48, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 22, 30, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 36, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 5, cy - 12, 18, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 15, cy - 14, 11, 11);
    petCtx.fillRect(cx + 4, cy - 14, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 11, cy - 10, 5, 5);
    petCtx.fillRect(cx + 8, cy - 10, 5, 5);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 26, cy + 38, 8, 32);
    petCtx.fillRect(cx - 14, cy + 44, 7, 28);
    petCtx.fillRect(cx + 8, cy + 44, 7, 28);
    petCtx.fillRect(cx + 20, cy + 38, 8, 32);

    petCtx.fillStyle = '#0e7490';
    for (let i = 0; i < 3; i++) {
        petCtx.fillRect(cx - 24, cy + 42 + i * 8, 4, 3);
        petCtx.fillRect(cx - 12, cy + 48 + i * 7, 3, 3);
        petCtx.fillRect(cx + 10, cy + 48 + i * 7, 3, 3);
        petCtx.fillRect(cx + 22, cy + 42 + i * 8, 4, 3);
    }

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 40, cy - 8, 14, 12);
    petCtx.fillRect(cx + 26, cy - 8, 14, 12);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 9, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 9, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 14, cy - 20);
        petCtx.lineTo(cx - 4, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 4, cy - 17);
        petCtx.lineTo(cx + 14, cy - 20);
        petCtx.stroke();
    }
}

function drawAbyssalCeph(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 102 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 78, 58, 14, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 14, 34, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 10, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 4, cy - 16, 17, 15, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 14, cy - 16, 11, 11);
    petCtx.fillRect(cx + 3, cy - 16, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 10, cy - 12, 5, 5);
    petCtx.fillRect(cx + 7, cy - 12, 5, 5);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 30, cy + 32, 9, 48);
    petCtx.fillRect(cx - 18, cy + 38, 8, 44);
    petCtx.fillRect(cx - 6, cy + 44, 7, 40);
    petCtx.fillRect(cx + 22, cy + 32, 9, 48);
    petCtx.fillRect(cx + 10, cy + 38, 8, 44);
    petCtx.fillRect(cx - 2, cy + 44, 7, 40);
    petCtx.fillRect(cx - 22, cy + 50, 8, 38);
    petCtx.fillRect(cx + 14, cy + 50, 8, 38);

    petCtx.fillStyle = '#0e7490';
    for (let i = 0; i < 5; i++) {
        petCtx.fillRect(cx - 28, cy + 36 + i * 9, 5, 4);
        petCtx.fillRect(cx - 16, cy + 42 + i * 8, 4, 3);
        petCtx.fillRect(cx + 24, cy + 36 + i * 9, 5, 4);
        petCtx.fillRect(cx + 12, cy + 42 + i * 8, 4, 3);
    }

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 48, cy - 18, 18, 16);
    petCtx.fillRect(cx + 30, cy - 18, 18, 16);
    petCtx.fillRect(cx - 36, cy - 28, 12, 10);
    petCtx.fillRect(cx + 24, cy - 28, 12, 10);

    petCtx.fillStyle = '#67e8f9';
    petCtx.fillRect(cx - 46, cy - 14, 6, 4);
    petCtx.fillRect(cx + 40, cy - 14, 6, 4);
    petCtx.fillRect(cx - 20, cy + 58, 4, 6);
    petCtx.fillRect(cx + 16, cy + 58, 4, 6);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 8, cy - 24, 3.5, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 8, cy - 24, 3.5, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 13, cy - 22);
        petCtx.lineTo(cx - 3, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 19);
        petCtx.lineTo(cx + 13, cy - 22);
        petCtx.stroke();
    }
}

function drawTailSegment(x, y, length, thickness, angle, color) {
    petCtx.save();
    petCtx.translate(x, y);
    petCtx.rotate(angle);
    petCtx.fillStyle = color;
    petCtx.fillRect(-thickness / 2, 0, thickness, length);
    petCtx.restore();
}
