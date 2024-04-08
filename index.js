import {whatToMove} from "./simulation.js";

const game = document.getElementById("game");
const row = document.getElementsByClassName("row");
const col = document.getElementsByClassName("col");
const yanggerak = document.getElementById("yanggerak");
const state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let gerakKe = 1, isGameOver = false;

// initialize
console.log(whatToMove[state]);
for (let i = 0; i < col.length; i++) {
    col[i].addEventListener("click", ()=>{
        gerak(Math.floor(i/3), i%3);
        col[i].classList.add("isi");
    });
    col[i].addEventListener("mouseover", ()=>{
        if(col[i].innerText != "") {return ;}
        col[i].innerText = yanggerak.innerText;
    });
    col[i].addEventListener("mouseleave", ()=>{
        if(col[i].classList.contains("isi")) {return ;}
        col[i].innerText = "";
    });
}

function render() {
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            const now = state[i][j];
            if(now == 0) {
                col[i*state.length+j].innerText = "";
            }
            else if(now == -1) {
                col[i*state.length+j].innerText = "O";
            }
            else if(now == 1) {
                col[i*state.length+j].innerText = "X";
            }
        }
    }   
}

function gameOver(playerindex) {
    if(playerindex == 0) {
        setTimeout(() => {
            alert("DRAW!");
        }, 0);
    } else {
        setTimeout(()=>{alert(playerindex>0?"X":"O" + " WIN")}, 0);
    }
}

function gerak(row, col) {
    state[row][col] = (((gerakKe+1)%2)*-2)+1;
    render();
    check();
    if(!isGameOver && gerakKe == 9) {gameOver(0); return ;}
    console.log(whatToMove[state]);
    gerakKe++;
    yanggerak.innerText = gerakKe%2?"X":"O";
}

function check() {
    // Cek per baris
    for (let i = 0; i < state.length; i++) {
        const harusnya = state[i][0];
        if(harusnya == 0) {continue;}
        isGameOver = true;
        for (let j = 0; j < state.length; j++) {
            const now = state[i][j];
            if(now != harusnya) {isGameOver = false; break ;}
        }
        if(isGameOver) {gameOver(harusnya); return ;}
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
        if(isGameOver) {gameOver(harusnya); return ;}
    }

    // Cek diagonal
    const harusnya1 = state[0][0];
    isGameOver = true;
    for (let i = 0; i < state.length; i++) {
        if(harusnya1 == 0) {isGameOver = false; break;}
        const now = state[i][i];
        if(now != harusnya1) {isGameOver = false; break ;}
    }
    if(isGameOver) {gameOver(harusnya1); return ;}

    // Cek diagonal2
    const harusnya2 = state[0][2];
    isGameOver = true;
    for (let i = 0; i < state.length; i++) {
        if(harusnya2 == 0) {isGameOver = false; break;}
        const now = state[i][state.length-1-i];
        if(now != harusnya2) {isGameOver = false; break ;}
    }
    if(isGameOver) {gameOver(harusnya2); return ;}
}