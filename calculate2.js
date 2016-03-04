// 获取面板上的数值；
var reslut = document.getElementById('result-screen');


//获取面板数值函数
function getResult() {
    return reslut.getAttribute('value');
}

//面板上数值的更新函数
function updateResult(text) {
    if (reslut == "") {
        text = 0;
    } else if (reslut == 'Infinity') {
        text = '∞';
    }
    reslut.setAttribute('value', text)

}


//其他功能处理（清除，退格，sin cos,小数点,平方，开方）
//储存其他功能按钮
var otherFun = document.getElementsByClassName('other_fun');
//绑定函数
for (var j = 0; j < otherFun.length; j++) {
    otherFun[j].addEventListener('click', fun_other);
};
//其他功能函数运算

var countType = ''; //储存+-*/

function fun_other() {

    switch (this.value) {
        case 'delete': //退格
            updateResult(getResult().slice(0, -1));
            break;
        case 'clean': //清除
            updateResult('0');
            break;
        case 'point':
            if (getResult().indexOf(".") >= 0) {
                return;
            } else {
                updateResult(getResult().concat("."))
            }
            break;
        case 'sin':
            updateResult(Math.sin(getResult()));
            break;
        case 'cos':
            updateResult(Math.cos(getResult()));

            break;
        case 'pow': //平方
            updateResult(Math.pow(getResult(), 2));
            break;
        case 'sqrt': //开方
            updateResult(Math.sqrt(getResult()));

            break;
        default: //+-*/先储存

            countType = this.value;
            console.log(countType);
    }
}


//数字0-9的处理
//获取数字取值
var number = document.getElementsByClassName('number');
//绑定函数
for (var k = 0; k < number.length; k++) {
    number[k].addEventListener('click', fun_number);
}

var ans = 0,
    inputNum2 = false;
//数字函数运算处理
function fun_number() {

    var padValue;
    padValue = getResult();

    //检查是否已按下运算符
    if (countType != '' && !inputNum2) {
        ans = padValue; //储存按下运算符之前的数字
        inputNum2 = true; //已按下运算符，则开启
        padValue = '0'; //清空所得的值，用以储存第二个值
    }

    if (countType == '' && inputNum2) {
        padValue = '0';
    }

    padValue = (padValue == '0') ? this.value : padValue.concat(this.value);

    updateResult(padValue);
}


// =处理
var countLable = document.getElementById('fun_count');

//运算符绑定操作运算函数事件
countLable.addEventListener('click', fun_count);

function fun_count() {
    if (countType != '' && !inputNum2) {
        return;
    }
    var r = 0;
    var op1 = new Number(ans);
    var op2 = new Number(getResult());
    switch (countType) {
        case '+':
            r = op1 + op2;
            break;
        case '-':
            r = parseFloat(op1) - parseFloat(op2);
            break;
        case '*':
            r = parseFloat(op1) * parseFloat(op2);
            break;
        case '/':
            r = parseFloat(op1) / parseFloat(op2);
            break;
        // case 'rest':
        //     r = parseFloat(op1) \ parseFloat(op2);
        //     break;

    }
    console.log(this.value);
    console.log(r);
    console.log(op1 + " " + op2)
    updateResult(r);
    ans = r;
    inputNum2 = false;
    countType = '';
}
