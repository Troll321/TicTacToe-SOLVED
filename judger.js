import { whatToMove } from "./simulation.js";
const state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

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

function gabisagerak() {
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if(state[i][j] == 0) {return false;}            
        }
    }
    return true;
}

function test() {
    if(check() == -1) {return false;}
    if(gabisagerak()) {return true;}

    const next = whatToMove[state];
    if(!next) {return false;}
    state[next.i][next.j] = 1;

    let gerak = false;

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if(state[i][j] != 0) {continue ;}
            gerak = true;
            state[i][j] = -1;
            if(!test()) {
                state[i][j] = 0;
                return false;
            }
            state[i][j] = 0;
        }
    }

    if(!gerak) {
        let hasil = check();
        state[next.i][next.j] = 0;
        return (hasil==-1)?false:true;
    }
    state[next.i][next.j] = 0;
    return true;
}

function test2(type) {
    if (!type) {
        let gerak = false;
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if(state[i][j] != 0) {continue ;}
                gerak = true;
                state[i][j] = 1;
    
                // GERAK
                if(!test2(true)) {
                    state[i][j] = 0;
                    return false;
                }
                state[i][j] = 0;
            }
        }
        return true;
    }
    
    if(check() == 1) {return false;}
    
    const next = whatToMove[state];
    if(next === undefined) {return false;}
    state[next.i][next.j] = -1;
    
    let gerak = false;

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if(state[i][j] != 0) {continue ;}
            gerak = true;
            state[i][j] = 1;

            // GERAK
            if(!test2(true)) {
                state[i][j] = 0;
                return false;
            }
            state[i][j] = 0;
        }
    }
    
    if(!gerak) {
        let hasil = check();
        state[next.i][next.j] = 0;
        return (hasil==1)?false:true;
    }
    state[next.i][next.j] = 0;
    return true;
}

console.log("X");
console.log(test()?"WIN":"LOSE");

console.log("O");
console.log(test2(false)?"WIN":"LOSE");