import { DataService } from './../Data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  extends DataService{

  constructor(httpClient:HttpClient) { 
    
    super("categories",httpClient);
  }
}
