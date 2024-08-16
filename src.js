/*
Calculator states:

NUM = NUMBER

STATES:

11: FIRST-INPUT ONLY NUM (NOT 0) AND NEGATIVE
12: FIRST-INPUT, NUM SELECTED, ALLOW NUM && OPERATOR
21: SECOND-INPUT, OPERATOR SELECTED, ALLOW ONLY NUM && NEGATIVE
22: SECOND-INPUT, NUM SELECTED, ALLOW ALL
23: SECOND-INPUT, OPERATOR OR EQUAL SELECTED, DO CALCULATION
0: TWO OPERANDS SELECTED, DO CALCULATION

*/

let state = 11;
//console.log('STATE IS NOW 11');
let inputNumberOne = [];
let inputNumberTwo = [];

let operand = null;
let operandStore = null;
let amountOfOperands = 0;
let operandList = ['+', '-', 'X', '/', '='];


const display = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.num');
const operandButtons = document.querySelectorAll('.op');
const eqButton = document.querySelector('.eq');
const cButton = document.querySelector('.btn-c');
const dotButton = document.querySelector('.dot');

cButton.addEventListener('click', () => resetHard());

numberButtons.forEach(el => {
  el.addEventListener('click', (event) => {
    et = event.target;
    stateLogic(et.innerHTML);
  
  });
});

function setState(val, from) {
  state = val;
  console.log(`state change: ${state}, changed from: ${from}`);
}

operandButtons.forEach(el => {
  el.addEventListener('click', (event) => {
    et = event.target;

    //Logic to enter negative before number
    if ((state === 11) && et.innerHTML==='-' && inputNumberOne.length===0){
      display.innerHTML='-';
      inputNumberOne.push('-')
    }
    if ((state === 21) &&
        (et.innerHTML==='-') &&
        (lastCharOfDisplay() !== '-') && 
        amountOfOperands<2) {
      amountOfOperands++;
      display.innerHTML+='-';
      inputNumberTwo.push('-')
    } 

    //Second input operator select
    if (state === 22){
      setState(23, 'operandButtons');
      stateLogic(et.innerHTML);
    }
    
    //First input operator select
    if (state === 12 || state === 22) {

      operand = et.innerHTML;
      amountOfOperands++;

      //Double operator check
      if (amountOfOperands > 1) {
        operand = et.innerHTML;
        setState(0, 'operandButtons');
        stateLogic(et.innerHTML);
      }

      stateLogic(et.innerHTML);
      setState(21, 'operandButtons');
    }
  
  });
});

eqButton.addEventListener('click', (event) => {
    et = event.target;

    if (state === 22) {
      setState(23, 'equalButton');
      stateLogic(et.innerHTML);
    }
});


function stateLogic(value) {

  switch (state) {
    case 11:
      //Dont allow 0 to be first
      if(value === '0' && inputNumberOne.length === 0) break;
      if(value === '0' && operandList.includes(inputNumberOne[inputNumberOne.length -1])) break;
      inputNumberOne.push(value);
      display.innerHTML+=value;
      setState(12, 'state switch case 11');
      break;
    case 12:
      if (!operandList.includes(value)) inputNumberOne.push(value);
      display.innerHTML+=value;
      break;
    case 21:
      if(value === '0'){
        if(operand==='/'){
          divideByZero();
          break;
        } 
        decideCalculation();
        break;
      } 
        
      inputNumberTwo.push(value);
      display.innerHTML+=value;
      setState(22, 'state switch case 21');
      break;
    case 22:
      if (!operandList.includes(value)) inputNumberTwo.push(value);
      display.innerHTML+=value;
    break;
    case 23:
      decideCalculation();
      break;
    case 0:
      operandStore = value;
      decideCalculation();
      break;
    default:
      //console.log(`error, state is ${state}`);
  }
}

function decideCalculation() {
  switch(operand){
    case '+':
      add(inputNumberOne, inputNumberTwo);
      break;
    case '-':
      subtract(inputNumberOne, inputNumberTwo);
      break;
    case 'X':
      multiply(inputNumberOne, inputNumberTwo);
      break;
    case '/':
      divide(inputNumberOne, inputNumberTwo);
      break;
    default:
      //console.log('no operator found that matches ', operand);
  }
}


function add() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`1: ${inputNumberOne} 2: ${inputNumberTwo} DONE ${in1} ${in2}`);
  let sum = Number(in1)+Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function subtract() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`1: ${inputNumberOne} 2: ${inputNumberTwo} DONE ${in1} ${in2}`);
  let sum = Number(in1)-Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function multiply() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`1: ${inputNumberOne} 2: ${inputNumberTwo} DONE ${in1} ${in2}`);
  let sum = Number(in1)*Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function divide() { 
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`1: ${inputNumberOne} 2: ${inputNumberTwo} DONE ${in1} ${in2}`);
  let sum = Number(in1)/Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function divideByZero() {
  numberButtons.forEach((el) => el.remove());
  operandButtons.forEach((el) => el.remove());
  eqButton.remove();
  cButton.remove();
  dotButton.remove();
  display.innerHTML ='💀💀💀💀';
}

function lastCharOfDisplay(){
  return display.innerHTML.slice(-1);
}

function resetSoft(in1) {
  inputNumberOne = [in1];
  inputNumberTwo = [];
  operand = null;
  display.innerHTML = in1;
  setState(12, 'reset soft');
  amountOfOperands = 0;
}

function resetHard() {
  inputNumberOne = [];
  inputNumberTwo = [];
  operand = null;
  operandStore = null;
  display.innerHTML = '';
  setState(11, 'reset hard');
  amountOfOperands = 0;
}
