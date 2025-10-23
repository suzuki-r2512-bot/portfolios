// ゲームの状態
const CONTINUE = null; // まだ決着がついていない
const WIN_PLAYER_1 = 1; // 〇の勝ち
const WIN_PLAYER_2 = -1; // ✕の勝ち
const DRAW_GAME = 0; // 

const cells = [ //空なら0、〇なら1、×なら-1
    [0,0,0],
    [0,0,0],
    [0,0,0],
]
let turn = 1;//〇の番なら1、×の番なら-1
let result = CONTINUE;

// セルをクリックしたときのイベントを登録
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        const cell = document.querySelector(`#cell_${row}_${col}`);
        cell.addEventListener("click", () => {
            if (result !== CONTINUE) {
                window.location.reload(true); // 決着がついた後にクリックしたらリロード
            }
            if(cells[row][col]===0){ //置けるかどうかの判定
                putMark(row, col); // ○か×を置く
            turn = turn * -1;
            check(); // ゲームの状態を確認
            }
        });
    }
}

// ○か×を置く
function putMark(row, col) {
    const cell = document.querySelector(`#cell_${row}_${col}`)
    if(turn === 1) {
        cell.textContent = "*3*"
        cell.classList.add("o")
        cells[row][col] = 1
    }else {
        cell.textContent = "'-'"
        cell.classList.add("x")
        cells[row][col] = -1
    }
}

// ゲームの状態を確認
function check() {
    result = judge(cells)
    const message = document.querySelector("#message")
    switch(result){
        case WIN_PLAYER_1:
            message.textContent = "〇の勝ち！"
            break
        case WIN_PLAYER_2:
            message.textContent = "×の勝ち！"
            break
        case DRAW_GAME:
            message.textContent = "引き分け"
            break
    }
}

// 勝敗を判定する処理
function judge(_cells) {
    const lines =[
        //横のライン
        [_cells[0][0],_cells[0][1],_cells[0][2]],
        [_cells[1][0],_cells[1][1],_cells[1][2]],
        [_cells[2][0],_cells[2][1],_cells[2][2]],
        [_cells[0][0],_cells[1][0],_cells[2][0]],
        [_cells[0][1],_cells[1][1],_cells[2][1]],
        [_cells[0][2],_cells[1][2],_cells[2][2]],
        [_cells[0][0],_cells[1][1],_cells[2][2]],
        [_cells[0][2],_cells[1][1],_cells[2][0]],
    ]
    //勝ち負けチェック
    for(let line of lines) {
        const sum = line[0] + line[1] + line[2]
        if(sum === 3){
            return WIN_PLAYER_1
        }
        if(sum === -3){
            return WIN_PLAYER_2
        }
    }
    //継続チェック
    for(let row = 0;row < 3;row++){
        for(let col = 0;col < 3;col++){
            if(_cells[row][col] === 0){
                return CONTINUE
            }
        }
    }
    return DRAW_GAME
}
