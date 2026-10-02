// Time.is Minimalist Clock - Tự động giãn full màn hình với viền mỏng
const WEEKDAYS = [
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm"
];

// Lấy danh sách thứ chuẩn tiếng Việt theo Date.getDay() (0: Chủ Nhật -> 6: Thứ Bảy)
const VN_WEEKDAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy"
];

const clockContainer = document.getElementById('clockContainer');
const clockTimeEl = document.getElementById('clockTime');
const clockDateEl = document.getElementById('clockDate');

let lastSecond = -1;
let lastDateStr = '';

// Tự động tính toán kích cỡ chữ để tràn ngập màn hình với viền cực mỏng
function fitClock() {
  if (!clockTimeEl || !clockDateEl) return;

  // Viền mỏng: chiếm 96% chiều rộng và 92% chiều cao màn hình
  const maxW = window.innerWidth * 0.96;
  const maxH = window.innerHeight * 0.92;

  // Đo đạc kích thước cơ sở ở font-size 100px
  clockTimeEl.style.fontSize = '100px';
  clockDateEl.style.fontSize = '20px';
  clockDateEl.style.marginTop = '15px';

  const timeRect = clockTimeEl.getBoundingClientRect();
  const dateRect = clockDateEl.getBoundingClientRect();

  if (timeRect.width === 0) return;

  // Tính tỷ lệ phóng đại theo chiều rộng
  const scaleByTimeW = maxW / timeRect.width;
  const scaleByDateW = maxW / (dateRect.width || 1);
  let scale = Math.min(scaleByTimeW, scaleByDateW * 0.25 * 5);

  // Kiểm tra giới hạn chiều cao để không bị tràn màn hình theo chiều dọc
  const timeH = timeRect.height * scale;
  const dateH = (dateRect.height || 20) * (scale * 0.18);
  const gapH = scale * 8;
  const totalH = timeH + dateH + gapH;

  if (totalH > maxH) {
    scale = scale * (maxH / totalH);
  }

  const finalFontSize = Math.floor(100 * scale);
  const finalDateSize = Math.max(14, Math.floor(finalFontSize * 0.17));
  const finalMarginTop = Math.max(6, Math.floor(finalFontSize * 0.07));

  clockTimeEl.style.fontSize = `${finalFontSize}px`;
  clockDateEl.style.fontSize = `${finalDateSize}px`;
  clockDateEl.style.marginTop = `${finalMarginTop}px`;
}

function updateClock() {
  const now = new Date();
  const currentSec = now.getSeconds();

  if (currentSec !== lastSecond) {
    lastSecond = currentSec;

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(currentSec).padStart(2, '0');

    // Hiển thị dạng HH:mm:ss
    clockTimeEl.innerHTML = `${hours}<span class="clock-colon">:</span>${minutes}<span class="clock-colon">:</span>${seconds}`;
    document.title = `${hours}:${minutes}:${seconds} - Time.is`;

    // Cập nhật ngày tháng
    const weekday = VN_WEEKDAYS[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentDateStr = `${weekday}, ngày ${day} Tháng ${month}, ${year}`;

    if (currentDateStr !== lastDateStr) {
      lastDateStr = currentDateStr;
      clockDateEl.textContent = currentDateStr;
      fitClock();
    }
  }

  requestAnimationFrame(updateClock);
}

// Bắt đầu cập nhật và tự động scale
updateClock();
fitClock();

// Lắng nghe sự kiện thay đổi kích thước cửa sổ hoặc toàn màn hình
window.addEventListener('resize', fitClock);
document.addEventListener('fullscreenchange', () => {
  setTimeout(fitClock, 50);
});

// Bật/tắt toàn màn hình bằng phím F hoặc nhấp đúp
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  }
});

document.addEventListener('dblclick', toggleFullscreen);
