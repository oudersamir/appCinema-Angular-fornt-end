import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {
  constructor(private afAuth:AngularFireAuth,
              private route:Router){

  }


  canActivate(): Observable<boolean >{
    return this.afAuth.authState.pipe (map(
      auth=>{
        if(!auth){
            this.route.navigate(['/'])
            return false;
        }else {
    return true;
        }
      }
    ) )

  }
  
}
