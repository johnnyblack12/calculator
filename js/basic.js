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

// declare scientific variables
const container = document.getElementById('container');
const display = document.getElementById('display');
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

basic.addEventListener('click', () => {
    scientific.classList.remove('scientific-clicked');
    basic.classList.add('basic-clicked');
    working.textContent = '';
    container.classList.replace('container-scientific', 'container-basic');
    container.removeChild(parenLeft);
    container.removeChild(parenRight);
    container.removeChild(exp);
    display.classList.replace('display-scientific', 'display-basic');
    display.removeChild(working);
    display.removeChild(answer);
});

scientific.addEventListener('click', () => {
    basic.classList.remove('basic-clicked');
    scientific.classList.add('scientific-clicked');
    display.textContent = '';
    container.classList.replace('container-basic', 'container-scientific');
    container.appendChild(parenLeft);
    container.appendChild(parenRight);
    container.appendChild(exp);
    display.classList.replace('display-basic', 'display-scientific');
    display.appendChild(working);
    display.appendChild(answer);
});

basic.classList.add('basic-clicked');

function num(e) {
    if (display.classList.contains('display-basic')) {
    display.textContent += Number(e.target.id);
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