import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-clientcart',
  templateUrl: './clientcart.component.html',
  styleUrls: ['./clientcart.component.css']
})
export class ClientcartComponent implements OnInit {
  medicaments=[];
  prix = [];
  prixtotale:String;
  constructor(private userservice:UserService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.userservice.cart(id).subscribe(res => {
      console.log(res);
      this.medicaments = Object.entries(res)
      let l=this.medicaments[0][1].length
      console.log(l);
      for(let i=0;i<l;i++){
        this.prix[i]=this.medicaments[0][1][i].prix
      }
      console.log(this.prix[0])
      let pritotale=0;
      for(let i=0;i<l;i++){
        pritotale=pritotale+Number(this.prix[i])
      }
      this.prixtotale=String(pritotale)
      console.log(this.prixtotale)

    },
      err => {
        console.log(err);
      });
}
}
