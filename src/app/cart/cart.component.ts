import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { getLocaleTimeFormat } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  medicaments=[];
  prix = [];
  prixtotale:String;
  length:number
  constructor(private userservice: UserService) { }
  ngOnInit(): void {
    let token = localStorage.getItem("myToken");
    let decoded = jwt_decode(token);
    var id = decoded['id'];
    this.userservice.cart(id).subscribe(res => {
      console.log(res);
      this.medicaments = Object.entries(res)
      this.length=this.medicaments[0][1].length
      console.log(this.length)
      for(let i=0;i<this.length;i++){
        this.prix[i]=this.medicaments[0][1][i].prix
      }
      let pritotale=0;
      for(let i=0;i<this.length;i++){
        pritotale=pritotale+Number(this.prix[i])
      }
      this.prixtotale=String(pritotale)

    },
      err => {
        console.log(err);
      });
  }
  delete() {
    let token = localStorage.getItem("myToken");
    let decoded = jwt_decode(token);
    var id = decoded['id'];
    this.userservice.delete(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
  update(){
  }
}
