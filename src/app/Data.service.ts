import { Film } from './components/admin/Film';
import {HttpClient}  from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class DataService{
    
         public host:string="http://localhost:8080/";

    constructor(@Inject(String)public Url:string,private httpClient:HttpClient){}

    getAll(linit?:number){  
        return this.httpClient.get(this.host+this.Url).pipe(
            map(resource=>resource)
        );
    }

    get(id?:string,entity?:string){  
        return this.httpClient.get(this.host+this.Url+"/"+id+"/"+entity).pipe(
            map(resource=>resource)
        );
    }

    getImage(link:string){
        return this.httpClient.get(link).pipe(
            map(resource=>resource)
        );  
    }

     
  getFilmsBySalle(salle){
  let url=salle._links.projections.href.replace("{?projection}","");
  return this.httpClient.get(url+"?projection=p1"); 
  }

  getTicketsSalle(proj){
    let url=proj._links.tickets.href.replace("{?projection}","");
    return this.httpClient.get(url+"?projection=ticketProj"); 

    }

    payerTicket(ticket){
        console.log(ticket);
    return this.httpClient.post(this.host+"payerTickets",ticket);
    }

    addContact(contact){
    return this.httpClient.post(this.host+"addContact",contact);

    }

    getFilms(){
      return this.httpClient.get(this.host+this.Url+"?projection=fl"); 
    }

    uploadPicture(formData: FormData){
        return this.httpClient.post(this.host+this.Url,formData);
    }
    ReqJson: any = {};
    postFile(fileToUpload: File,name:string) {
        const endpoint = this.host+this.Url;
        const formData: FormData = new FormData();
        this.ReqJson["titre"] = name;

        formData.append('file', fileToUpload,fileToUpload.name);

        formData.append('info', JSON.stringify(this.ReqJson));
        return this.httpClient .post(endpoint, formData, {  
            reportProgress: true,  
            observe: 'events'  
         })
          
    }

    createFilm(film:Film){
        return this.httpClient.post(this.host+'addFilm',film);

    }

    update(resource){
        return  this.httpClient.put(this.host+'updateFilm/'+resource.id,resource)
        }

    delete(idResource:number){
            return this.httpClient.delete(this.host+'deleteFilm/'+idResource);
            
            }

getContacts(){
    return this.httpClient.get(this.host+'contacts');
}
}