
let table = document.querySelector('.table');
const btn = document.querySelector('.button');
const gameEnd = document.querySelector('.game-end');
const restart = document.querySelector('.restart');
const messageResult = document.querySelector('.game-text');
const tryAgain = document.querySelector('.try-again');
const levelNine = document.querySelector('.nine');
const levelSix = document.querySelector('.six');
const levelThree = document.querySelector('.three');
const scoreTime = document.querySelector('.score');
let scoreIndex = document.querySelectorAll('.score-index');
let tableTime = document.querySelectorAll('.score-time');
let scoreResult = document.querySelectorAll('.score-result');

let timeArray = [];
let resultArray = [];


let inpArr = [];
let arrTds = [];
let finalArr = [];
let fall = 0;
let finalSum = [];
let str1 = [],
    str2 = [],
    str3 = [],
    str4 = [],
    str5 = [],
    str6 = [],
    str7 = [],
    str8 = [],
    str9 = []

let col1 = [],
    col2 = [],
    col3 = [],
    col4 = [],
    col5 = [],
    col6 = [],
    col7 = [],
    col8 = [],
    col9 = []

let square1 = [],
    square2 = [],
    square3 = [],
    square4 = [],
    square5 = [],
    square6 = [],
    square7 = [],
    square8 = [],
    square9 = []

let field = '0158467239924138756376952148542681973731594682689273415297845361813726594465319827';

let arr = Array(1,2,3,4,5,6,7,8,9).sort(function() {return 0.75 - Math.random()});

function generateSudoku(level) {
    for (let i = 1; i < 82; i++) {
        let ran = Math.random()*10;
        let td = document.createElement('div');
        td.classList.add('item');
        if (i >= 19 && i <= 27 || i >= 46 && i <= 54) {
            td.classList.add('border-bottom');
        }
        table.appendChild(td);
        let sluch = arr[field.substring(i,i+1)-1];

        if (td.textContent != '') {
            td.textContent = '';
        }
        if (ran > level) {
            td.textContent = `${sluch}`;
        } else {
            let input = document.createElement('input');
            input.classList.add('input');
            input.setAttribute("type", "text");
            input.setAttribute("id", "inputLength");
            input.setAttribute("maxlength", "1");
            input.setAttribute("autocomplete", "off");
            // input.setAttribute('readonly', false);
            td.appendChild(input);
        }

        if (i>=1 && i <= 9) {
            td.classList.add(`string1`)
        } else if(i>=10 && i <= 18) {
            td.classList.add(`string2`)
        } else if (i>=19 && i <= 27) {
            td.classList.add(`string3`)
        } else if (i>=28 && i <= 36) {
            td.classList.add(`string4`)
        } else if (i>=37 && i <= 45) {
            td.classList.add(`string5`)
        } else if (i>=46 && i <= 54) {
            td.classList.add(`string6`)
        } else if (i>=55 && i <= 63) {
            td.classList.add(`string7`)
        } else if (i>=64 && i <= 72) {
            td.classList.add(`string8`)
        } else if (i>=73 && i <= 81) {
            td.classList.add(`string9`)
        } 

        if ((i==0) || (i % 9 == 0)) {
            td.classList.add(`column1`);
        } else if (i==1 || i % 9 == 1) {
            td.classList.add(`column2`);
        } else if (i==2 || i % 9 == 2) {
            td.classList.add(`column3`);
        } else if(i==3 || i % 9 == 3) {
            td.classList.add(`column4`);
        } else if (i==4 || i % 9 == 4) {
            td.classList.add(`column5`);
        } else if (i==5 || i % 9 == 5) {
            td.classList.add(`column6`);
        } else if (i==6 || i % 9 == 6) {
            td.classList.add(`column7`);
        } else if (i==7 || i % 9 == 7) {
            td.classList.add(`column8`);
        } else if (i==8 || i % 9 == 8) {
            td.classList.add(`column9`);
        }
    

    }
}

generateSudoku(3);

// choose Level
levelNine.addEventListener('click', () => {
    table.innerHTML = '';
    generateSudoku(9);
    addColorToTd ();
})

levelSix.addEventListener('click', () => {
    table.innerHTML = '';
    generateSudoku(6);
    addColorToTd ();
})

levelThree.addEventListener('click', () => {
    table.innerHTML = '';
    generateSudoku(3);
    addColorToTd ();
})

let tds = document.querySelectorAll('.item');

let Date1 = new Date();
let seconds1 = Date1.getSeconds();
let minutes1 = Date1.getMinutes();
let hours1 = Date1.getHours();
let timeBegin = seconds1 + minutes1 * 60 + hours1 * 3600;
let finalTime;



// Check only digit in td
let inputs = document.querySelectorAll('.input');
inputs.forEach((inp) => inp.addEventListener('keydown', (event) => {
    // console.log(event.key);
    if ((event.key > 0) && (event.key < 10)) {
        inp.classList.remove('error');
        inp.value = event.key;
    } else {
        inp.classList.add('error');
        inp.value = '!';
    }
    
  }));

let Date2 = 0;

// Check results

btn.addEventListener('click', () => {
        Date2 = new Date();
        

        inputs.forEach((inp) => {
            inpArr.push(inp.value);
        });
        
        console.log(tds);
        tds.forEach((t) => {
            arrTds.push(t.textContent);
            
        });

        for (let i = 0; i < inpArr.length; i++) {
            for (let j = 0; j < arrTds.length; j++) {
                if (arrTds[j].length == 0) {
                    finalArr.push(inpArr[i]);
                    i++;
                } else {
                    finalArr.push(arrTds[j]);
                }
            }    
        }
        getResultString();
        getResultColumn();
        getResultSquare();
        console.log(finalArr);

        console.log(str1, str2);

        finalSum.push(str1,str2,str3,str4,str5,str6,str7,str8,str9);
        finalSum.push(col1,col2,col3,col4,col5,col6,col7,col8,col9);
        finalSum.push(square1,square2,square3,square4,square5,square6,square7,square8,square9);
        // console.log(finalSum);
        checkResults ();
        getTimeScore();

        timeArray.push(finalTime);
        resultArray.push(messageResult.textContent);
        // console.log(resultArray);
        tableScore();
        updateTable(timeArray,resultArray);  

        
});

// choose how continue the game
restart.addEventListener('click', () => {
    window.location.reload();
})

tryAgain.addEventListener('click', () => {
    gameEnd.classList.remove('active');
    
    str1 = [], str2 = [], str3 = [], str4 = [], finalSum = [];
    str5 = [], str6 = [], str7 = [], str8 = [], str9 = []

    col1 = [], col2 = [], col3 = [], col4 = [],
    col5 = [], col6 = [], col7 = [], col8 = [], col9 = []

    square1 = [], square2 = [], square3 = [], square4 = [],
    square5 = [], square6 = [], square7 = [], square8 = [], square9 = []
})

function getResultString () {
        str1 = finalArr.slice(0,9);
        str2 = finalArr.slice(9,18);
        str3 = finalArr.slice(18,27);
        str4 = finalArr.slice(27,36);
        str5 = finalArr.slice(36,45);
        str6 = finalArr.slice(45,54);
        str7 = finalArr.slice(54,63);
        str8 = finalArr.slice(63,72);
        str9 = finalArr.slice(72,81);

        
        str1 = str1.map(item => +item).reduce((sum, current) => sum + current, 0);
        str2 = str2.map(item => +item).reduce((sum, current) => sum + current, 0);
        str3 = str3.map(item => +item).reduce((sum, current) => sum + current, 0);
        str4 = str4.map(item => +item).reduce((sum, current) => sum + current, 0);
        str5 = str5.map(item => +item).reduce((sum, current) => sum + current, 0);
        str6 = str6.map(item => +item).reduce((sum, current) => sum + current, 0);
        str7 = str7.map(item => +item).reduce((sum, current) => sum + current, 0);
        str8 = str8.map(item => +item).reduce((sum, current) => sum + current, 0);
        str9 = str9.map(item => +item).reduce((sum, current) => sum + current, 0);
        console.log(str1, str2);
}

function getResultColumn () {
    for (let i = 0; i < finalArr.length; i++) {
        if ((i==0) || (i % 9 == 0)) {
            col1.push(finalArr[i]);
        } else if (i==1 || i % 9 == 1) {
            col2.push(finalArr[i]);
        } else if (i==2 || i % 9 == 2) {
            col3.push(finalArr[i]);
        } else if(i==3 || i % 9 == 3) {
            col4.push(finalArr[i]);
        } else if (i==4 || i % 9 == 4) {
            col5.push(finalArr[i]);
        } else if (i==5 || i % 9 == 5) {
            col6.push(finalArr[i]); 
        } else if (i==6 || i % 9 == 6) {
            col7.push(finalArr[i]); 
        } else if (i==7 || i % 9 == 7) {
            col8.push(finalArr[i]);
        } else if (i==8 || i % 9 == 8) {
            col9.push(finalArr[i]);
        }
    }
    col1 = col1.map(item => +item).reduce((sum, current) => sum + current, 0);
    col2 = col2.map(item => +item).reduce((sum, current) => sum + current, 0);
    col3 = col3.map(item => +item).reduce((sum, current) => sum + current, 0);
    col4 = col4.map(item => +item).reduce((sum, current) => sum + current, 0);
    col5 = col5.map(item => +item).reduce((sum, current) => sum + current, 0);
    col6 = col6.map(item => +item).reduce((sum, current) => sum + current, 0);
    col7 = col7.map(item => +item).reduce((sum, current) => sum + current, 0);
    col8 = col8.map(item => +item).reduce((sum, current) => sum + current, 0);
    col9 = col9.map(item => +item).reduce((sum, current) => sum + current, 0);
}

function getResultSquare () {
    for (let i = 0; i < finalArr.length; i++) {
        if ((i<3) || (i > 8) && (i < 12) || (i > 17) && (i < 21)) {
            square1.push(finalArr[i])
        } else if ((i < 6) && (i > 2) || (i > 11) && (i < 15) || (i > 20) && (i < 24)) {
            square2.push(finalArr[i])
        } else if ((i < 9) && (i > 5) || (i > 14) && (i < 18) || (i > 23) && (i < 27)) {
            square3.push(finalArr[i]) 
        } else if((i < 30) && (i > 26) || (i > 35) && (i < 39) || (i > 44) && (i < 48)) {
            square4.push(finalArr[i]) 
        } else if ((i < 33) && (i > 29) || (i > 38) && (i < 42) || (i > 47) && (i < 51)) {
            square5.push(finalArr[i]) 
        } else if ((i < 36) && (i > 32) || (i > 41) && (i < 45) || (i > 50) && (i < 54)) {
            square6.push(finalArr[i]) 
        } else if ((i < 57) && (i > 53) || (i > 62) && (i < 66) || (i > 71) && (i < 75)) {
            square7.push(finalArr[i]) 
        } else if ((i < 60) && (i > 56) || (i > 65) && (i < 69) || (i > 74) && (i < 78)) {
            square8.push(finalArr[i]) 
        } else if ((i < 63) && (i > 59) || (i > 68) && (i < 72) || (i > 77) && (i < 81)) {
            square9.push(finalArr[i]) 
        }
    }

    square1 = square1.map(item => +item).reduce((sum, current) => sum + current, 0);
    square2 = square2.map(item => +item).reduce((sum, current) => sum + current, 0);
    square3 = square3.map(item => +item).reduce((sum, current) => sum + current, 0);
    square4 = square4.map(item => +item).reduce((sum, current) => sum + current, 0);
    square5 = square5.map(item => +item).reduce((sum, current) => sum + current, 0);
    square6 = square6.map(item => +item).reduce((sum, current) => sum + current, 0);
    square7 = square7.map(item => +item).reduce((sum, current) => sum + current, 0);
    square8 = square8.map(item => +item).reduce((sum, current) => sum + current, 0);
    square9 = square9.map(item => +item).reduce((sum, current) => sum + current, 0);
}



function checkResults () {
    for(i = 0; i < finalSum.length; i++) {
        if(finalSum[i] != 45) {
            fall++;
        } else {
            fall = fall;
        }
    }
    // console.log(fall);
    if (fall == 0) {
        messageResult.textContent = 'You win';
        gameEnd.classList.add('active');
        // console.log('win')
    } else {
        messageResult.textContent = 'You lose'
        gameEnd.classList.add('active');
        // console.log('fall');
    }  
}

function getTimeScore() {
    let minutes2 = Date2.getMinutes();
    let seconds2 = Date2.getSeconds();
    let hours2 = Date2.getHours();
    let timeEnd = seconds2 + minutes2 * 60 + hours2 * 3600;
    let time = timeEnd - timeBegin;
    let min = Math.floor(time / 60);
    min = (min < 10) ? `0${min}` : min;
    let sec = Math.floor(time % 60);
    sec = (sec < 10) ? `0${sec}` : sec;
    let hour = Math.floor(time / 3600);
    hour = (hour < 10) ? `0${hour}` : hour;
    finalTime = `${hour} : ${min} : ${sec}`;
    scoreTime.textContent = finalTime;
    // console.log(hour, min, sec);
}

function tableScore() {
    if (timeArray.length > 10) {
        timeArray.shift();
        resultArray.shift();
    }
    setLocalStorage('time', JSON.stringify(timeArray));
    setLocalStorage('result', JSON.stringify(resultArray));
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function updateTable (time, result) {
    if (time.length == 0) {
        for(let i = 0; i < 10; i++) {
            scoreIndex[i].textContent = '-';
            tableTime[i].textContent = '-';
            scoreResult[i].textContent = '-';
        }
    }
    for (let i = 0; i < time.length; i++) {
        scoreIndex[i].textContent = `${i+1}`;
        if(time[i] == undefined) {
            tableTime[i].textContent = '-';
        } else {
            tableTime[i].textContent = `${time[i]}`;
        }
        scoreResult[i].textContent = `${result[i]}`;
    }
}

window.addEventListener('load', getLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('time')) {
        const t = JSON.parse(localStorage.getItem('time'));
        const res = JSON.parse(localStorage.getItem('result'));
        timeArray = t;
        resultArray = res;
        updateTable(timeArray,resultArray);   
    } 
}

// add Color to td

function addColorToTd () {
    let tdStr1 = document.querySelectorAll('.string1');
let tdStr2 = document.querySelectorAll('.string2');
let tdStr3 = document.querySelectorAll('.string3');
let tdStr4 = document.querySelectorAll('.string4');
let tdStr5 = document.querySelectorAll('.string5');
let tdStr6 = document.querySelectorAll('.string6');
let tdStr7 = document.querySelectorAll('.string7');
let tdStr8 = document.querySelectorAll('.string8');
let tdStr9 = document.querySelectorAll('.string9');

function hoverColor (strs) {
    strs.forEach((tdStr) => tdStr.addEventListener('mouseover', () => {
        strs.forEach((tdStr) => tdStr.classList.add('td-hover'));
    }))
    strs.forEach((tdStr) => tdStr.addEventListener('mouseout', () => {
        strs.forEach((tdStr) => tdStr.classList.remove('td-hover'));
    }))
}

hoverColor(tdStr1);
hoverColor(tdStr2);
hoverColor(tdStr3);
hoverColor(tdStr4);
hoverColor(tdStr5);
hoverColor(tdStr6);
hoverColor(tdStr7);
hoverColor(tdStr8);
hoverColor(tdStr9);

let tdCol1 = document.querySelectorAll('.column1');
let tdCol2 = document.querySelectorAll('.column2');
let tdCol3 = document.querySelectorAll('.column3');
let tdCol4 = document.querySelectorAll('.column4');
let tdCol5 = document.querySelectorAll('.column5');
let tdCol6 = document.querySelectorAll('.column6');
let tdCol7 = document.querySelectorAll('.column7');
let tdCol8 = document.querySelectorAll('.column8');
let tdCol9 = document.querySelectorAll('.column9');


hoverColor(tdCol1);
hoverColor(tdCol2);
hoverColor(tdCol3);
hoverColor(tdCol4);
hoverColor(tdCol5);
hoverColor(tdCol6);
hoverColor(tdCol7);
hoverColor(tdCol8);
hoverColor(tdCol9);
}

addColorToTd ();



