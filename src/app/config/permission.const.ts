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
                {control:"route",type:"input-text",validators:['required']},
                {control:"description",type:"textarea",validators:['required']},
                {control:"profiles",type:"combobox",validators:['required']}
            ]
       }
    ]
    
}