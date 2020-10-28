import { HttpClient } from '@angular/common/http';
import { DataService } from './../Data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  SalleService extends DataService {

  constructor(httpClient:HttpClient) { 
    super("salles",httpClient);
  }

 
}
