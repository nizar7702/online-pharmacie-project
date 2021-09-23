import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = [];
  medicaments = [];
  length: number
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("myToken");
    if (token) {
      let decoded = jwt_decode(token);
      var id = decoded['id'];
      this.userService.header(id).subscribe(
        res => {
          this.user = res
        },
        err => {
          console.log(err);
        }
      )
      this.userService.cart(id).subscribe(res => {
        console.log(res);
        this.medicaments = Object.entries(res)
        this.length = this.medicaments[0][1].length
      },
        err => {
          console.log(err);
        });
    }
  }
  isLoggedIn() {
    if (localStorage.getItem("myToken")) {
      return true;
    }
    else { return false; }
  }
  logout() {
    localStorage.removeItem("myToken");
    this.router.navigate(['/login']);
  }
}
