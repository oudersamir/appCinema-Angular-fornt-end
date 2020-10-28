import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../Data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VilleService  extends DataService{
 
  constructor(httpClient:HttpClient) { 
    super("villes",httpClient);
  }
  observer = new Subject();
    public subscriber$ = this.observer.asObservable();
  
    emitData(data) {
      this.observer.next(data);
    }



}
