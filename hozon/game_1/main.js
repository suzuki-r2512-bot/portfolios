const interests = ["ゲーム","アニメ","プログラミング"]
const specialties = ["寝ること","食べること","運動すること"]
const greetings = ["よろしくね","お手柔らかに","押忍!"]
const button = document.querySelector("#button")
button.addEventListener("click",function() {
    const name = document.querySelector("#name").value
    const index1 = Math.floor(Math.random()* interests.length)
    const index2 = Math.floor(Math.random()* specialties.length)
    const index3 = Math.floor(Math.random()* greetings.length)
    const interest = interests[index1]
    const specialtie = specialties[index2]
    const greeting = greetings[index3]
    const massage = `こんにちは、私の名前は${name}です。
    最近はまっているのは${interest}で、
    特技は${specialtie}です。${greeting}`
    const output = document.querySelector("#output")
    output.textContent = massage
})