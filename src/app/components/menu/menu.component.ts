import { Router } from '@angular/router';
import { AuthAdminService } from './../../services/auth-admin.service';
import  Swal  from 'sweetalert2';
import { CinemaService } from './../../services/cinema.service';
import { Contact } from './../list-cinema/Contact';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ModalContainerComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  validatingForm: FormGroup;   @ViewChild('frame', { static: true }) basicModal: ModalContainerComponent;

  validatingFormLogin: FormGroup;    @ViewChild('frameLogin', { static: true }) basicModalLogin: ModalContainerComponent;

  contact :Contact={
    name:"",
    email:"",
    subject:"",
    message:""

  }
  isLoggedIn:boolean=false;
  emailUserLogged:string
  constructor(private cinemaService:CinemaService,
              private authAdmin:AuthAdminService,
              private route:Router){}

  ngOnInit() {
  this.authAdmin.getAuth().subscribe( auth=>{
     if(auth){
       this.isLoggedIn=true;
       this.emailUserLogged=auth.email;
     }else{
      this.isLoggedIn=false;
     }
  }
  )


   
    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalEmail: new FormControl('', Validators.email),
      contactFormModalSubject: new FormControl('', Validators.required),
      contactFormModalMessage: new FormControl('', Validators.required)
    });


    this.validatingFormLogin = new FormGroup({
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
  }

  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }

  get contactFormModalEmail() {
    return this.validatingForm.get('contactFormModalEmail');
  }

  get contactFormModalSubject() {
    return this.validatingForm.get('contactFormModalSubject');
  }

  get contactFormModalMessage() {
    return this.validatingForm.get('contactFormModalMessage');
  }



  get signupFormModalEmail() {
    return this.validatingFormLogin.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingFormLogin.get('signupFormModalPassword');
  }
  
  addcontact(){
  this.contact.name=this.contactFormModalName.value;
  this.contact.email=this.contactFormModalEmail.value;
  this.contact.subject=this.contactFormModalSubject.value;
  this.contact.message=this.contactFormModalMessage.value;
  console.log(this.contact);
  
      
      this.cinemaService.addContact(this.contact).subscribe(
        data=> {console.log(data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message sended',
            showConfirmButton: false,
            timer: 1500
          })
          ;this.initialiserContact();}
        ,
        err=> console.log(err)
      )
    }
 

  initialiserContact(){
    this.contact ={
      name:"",
      email:"",
      subject:"",
      message:""
  
    }

  this.contactFormModalName.reset();
  this.contactFormModalEmail.reset();
  
  this.contactFormModalSubject.reset();
  
  this.contactFormModalMessage.reset();
  this.validatingForm.reset();
  this.basicModal.hide();

  }
  ​
   

  onLogin(){
    console.log("click");
    this.authAdmin.login(this.signupFormModalEmail.value,this.signupFormModalPassword.value)
    .then(auth=>{
      if(auth){
        this.route.navigate(['/']);
        this.validatingFormLogin.reset();
        this.basicModalLogin.hide();
        console.log()
        
      }
    })
    .catch(error=>{
      console.log("error");
    })
  }
  

   onLogOut(){
     this.authAdmin.logOut();
   
     
   }
  
}