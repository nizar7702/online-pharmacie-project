import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import{Product} from "src/app/product";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[];
  constructor(private userservice:UserService,private router:Router,private ProductsService:ProductsService) {
    this.ProductsService.medlist().subscribe(
      res => {
        this.products = res
      },
      err => {
        console.log(err);
      }
    )
   }

  ngOnInit(): void {
    let isloggedIn=this.userservice.isLoggedIn()
    if(isloggedIn){
    let token=localStorage.getItem("myToken"); 
    let decoded=jwt_decode(token);
    var id = decoded['id'];
    console.log(id);
    if(id=="5f8d78a493b61f162072f0d9"){
      this.router.navigate(['/clientslist']);}
}
}}
