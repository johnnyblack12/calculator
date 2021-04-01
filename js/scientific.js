let arr = [];
let decOk = true;
function calculate(e) {
    if (display.classList.contains('display-scientific')) {
        let val = e.target.id;
        // clear button
        if(val == 'clr') {
            working.textContent = '';
            answer.textContent = '';
            decOk = true;
            arr = [];
        // main I/O
        } else {
            let exLen = working.textContent.length;
            let last = exLen - 1;
            // accept only negative sign, decimal, or number on first digit
            if(exLen < 1 && (val == '-' || val == '.' || !isNaN(val))) {
                working.textContent += val;
            // block double operator on leading negative
            } else if (working.textContent == '-' && !isNaN(val)) {
                working.textContent += val;
            } else {
                // accept operators and block doubles
                if (exLen >= 1 && (val == '+' || val == '-' || val == '*' || val == '/') && working.textContent != '-' &&
                    (working.textContent[last] != '+' && working.textContent[last] != '-' &&
                    working.textContent[last] != '*' && working.textContent[last] != '/')) {
                        decOk = true;
                        working.textContent += val;
                // accept numbers
                } else if (exLen >=1 && !isNaN(val)) {
                    working.textContent += val;
                // accept decimal only after number
                } else if (val == '.' && decOk == true) {
                    decOk = false;
                    working.textContent += val;
                }
            }
        }
    }
}

container.addEventListener('click', calculate);