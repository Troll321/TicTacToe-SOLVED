const state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const whatToMove = {};
const verdict = {};
const MAX = 100;

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

function hitungGerakan() {
    let out = 0;
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if(state[i][j] !== 0) {out++;}
        }
    }
    return out;
}

function copyarr() {
    const outarr = [[0,0,0],[0,0,0],[0,0,0]];
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            outarr[i][j] = state[i][j];            
        }        
    }
    return outarr;
}

function solve() {
    if(verdict[state] !== undefined) {return;}
    const tmp = check();
    if(tmp !== 0 || hitungGerakan() === 9) {verdict[state] = tmp; return ;}

    const now = (hitungGerakan()%2)?-1:1;
    let out = (now>0)?-MAX:MAX;
    
    const oldstate = copyarr();
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if(state[i][j] !== 0) {continue ;}
            state[i][j] = now;
            if(now > 0) {
                solve();        
                if(verdict[state] > out) {
                    out = verdict[state];
                    whatToMove[oldstate] = [i, j];
                }
            } else {
                solve();
                if(verdict[state] < out) {
                    out = verdict[state];
                    whatToMove[oldstate] = [i, j];
                }
            }
            state[i][j] = 0;
        }
    }

    if(out === -now) {whatToMove[state] = undefined;}
    verdict[state] = out;
}

solve();

export {whatToMove};