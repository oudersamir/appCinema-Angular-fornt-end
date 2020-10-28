import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'  
})
export class AuthAdminService {

  constructor(private afAuth: AngularFireAuth) { }
 
  login(email:string,password:string){
   return new Promise((resolve,reject)=>{
     this.afAuth.auth.signInWithEmailAndPassword(email,password)
     .then((userData)=>resolve(userData),(error)=>reject(error))

  })
}

  getAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth))
  }

  logOut(){
   this.afAuth.auth.signOut();
  }


}
