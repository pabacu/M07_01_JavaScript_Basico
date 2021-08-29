/*variables globales*/
/*funcionamiento*/
/*Se va acumulando las operaciones en calculatedResult hasta que el usuario pulsa en '='*/
/*En la siguiente operación se parte del resultado anterior o bien de cero si el usuari o pulsa en 'AC'*/
/*También es posible borrar el display si no se ha pulsado el operador*/

var isOperator = new RegExp(/[-,+,*,\/]/);
var isNumber = new RegExp(/[0-9]/);
var equationDisplay = (function(){str = document.getElementById('display').innerHTML; return str;});
var setEquationDisplay = function(val){document.getElementById('display').innerHTML = val;}
var calculatedResult = (function(){return document.getElementById('input').innerHTML ;});
var setCalculatedResult = function(val){document.getElementById('input').innerHTML = val;}

/*Evento para capturar teclas*/
window.onload = function(){
      
    window.onkeydown= handleKeyPress = (e) => {
        if (isNumber.test(e.key)) {
            e.preventDefault();
            handleNumbers(e.key);
        } else if (isOperator.test(e.key)) {
            e.preventDefault();
            handleOperators(e.key);
        } else if (e.key === "Backspace") {
            e.preventDefault();
            backspace();
        } else if (e.key === "Enter") {
            e.preventDefault();
            calculate();
        } else if (e.key === "Delete") {
            e.preventDefault();
            clearInput();
        } else if (e.key === ".") {
            e.preventDefault();
            handleDecimal();
        }
    };
};    

/*Borramos el digito uno a uno*/
var backspace = () => {
    var valD = equationDisplay();
    var valR = calculatedResult();
    var a = calculatedResult().charAt(calculatedResult().length - 1);

    if (isOperator.test(a)) {
        return;
    }
    setEquationDisplay(valD.substr(0, valD.length - 1));
    setCalculatedResult(valR.substr(0, valR.length - 1));
};

/*Causistica que evalua que tipo de input ha pulsado el usuario*/
var handleClick = (value) => {
    if (value === ".") {
        handleDecimal();
    }
    if (value === "backspace") {
        backspace();
    }
    if (value === "=") {
        calculate();
    }
    if (value === "AC") {
        clearInput();
    }
    if (isOperator.test(value)) {
        handleOperators(value);
    }
    if (isNumber.test(value)) {
        handleNumbers(value);
    }
};

/*Causistica que se ejecuta si es un número*/
var handleNumbers = (value) => {

    var a = calculatedResult().charAt(calculatedResult().length - 1);
    if (isOperator.test(a)) {
        setEquationDisplay('');
    }
    var valD = equationDisplay();
    var valR = calculatedResult();

    if (
        calculatedResult().length === 1 &&
        calculatedResult().charAt(0) === "0"
    ) {
        setCalculatedResult(value);
        setEquationDisplay(value);
    } else {
        setCalculatedResult(valR += value);
        setEquationDisplay(valD += value);
    }
    if (isOperator.test(calculatedResult)) {
        setCalculatedResult(valR += value);
        setEquationDisplay("");
    }
    
};
/*Cada vez que se pulsa un operador reiniciamos el display y añadimos la operación (digitos y operador) en el string de resultado a calcular */
var handleOperators = (value) => {
    var valD = equationDisplay();
    var valR = calculatedResult();
    var a = equationDisplay().charAt(equationDisplay().length - 1);
    var b = equationDisplay().charAt(equationDisplay().length - 2);

    if (equationDisplay() === "" && value !== "-") return;
    if (
        equationDisplay().length === 1 &&
        isOperator.test(equationDisplay().charAt(0))
    ) {
        return;
    }

    if (isOperator.test(a)) {
        if (value === "-" && isNumber.test(b)) {
            setEquationDisplay(valD += value);
        } else if (isOperator.test(b)) {
            setEquationDisplay(valD);
        } else {
            setEquationDisplay(valD += value);
        }
    } else {
        setEquationDisplay(valD);
    }
    setCalculatedResult(valR + value);
};

/*Se activa cuand oel usauri pulsa '.'*/
var handleDecimal = () => {
    var valD = equationDisplay();
    var valR = calculatedResult();
    
    if (!equationDisplay().includes(".")) {
        if (!equationDisplay()) {
            setEquationDisplay("0");
        }
        setEquationDisplay(valD + ".");
        setCalculatedResult(valR + ".");
    }
};

/*Se activa cuando el usaurio pulsa "="*/
var calculate = () => {
    var valR = calculatedResult();
    if (valR != null && valR.length>0) {
        try {
            /*Se envía el string con las operaciones: Ej. 56+8/2*/
            var result = calc_eval(valR);
            /*S ies necesario, se acortan decimales para que se vea el resultado en pantalla*/
            if(result.toString().length > 10)
            {
                setEquationDisplay(parseFloat(result).toFixed(5));
                setCalculatedResult(parseFloat(result).toFixed(5));
            }
            else
            {
            setEquationDisplay(result);
            setCalculatedResult(result);
            }
        } catch (error) {
            console.log(error);
        }
    }
};

var clearInput = () => {
    setEquationDisplay("");
    setCalculatedResult("0");
};

/*calcula el string acumulado mediante función eval*/
/*todo: a tener en cuenta que no se está agrupando factores entre paréntesis.*/
/*https://www.w3schools.com/jsref/jsref_eval.asp*/
/*buscando observe que se pod'ia hacer con una funci'on constructor*/
/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function*/
function calc_eval(fn){
    return new Function('return ' + fn)();
  }



