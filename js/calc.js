var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for(var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {

        var input = document.querySelector('.screen');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        if(btnVal.indexOf('÷')==0 && (inputVal == ''||inputVal=="-")){
            e.preventDefault();
            return;
        }else if(btnVal.indexOf('÷')==0 && operators.concat('.').indexOf(inputVal[inputVal.length-1])>=0){
            e.preventDefault();
            return;
        }

        if(btnVal == 'C') {
            input.innerHTML = '';
            decimalAdded = false;
        }
        else if(btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
            if(operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/, '');

            if(equation)
                input.innerHTML = eval(equation);

            // decimalAdded = false;
        }
        else if(operators.indexOf(btnVal) > -1) {

            var lastChar = inputVal[inputVal.length - 1];
            if(inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal.replace(/\s/g,'');

            else if(inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;

            if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal).replace(/\s/g,'');
            }

            decimalAdded =false;
        }
        else if(btnVal == '.') {
            if(!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }
        else {
            input.innerHTML += btnVal.replace(/\s/g,'');;
        }

        e.preventDefault();
    }
}