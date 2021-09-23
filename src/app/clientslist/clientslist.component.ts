import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-clientslist',
  templateUrl: './clientslist.component.html',
  styleUrls: ['./clientslist.component.css']
})
export class ClientslistComponent implements OnInit {
clientslist=[];
  constructor(private userService:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userService.clientslist().subscribe(
      res=>{
        this.clientslist=res
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
    this.userService.delete(id).subscribe(
      res => {
        console.log(res);
        this.toastr.success("User deleted")
      },
      err => {
        console.log(err);
        this.toastr.error("Error")
      }
    )
  }

}
