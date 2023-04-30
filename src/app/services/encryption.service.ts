import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


const key = 'TUc0emRqRXpkdw==';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  constructor() { }
encryptText(value:string){
    return CryptoJS.AES.encrypt(value, key).toString();
}
desencrypText(encrypted:string){
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

}
