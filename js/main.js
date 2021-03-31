function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(oper, num1, num2) {
    if (oper == '+') {
        return add(num1, num2);
    } else if (oper == '-') {
        return subtract(num1, num2);
    } else if (oper == '*') {
        return multiply(num1, num2);
    } else if (oper == '/') {
        return divide(num1, num2);
    }
}

const container = document.querySelector('.container');
const display = document.querySelector('.display');
let arr = [];
function calculate(e) {
    let val = e.target.id;
    if(val == 'clr') {
        display.textContent = '';
        arr = [];
    } else {
        if(display.textContent.length < 1 && (val == '-' || !isNaN(val))) {
            display.textContent += val;
        } else if (display.textContent.length == 1 && display.textContent == '-' && !isNaN(val)) {
            display.textContent += val;
        } else {
            let disLen = display.textContent.length;
            if (disLen >= 1 && (val == '+' || val == '-' || val == '*' || val == '/') && display.textContent != '-' &&
                (display.textContent[disLen - 1] != '+' && display.textContent[disLen - 1] != '-' && display.textContent[disLen - 1] != '*' &&
                display.textContent[disLen - 1] != '/')) {
                    arr.push(display.textContent);
                    console.log(arr);
                    display.textContent += val;
                    arr.push(display.textContent.substr(-1,1));
                    console.log(arr);
                    console.log(arr[arr.length - 1]);
            } else if (display.textContent.length >=1 && !isNaN(val)) {
                display.textContent += val;
            }
        }
    }
}

container.addEventListener('click', calculate);