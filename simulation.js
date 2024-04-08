const state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const whatToMove = {};
const MAX = 10;

let cnt = 1;
function print(val, jum) {
    if(cnt > jum) {return ;}
    console.log(val);
    cnt++;
}

function check() {
    let isGameOver = false;
    // Cek per baris
    for (let i = 0; i < state.length; i++) {
        const harusnya = state[i][0];
        if(harusnya == 0) {continue;}
        isGameOver = true;
        for (let j = 0; j < state.length; j++) {
            const now = state[i][j];
            if(now != harusnya) {isGameOver = false; break ;}
        }
        if(isGameOver) {return harusnya;}
    }

    // Cek per kolom
    for (let j = 0; j < state.length; j++) {
        const harusnya = state[0][j];
        if(harusnya == 0) {continue;}
        isGameOver = true;
        for (let i = 0; i < state.length; i++) {
            const now = state[i][j];
            if(now != harusnya) {isGameOver = false; break ;}
        }
        if(isGameOver) {return harusnya;}
    }

    // Cek diagonal
    const harusnya1 = state[0][0];
    isGameOver = true;
    for (let i = 0; i < state.length; i++) {
        if(harusnya1 == 0) {isGameOver = false; break;}
        const now = state[i][i];
        if(now != harusnya1) {isGameOver = false; break ;}
    }
    if(isGameOver) {return harusnya1;}

    // Cek diagonal2
    const harusnya2 = state[0][2];
    isGameOver = true;
    for (let i = 0; i < state.length; i++) {
        if(harusnya2 == 0) {isGameOver = false; break;}
        const now = state[i][state.length-1-i];
        if(now != harusnya2) {isGameOver = false; break ;}
    }
    if(isGameOver) {return harusnya2;}

    return 0;
}

function solve(gerakKe, row, col) {
    const now = gerakKe%2?1:-1;
    state[row][col] = now;

    if(gerakKe == 9) {
        let hasil = check();
        state[row][col] = 0;
        return hasil;
    }
    else if(check() != 0) {
        print("OWE", 100);
        let hasil = check();
        state[row][col] = 0;
        return hasil;
    }

    let out = now>0?MAX:-MAX;
    
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if(state[i][j] != 0) {continue ;}
            if(now > 0) {
                let hasil = solve(gerakKe+1, i, j);        
                if(hasil < out) {
                    out = hasil;
                    whatToMove[state] = {i, j};
                }
            } else {
                let hasil = solve(gerakKe+1, i, j);
                if(hasil > out) {
                    out = hasil;
                    whatToMove[state] = {i, j};
                }
            }
        }
    }

    if(out == -now) {whatToMove[state] = undefined;}
    state[row][col] = 0;
    return out;
}

let ans = -MAX;
for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state.length; j++) {
        let hasil = solve(1, i, j);
        if(hasil > ans) {
            ans = hasil;
            whatToMove[state] = {i, j};
        }
    }
}

console.log(Object.keys(whatToMove).length);
console.log(ans);
export {whatToMove};