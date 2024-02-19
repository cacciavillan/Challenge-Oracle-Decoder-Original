let state
let copiar

// Función para ajustar el tamaño del textarea de manera automatica.
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reinicia la altura a auto para recalcularla a la altura actual
    textarea.style.height = textarea.scrollHeight + 'px'; // Actualiza la altura

    // Ajusta la altura del body si es necesario
    document.body.style.height = document.documentElement.scrollHeight + 'px';

}

// Si el input no es el esperado muestra mensajes de alerta.
function corruptedMessage(state) {
    console.log('corruptedMessage called')
    let message = document.querySelector('.message');
    let outMessage = document.getElementById('outMessage');
    let standBy = document.querySelector('.standBy');
    let active = document.querySelector('.active');

    if (message) {
        message.style.color = 'red';
    }
    if (outMessage) {
        outMessage.innerText = state === 'corrupted' ? "Mensaje Corrupto" : "Ningún mensaje fue encontrado";
    }
    if (standBy) {
        standBy.style.visibility = 'visible';
    }
    if (active) {
        active.style.visibility = 'hidden';
    }

}

// Oculta los parrafos y muestra el textarea cuando hay un output
function setActive() {
    let standBy = document.querySelector('.standBy');
    let active = document.querySelector('.active');

    if (standBy) {
        standBy.style.visibility = 'hidden'
    }
    if (active) {
        active.style.visibility = 'visible'
    }

}

// Función copiar para el boton.
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copiar').addEventListener('click', function() {


        // Crea un elemento de texto temporal

        var tempInput = document.createElement('input');
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('value', copiar);

        // Añade el elemento al DOM
        document.body.appendChild(tempInput);

        // Selecciona y copia el contenido del elemento temporal
        tempInput.select();
        document.execCommand('copy');

        // Elimina el elemento temporal del DOM
        document.body.removeChild(tempInput);
        
        if (state == "encrypt") {
        alert('Texto copiado al portapapeles');
        } else {
            alert('Texto copiado al portapapeles')
        }
    });
});

// ENCRIPTADO

// Encriptado del texto
function encrypted(str) {
    // Declaro la cont wordsArray y le asigno el resultado de split sobre str
    const wordsArray=str.split("");
    
    const encryptedArray = wordsArray.map(element => {
        
        if (element === "a") {
            return "ai";
        } else if (element === "e") {
            return "enter"
        } else if (element === "i") {
            return "imes"
        } else if (element === "o") {
            return "ober"
        } else if (element === "u") {
            return "ufat"
        } else {
            return element
        }

      });
    
    const resultString = encryptedArray.join("");
    
    return resultString;
  }

// Secuencia de encriptado
function encryptionSequence() {
    // Está encapsulado en un try/catch para manejar los errores que puede generar la función inputString cuando no se ingresa un valor.
    try {
        let inputString = document.getElementById('textarea1').value;
        
        if (inputString === "") {
            corruptedMessage('empty')
            return;
        }

        if (/[^a-zñ\s]/.test(inputString)) {
            throw new Error("Solo se aceptan palabras en minúsculas y sin acento, exceptuando la ñ");
        }

        // Encripta el texto normalizado
        let encryptedText = encrypted(inputString);
        
        // Creamos la variable "copiar" para que el resultado de la función esté disponible para el boton "copiar"
        copiar = encryptedText

        // Actualizamos el textarea de salida solo con el texto encriptado
        outText.value = encryptedText;

        // Mostramos el textarea de salida, ocultamos los párrafos y actualizamos la altura del textarea
        setActive();
        autoResize(outText);
        state = "encrypt";
        let textarea = document.getElementById('textarea1');
        textarea.value = '';
        textarea.style.height = '';

        return copiar;

    } catch (error) {
        alert(error.message);
        return null

    }
}
// DESENCRIPTADO

// Desencripta el input después de haber sido limpiado (Sin caracteres especiales)
function decrypt(str) {
    // Declaro la const wordsArray y le asigno el resultado de split sobre el string.
    const wordsArray = str.split(" ");    

    const encryptedArray = wordsArray.map(element => {

        let result = element

        if (element.includes("ai")) {
            result = result.split("ai").join("a");
        } 
        if (element.includes("enter")) {
            result = result.split("enter").join("e")
        } 
        if (element.includes("imes")) {
            result = result.split("imes").join("i")
        } 
        if (element.includes("ober")) {
            result = result.split("ober").join("o")
        } 
        if (element.includes("ufat")) {
            result = result.split("ufat").join("u")
        } 

        return result

      });
    
    const resultString = encryptedArray.join(" ");
    
    return resultString;
}

// Secuencia de desencriptación.
function decryptSequence() {
    try {
        let string = document.getElementById('textarea1').value;

        if (string === "") {
            corruptedMessage('empty');
            throw new Error('Cadena de texto vacía');
        }
        // Extraemos el texto limpio y desencriptamos
        let decryptedString = decrypt(string);

        copiar = decryptedString

        outText.value = decryptedString;
        setActive()
        autoResize(outText);
        state = "decrypt";
        let textarea = document.getElementById('textarea1');
        textarea.value = '';
        textarea.style.height = '';

        return decryptedString;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}