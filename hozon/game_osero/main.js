// ゲームの状態
const CONTINUE = null; // まだ決着がついていない
const WIN_PLAYER_1 = 1; // 〇の勝ち
const WIN_PLAYER_2 = -1; // ✕の勝ち
const DRAW_GAME = 0; 
const Now_turn = document.querySelector("#turn")
let passCount = 0

const cells =[ //空なら0、白なら1、黒なら-1
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,-1,0,0,0],
    [0,0,0,-1,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

let turn = 1;//白の番なら1、黒の番なら-1
let result = CONTINUE;

window.onload = function(){
    // セルをクリックしたときのイベントを登録
    updateTurnMessage();
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.querySelector(`#cell_${row}_${col}`);
            cell.addEventListener("click", () => {
                if (result !== CONTINUE) {
                    window.location.reload(true); // 決着がついた後にクリックしたらリロード
                    return
                }
                if(cells[row][col]===0){ //置けるかどうかの判定
                    putMark(row, col); // ○か×を置く
                //check(); // ゲームの状態を確認
                }
            });
        }
    }
}

// 白か黒の駒を置く
function putMark(row, col) {
    if(!place(row,col)) return
    passCount = 0; 
    turn *= -1

    if (!hasAnyMove(turn)) { // 次のプレイヤーが置けるか？
        passCount++;
        turn *= -1;       // 戻す
        if (!hasAnyMove(turn)) {
            passCount++;
            }
        }
    
      if (passCount >= 2) {
        finishGame();
        return;
    }
    updateTurnMessage()
}

//ターン表示
function updateTurnMessage() {
    if (!Now_turn) return
    Now_turn.textContent = (turn === 1) ? "白のターン" : "黒のターン"
  }

function inside(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8
}

//駒を置けるかどうかの判定
function Canset(row, col) {
    if (cells[row][col] !== 0) return []
    const opponent = -turn;
  const dirs = [
    [1,0],[-1,0],[0,1],[0,-1],
    [1,1],[1,-1],[-1,1],[-1,-1]
  ];

  const validDirs = [];

  for (const [dx, dy] of dirs) {
    let r = row + dx;
    let c = col + dy;

    if (!inside(r, c) || cells[r][c] !== opponent) continue;

    while (true) {
      r += dx;
      c += dy;

      if (!inside(r, c)) break;

      if (cells[r][c] === opponent) continue;

      if (cells[r][c] === turn) {
        validDirs.push([dx, dy]);
      }
      break;
    }
  }

  return validDirs;
}

    /*const opponent = turn === 1 ? -1 : 1;//turnが1ならopponentは-1、違うなら1
    const validDirs = [];
    if(cells[row][col] === 0){
        const Hantei = [
            [1,0],[-1,0],[0,1],[0,-1],
            [1,1],[1,-1],[-1,1],[-1,-1]
        ]
        for(const[A,B] of Hantei){
            let hanteirow = row + A
            let hanteicol = col + B
            if (!inside(hanteirow, hanteicol) || cells[hanteirow][hanteicol] !== opponent) continue;
            while(true){
                hanteirow += A
                hanteicol += B
                if(!inside(hanteirow, hanteicol)) break
                
                if(cells[hanteirow][hanteicol] === opponent) continue

                if(cells[hanteirow][hanteicol] === turn) {
                    validDirs.push([A, B]);
                    break
                }
                break
            }
        }
    }
    return validDirs
}*/

function place(row,col){ //石を置いて
    const dirs = Canset(row,col)
    if(dirs.length === 0) return false
    cells[row][col] = turn
    drawStone(row,col,turn)

    for (const [dx, dy] of dirs) {
        let nx = row + dx;
        let ny = col + dy;

        while (inside(nx, ny) && cells[nx][ny] === -turn) {
            cells[nx][ny] = turn; 
            drawStone(nx,ny,turn)
            nx += dx;
            ny += dy;
        }
    }
    return true
}

function drawStone(row, col, color) { //画像を置き換える
  const img = document.querySelector(`#img_${row}_${col}`);
  if (!img) return;

  img.src = (color === 1)
    ? "./images/white_koma.png"
    : "./images/black_koma.png";
}

function hasAnyMove(player) { //置ける手があるか？
    const saveTurn = turn;
    turn = player;
  
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (Canset(r, c).length > 0) {
          turn = saveTurn;
          return true;
        }
      }
    }
    turn = saveTurn;
    return false;
}

function finishGame() {
  let white = 0;
  let black = 0;

  for (let r = 0; r < 8; r++) { //駒の数を数える
    for (let c = 0; c < 8; c++) {
      if (cells[r][c] === 1) white++;
      if (cells[r][c] === -1) black++;
    }
  }

  const message = document.querySelector("#message");

  if (white > black) {
    result = WIN_PLAYER_1;
    message.textContent = `白の勝ち！ (${white} - ${black})`;
  } else if (black > white) {
    result = WIN_PLAYER_2;
    message.textContent = `黒の勝ち！ (${black} - ${white})`;
  } else {
    result = DRAW_GAME;
    message.textContent = `引き分け (${white} - ${black})`;
  }
}