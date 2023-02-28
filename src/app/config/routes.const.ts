import { EnableRoute} from "../interfaces/enableRoute";
export class RoutesConst{
    static LISTUSERS:EnableRoute  = {name:"Listar Usuarios",route:"list-users",permission:false};
    static ADDPERMISSION:EnableRoute  = {name:"Adicionar Permiso",route:"add-permission",permission:false};
    static VIEWACCOUNT:EnableRoute  = {name:"Ver datos del usuario",route:"account",permission:false};
} 