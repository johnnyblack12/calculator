const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');
const zero = document.getElementById('0');
const eq = document.getElementById('=');
const clr = document.getElementById('clr');
const slash = document.getElementById('/');
const star = document.getElementById('*');
const dash = document.getElementById('-');
const cross = document.getElementById('+');
const period = document.getElementById('.');

const container = document.getElementById('container');
const display = document.getElementById('display');
const screen = document.createElement('div');
screen.classList.add('screen');
const basic = document.querySelector('.basic');
const scientific = document.querySelector('.scientific');
const working = document.createElement('div');
working.classList.add('working');
const answer = document.createElement('div');
answer.classList.add('answer');
const parenLeft = document.createElement('div');
parenLeft.classList.add('paren-left');
parenLeft.id = '(';
parenLeft.textContent = '(';
const parenRight = document.createElement('div');
parenRight.classList.add('paren-right');
parenRight.id = ')';
parenRight.textContent = ')';
const exp = document.createElement('div');
exp.classList.add('exp');
exp.id = '^';
exp.textContent = '^';

// switch
basic.addEventListener('click', () => {
    scientific.classList.remove('scientific-clicked');
    basic.classList.add('basic-clicked');
    working.textContent = '';
    container.classList.replace('container-scientific', 'container-basic');
    container.removeChild(parenLeft);
    container.removeChild(parenRight);
    container.removeChild(exp);
    display.classList.replace('display-scientific', 'display-basic');
    display.appendChild(screen);
    display.removeChild(working);
    display.removeChild(answer);
});

scientific.addEventListener('click', () => {
    basic.classList.remove('basic-clicked');
    scientific.classList.add('scientific-clicked');
    screen.textContent = '';
    container.classList.replace('container-basic', 'container-scientific');
    container.appendChild(parenLeft);
    container.appendChild(parenRight);
    container.appendChild(exp);
    display.classList.replace('display-basic', 'display-scientific');
    display.appendChild(working);
    display.appendChild(answer);
    display.removeChild(screen);
});

basic.classList.add('basic-clicked');
display.appendChild(screen);

let val1;
let oper;
let operOK = false;
let decimOK = true;
let finished = false;

function num(e) {
    if (display.classList.contains('display-basic')) {
        if (finished) {
            screen.textContent = '';
            finished = false;
        }
        screen.textContent += Number(e.target.id);
        operOK = true;
    }
}

function clear() {
    if (display.classList.contains('display-basic')) {
        val1 = null;
        val2 = null;
        oper = null;
        screen.textContent = '';
    }
}

function operate() {
    if (oper == '/') {
        screen.textContent = +(Number(val1) / Number(screen.textContent.replace((val1 + oper), ''))).toFixed(6);
    } else if (oper == '*') {
        screen.textContent = +(Number(val1) * Number(screen.textContent.replace((val1 + oper), ''))).toFixed(6);
    } else if (oper == '-') {
        screen.textContent = +(Number(val1) - Number(screen.textContent.replace((val1 + oper), ''))).toFixed(6);
    } else if (oper == '+') {
        screen.textContent = +(Number(val1) + Number(screen.textContent.replace((val1 + oper), ''))).toFixed(6);
    }
}

function divide() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {
                operate();
                val1 = screen.textContent;
                oper = '/';
                screen.textContent += oper;
                operOK = false;
            } else {
                val1 = screen.textContent;
                screen.textContent += '/'
                oper = '/'
                operOK = false;
            }
            decimOK = true;
        }
    }
}

function times() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {
                operate();
                val1 = screen.textContent;
                oper = '*';
                screen.textContent += oper;
                operOK = false;
            } else {
                val1 = screen.textContent;
                screen.textContent += '*'
                oper = '*'
                operOK = false;
            }
            decimOK = true;
        }
    }
}

function minus() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {
                operate();
                val1 = screen.textContent;
                oper = '-';
                screen.textContent += oper;
                operOK = false;
            } else if (screen.textContent != '') {
                val1 = screen.textContent;
                screen.textContent += '-'
                oper = '-'
                operOK = false;
            }
            decimOK = true;
        } else {
            screen.textContent += '-';
        }
    }
}

function plus() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {
                operate();
                val1 = screen.textContent;
                oper = '+';
                screen.textContent += oper;
                operOK = false;
            } else {
                val1 = screen.textContent;
                screen.textContent += '+'
                oper = '+'
                operOK = false;
            }
            decimOK = true;
        }
    }
}

function equ() {
    if (display.classList.contains('display-basic')) {
        if (oper) {
            operate();
            val1 = screen.textContent;
            oper = null;
            decimOK = true;
        }
    }
}

function dec() {
    if (display.classList.contains('display-basic')) {
        screen.textContent += '.';
        decimOK = false;
    }
}


one.addEventListener('click', num);
two.addEventListener('click', num);
three.addEventListener('click', num);
four.addEventListener('click', num);
five.addEventListener('click', num);
six.addEventListener('click', num);
seven.addEventListener('click', num);
eight.addEventListener('click', num);
nine.addEventListener('click', num);
zero.addEventListener('click', num);
clr.addEventListener('click', clear);
slash.addEventListener('click', divide);
star.addEventListener('click', times);
dash.addEventListener('click', minus);
cross.addEventListener('click', plus);
eq.addEventListener('click', equ);
period.addEventListener('click', dec);

