import { Contact } from './../list-cinema/Contact';
import { CinemaService } from './../../services/cinema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
  this.getContact();
  }

  elements: any = [
   
  ];

getContact(){
this.cinemaService.getContacts().subscribe(
  resource=>{
    this.elements=JSON.parse(JSON.stringify(resource))._embedded.contacts;
  }
)
}


headElements = ['Email', 'Message', 'Name', 'Subject'];

}
