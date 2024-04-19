# [EN] How this works?
For games like _TicTacToe_ we can assume both parties are playing optimally (they both doesn't make mistake).
We represent our _TicTacToe_'s state as a 2D array with  
```
 1 == X
-1 == O
 0 == Nothing
```

### Observation 1: It doesn't matter how we get to each state the "optimum move" for that state will be always the same.
We can also infer who move now based on the state alone, so it's sufficient to just keep the state.

---

### How do we tackle the problem?  
#### First count the state
There 9 square on a TicTacToe. How many state are there?
Approximately 9! (362.880) or even less. Quite small innit.
<br/>
<br/>
#### Let's bruteForce
The small amount of state make it easily computable for computer thus bruteforce is used.
<br/>
```
Logic:
If we moving as -1 (O) we want to MINIMIZE our next move verdict.
If we moveing as 1 (X) we want to MAXIMIZE our next move verdict.
```

Verdict of a state means --> in that state who would win (1 || -1 || 0)  
0 means draw.

We do our logic reccursively from the base state _All Zero_  
If the game somehow ends either halfway or complete then we set the verdict to the game result.

**THUS WE GOT OUR ANSWER!!!**
<br/>
<br/>
<br/>
<br/>
# [ID] Gimana cara kerjanya?
Untuk game_TicTacToe_ kita sumsikan kedua pihak bermain secara optimal (tidak membuat kesalahan).
Kita representasikan state  _TicTacToe_'s sebagai array 2D dengan  
```
 1 == X
-1 == O
 0 == Tidak diisi
```

### Observasi 1: Tidak peduli urutan untuk mencapai suatu state "gerakan optimal" pada state itu selalu sama.
Kita dapat mengetahui siapa yanfg bergerak hanya dengan mengetahui state-nya

---

### Gimana kita menyelesaikannya?
#### Hitung banyaknya state
Ada 9 kotak pada _TicTacToe_. Berapa banyak state-nya?  
Kira-kira 9! (362.880) atau malah kurang. Cukup kecil.
<br/>
<br/>
#### Ayo bruteForce
Karena state nya sedikit maka kita akan melakukan bruteforce.
<br/>
```
Logic:
Jika kita bergerak sebagai -1 (O) kita ingin me-MINIMALKAN verdict gerakan selanjutnya.
Jika kita bergerak sebagai 1 (X) kita ingin me-MAXIMALKAN verdict gerakan selanjutnya.

```

Verdict dari suatu state berarti --> di state itu siapa yang akan menang (1 || -1 || 0)  
0 berarti seri.

Kita lakukan logic kita secara rekursif dimulai dari state awal _Semua Nol_.  
Jika game berhenti tengah jalan atau sampai akhir maka verdict dari state itu adalah hasil akhir dari game tersebut.  

**KITA MENDAPAT JAWABAN KITA!!!**
