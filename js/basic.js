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
const back = document.getElementById('back');
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
    eq.setAttribute('style','border-bottom-right-radius: 2px');
    period.setAttribute('style', 'border-bottom-left-radius: 2px');
    parenLeft.removeAttribute('style','border-bottom-left-radius: 2px');
    exp.removeAttribute('style','border-bottom-right-radius: 2px');
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
    eq.removeAttribute('style','border-bottom-right-radius: 2px');
    period.removeAttribute('style', 'border-bottom-left-radius: 2px');
    parenLeft.setAttribute('style','border-bottom-left-radius: 2px');
    exp.setAttribute('style','border-bottom-right-radius: 2px');
    container.appendChild(parenLeft);
    container.appendChild(parenRight);
    container.appendChild(exp);
    display.classList.replace('display-basic', 'display-scientific');
    display.appendChild(working);
    display.appendChild(answer);
    display.removeChild(screen);
});

basic.classList.add('basic-clicked');
eq.setAttribute('style','border-bottom-right-radius: 2px');
period.setAttribute('style', 'border-bottom-left-radius: 2px');
display.appendChild(screen);

let val1;
let oper;
let operOK = false;
let minusOK = true;
let decimOK = true;
let finished = false;

function num(e) {
    if (display.classList.contains('display-basic')) {
        if (finished) {
            if (!isNaN(screen.textContent[screen.textContent.length - 1])) {
                screen.textContent = '';
            }
            finished = false;
        }
        screen.textContent += Number(e.target.id);
        operOK = true;
    }
}

function numKey(e) {
    if (display.classList.contains('display-basic')) {
        if (finished) {
            if (!isNaN(screen.textContent[screen.textContent.length - 1])) {
                screen.textContent = '';
            }
            finished = false;
    }
        screen.textContent += Number(e.key);
        operOK = true;
    }
}

function clear() {
    if (display.classList.contains('display-basic')) {
        val1 = null;
        val2 = null;
        oper = null;
        operOK = false;
        decimOK = true;
        minusOK = true;
        screen.textContent = '';
        finished = false;
    }
}

function backspace() {
    if (display.classList.contains('display-basic')) {
        if (finished) {
            val1 = null;
            val2 = null;
            oper = null;
            operOK = false;
            decimOK = true;
            minusOK = true;
            screen.textContent = '';
            finished = false;
        } else if (screen.textContent[screen.textContent.length-1] == '-' && !minusOK) {
            let newStr = Array.from(screen.textContent);
            newStr.pop();
            screen.textContent = newStr.join('');
            minusOK = true;
        } else if (screen.textContent[screen.textContent.length-1] == '.' && !decimOK) {
            let newStr = Array.from(screen.textContent);
            newStr.pop();
            screen.textContent = newStr.join('');
            decimOK = true;
            minusOK = true;
        }else if (!val1) {
            let newStr = Array.from(screen.textContent);
            newStr.pop();
            screen.textContent = newStr.join('');
        } else if (val1 && (!isNaN(screen.textContent[screen.textContent.length-1]))) {
            let newStr = Array.from(screen.textContent);
            newStr.pop();
            screen.textContent = newStr.join('');
        }
    }
}

function operate() {
    if (display.classList.contains('display-basic')) {   
        if (oper == '/') {
            screen.textContent = +(Number(val1) / Number(screen.textContent.replace((val1 + oper), ''))).toFixed(8);
        } else if (oper == '*') {
            screen.textContent = +(Number(val1) * Number(screen.textContent.replace((val1 + oper), ''))).toFixed(8);
        } else if (oper == '-') {
            screen.textContent = +(Number(val1) - Number(screen.textContent.replace((val1 + oper), ''))).toFixed(8);
        } else if (oper == '+') {
            screen.textContent = +(Number(val1) + Number(screen.textContent.replace((val1 + oper), ''))).toFixed(8);
        }
        finished = true;
        if (!/\./.test(screen.textContent)) {decimOK = true;}
    }
}

function outOf() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {operate();}
            val1 = screen.textContent;
            oper = '/'
            screen.textContent += oper;
            operOK = false;
            operOK = false;
            decimOK = true;
            minusOK = true;
        }
    }
}

function times() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {operate();}
            val1 = screen.textContent;
            oper = '*';
            screen.textContent += oper;
            operOK = false;
            decimOK = true;
            minusOK = true;
        }
    }
}

function minus() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {operate();}
            val1 = screen.textContent;
            oper = '-';
            screen.textContent += oper;
            operOK = false;
            minusOK = true;
            decimOK = true;
        } else if (minusOK) {
            screen.textContent += '-';
            minusOK = false;
        }
    }
}

function plus() {
    if (display.classList.contains('display-basic')) {
        if (operOK) {
            if (oper) {operate();}
            val1 = screen.textContent;
            oper = '+';
            screen.textContent += oper;
            operOK = false;
            decimOK = true;
            minusOK = true;
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
            minusOK = true;
        }
    }
}

function dec() {
    if (display.classList.contains('display-basic')) {
        if (decimOK) {
            screen.textContent += '.';
            operOK = false;
            decimOK = false;
            minusOK = false;
        }
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
slash.addEventListener('click', outOf);
star.addEventListener('click', times);
dash.addEventListener('click', minus);
cross.addEventListener('click', plus);
eq.addEventListener('click', equ);
period.addEventListener('click', dec);
back.addEventListener('click', backspace);

window.addEventListener('keydown', (e) => {
    if (display.classList.contains('display-basic')) {
        if (!isNaN(e.key)) {numKey(e);}
        else if (e.key == 'Delete') {clear();}
        else if (e.key == 'Backspace') {backspace();}
        else if (e.key == '.') {dec();}
        else if (e.key == '/') {outOf();}
        else if (e.key == '*') {times();}
        else if (e.key == '-') {minus();}
        else if (e.key == '+') {plus();}
        else if (e.key == 'Enter') {equ();}
    }
});