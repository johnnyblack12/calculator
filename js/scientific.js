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
        // evaluation
        } else if (val == '=') {
            if (working.textContent.length > 0 && leftPar == rightPar && /\d/g.test(working.textContent)) {
                expression = working.textContent;
                parentheses();
                power(); 
                multiply();
                divide();
                add();
                subtract();
                answer.textContent = +expression
            }
        // I/O control
        } else {
            if(!isNaN(val)) {
                working.textContent += val;
                opOK = true;
                if(leftPar>rightPar){decOK = true;}
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
                decOK = true;
            } else if (val == ')' && rightPar<leftPar && working.textContent[last] != '(' && !isNaN(working.textContent[last]) ||
                (!isNaN(working.textContent[last - 1]) && working.textContent[last] == '.')) {
                    working.textContent += val;
                    rightPar++;
                    opOK = true;
            }
        }
    }
}

function power() {
    if (/\^/.test(expression) == true) {
        while(/\^/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\^/.exec(expression)[0];
            let express2 = /\^(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '^' + express2.slice(1);
            let result = String(Math.pow(num1, num2));
            expression = expression.replace(expressTot,result);
        }
    }
}

function multiply() {
    if (/\*/.test(expression) == true) {
        while(/\*/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\*/.exec(expression)[0];
            let express2 = /\*(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '*' + express2.slice(1);
            let result = String(num1 * num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

function divide() {
    if (/\//.test(expression) == true) {
        while(/\//.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\//.exec(expression)[0];
            let express2 = /\/(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '/' + express2.slice(1);
            let result = String(num1 / num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

function add() {
    if (/\+/.test(expression) == true) {
        while(/\+/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\+/.exec(expression)[0];
            let express2 = /\+(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '+' + express2.slice(1);
            let result = String(num1 + num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

function subtract() {
    if (/(\d|\.)\-(\.\d|\d|\-\.\d|\-\d)/.test(expression) == true) {
        while(/(\d|\.)\-(\.\d|\d|\-\.\d|\-\d)/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\-/.exec(expression)[0];
            let express2 = /\-(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(expression)[0];
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '-' + express2.slice(1);
            let result = String(num1 - num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

function parentheses() {
    if (/\(/.test(expression) == true) {
        expression.replace(/\)\(/g, ')*(');
        while(/\(/.test(expression)) {
            let iso = /\(([0-9]|[\+\-\*\/\^\.])+\)/.exec(expression)[0];
            if (/(\d|\d\.)\(([0-9]|[\+\-\*\/\^\.])+\)/.test(expression)) {
                expression = expression.replace(iso, ('*' + iso));
            }
            if (/\(([0-9]|[\+\-\*\/\^\.])+\)(\d|\.\d)/.test(expression)) {
                expression = expression.replace(iso, (iso + '*'));
            }
            let newExpress = iso.slice(1, (iso.length - 1));
            if (/\^/.test(newExpress) == true) {
                while(/\^/.test(newExpress)) {
                    let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\^/.exec(newExpress)[0];
                    let express2 = /\^(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(newExpress)[0];
                    let num1 = Number(express1.slice(0, (express1.length - 1)));
                    let num2 = Number(express2.slice(1));
                    let expressTot = express1.slice(0, (express1.length - 1)) + '^' + express2.slice(1);
                    let result = String(Math.pow(num1, num2));
                    newExpress = newExpress.replace(expressTot,result);
                }
            }
            if (/\*/.test(newExpress) == true) {
                while(/\*/.test(newExpress)) {
                    let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\*/.exec(newExpress)[0];
                    let express2 = /\*(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(newExpress)[0];
                    let num1 = Number(express1.slice(0, (express1.length - 1)));
                    let num2 = Number(express2.slice(1));
                    let expressTot = express1.slice(0, (express1.length - 1)) + '*' + express2.slice(1);
                    let result = String(num1 * num2);
                    newExpress = newExpress.replace(expressTot,result);
                }
            }
            if (/\//.test(newExpress) == true) {
                while(/\//.test(newExpress)) {
                    let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\//.exec(newExpress)[0];
                    let express2 = /\/(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(newExpress)[0];
                    let num1 = Number(express1.slice(0, (express1.length - 1)));
                    let num2 = Number(express2.slice(1));
                    let expressTot = express1.slice(0, (express1.length - 1)) + '/' + express2.slice(1);
                    let result = String(num1 / num2);
                    newExpress = newExpress.replace(expressTot,result);
                }
            }
            if (/\+/.test(newExpress) == true) {
                while(/\+/.test(newExpress)) {
                    let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\+/.exec(newExpress)[0];
                    let express2 = /\+(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(newExpress)[0];
                    let num1 = Number(express1.slice(0, (express1.length - 1)));
                    let num2 = Number(express2.slice(1));
                    let expressTot = express1.slice(0, (express1.length - 1)) + '+' + express2.slice(1);
                    let result = String(num1 + num2);
                    newExpress = newExpress.replace(expressTot,result);
                }
            }
            if (/(\d|\.)\-(\.\d|\d|\-\.\d|\-\d)/.test(newExpress) == true) {
                while(/(\d|\.)\-(\.\d|\d|\-\.\d|\-\d)/.test(newExpress)) {
                    let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\-/.exec(newExpress)[0];
                    let express2 = /\-(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(newExpress)[0];
                    let num1 = Number(express1.slice(0, (express1.length - 1)));
                    let num2 = Number(express2.slice(1));
                    let expressTot = express1.slice(0, (express1.length - 1)) + '-' + express2.slice(1);
                    let result = String(num1 - num2);
                    newExpress = newExpress.replace(expressTot,result);
                }
            }
            expression = expression.replace(iso, newExpress);
        } 
    }
}

container.addEventListener('click', calculate);
