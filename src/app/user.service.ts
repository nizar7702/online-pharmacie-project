import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Contact } from './contact';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addUserUrl = "http://localhost:3001/register"
  private loginUrl="http://localhost:3001/login"
  private buyUrl="http://localhost:3001/buy"
  private cartUrl="http://localhost:3001/cart/"
  private headerUrl="http://localhost:3001/header/"
  private deleteUrl="http://localhost:3001/delete"
  private clientslistUrl="http://localhost:3001/clientslist"
  private ContactUrl="http://localhost:3001/contact"
  private ContactslistUrl="http://localhost:3001/contactslist"
  private deletecontactUrl="http://localhost:3001/deletecontact/"
  private sendmailUrl="http://localhost:3001/sendmail"
  private verifyemailUrl="http://localhost:3001/verifyemail/"
  private updatepasswordUrl="http://localhost:3001/updatepassword"
  constructor(private http: HttpClient) { }
  addUser(user: User) {
    return this.http.post<any>(this.addUserUrl, user);
  }
  login(user: User) {
    return this.http.post<any>(this.loginUrl, user);
  }
  buy(id:string,med:string,qte:string,prix:string){
      return this.http.post<any>(this.buyUrl,{},{params:{id,med,qte,prix}})
  }
  cart(id:string){
    return this.http.get<any>(this.cartUrl+id)
  }
  header(id:string){
    return this.http.get<any>(this.headerUrl+id)
  }
  delete(id:string){
    return this.http.post<any>(this.deleteUrl,{},{params:{id}})
  }
  clientslist(){
    return this.http.get<any>(this.clientslistUrl)
  }
  contact(contact:Contact) {
    return this.http.post<any>(this.ContactUrl, contact);
  }
  contactslist() {
    return this.http.get<any>(this.ContactslistUrl);
  }
  deletecontact(id:string){
    return this.http.delete<any>(this.deletecontactUrl+id);
  }
  isLoggedIn() {
    if (localStorage.getItem("myToken")) {
      return true;
    }
    else { return false; }
  }
  sendmail(user:User){
    return this.http.post<any>(this.sendmailUrl,user);
  }
  verifyemail(email:string){
    return this.http.get<any>(this.verifyemailUrl+email);
  }
  updatepassword(email:string,password:string){
    return this.http.post<any>(this.updatepasswordUrl,{},{params:{email,password}});
  }
}

