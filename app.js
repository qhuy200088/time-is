// Time.is Minimalist Clone - Chữ đen nền trắng
const WEEKDAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy"
];

const clockTimeEl = document.getElementById('clockTime');
const clockDateEl = document.getElementById('clockDate');

let lastSecond = -1;
let lastDateStr = '';

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Cập nhật giờ khi giây thay đổi để giảm tải DOM
  if (now.getSeconds() !== lastSecond) {
    lastSecond = now.getSeconds();
    
    // Hiển thị giờ dạng HH:mm:ss
    clockTimeEl.innerHTML = `${hours}<span class="clock-colon">:</span>${minutes}<span class="clock-colon">:</span>${seconds}`;
    
    // Cập nhật tiêu đề tab trình duyệt
    document.title = `${hours}:${minutes}:${seconds} - Time.is`;

    // Cập nhật ngày: ví dụ "Thứ Sáu, ngày 2 Tháng 10, 2026"
    const weekday = WEEKDAYS[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentDateStr = `${weekday}, ngày ${day} Tháng ${month}, ${year}`;

    if (currentDateStr !== lastDateStr) {
      lastDateStr = currentDateStr;
      clockDateEl.textContent = currentDateStr;
    }
  }

  requestAnimationFrame(updateClock);
}

// Bắt đầu vòng lặp đồng hồ
requestAnimationFrame(updateClock);

// Phím tắt 'F' hoặc nhấp đúp chuột để bật/tắt toàn màn hình (Fullscreen)
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
