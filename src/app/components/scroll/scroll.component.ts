import { VilleService } from './../../services/ville.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent implements OnInit {
  villes:any[];
  currentVille;
  constructor(private villeService:VilleService) { }

  ngOnInit(): void {
    this.getVilles();
 
   
  }
      
  getVilles(){
    this.villeService.getAll().subscribe(
      resource=>{this.villes=((JSON.parse(JSON.stringify(resource))._embedded.villes))  
    this.currentVille=this.villes[0];  
    this.onGetCinemas(this.currentVille)      
        }
    )
 
    

  }

  onGetCinemas(ville){
    this.currentVille=ville;
    this.villeService.get(ville.id,"cinemas").subscribe(
      resource=>{ 
        this.villeService.emitData((JSON.parse(JSON.stringify(resource))._embedded.cinemas))}
    )
 
  }

}
