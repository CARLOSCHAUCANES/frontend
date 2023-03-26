export class PermissionConst{
    static MODAL = {
        TITLEMODALREGISTER:"REGISTRO PERMISOS",
        TITLEMODALUPDATE:"ACTUALIZAR PERMISO"
    }
    static NoSELECTEDPROFILES = "No se ha seleccionado ningún perfil";
    static FORMS = [
        {
            name:"permissionformGroup",
            controls:[
                {control:"route",validators:['minlength','charactersNumbersLine','routeExists']},
                {control:"description",validators:['required']},
                {control:"profiles",validators:['required']}
            ]
       }
    ]
    
}