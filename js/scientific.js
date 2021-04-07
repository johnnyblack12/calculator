let expression;
let decOK = true;
let opOk = false;
let negOK = true;
let leftPar = 0;
let rightPar = 0;

let complete = false;

function calculate(e) {
    if (display.classList.contains('display-scientific')) {
        let val = e.target.id;
        let last = working.textContent.length - 1;
        // handle backspace on evaluated expression
        if (val == 'back' && complete) {
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
            complete = false;
        }
        // restart if input after evaluated expression
        if (complete) {
            working.textContent = answer.textContent;
            answer.textContent = null;
            complete = false;
        }
        // clear button
        if (val == 'clr') {
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
        // backspace
        } else if (val == 'back') {
            let newStr = Array.from(working.textContent);
            let newStrLast = newStr[newStr.length-1];
            let newStrLast2 = newStr[newStr.length-2];
            if (newStr.length == 1) {
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
            } else if (!isNaN(newStrLast) && isNaN(newStrLast2)) {
                opOK = false;
                if(leftPar>rightPar){decOK = false;}
            } else if (newStrLast == '-' && !negOK) {
                negOK = true;
                decOK = false;
            } else if ((newStrLast == '+' || newStrLast == '-' || newStrLast == '*' || newStrLast == '/' || newStrLast == '^') & !opOK) {
                opOK = true;
                negOK = false;
                decOK = false;
            } else if (newStrLast == '.') {
                decOK = true;
            } else if (newStrLast == '(') {
                leftPar--;
                opOK = true;
                decOK = false;
            } else if (newStrLast == ')') {
                rightPar--;
                opOK = false;
            }
            newStr.pop();
            working.textContent = newStr.join('');
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
                answer.textContent = +String(Number(expression).toFixed(8));
                complete = true;
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
    if (/\^/.test(expression)) {
        while(/\^/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.)\^/.exec(expression)[0];
            if (expression[expression.indexOf(express1)-1] == '-' && (isNaN(expression[expression.indexOf(express1)-2]) || expression.indexOf(express1)-1 == 0)) {
                express1 = '-' + express1;
            }
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
    if (/\*/.test(expression)) {
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
    if (/\//.test(expression)) {
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
    if (/\+/.test(expression) && !/e\+/.test(expression)) {
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
    if (/(\d|\.)\-(\.\d|\d|\-\.\d|\-\d)/.test(expression) && !/e\-/.test(expression)) {
        while(/(\d|\.)\-(\.\d|\d|\-\.\d|\-\d)/.test(expression)) {
            let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)\-/.exec(expression)[0];
            let express2 = /(\d|\.)\-(\d+\.\d+|\d+|\.\d+|\d+\.|\-\d+\.\d+|\-\d+|\-\.\d+|\-\d+\.)/.exec(expression)[0];
            express2 = express2.slice(1);
            let num1 = Number(express1.slice(0, (express1.length - 1)));
            let num2 = Number(express2.slice(1));
            let expressTot = express1.slice(0, (express1.length - 1)) + '-' + express2.slice(1);
            let result = String(num1 - num2);
            expression = expression.replace(expressTot,result);
        }
    }
}

function parentheses() {
    if (/\(/.test(expression)) {
        expression.replace(/\)\(/g, ')*(');
        while(/\(/.test(expression)) {
            let iso = /\(([0-9]|[\+\-\*\/\^\.])+\)/.exec(expression)[0];
            if ((expression[expression.indexOf(iso) - 1] == '.' && !isNaN(expression[expression.indexOf(iso) - 1])) ||
                !isNaN(expression[expression.indexOf(iso) - 1])) {
                    expression = expression.replace(iso, ('*' + iso));
            }
            if ((expression[expression.indexOf(iso) + iso.length] == '.' && !isNaN(expression[expression.indexOf(iso) + iso.length + 1])) ||
                !isNaN(expression[expression.indexOf(iso) + iso.length])) {
                    expression = expression.replace(iso, (iso + '*'));
            }
            let newExpress = iso.slice(1, (iso.length - 1));
            if (/\^/.test(newExpress) == true) {
                while(/\^/.test(newExpress)) {
                    let express1 = /(\d+\.\d+|\d+|\.\d+|\d+\.)\^/.exec(newExpress)[0];
                    if (newExpress[newExpress.indexOf(express1)-1] == '-' && isNaN(newExpress[newExpress.indexOf(express1)-2])) {
                        express1 = '-' + express1;
                    }
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
