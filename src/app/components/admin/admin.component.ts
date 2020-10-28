import { FileUploadService } from './../../services/file-upload.service';
import { CategoryService } from './../../services/category.service';
import { Film } from './Film';
import { FilmService } from './../../services/film.service';
import {
  Component,  OnInit
  } from '@angular/core';
  import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Categorie } from './Categorie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  formName:string;
  validatingForm: FormGroup;
  film:Film={
    id:0,
    photo:"",
    titre:"",
    duree:0,
    dateSortie:"",
    realisateur:"",
    categorie:new Categorie,
    description:"",
    videoUrl:""
  }
  categories:[];
  
  ngOnInit() {
    this.getFilms();
    this.getCategorie();
    this.validatingForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      duree: new FormControl('',),
      realisateur: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      description: new FormControl('', ),
      file: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      videoUrl: new FormControl('', ),
    });
  }

  get titre() {
    return this.validatingForm.get('titre');
  }

  get duree() {
    return this.validatingForm.get('duree');
  }

  get realisateur() {
    return this.validatingForm.get('realisateur');
  }
  get categorie() {
    return this.validatingForm.get('categorie');
  }
  get description() {
    return this.validatingForm.get('description');
  }
  get file() {
    return this.validatingForm.get('file');
  }
  get date() {
    return this.validatingForm.get('date');
  }
  get videoUrl() {
    return this.validatingForm.get('videoUrl');
  }

  elements: any = [];

  headElements = ['Photo','Titre', 'Duree', 'Realisateur', 'Categorie','Actions','description'];


  constructor(public filmService:FilmService,
              private categorieService:CategoryService,
              private fileUploadService:FileUploadService ,
              private datePipe: DatePipe){

  }

  

  getFilms(){  
   this.filmService.getFilms().subscribe(
     resource=>{
      this.elements=((JSON.parse(JSON.stringify(resource))));
       console.log(((JSON.parse(JSON.stringify(resource)))))
     }
   )
  }


  addFilm(){
    this.formName="Add Form";
    this.film.titre=this.titre.value;
    this.film.realisateur=this.realisateur.value;
    this.film.duree=this.duree.value;
    this.film.description=this.description.value;
    this.film.categorie.id=this.categorie.value;
    this.film.videoUrl=this.videoUrl.value;
    this.film.dateSortie=this.datePipe.transform(this.date.value, 'yyyy-MM-dd');
    

     var strArray = this.fileToUpload.name.split(".");
        
        // Display array values on page
        for(var i = 0; i < strArray.length; i++){
          console.log(strArray[i] );
        }

        this.film.photo=this.titre.value+"."+strArray[1]; 
        
     this.filmService.createFilm(this.film).subscribe(
       resource=>{console.log(resource)
        this.getFilms();
        this.getCategorie();}

    )
    this.uploadFileToActivity(); 
    this.cardImageBase64 = null;
        this.isImageSaved = false;

      
      
    
  }
  editFilm(film:Film){
    this.formName="Edit Form";
    this.film.id=film.id;
    this.titre.setValue(film.titre);
    this.realisateur.setValue(film.realisateur);
    this.duree.setValue(film.duree);
    this.description.setValue(film.description);
    this.categorie.setValue(film.categorie);
    this.videoUrl.setValue(film.videoUrl);
    this.date.setValue(this.datePipe.transform(film.dateSortie, 'yyyy-MM-dd'));
  }
  deleteFilm(film:Film){
    if(confirm("are you sure ??")){
        this.filmService.delete(film.id).subscribe(
          response=>{console.log(response)
          this.getFilms();
          this.getCategorie();
          }
    );
    }

  
  

  }
  updateFilm(){
   this.filmService.update(this.film).subscribe(
  resource=>console.log(resource)

   )

   this.getFilms();
   this.getCategorie();
 

   
  }
   

  getCategorie(){
   this.categorieService.getAll().subscribe(resource=>{
    this.categories=JSON.parse(JSON.stringify(resource))._embedded.categories;
    console.log(this.categories)
   })
  }


fileToUpload: File = null;

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

uploadFileToActivity() {

  this.fileUploadService.postFile(this.fileToUpload,this.titre.value).subscribe(data => {
    console.log("resource file "+data);
    this.validatingForm.reset();
    }, error => {
      console.log(error);
    });
}











imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;

  

    fileChangeEvent(fileInput: any) {
     
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }

        this.fileToUpload=fileInput.target.files.item(0);
    }

    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
    }

}