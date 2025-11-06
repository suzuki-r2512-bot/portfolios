console.log("main.js!!");

window.onload = ()=>{
	console.log("onload!!");

	// JavaScriptここから
	//Howler.jsでサウンドオブジェクトを作る処理
	const sound01 = new Howl({
		src: "./sounds/se01.mp3"
	})
	const sound02 = new Howl({
		src:"./sounds/se02.mp3"
	})
	const sound03 = new Howl({
		src:"./sounds/se03.mp3"
	})

	//ボタンを取得してクリックイベントをつける処理
	const btn01 = document.querySelector("#btn01")
	console.log(btn01)
	btn01.addEventListener("click",()=>{
		console.log("aiueo")
		sound01.play()//音を鳴らす
	})
	const btn02 = document.querySelector("#btn02")
	btn02.addEventListener("click",()=>{
		sound02.play()
	})
	const btn03 = document.querySelector("#btn03")
	btn03.addEventListener("click",()=>{
		sound03.play()
	})
}