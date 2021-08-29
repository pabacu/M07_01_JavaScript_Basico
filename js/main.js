function openTabs(evt, tab) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
}

//ejer-1
function helloword() {
  console.log("Hello Word");
}

//ejer-2
function showalert() {
  alert("¡Me llamo Pablo!");
}

//ejer-3
function showname() {
  //preserve the value with const
  const name = "Pablo";
  const familyname = "Acuña";
  console.log("Mi nombre es " + name + " " + familyname);
}

//ejer-4
function sum() {
  var num1 = 34;
  var num2 = 56;
  console.log("La suma entre " + num1 + " + " + num2 + " es " + (num1 + num2));
}

//ejer-5
function checkresult() {
  var nota = parseFloat(document.form_nota.quantity.value);
  if (nota != undefined && !isNaN(nota) && nota >= 0 && nota <= 10) {
    alert(nota < 5 ? "lo sentimos, con un " + nota + " has de esforzarte más." : "Enhorabuena pasas el exámen con una nota de " + nota);
  } else {
    alert("La nota introducida ha de estar comprendida entre 0 y 10");
    document.form_nota.quantity.value = "";
  }
}

//ejer-6
function ejer6() {
  console.log("Tinc un cotxe de color blau");
  console.log("blau >> verd");
  console.log(replacefun("Tinc un cotxe de color blau", "blau", "verd"));
  console.log("o >> u");
  console.log(replacefun("Tinc un cotxe de color blau", "o", "u"));
}

function replacefun(originaltxt, wordsearch, word) {
  return originaltxt.replaceAll(wordsearch, word);
}


//ejer-7
function showposition() {
  const objs = ["Taula", "Cadira", "Ordinador", "Llibreta"];
  var pos = 0;
  objs.forEach(element => {
    console.log("Objecte [" + element + "] està a la posició " + pos);
    pos++;
  });

}

//ejer-8
function calculadora(operator, value1, value2) {
  var result = "";
  event.preventDefault();

  if (!is_Number(value1) || !is_Number(value2)) {
    result = "Introduzca solo valores numéricos.";
  }
  else {

    value1 = parseFloat(value1);
    value2 = parseFloat(value2);

    switch (operator) {
      case "+":
        result = (value1 + value2);
        break;
      case "-":
        result = (value1 - value2);
        break;
      case "*":
        result = (value1 * value2);
        break;
      case "/":
        result = (value1 / value2);
        if (result !== result) {
          result = "Error DIV/#0";
          document.getElementById('result').innerHTML = "El resultado es: " + result;
          throw new Error(value1 + " / " + value2);
        }
        break;
    }
  }
  document.getElementById('result').innerHTML = "El resultado es: " + FormatDE(result);
}

function is_Number(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function FormatDE(num) {
  return (
    num
      .toFixed(2) // always two decimal digits
      .replace('.', ',') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  ) // use . as a separator
}


