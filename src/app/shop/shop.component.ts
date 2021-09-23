import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Product } from '../product';
import { UserService } from '../user.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[];
  productsfilter: Product[];
  productsfilter1: Product[];
  symptome: string = 'show all';
  compteur1: number=6;
  tablecompteur:Array<number>=[1,2,3,4,5];
  searchname: string;
  constructor(private router: Router, private userservice: UserService, private ProductsService: ProductsService) {
    this.ProductsService.medlist().subscribe(
      res => {
        this.products = res
        this.productsfilter = this.products
        this.productsfilter1=this.productsfilter
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
    let isloggedIn = this.userservice.isLoggedIn()
    if (isloggedIn) {
      let token = localStorage.getItem("myToken");
      let decoded = jwt_decode(token);
      var id = decoded['id'];
      console.log(id);
      if (id == "5f8d78a493b61f162072f0d9") {
        this.router.navigate(['/clientslist']);
      }
    }

  }
  isLoggedIn() {
    let token = localStorage.getItem("myToken");
    if (token) {
      return true;
    }
    else { return false; }
  }
  verification(name: string) {
    if (this.isLoggedIn()) {
      this.router.navigate(['/events', name]);
    }
    else { this.router.navigate(['/login']) }
  }
  filter(input: string) {
    this.symptome = input
    if (input != 'show all') {
      this.productsfilter = []
      let l = this.products.length
      for (let i = 0; i < l; i++) {
        if (this.products[i].symptome1 == input || this.products[i].symptome2 == input || this.products[i].symptome3 == input) {
          this.productsfilter.push(this.products[i])
        }
      }
      this.productsfilter1=this.productsfilter
    }
    else{
      this.productsfilter=this.products
      this.productsfilter1=this.productsfilter
    }
  }
  previousslide(){
    let l=this.tablecompteur.length
    if(this.tablecompteur[4]!=5){
    for (let i = 0; i < l; i++) {
    this.tablecompteur[i]=this.tablecompteur[i]-5}}
  }
  nextslide() {
    let l=this.tablecompteur.length
    for (let i = 0; i < l; i++) {
    this.tablecompteur[i]=this.tablecompteur[i]+5}
  }
  next(i:number){
    this.compteur1=0
    this.compteur1=i*6
  }
  Search() {
    if (this.searchname != "") {
      this.productsfilter=this.productsfilter1
      this.productsfilter = this.productsfilter.filter(res => {
        return res.name.toLocaleLowerCase().match(this.searchname.toLocaleLowerCase())
      })
    } else if (this.searchname == "") {
      this.productsfilter=this.productsfilter1
    }

  }
}

