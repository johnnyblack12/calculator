// const one = document.getElementById('1');
// const two = document.getElementById('2');
// const three = document.getElementById('3');
// const four = document.getElementById('4');
// const five = document.getElementById('5');
// const six = document.getElementById('6');
// const seven = document.getElementById('7');
// const eight = document.getElementById('8');
// const nine = document.getElementById('9');
// const zero = document.getElementById('0');
// const add = document.getElementById('+');
// const subtract = document.getElementById('-');
// const multiply = document.getElementById('*');
// const divide = document.getElementById('/');
// const eq = document.getElementById('=');
// const clr = document.getElementById('clr'); 
const container = document.querySelector('.container');
const display = document.querySelector('.display');

let arr = [];

function calculate(e) {
    let val = e.target.id;
    // clear button
    if(val == 'clr') {
        display.textContent = '';
        arr = [];
    // main I/O
    } else {
        let disLen = display.textContent.length;
        let last = disLen - 1;
        // accept negative sign
        if(disLen < 1 && (val == '-' || !isNaN(val))) {
            display.textContent += val;
        // block double operator on leading negative
        } else if (display.textContent == '-' && !isNaN(val)) {
            display.textContent += val;
        } else {
            // accept operators and block doubles
            if (disLen >= 1 && (val == '+' || val == '-' || val == '*' || val == '/') && display.textContent != '-' &&
                (display.textContent[last] != '+' && display.textContent[last] != '-' && display.textContent[last] != '*' &&
                display.textContent[last] != '/')) {
                    display.textContent += val;
            // accept numbers
            } else if (display.textContent.length >=1 && !isNaN(val)) {
                display.textContent += val;
            }
        }
    }
}

// function num(e) {
//     display.textContent += Number(e.target.id);
// }

// one.addEventListener('click', num);
// two.addEventListener('click', num);
// three.addEventListener('click', num);
// four.addEventListener('click', num);
// five.addEventListener('click', num);
// six.addEventListener('click', num);
// seven.addEventListener('click', num);
// eight.addEventListener('click', num);
// nine.addEventListener('click', num);
// zero.addEventListener('click', num);
// add.addEventListener('click', sum)

container.addEventListener('click', calculate);