export class ConfigConst{
    static readonly TOKEN = 'token';
    static readonly USER = 'user';
    static VALIDATIONERROR = 'ValidationError';
    static DATAINCORRECT = 'Datos Incorrectos';
    static MESSAGEERRORSERVER = 'Error en el servidor, Intentalo mas tarde';
    static REQUIREDFIELD = 'Campo requerido';
    static DATASTRINGINCORRECT = 'Dato Incorrecto';
    static INVALIDDATA = 'Dato Invalido';
    static  NOAUTHORIZATION = 'Sesión no autorizada';
    static REGISTERSUCCESS = 'El registro se realizo  con éxito';
    static REGISTERUPDATE = 'La actualización se realizo con éxito';
    static REGISTERERROR='No se pudo realizar el registro, intentalo mas tarde';
    static C200 = 200;
    static C400 = 400; 
    static C499 = 499;
    static CERO = 0;
    static C501 = 501;
    static C401 = 401;
    static BOTTONS = {
        ACCEPT:'Aceptar',
        SAVE:'Guardar',
        UPDATE:'Actualizar'
    }
    static ROUTES={
        private:'/'
    }
    static TYPENOTIFiCATION = {
        SUCCESS:'success',
        WARNING:'warning',
        ERROR:'error'
    };
    static MINLENGTHPASSWORD = 8;
    static MAXLENGTHPASSWORD = 10;
    static MINLENGTHIDENTIFICATION = 2;
    static MESSAGEIDENTIFICATIONLENGTH = "Mínimo 2 caracteres y máximo 15 caracteres";
    static MAXLENGTHIDENTIFICATION = 15;
    static REGULAREXPRESSION = {
        NAMESWITHSPACE:'[a-zA-ZÑñÁáÉéÍíÓóÚú ]*',
        NAMESWITHOUTSPACE:'[a-zA-ZÑñÁáÉéÍíÓóÚú]*',
        IDENTIFICATIONONLYNUMBER:'^([0-9])*$',
        STRINGONLYNUMBER:'[0-9]*'
    }
    static NAMESNOTIFICACIONES = {
        REGISTER:"Registro",
        UPDATE:"Actualización"
    }
    static VALIDATORS={
        CHARACTERSNUMBERSLINE:{name:"charactersNumbersLine",message:"Minimmo 2 caracteres, El campo solo permite letras al inicio, conbinaciones alfanuméricas y el simbolo (-)"},
        REQUIRED:{name:"required",message:"El campo es requerido"},
        MINLENGTH:{name:"minlength",message:"No cumple la longitud de",other:'caracteres'},
        MAXLENGTH:{name:"maxlength",message:"Solo es permitodo máximo",other:'caracteres'},
        ROUTEEXISTS:{name:"routeExists",message:"El nombre de la ruta ya existe"}
    }
}