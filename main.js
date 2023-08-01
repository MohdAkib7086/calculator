
let screen = document.querySelector("input");

let btnlength = document.querySelectorAll(".button").length;
console.log(eval);

console.log(btnlength);

for (var i = 0; i < btnlength; i++) {
    document.querySelectorAll(".button")[i].addEventListener("click", function () {

        let typetext = this.innerHTML;
        
        
        if (typetext == "x") {
            typetext = "*";
            screen.value += typetext;
        }

        else if (typetext == "=") {
            try {
              let result=calculate(screen.value);
                // let result = eval(screen.value);

                screen.value = result;
            }
            catch (err) {
                screen.value = "Invalid Input";
            }
        }

        else if (typetext == "DEL") {
            screen.value=screen.value.slice(0,-1);
        }

        else if (typetext == "AC") {
            screen.value = "";
        }

        else {
            screen.value += typetext;
        }
    })
}



const calculate = s => {
  const values = [];
  const ops = [];

  for (let i = 0; i < s.length; i++) {

    if (s[i] === ' ') {
      continue;
    }

    if (s[i] >= '0' && s[i] <= '9') {
      let buffer = '';
      
      while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        buffer += s[i++];
      }
      values.push(parseInt(buffer));
      i--; 
    }
   
    else if (s[i] === '(') {
      ops.push(s[i]);
    }
 
    else if (s[i] === ')') {
      while (ops[ops.length - 1] !== '(') {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }
      ops.pop();
    }

    else if (s[i] === '+' || s[i] === '-' || s[i] === '*' || s[i] === '/') {

      while (ops.length && hasPrecedence(s[i], ops[ops.length - 1])) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }

      ops.push(s[i]);
    }
  }

  while (ops.length) {
    values.push(applyOp(ops.pop(), values.pop(), values.pop()));
  }

  return values.pop();
};

const hasPrecedence = (op1, op2) => {
  if (op2 === '(' || op2 === ')') {
    return false;
  }
  if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) {
    return false;
  }
  return true;
};


const applyOp = (op, b, a) => {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw 'Cannot divide by zero';
      }
      return Math.floor(a / b);
  }
  return 0;
};