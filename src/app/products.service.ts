import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { User } from './user';
@Injectable()
export class ProductsService {
  private addMedUrl ="http://localhost:3001/addMed";
  private medlistUrl="http://localhost:3001/medlist"
  private detailsUrl="http://localhost:3001/details/"
  private deletemedUrl="http://localhost:3001/deletemed/"
  private editmedUrl="http://localhost:3001/editmed"
  
  constructor(private http:HttpClient){}
  addproduct(product:Product){
    return this.http.post<any>(this.addMedUrl, product);
  }
  medlist(){
    return this.http.get<any>(this.medlistUrl)
  }
  details(name){
    console.log(name)
    return this.http.get<any>(this.detailsUrl+name)
  }
  deletemed(name:string){
    return this.http.delete<any>(this.deletemedUrl+name);
  }
  editmed(type:string,medname:string,edit:string){
    return this.http.post<any>(this.editmedUrl,{},{params:{type,medname,edit}});
  }
  
}

