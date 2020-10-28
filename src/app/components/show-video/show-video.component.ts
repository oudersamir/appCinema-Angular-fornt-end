import { CinemaService } from './../../services/cinema.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss']
})
export class ShowVideoComponent implements OnInit {
 
  constructor( public cinemaService:CinemaService) { }

  ngOnInit(): void {
  }

}
