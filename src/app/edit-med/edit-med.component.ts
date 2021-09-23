import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../products.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';


@Component({
  templateUrl: './edit-med.component.html'
})
export class EditMedComponent implements OnInit {
  Product: Product;
  Edit: string;
  Editgroup: FormGroup;
  images;
  imagename: string
  data: string
  constructor(private productsService: ProductsService, private route: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder, private router: Router,private http:HttpClient) {
    let formControls = {
      edit: new FormControl('', [
        Validators.required,
      ]),
    }
    this.Editgroup = this.fb.group(formControls);
  }

  get edit() {
    return this.Editgroup.get('edit');
  }
  ngOnInit() {
    this.Edit = ''
    this.productsService.details(this.route.snapshot.params['name']).subscribe(
      res => {
        this.Product = res
      },
      err => {
        console.log(err);
      }
    )
  }
  Edittext(input: string) {
    this.Edit = input
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.imagename = event.target.files[0].name;
      console.log(this.imagename)
    }
  }
  saveEdit() {
    if (this.Edit != "imageurl") {
      this.data = this.Editgroup.value.edit
      console.log(this.data)
    }
    else {
      let imageurl=this.Product.imageurl
      let oldimagename=imageurl.replace('http://localhost:3001/uploads/','')
      this.data = 'http://localhost:3001/uploads/' + this.imagename
      console.log(this.data)
      const formData=new FormData();
      formData.append('file',this.images)
      this.http.post<any>('http://localhost:3001/file',formData,{params:{oldimagename}}).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err)
    )
    }
    let medname = this.route.snapshot.params['name']
    console.log(medname)
    console.log(this.Edit)
    this.productsService.editmed(this.Edit, medname, this.data).subscribe(
      res => {
        this.toastr.success('edit done successfully')
        if (this.Edit == "name") {
          this.router.navigate(['/Meds-list'])
        }
        else {
          window.location.reload();
        }
      },
      err => {
        this.toastr.error('Edit failed')
      }

    )
  }
}
