let seaweeds = []; // 儲存水草屬性的陣列
let colors = ['#C9E4CA', '#87BBA2', '#55828B', '#3B6064', '#364958']; // 水草顏色選項

function setup() {
  // 創建 iframe 並設置為背景層
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 設置 iframe 的內容
  iframe.style('position', 'absolute');
  iframe.style('top', '0'); // 距離視窗頂部 0
  iframe.style('left', '0'); // 距離視窗左側 0
  iframe.style('width', '100%'); // 寬度為視窗的 100%
  iframe.style('height', '100%'); // 高度為視窗的 100%
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '-1'); // 設置 iframe 在背景層

  // 建立畫布，並讓畫布透明
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 設置畫布在 iframe 上方
  canvas.style('pointer-events', 'none'); // 讓畫布不阻擋 iframe 的操作

  // 初始化 40 條水草的屬性
  for (let i = 0; i < 40; i++) {
    seaweeds.push({
      x: random(width), // 水草的水平位置
      height: random(100, 200), // 水草的高度
      color: color(random(colors) + '80'), // 隨機選擇一種顏色，並降低透明度
      thickness: random(10, 20), // 水草的粗細
      frequency: random(0.01, 0.05), // 搖晃的頻率
      offset: random(TWO_PI) // 初始偏移量，讓每條水草的搖晃不同步
    });
  }
}

function draw() {
  clear(); // 清除畫布背景，讓背景透明

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    drawSeaweed(seaweed);
  }
}

function drawSeaweed(seaweed) {
  let baseX = seaweed.x; // 水草的基底位置
  let baseY = height; // 水草的底部位置
  let sway = sin(frameCount * seaweed.frequency + seaweed.offset) * 10; // 搖晃幅度較小

  stroke(seaweed.color); // 設置水草的顏色
  strokeWeight(seaweed.thickness); // 設置水草的粗細
  noFill();

  beginShape();
  for (let y = baseY; y > baseY - seaweed.height; y -= 10) {
    let curveFactor = map(y, baseY, baseY - seaweed.height, 0.3, 1); // 彎曲因子，讓頂部更彎曲
    let x = baseX + sway * curveFactor * cos((baseY - y) * 0.05); // 使用 cos 讓彎曲更平滑
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小

  // 重新計算每條水草的水平位置
  for (let seaweed of seaweeds) {
    seaweed.x = random(width); // 更新水草的水平位置
  }
}