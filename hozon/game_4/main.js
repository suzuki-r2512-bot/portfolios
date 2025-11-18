// 各種要素を変数に入れる
const file = document.querySelector("#file");
const rakugaki = document.querySelector("#rakugaki");
const color = document.querySelector("#color");
const paint = document.querySelector("#paint");
const camera = document.querySelector("#camera");
const face = document.querySelector("#face");
const video = document.querySelector("#video");
let pen_color = "rgb(0, 0, 0)";
let mouse_on = false;
let prev_point = { x: 0, y: 0 }
let ranugaki_mode = false;
let video_mode = false;

// 初期化
function init() {
    face?.addEventListener("click", clickFace, false);
    camera?.addEventListener("click", clickCamera, false);
    paint?.addEventListener("click", clickPaint, false);
    file?.addEventListener("change", loadLocalImage, false);
    color?.addEventListener("change", colorChange, false);
    rakugaki?.addEventListener("resize", resize, false);
    rakugaki?.addEventListener("mousedown", drawStart, false);
    rakugaki?.addEventListener("mousemove", drawLine, false);
    rakugaki?.addEventListener("mouseup", drawEnd, false);
    rakugaki?.addEventListener("mouseleave", drawEnd, false);
}

// 画像をクリックしたときの処理
function clickFace() {
    file.click()
}

// 画像を読み込む
function loadLocalImage(e) {
    const fileData = e.target.files[0]
    if(fileData.type.match("image.*")){
        const reader = new FileReader()
        reader.onload = function(){
            faceDraw(reader.result)
            file.value = ""
        }
        reader.readAsDataURL(fileData)
    }
}

// 画像を書き出す
function faceDraw(data) {
    const ctx = face.getContext("2d");
    const img = new Image();
    ctx.clearRect(0, 0, face.width, face.height);
    img.src = data;
    img.onload = function () {
        let height, width, x, y;
        if (img.width / img.height > 1) {
            height = face.height;
            width = img.width * (height / img.height);
            x = (face.width - width) / 2;
            y = 0;
        } else {
            width = face.width;
            height = img.height * (width / img.width);
            x = 0;
            y = (face.height - height) / 2;
        }
        ctx.drawImage(img, x, y, width, height);
        // グレースケールに変換
        grayscale(ctx)
    }
}

// グレースケールに変換
function grayscale(ctx) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const imageData = ctx.getImageData(0,0,width,height)
    for(let i = 0; i < width * height * 4; i += 4){
        const r = imageData.data[i]
        const g = imageData.data[i + 1]
        const b = imageData.data[i + 2]
        const brightness = (r + g + b) /3
        imageData.data[i] = brightness
        imageData.data[i + 1] = brightness
        imageData.data[i + 2] = brightness
    }
    ctx.putImageData(imageData,0,0)
}

// カメラボタンクリック時の処理
function clickCamera() {
    video_mode = !video_mode;
    camera.classList.toggle("on");
    video.classList.toggle("hide");
    if (video_mode) {
        loadVideo();
    } else {
        takePhoto();
    }
}

// カメラを起動する
function loadVideo() {

}

// カメラで撮影した画像を表示する
function takePhoto() {

}

// ペイントボタンクリック時の処理
function clickPaint() {
    ranugaki_mode = !ranugaki_mode;
    paint.classList.toggle("on");
    // お絵かき領域を切り替える


    // パレット切り替え

}

// 画面サイズ変更時の処理
function resize() {
    rakugaki.width = rakugaki.offsetWidth;
    rakugaki.height = rakugaki.offsetHeight;
}

// ペンの書き始め
function drawStart(e) {

}

// ペンの書き途中
function drawLine(e) {

}

// ペンの書き終わり
function drawEnd() {

}

// ペンの色変更
function colorChange(e) {

}

// 初期化
init();
