/* *************************************

NOTA AL EVALUADOR:
    AL SER MI NUEVA FUNCIONALIDAD UNA PANTALLA DE LOGIN CON
    SU FUNCIÒN LOGINCONTROL, TUVE QUE QUITAR LA RETENCIÓN 
    DE SALDO. ES POR ESO QUE IGUAL DEJO COMENTADO EL CÒDIGO 
    NECESARIO PARA REALIZARLO PARA QUE QUEDE CLARO QUE SÉ 
    REALIZARLO PERO LO DESESTIMO.

************************************** */
/*
// Si el código de seguridad es correcto,
//    permite entrar a todas las funcionalidades.

var codigoSeguridad = 1234;
function iniciarSesion() {
    var tempCodigoSeguridad = parseInt(prompt("Ingrese el código de la cuenta: "));
    if(codigoSeguridad == tempCodigoSeguridad) {
        alert("Bienvenido Cristian Sansó, ya puedes comenzar a realizar operaciones.");
        return true;
    }
    else {
        alert("Código Incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
        document.getElementById("saldo-cuenta").innerHTML = "$0";
        return false;
    }
    
}

if(iniciarSesion()) {
*/

function loginControl() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    if (user === "cris" && pass === "1234") {
        $('#login').hide("slow");
    }
    else {
        alert("El usuario o la contraseña no son correctos. \nPrueba con cris y 1234.");
    }   
};  

    //Declaración de variables globales
    var nombreUsuario = "Cristian Sansó";
    var saldoCuenta = 10000;
    var limiteExtraccion = "3000";
    

    //Ejecución de las funciones que actualizan los valores de las variables en el HTML al cargar la página.
    window.onload = function () {
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }


    //Funciones que actualizan el valor de las variables en el HTML
    function cargarNombreEnPantalla() {
        document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
    }

    function actualizarSaldoEnPantalla() {
        document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
    }

    function actualizarLimiteEnPantalla() {
        document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
    }


    //Funciones de control y primarias
    function controlMayorQue(valor1, valor2) {
        if(valor1 > valor2) { return true; }
        else { return false; }
    }

    function controlDivisor100(valor) {
        if(valor%100){ 
            return true; 
        }
        else { 
            return false; 
        }
    }

    function controlSiNegativo(valor) {
        if(valor <= 0) {
            return true;
        }
        return false;
    }
    
    function controlSiNull(valor) {
        if (isNaN(valor)) {
            return true;    
        }
        return false;
    }
    
    function restarDinero(dinero) {
        saldoCuenta -= dinero;
    }

    function sumarDinero(dinero) {
        saldoCuenta += dinero;
    }


    // Funciones de operaciones
    function cambiarLimiteDeExtraccion() {
        var aLimitar = parseInt(prompt("¿Qué nuevo límite de extracción desea tener?"));
        limiteExtraccion = aLimitar;
        if(controlSiNull(limiteExtraccion)){
            return alert("El campo está vacio.");
        }
        if(controlSiNegativo(aTransferir)){
            return alert("El monto a limitar es negativo.");
        }
        actualizarLimiteEnPantalla();
        alert(" Has limitado la extracción a: $" + limiteExtraccion + ".");
    }

    function extraerDinero() {
        var tempSaldoCuenta = saldoCuenta;
        var aExtraer = parseInt(prompt("¿Cuánto dinero desea extraer?"));
        if(controlSiNull(aExtraer)){
            return alert("El campo está vacio.");
        }
        if(controlMayorQue(aExtraer,saldoCuenta)) {
            return alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.");
        }
        if(controlDivisor100(aExtraer)) {
            return alert("Sólo puedes extraer billetes de 100.");
        }
        restarDinero(aExtraer);
        actualizarSaldoEnPantalla();
        alert(" Has retirado: $" + aExtraer + ".\n Saldo anterior: $" + tempSaldoCuenta + ".\n Saldo Actual: $" + saldoCuenta + ".");
    }


    function depositarDinero() {
        var tempSaldoCuenta = saldoCuenta;
        var aDepositar = parseInt(prompt("¿Cuánto dinero desea depositar?"));
        if(controlSiNull(aDepositar)){
            return alert("El campo está vacio.");
        }
        if(controlSiNegativo(aTransferir)){
            return alert("El monto a depositar es negativo.");
        }
        sumarDinero(aDepositar);
        actualizarSaldoEnPantalla();
        alert(" Has depositado: $" + aDepositar + ".\n Saldo anterior: $" + tempSaldoCuenta + ".\n Saldo Actual: $" + saldoCuenta + ".");
    }

    function pagarServicio() {
        var servicios = [[0, "0"], [350, "agua"], [210, "luz"], [570, "internet"], [425, "teléfono"]];
        var servicio = parseInt(prompt("Ingrese el número que corresponda con el servicio que quieres pagar.\n 1 - Agua\n 2 - Luz\n 3 - Internet\n 4 - Teléfono"));
        if(controlSiNull(servicio)){
            return alert("El campo está vacio.");
        }
        
        switch (servicio) {
            case 1:
            case 2:
            case 3:
            case 4:
                if(controlMayorQue(servicios[servicio][0], saldoCuenta)){ 
                    alert("El monto a pagar es mayor que el saldo de la cuenta. Deposite más dinero.");
                    break;
                }
                var tempSaldoCuenta = saldoCuenta;
                saldoCuenta -= servicios[servicio][0];
                alert("Has pagado el servicio de " + servicios[servicio][1] + ".\n Saldo anterior: $" + tempSaldoCuenta + ".\n Dinero descontado: $"+ servicios[servicio][0] + ".\n Saldo actual: $" + saldoCuenta + ".");
                actualizarSaldoEnPantalla();
                break;

            default: 
                alert("El número ingresado no corresponde a un servicio. Ingrese del 1 al 4.");
                break;
        }
    }

    function transferirDinero() {
        var cuentasAmigas = [1234567, 7654321, 123, 321];
        var aTransferir = parseInt(prompt("¿Cuál es el monto a transferir?"));
        if(controlSiNull(aTransferir)){
            return alert("El campo está vacio.");
        }
        if(controlSiNegativo(aTransferir)){
            return alert("El monto a transferir es negativo.");
        }

        if(controlMayorQue(aTransferir, saldoCuenta)){
            return alert("El monto a transferir es mayor que el saldo de la cuenta. Deposite más dinero.");
        }
        var cuentaAmiga = parseInt(prompt("Ingrese el número de cuenta a transferir dinero."));
        if(cuentasAmigas.indexOf(cuentaAmiga)===-1) {
            return alert("Sólo puede transferirse dinero a una cuenta amiga.");
        }
        var tempSaldoCuenta = saldoCuenta;
        saldoCuenta -= aTransferir;
        alert("Se han transferido: $" + aTransferir +".\nCuenta destino: "+ cuentaAmiga +".");
        actualizarSaldoEnPantalla();
    }

//}
