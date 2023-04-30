export class ConfigConst{

    static AUTHORIZATION = {
        token:'token',
        user:'user'
    }
   
   static SERVER_ERRORS = {
    validationError:'ValidationError'
   } 

   static SERVER_MESSAGES_ERROR = {
       messageErrorServer:'Error en el servidor, Intentalo mas tarde',
       noAuthorization:'Sesión no autorizada'
   }

   static  FORM_MESSAGE_ERROR = {
    dataIncorrect:'Datos Incorrectos',
    requiredField:'Campo requerido',
    dataStringIncorrect:'Dato Incorrecto',
    invalidData:'Dato Invalido',
    messageIdentificationLength:"Mínimo 2 caracteres y máximo 15 caracteres"
   }

    static CODES={
        C200:200,
        C299:299,
        C300:300,
        C399:399,
        C400:400, 
        C499:499,
        CERO:0,
        C501:501,
        C401:401
    }

    static BOTTONS = {
        accept:'Aceptar',
        save:'Guardar',
        update:'Actualizar'
    }
    static ROUTES={
        private:'/'
    }
    static TYPE_NOTIFiCATION = {
        success:'success',
        warning:'warning',
        error:'error'
    };
    static MESSAGES_NOTIFICATION = {
        successRegister:'El registro se realizo  con éxito',
        sucessUpdate:'La actualización se realizo con éxito',
        errorRegister:'No se pudo realizar el registro, intentalo mas tarde',
        errorUpdate:'No se pudo realizar la actualización, intentalo mas tarde'
    } 

    static LENGTH = {
        minLengthPassword:8,
        maxLengthPassword:10,
        minLengthIdentification:2,
        maxLengthIdentification:15
    }

    static REGULAR_EXPRESSION = {
        namesWithSpace:'[a-zA-ZÑñÁáÉéÍíÓóÚú ]*',
        namesWithOutSpace:'[a-zA-ZÑñÁáÉéÍíÓóÚú]*',
        identificationOnlyNumber:'^([0-9])*$',
        stringOnlyNumber:'[0-9]*'
    }
    static NAMES_NOTIFICACIONES = {
        register:"Registro",
        update:"Actualización"
    }
    static VALIDATORS={
        characteresNumbersLine:{name:"charactersNumbersLine",message:"Minimmo 2 caracteres, El campo solo permite letras al inicio, conbinaciones alfanuméricas y el simbolo (-)"},
        required:{name:"required",message:"El campo es requerido"},
        minLength:{name:"minlength",message:"No cumple la longitud de",other:'caracteres'},
        maxLength:{name:"maxlength",message:"Solo es permitodo máximo",other:'caracteres'},
        routExists:{name:"routeExists",message:"El nombre de la ruta ya existe"}
    }
}