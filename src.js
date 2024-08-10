/*
Calculator:

FI = FIRST INPUT
SI = SECOND INPUT
OP = OPERAND
NUM = NUMBER
EQ = EQUAL
# = ONLY ALLOWED

STATES:

11: FIRST-INPUT ONLY NUM AND NEGATIVE
12: FIRST-INPUT, NUM SELECTED, ALLOW NUM && OPERATOR
21: SECOND-INPUT, OPERATOR SELECTED, ALLOW ONLY NUM
22: SECOND-INPUT, NUM SELECTED, ALLOW ALL
23: SECOND-INPUT, OPERATOR OR EQUAL SELECTED, DO CALCULATION
0: TWO OPERANDS SELECTED, DO CALCULATION
*/

let state = 11;
console.log('STATE IS NOW 11');
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

cButton.addEventListener('click', () => resetHard());

numberButtons.forEach(el => {
  el.addEventListener('click', (event) => {
    et = event.target;
    stateLogic(et.innerHTML);
  
  });
});

operandButtons.forEach(el => {
  el.addEventListener('click', (event) => {
    et = event.target;

    if (state === 11 && et.innerHTML==='-' && inputNumberOne.length===0){
      display.innerHTML='-';
      inputNumberOne.push('-')
    } 

    if (state === 22){
      state = 23;
      console.log('STATE IS NOW 23 OPB')
      stateLogic(et.innerHTML);
    }
    
    if (state === 12 || state === 22) {
      operand = et.innerHTML;
      amountOfOperands++;
      if (amountOfOperands > 1) {
        operand = et.innerHTML;
        state = 0;
        console.log('STATE IS NOW 0 OPB')
        stateLogic(et.innerHTML);
      }
      stateLogic(et.innerHTML);
      state = 21;
      console.log('STATE IS NOW 21 OPB')
    }
  
  });
});

eqButton.addEventListener('click', (event) => {
    et = event.target;

    if (state === 22) {
      state = 23;
      console.log('STATE IS NOW 23 EQB')
      stateLogic(et.innerHTML);
    }
});


function stateLogic(value) {

  switch (state) {
    case 11:
      inputNumberOne.push(value);
      display.innerHTML+=value;
      state = 12;
      console.log('STATE IS NOW 12 SL')
      break;
    case 12:
      if (!operandList.includes(value)) inputNumberOne.push(value);
      display.innerHTML+=value;
      break;
    case 21:
      inputNumberTwo.push(value);
      display.innerHTML+=value;
      state = 22;
      console.log('STATE IS NOW 22 SL');
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
      console.log(`error, state is ${state}`);
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
      console.log('no operator found that matches ', operand);
  }
}


function add() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`${inputNumberOne} KKK ${inputNumberTwo} DONE ${in1} KKK ${in2}`);
  let sum = Number(in1)+Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function subtract() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`${inputNumberOne} KKK ${inputNumberTwo} DONE ${in1} KKK ${in2}`);
  let sum = Number(in1)-Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function multiply() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`${inputNumberOne} KKK ${inputNumberTwo} DONE ${in1} KKK ${in2}`);
  let sum = Number(in1)*Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function divide() {
  let in1 = inputNumberOne.join('');
  let in2 = inputNumberTwo.join('');
  //console.log(`${inputNumberOne} KKK ${inputNumberTwo} DONE ${in1} KKK ${in2}`);
  let sum = Number(in1)/Number(in2);
  let sumRounded = Math.round(sum * 10) / 10
  display.innerHTML = sumRounded;
  resetSoft(sumRounded);
}

function resetSoft(in1) {
  inputNumberOne = [in1];
  inputNumberTwo = [];
  operand = null;
  display.innerHTML = in1;
  state = 12;
  console.log('STATE IS NOW 12 RESET')
  amountOfOperands = 0;
}

function resetHard() {
  inputNumberOne = [];
  inputNumberTwo = [];
  operand = null;
  operandStore = null;
  display.innerHTML = '';
  state = 11;
  console.log('STATE IS NOW 11')
  amountOfOperands = 0;
}




// buttons.forEach(el => {
//   el.addEventListener('click', (event) => {
//     et = event.target;

//     //Decide number inputs
//     if (et.classList.contains('num')) {
//       if (!firstInput) {
//         inputNumberTwo.push(et.innerHTML);
//         display.innerHTML += et.innerHTML;
//       }

//       inputNumberOne.push(et.innerHTML);
//       if (display.innerHTML === '0') display.innerHTML = et.innerHTML;
//       else {
//         display.innerHTML += et.innerHTML;
//       } 
//     }

//     //Operand Select
//     if (et.classList.contains('op') &&
//        (inputNumberOne.length !== 0) &&
//        (inputNumberTwo.length === 0)) {
//       firstInput = false;
//       display.innerHTML += et.innerHTML;
//       decideOperand(et.innerHTML);
//       console.log(operand);
//       operandIsDecided = true;
//     }

//     //Equal
//     if (et.classList.contains('eq') && 
//     (inputNumberOne.length !== 0) &&
//     (inputNumberTwo.length !== 0) &&
//     (operandIsDecided)){
//       switch (operand) {
//         case 'add':
//           add();
//           break;
//         case 'subtract':
//           subtract();
//           break;
//         case 'multiply':
//           multiply();
//           break;
//         case 'divide':
//           divide();
//           break;
//         default:
//           console.log(`Nothing matches ${et.innerHTML}.`);
//       }
//     }
//   });
// });
