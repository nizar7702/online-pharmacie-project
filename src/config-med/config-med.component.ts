import { ToastrService } from 'ngx-toastr';
import { UrlTree, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './../app/products.service';
import { Product } from './../app/product';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './config-med.component.html',

})
export class ConfigMedComponent implements OnInit {
  newmed: FormGroup
  selectedFile = null;
  imagename:string
  images;
  constructor(private fb: FormBuilder, private productsService: ProductsService, private http: HttpClient,private toastr: ToastrService,private router:Router) {
    let formControls = {
      image: new FormControl('', [
        Validators.required
        ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Speciality: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Dosage: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Forme: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Presentation: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Conditionnement_primaire: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Specification: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      DCI: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Classement_VEIC: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Class_Therapeutic: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Sous_Classe: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Laboratoire: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Tableau: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Duration_of_conservation: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Indication: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Generic_Princeps: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      AMM: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Date_AMM: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      symptome1: new FormControl('', [
        Validators.required,
      ]),
      symptome2: new FormControl('', [
        Validators.required,
      ]),
      symptome3: new FormControl('', [
        Validators.required,
      ]),
      prix: new FormControl('', [
        Validators.required,
      ]),
    }
    this.newmed = this.fb.group(formControls);
  }
  get image() {
    return this.newmed.get('image');
  }
  get name() {
    return this.newmed.get('name');
  }
  get Speciality() {
    return this.newmed.get('Speciality');
  }
  get Dosage() {
    return this.newmed.get('Dosage');
  }
  get Forme() {
    return this.newmed.get('Forme');
  }
  get Presentation() {
    return this.newmed.get('Presentation');
  }
  get Conditionnement_primaire() {
    return this.newmed.get('Conditionnement_primaire');
  }
  get Specification() {
    return this.newmed.get('Specification');
  }
  get DCI() {
    return this.newmed.get('DCI');
  }
  get Classement_VEIC() {
    return this.newmed.get('Classement_VEIC');
  }
  get Class_Therapeutic() {
    return this.newmed.get('Class_Therapeutic');
  }
  get Sous_Classe() {
    return this.newmed.get('Sous_Classe');
  }
  get Laboratoire() {
    return this.newmed.get('Laboratoire');
  }
  get Tableau() {
    return this.newmed.get('Tableau');
  }
  get Duration_of_conservation() {
    return this.newmed.get('Duration_of_conservation');
  }
  get Indication() {
    return this.newmed.get('Indication');
  }
  get Generic_Princeps() {
    return this.newmed.get('Generic_Princeps');
  }
  get AMM() {
    return this.newmed.get('AMM');
  }
  get Date_AMM() {
    return this.newmed.get('Date_AMM');
  }
  get symptome1() {
    return this.newmed.get('symptome1');
  }
  get symptome2() {
    return this.newmed.get('symptome2');
  }
  get symptome3() {
    return this.newmed.get('symptome3');
  }
  get prix() {
    return this.newmed.get('prix');
  }
  ngOnInit(): void {
  }
  onFileSelected(event){
    if (event.target.files.length>0){
      const file=event.target.files[0];
      this.images=file;
      this.imagename=event.target.files[0].name;
      console.log(this.imagename)
    }
  }
  saveMed() {
    const formData=new FormData();
    formData.append('file',this.images)
    this.http.post<any>('http://localhost:3001/file',formData).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err)
    )
    let data = this.newmed.value
    let Med: Product = {
      imageurl:'http://localhost:3001/uploads/'+this.imagename,
      name: data.name,
      Speciality: data.Speciality,
      Dosage: data.Dosage,
      Forme: data.Forme,
      Presentation: data.Presentation,
      Conditionnement_primaire: data.Conditionnement_primaire,
      Specification: data.Specification,
      DCI: data.DCI,
      Classement_VEIC: data.Classement_VEIC,
      Class_Therapeutic: data.Class_Therapeutic,
      Sous_Classe: data.Sous_Classe,
      Laboratoire: data.Laboratoire,
      Tableau: data.Tableau,
      Duration_of_conservation: data.Duration_of_conservation,
      Indication: data.Indication,
      Generic_Princeps: data.Generic_Princeps,
      AMM: data.AMM,
      Date_AMM: data.Date_AMM,
      symptome1:data.symptome1,
      symptome2:data.symptome2,
      symptome3:data.symptome3,
      prix: data.prix
    }
    console.log(Med)
    this.productsService.addproduct(Med).subscribe(
      res=>{
        console.log(res);
        this.toastr.success("save done")
        this.router.navigate(['/clientslist'])
      },
      err=>{
        console.log(err);
        this.toastr.warning("save failed")
      }
    )

  }
}