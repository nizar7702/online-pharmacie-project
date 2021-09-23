import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductsService } from './../app/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
@Component({
  templateUrl: './meds-list.component.html',
  styleUrls: ['./meds-list.component.css']

})
export class MedslistCOMPONENT implements OnInit {
  products: Product[]
  searchname: string
  constructor(private productservice: ProductsService, private route: Router, private toast: ToastrService) { }
  ngOnInit() {
    this.productservice.medlist().subscribe(
      res => {
        this.products = res
      },
      err => {
        console.log(err);
      }
    )
  }
  delete(input: string) {
    this.productservice.deletemed(input).subscribe(
      res => {
        console.log(res);
        window.location.reload();
        this.toast.success("med deleted")

      },
      err => {
        console.log(err);
        this.toast.success("Error:med not deleted")
      }
    )
  }
  navigate(input: string) {
    this.route.navigate(['/edit-med', input]);
  }
  Search() {
    if (this.searchname != "") {
      this.products = this.products.filter(res => {
        return res.name.toLocaleLowerCase().match(this.searchname.toLocaleLowerCase())
      })
    } else if (this.searchname == "") {
      this.ngOnInit();
    }

  }
}