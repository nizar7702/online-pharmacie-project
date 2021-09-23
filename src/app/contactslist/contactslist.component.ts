import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contactslist',
  templateUrl: './contactslist.component.html',
  styleUrls: ['./contactslist.component.css']
})
export class ContactslistComponent implements OnInit {
  contactslist=[];
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.contactslist().subscribe(
      res=>{
        this.contactslist=res
      },
      err=>{
       console.log(err);
      }
    )
  }
  logout(){
    localStorage.removeItem("myToken");
    this.router.navigate(['/login']);
  }
  delete(id:string) {
    this.userService.deletecontact(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

}
