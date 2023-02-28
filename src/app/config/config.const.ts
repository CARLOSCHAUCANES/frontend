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
    static REGISTERERROR='No se pudo realizar el registro, intentalo mas tarde';
    static C200 = 200;
    static C400 = 400; 
    static C499 = 499;
    static CERO = 0;
    static C501=501;
    static C401 = 401;
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
        NAMESWITHOUTSPACE:'[a-zA-ZÑñÁáÉéÍíÓóÚú ]*',
        IDENTIFICATIONONLYNUMBER:'^([0-9])*$',
        STRINGONLYNUMBER:'[0-9]*'
    }
    static NAMESNOTIFICACIONES = {
        REGISTER:"Registro"
    }
}