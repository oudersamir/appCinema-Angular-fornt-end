import { Client } from './Client';
import { CinemaService } from './../../services/cinema.service';
import { FilmService } from './../../services/film.service';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { VilleService } from './../../services/ville.service';
import { Component, OnInit, Input, Sanitizer} from '@angular/core';
import { SalleService } from 'src/app/services/salle.service';
import Swal from 'sweetalert2'
import { DomSanitizer , SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-list-cinema',
  templateUrl: './list-cinema.component.html',
  styleUrls: ['./list-cinema.component.scss']
})
export class ListCinemaComponent implements OnInit {
  ticket:Client={
    nameClient:"",
    codePayement:"",
    listTickets:[]
  }

  trustedUrl;
  dangerousUrl;
  idVille:string;
  idCinema:string;
  placeNumbers=[];
  placesTicketsReserved:any[];
  activeForm:boolean=false;
  currentProjection;
  currentSalle;
  counter(i: number) {
    return new Array(i);
}
  
  @Input()Getcinemas:any[];
  currentCinema;
  projections:any[];
  cinemas:any[];
  salles:any[];
  films:any[];
  image:string;
  constructor(private villeService:VilleService,
              public cinemaService:CinemaService,
              private salleService:SalleService,
              private  route :ActivatedRoute,
              private router: Router,
              private filmService:FilmService,
              private sanitizer: DomSanitizer) { 

              }
  ngOnInit(): void {
    this.router.events.subscribe(val => {

        if (val instanceof RoutesRecognized) {

            //this.idVille=(val.state.root.firstChild.params.idVille);
            this.idCinema=(val.state.root.firstChild.params.idCinema);
           
         
            
           // this.getSalles();
        }  
    });
   
    this.getCinemas();
            this.getFilms(); 

}

 
      
  getCinemas(){
    // this.villeService.get(this.idVille,"cinemas").subscribe(
    //   resource=>{this.cinemas=((JSON.parse(JSON.stringify(resource))._embedded.cinemas))}
    // )
    this.placeNumbers=[];
    this.villeService.subscriber$.subscribe(resource=> 
      { this.salles=[];
        this.cinemas=((JSON.parse(JSON.stringify(resource))))
      
        this.onGetSalles(this.cinemas[0])
      
      }
      );
  }

  getFilms(){
    this.placeNumbers=[];
    this.filmService.getAll().subscribe(
      resource=>{this.films=((JSON.parse(JSON.stringify(resource))))
      }
    ) 
  }

   
  // getFilmsBySalle(salle){
  //   // this.salleService.get(salle.id,"projections?projection=p1").subscribe(
  //   //   resource=>{ this.projections=((JSON.parse(JSON.stringify(resource))._embedded.projections[0]))
  //   //   })
  //   let url=salle._links.projections.href.replace("{?projection}","");
  // return this.httpClient.get(url+"?projections=p1");
    
  // }

  getSalles(){
    this.placeNumbers=[];
    this.cinemaService.get(this.idCinema,"salles").subscribe(
      resource=>{this.salles=((JSON.parse(JSON.stringify(resource))._embedded.salles))}
    )
  }


  onGetSalles(cinema){
    this.placeNumbers=[];
    console.log("testttttt")
    this.currentCinema=cinema;
    this.cinemaService.get(cinema.id,"salles").subscribe(
      resource=>{this.salles=((JSON.parse(JSON.stringify(resource))._embedded.salles));
                this.salles.forEach(salle=> {
                  this.cinemaService.getFilmsBySalle(salle).subscribe(
                    data=>
                    {
                      salle.projections=((JSON.parse(JSON.stringify(data))._embedded.projections))
                    }
                  )
                });            
      }
   
    )
    
  }
  initialised(){
    this.ticket={
      nameClient:"",
      codePayement:"",
      listTickets:[]
    }
    this.placeNumbers=[];
    this.placesTicketsReserved=[];
  }

  OnGetTicketsPlaces(proj,idSalle){
    this.initialised();
  this.currentProjection=proj;
  this.currentSalle=idSalle;
  this.cinemaService.getTicketsSalle(proj).subscribe(
    data=>{
      this.currentProjection.tickets=((JSON.parse(JSON.stringify(data))._embedded.tickets))
      
      this.currentProjection.tickets.forEach(element => {
        let variable=element;
       this.placeNumbers.unshift(variable)
     });
    }
  )
  this.currentProjection.tickets.forEach(element => {
    //console.log(element)
  });
  }

  viderPlace(){
  this.placeNumbers=[];
  this.placesTicketsReserved=[];
  this.currentSalle='';

  }
   
  getClassButtonTicket(t){

   let color="";
  if(t.reserve==true){
   color="danger";
  }
  else if(t.selected) {
    color="warning";

  }else {
    color="default";
   

  }
  return color;
  }

  reservePlace(num){
    console.log(this.ticket)
    
    this.activeForm=true

    let variable=this.placesTicketsReserved.find(element=>element==num);
    if(variable){console.log("existe !!")
    num.selected=false;
      this.placesTicketsReserved.splice(this.placesTicketsReserved.indexOf(variable),1);
    } else {
      num.selected=true;
      this.placesTicketsReserved.push(num)
     // num.reserve=true;
    }
 
    console.log( this.placesTicketsReserved)

  }
  getImageFilms(){
    // this.villeService.getImage("http://localhost:8080//imageFilm/1").subscribe(
    //   image=>this.image=image.toString
    // )
  }

  reserve(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reserve it!'
    }).then((result) => {
      if (result.value) {      
   this.reserved();  
      }
    })

   


  }

  reserved(){

    let listIdTicket=[];
    this.placesTicketsReserved.filter(element=>{
      listIdTicket.push(element.id);
    })
    this.ticket.listTickets=listIdTicket;
   
    this.cinemaService.payerTicket(this.ticket).subscribe(
     data=> {
      
      this.ticket={
        nameClient:"",
        codePayement:"",
        listTickets:[]
      }
      this.OnGetTicketsPlaces(this.currentProjection,this.currentSalle);
      Swal.fire(
        'Reserved!',
        'Your places has reserved.',
        'success'
      ) 
     },
     err=> Swal.fire({
      title: "error",
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    
    )
 
  }
  dangerousVideoUrl ;
 video;
  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.

   
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    console.log(this.dangerousVideoUrl);
    this.video =this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
}
