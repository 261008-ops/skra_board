// ===== 千葉の観測所（変更なし） =====
const AREAS = [
  { name: "佐倉方面", id: "45116" },
  { name: "銚子方面", id: "45148" },
  { name: "成田方面", id: "45121" },
  { name: "千葉方面", id: "45212" }
];

let index = 0;
let cachedData = null;

// ===== 最新データ取得（変更なし） =====
async function fetchWeather() {
  try {
    const timeText = await fetch(
      "https://www.jma.go.jp/bosai/amedas/data/latest_time.txt"
    ).then(res => res.text());

    const time = timeText.replace(/[-:T+]/g, "").slice(0, 14);

    const url = `https://www.jma.go.jp/bosai/amedas/data/map/${time}.json`;
    const data = await fetch(url).then(res => res.json());

    cachedData = data;

  } catch (e) {
    console.error("データ取得失敗", e);
  }
}

// ===== 表示更新（変更なし） =====
function updateDisplay() {
  if (!cachedData) return;

  const area = AREAS[index];
  const d = cachedData[area.id];

  document.getElementById("area").textContent = area.name;

  document.getElementById("temp").textContent =
    "気温: " + (d?.temp ? d.temp[0] : "--") + " ℃";

  document.getElementById("rain").textContent =
    "降水量: " + (d?.precipitation10m ? d.precipitation10m[0] : "--") + " mm";

  document.getElementById("wind").textContent =
    "風速: " + (d?.wind ? d.wind[0] : "--") + " m/s";

  index = (index + 1) % AREAS.length;
}

// ===== 初期化（変更なし） =====
async function init() {
  await fetchWeather();
  updateDisplay();
}

init();

setInterval(updateDisplay, 10000);
setInterval(fetchWeather, 1 * 60 * 1000);
