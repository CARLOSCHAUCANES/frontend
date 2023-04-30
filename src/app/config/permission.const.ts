export class PermissionConst{
    static MODAL = {
        titleModalRegister:"REGISTRO PERMISOS",
        titleModalUpdate:"ACTUALIZAR PERMISO"
    }
    static MESSAGES_ERROR = {
        NoSelectedProfile:"No se ha seleccionado ningún perfil"
    }
    
    static FORMS = [
        {
            name:"permissionformGroup",
            controls:[
                {control:"route",validators:['required','charactersNumbersLine','routeExists']},
                {control:"description",validators:['required']},
                {control:"profiles",validators:['required']}
            ]
       }
    ]
    
}