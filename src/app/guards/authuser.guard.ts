import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthuserGuard implements CanActivate {
  constructor(private userservice:UserService,private router:Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userservice.isLoggedIn()){
      let token=localStorage.getItem("myToken"); 
      let decoded=jwt_decode(token);
      var id = decoded['id'];
      console.log(id);
      if(id!="601abce3fd9e760c28212a2e"){
        return true;}
      else{this.router.navigate(['/']);return false;}}
      else{this.router.navigate(['/']);return false;}
  }
  }

