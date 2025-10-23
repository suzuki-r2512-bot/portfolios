
function think(_cells, _turn, _level, _settai_mode) {
    const result = miniMax(_cells, _turn, _level, _settai_mode);
    return result[1];
}

// 一番いい手を探す
function miniMax(_cells, _turn, _depth, _settai_mode) {
    const gameState = judge(_cells);

    // 決着がついたら評価値を返す
    if (gameState !== CONTINUE) {
        return [gameState, null];
    }

    if (_depth === 0) {
        return [0, null]; // depthが0なら評価値0で終了
    }

    // 最も良い手の点数を記憶する変数。最低値で初回化しておく
    let bestValue;
    if (_settai_mode) {
        bestValue = (_turn === 1) ? Infinity : -Infinity;
    } else {
        bestValue = (_turn === 1) ? -Infinity : Infinity;
    }
    let bestMove = null;

    // とりうる手をすべて試す
    const hands = showHands(_cells);
    for (let hand of hands) {
        // コピーを作成して手を指す
        const newCells = structuredClone(_cells);
        newCells[hand[0]][hand[1]] = _turn;

        // 次の手番
        const nextTurn = -_turn;

        // 再帰的に探索してみる
        const [value] = miniMax(newCells, nextTurn, _depth - 1);

        // 良い手だったら記憶しておく
        if (_settai_mode) {
            if ((_turn === 1 && value < bestValue) || (_turn === -1 && value > bestValue)) {
                bestValue = value;
                bestMove = hand;
            }
        } else {
            if ((_turn === 1 && value > bestValue) || (_turn === -1 && value < bestValue)) {
                bestValue = value;
                bestMove = hand;
            }
        }
    }

    return [bestValue, bestMove];
}

// 打てる場所を全部返す
function showHands(_cells) {
    const hands = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (_cells[row][col] == 0) {
                hands.push([row, col]);
            }
        }
    }
    return hands;
}
