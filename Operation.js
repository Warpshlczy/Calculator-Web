/*
 * @Descripttion: 计算器核心逻辑
 * @Author: Chen Zhengyi
 * @Date: 2023-10-10 19:36:13
*/

//js主线程
var panel = document.getElementsByClassName("operation-zone")[0];
var btnNameList = ["C", "B", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", ".", "0", "^", "sin", "cos"];
initButton(20);
// 以下是各绑定函数

//1.cal()函数负责对输入内容进行基本计算，包括计算顺序、取值，涵盖加减乘除和幂运算等
function calc(value) {
    //定义运算符数组
    let operators = [];
    //使用正则表达式匹配基本运算符号，即加减乘除幂，并将计算数存入数组
    let nums = value.split(/[\+\-\*\/\^]/);
    for (let i = 0; i < value.length; i++) {
        if ((value[i] == '+' || value[i] == '-' || value[i] == '*' || value[i] == '/' || value[i] == '^')) {
            if ((i != 0 && i != value.length - 1) && (value[i + 1] != '+' && value[i + 1] != '-' && value[i + 1] != '*' && value[i + 1] != '/') && value[i + 1] != '^') {
                operators.push(value[i]);
            }
            else if (i == 0 && (value[i] == '+' || value[i] == '-')) {
                nums[0] = '0';
                //对出现在第一位的运算符号判断合理性
                operators.push(value[i]);
            }
            //若不满足匹配条件，则返回error
            else {
                return "error";
            }
        }
    }
    //根据数组和运算符号进行运算，先乘除幂，后加减
    for (let i = 0; i < operators.length; i++) {
        if (numSwitch(nums[i]) != "error" && numSwitch(nums[i + 1]) != "error") {
            if (operators[i] == '*') {
                let product = numSwitch(nums[i]) * (numSwitch(nums[i + 1]))
                nums[i] = "" + product;
                nums.splice(i + 1, 1);
                operators.splice(i, 1);
                i = -1;
            }
            else if (operators[i] == '/') {
                if (numSwitch(nums[i + 1]) != 0) {
                    let division = numSwitch(nums[i]) / (numSwitch(nums[i + 1]))
                    nums[i] = "" + division;
                    nums.splice(i + 1, 1);
                    operators.splice(i, 1);
                    i = -1;
                }
                else { return "error" }
            }
            else if (operators[i] == '^') {
                let power = Math.pow(numSwitch(nums[i]), numSwitch(nums[i + 1]));
                nums[i] = "" + power;
                nums.splice(i + 1, 1);
                operators.splice(i, 1);
                i = -1;
            }
        }
        else { return "error" }
    }

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == '+') {
            let addition = numSwitch(nums[i]) + (numSwitch(nums[i + 1]))
            nums[i] = "" + addition;
            nums.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;

        }
        else if (operators[i] == '-') {
            let substraction = numSwitch(nums[i]) - (numSwitch(nums[i + 1]))
            nums[i] = "" + substraction;
            nums.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }
    if (operators[0] == null) {
        return numSwitch(nums[0]);
    }
    else return "error";
}
/*
let newVal = "";
for (let i = 0; i < value.length; i++) {
    let newStr = "";
    if (value[i] == '*' || '/') {
        let leftNum, rightNum, leftIndex = 0;
        let rightIndex = value.length - 1;
        for (let former = i; former >= 0; former--) {
            if (value[i] == '+' || '-') {
                leftIndex = former + 1;
                leftNum = parseInt(value.substring(leftIndex, i));
                break;
            }
        }

        for (let later = i; later < value.length; later++) {
            if (value[i] == '+' || '-' || '*' || '/') {
                rightIndex = later;
                rightNum = parseInt(value.substring(i + 1, rightIndex));
                break;
            }
        }

        if (value[i] == '*') {
            newStr = "" + (leftNum * rightNum);
        }

        else { newStr = "" + (leftNum / rightNum); }
        newVal = value.replace(value.substring(leftIndex, rightIndex), newStr);
        break;
    }
    if (i == value.length - 1) {
        for (let k = 0; k < value.length; k++) {
            let flag = value.length - 1;
            if (value[k] == '+' || '-') {
                for (let h = k; h < value.length; h++) {
                    if (value[h] == '+' || '-') {
                        flag = h;
                        break;
                    }

                }
                if (value[k] == '+') { newStr = "" + parseInt(value.substring(0, k)) + parseInt(value.substring(k + 1, flag)) }
                else { newStr = "" + parseInt(value.substring(0, k)) - parseInt(value.substring(k + 1, flag)) }
                newVal = value.replace(value.substring(0, flag), newStr);
                break;
            }
            if (k == value.length - 1) {
                return value;
            }
        }
    }
}
return calc(newVal);

for (let i = 0; i < 20; i++) {
    let btn = document.createElement("button");
    panel.appendChild(btn);
    btn.setAttribute("class", "btn");
    btn.setAttribute("id", btnNameList[i]);
    let id = btn.getAttribute("id");
    btn.setAttribute("value", id);
    btn.innerHTML = id;
    let addFun = "oper('" + id + "')";
    btn.setAttribute("onclick", addFun);
    adjustBtn(btn);
}
*/

//3.adjustBtn() 调整按钮的数量布局和大小
function adjustBtn(btn) {
    btn.style.height = btn.offsetWidth + "px";
}

//4.initButton() 初始化按钮
function initButton(btnNum) {
    for (let i = 0; i < btnNum; i++) {
        let btn = document.createElement("button");
        panel.appendChild(btn);
        btn.setAttribute("class", "btn");
        //设置DOM元素属性并转化为实际html元素渲染
        btn.setAttribute("id", btnNameList[i]);
        let id = btn.getAttribute("id");
        btn.setAttribute("value", id);
        btn.innerHTML = id;
        let addFun = "oper('" + id + "')";
        btn.setAttribute("onclick", addFun);
        adjustBtn(btn);
    }
}

//5.oper() 按钮绑定事件
function oper(value) {
    let inputZone = document.getElementById("input");
    let input = inputZone.value;

    if (value == '=') {
        inputZone.value = calc(input);
    }
    else if (value == 'B') {
        let newVal = input.substring(0, input.length - 1);
        // document.getElementById("input").setAttribute("value", newVal);
        inputZone.value = newVal;
    }
    else if (value == 'C') {
        // document.getElementById("input").setAttribute("value", "");
        inputZone.value = "";
    }
    else {
        let newVal = input + value;
        inputZone.value = newVal;
    }
}

//6.numSwitch() 对分离的操作数内部进行特殊计算
function numSwitch(num) {
    let result = 1;
    let regMatchSpecial = /sin|cos/;
    let nums = num.split(regMatchSpecial);
    let operators = num.match(regMatchSpecial);
    if (nums[0] != '') { result *= parseFloat(nums[0]) }
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] == '' || nums[i].split('.').length == 3 || nums[i].split(".")[0] == '') { return "error" }
        switch (operators[i - 1]) {
            case "sin":
                result *= Math.sin(parseFloat(nums[i]) * Math.PI / 180)
                break;
            case "cos":
                result *= Math.cos(parseFloat(nums[i]) * Math.PI / 180)
                break;
            default:
                return "error"
        }
    }
    return result;
    // let regMatchSpecial = [/sin/, /cos/];
    // let regMatchDot = /[\.]/;
    // let specialCounter, dotCounter = 0;
    // for (let i = 0; i < regMatch.length; i++) {
    //     specialCounter += num.match(regMatchSpecial[i]).length;
    //     // if (regMatch[i].test(num)) {
    //     //     switch (i) {
    //     //         case 0:
    //     //             num.split(regMatch[i])
    //     //             return Math.sin(num * Math.PI / 180);
    //     //         case 1: return Math.cos(num * Math.PI / 180);
    //     //         case 2: return parseDouble(num);
    //     //     }
    //     // }
    //     // else { return parseInt(num); }
    // }
    // dotCounter += num.match(regMatchDot).length;
    // if (specialCounter > 1 || regMatchDot > 1) { return "error" }

}


