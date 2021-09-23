import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component } from "@angular/core";
import { Product } from "../product";


@Component({
    templateUrl:'./details-med.component.html'

})
export class DetailsMedComponent{
Product:Product;
constructor(private ProductsService:ProductsService,private route:ActivatedRoute,private userservice:UserService,private toastr: ToastrService){
}
ngOnInit(){
  this.ProductsService.details(this.route.snapshot.params['name']).subscribe(
    res => {
      this.Product = res
    },
    err => {
      console.log(err);
    }
  )
}
addtocart(price:string,med:string){
  let token=localStorage.getItem("myToken");
  let decoded=jwt_decode(token);
  var id = decoded['id'];
  let counter= <HTMLInputElement> document.getElementById("counter")
  let qte=counter.value
  console.log(qte)
  if(qte!="0"){
  let pri=Number(price);
  let qt=Number(qte);
  let pric=Math.round(pri*qt*100)/100
  let prix=String(pric);
  this.userservice.buy(id,med,qte,prix).subscribe(
    res=>{
      console.log(res);
      this.toastr.success('medicament added successfully')
    },
    err=>{
      console.log(err);
    }
  )
}}


}