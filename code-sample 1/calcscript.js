let add = (num1, num2) => {
  return num1 + num2;
}

let subtract = (num1, num2) => {
  return num1 - num2;
}

let multiply = (num1, num2) => {
  return num1 * num2;
}

let divide = (num1, num2) => {
  return num1 / num2;
}

let operate = (num1, num2, operator) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (operator === "+") {
    return add(num1, num2).toFixed(2);
  }
  if (operator === "-") {
    return subtract(num1, num2).toFixed(2);
  }
  if (operator === "*") {
    return multiply(num1, num2).toFixed(2);
  }
  if (operator === "/") {
    return divide(num1, num2).toFixed(2);
  }
  return "error";
}

var num1;
var num2;
var operator;
var index1 = 0;

let rows = document.querySelectorAll(".row");
for (let row of rows) {
  let nums = row.querySelectorAll(".num");
  let ops = row.querySelectorAll(".op");
  for (let num of nums) {
    num.addEventListener("click", () => {
      let text = num.innerText;
      let curr = document.querySelector("#current");
      curr.innerText = curr.innerText + text;
      if (operator == null) {
        num1 = curr.innerText;
        index1++;
      }
      else {
        num2 = curr.innerText.substring(index1 + 1);
      }
    });
  }
  for (let op of ops) {
    op.addEventListener("click", () => {
      /**
       * operator must only be assigned if num1 exists, 
       * num2 does not and there is not already an operator
       */
      if (operator == null && num1 != null && num2 == null) {
        operator = op.innerText;
        let curr = document.querySelector("#current");
        curr.innerText = curr.innerText + op.innerText;
      }

    });
  }
}

let equal = document.querySelector("#eq");
equal.addEventListener("click", () => {
  if (num2 != null) {
    let newCurr = operate(num1, num2, operator);
    let prev = document.querySelector("#previous");
    let curr = document.querySelector("#current");
    prev.innerText = curr.innerText + "=";
    curr.innerText = newCurr;
    num1 = newCurr;
    operator = null;
    num2 = null;
    index1 = curr.innerText.length;
    test2.innerText = index1;
  }
});


let clr = document.querySelector("#clr");
clr.addEventListener("click", () => {
  let prev = document.querySelector("#previous");
  let curr = document.querySelector("#current");
  prev.innerText = null;
  curr.innerText = null;
  num1 = null;
  num2 = null;
  operator = null;
  index1 = 0;
});