let expression;
let decOK = true;
let opOk = false;
let negOK = true;
let leftPar = 0;
let rightPar = 0;
let parOK = false;

function calculate(e) {
    if (display.classList.contains('display-scientific')) {
        let val = e.target.id;
        let last = working.textContent.length - 1;
        // clear button
        if(val == 'clr') {
            working.textContent = '';
            answer.textContent = '';
            decOK = true;
            opOk = false;
            negOK = true;
            paren = false;
            expOK = false;
            finish = false;
            leftPar = 0;
            rightPar = 0;
            reduced = 0;
            expression = null;
        // main I/O
        } else if (val == '=') {
            if (working.textContent.length > 0 && leftPar == rightPar) {
                expression = working.textContent;
                raise(); 
                times();
                divided();
                answer.textContent = expression;
                console.log(expression);
            }
        } else {
            if(!isNaN(val)) {
                working.textContent += val;
                opOK = true;
            } else if (val == '-' && negOK)  {
                working.textContent += val;
                negOK = false;
                decOK = true;
            } else if ((val == '+' || val == '-' || val == '*' || val == '/' || val == '^') && opOK) {
                working.textContent += val;
                opOK = false;
                negOK = true;
                decOK = true;
            } else if (val == '.' && decOK) {
                working.textContent += val;
                decOK = false;
            } else if (val == '(' && leftPar>=rightPar) {
                working.textContent += val;
                leftPar++;
                opOK = false;
            } else if (val == ')' && rightPar<leftPar && working.textContent[last] != '(' && (working.textContent[last] != '.' &&
                isNaN(working.textContent[last-1]))) {
                    working.textContent += val;
                    rightPar++;
                    opOK = true;
            }
        }
    }
}

function raise() {
    if (/\^/.test(expression) == true) {
        while(/\^/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.)\^/.exec(expression)[0];
            let express2 = /\^(\d+|\d+\.\d+|\.\d+|\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '^' + express2.slice(1);
            let result = String(Math.pow(num1, num2));
            expression = expression.replace(expressTot,result);
        }
    }
}

function times() {
    if (/\*/.test(expression) == true) {
        while(/\*/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.)\*/.exec(expression)[0];
            let express2 = /\*(\d+|\d+\.\d+|\.\d+|\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '*' + express2.slice(1);
            let result = String(num1 * num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

function divided() {
    if (/\//.test(expression) == true) {
        while(/\//.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.)\//.exec(expression)[0];
            let express2 = /\/(\d+|\d+\.\d+|\.\d+|\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '/' + express2.slice(1);
            let result = String(num1 / num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

container.addEventListener('click', calculate);
