import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from './../user'
import { UserService } from './../user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup
  verifycode: FormGroup
  sign:Boolean=false
  user: User
  activationcode:string
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
    let formControls = {
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z .'-]+"),
        Validators.minLength(3),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z .'-]+"),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      adress: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9 .'-]+"),
        Validators.minLength(3),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      ConfirmPassword: new FormControl('', [
        Validators.required,
      ]),
    }
    this.register = this.fb.group(formControls);
    let formControls1 = {
      Activationcode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern("^[0-9]*$"),
      ]),
    }
    this.verifycode=this.fb.group(formControls1);
  }
  get firstname() {
    return this.register.get('firstname');
  }
  get lastname() {
    return this.register.get('lastname');
  }
  get phone() {
    return this.register.get('phone');
  }
  get adress() {
    return this.register.get('adress');
  }
  get email() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('password');
  }
  get ConfirmPassword() {
    return this.register.get('ConfirmPassword');
  };
  get Activationcode(){
    return this.verifycode.get('Activationcode')
  };

  ngOnInit(): void {
    this.sign=false
  }
  saveUser() {
    let data = this.register.value;
    this.user = new User(data.firstname, data.lastname, data.email, data.adress, data.phone, data.password)
    this.sign=true
    this.userService.sendmail(this.user).subscribe(
      res=>{
        this.activationcode=res
        console.log(this.activationcode);
        this.toastr.success("email sent")
      },
      err=>{
        console.log(err);
        this.toastr.warning("error")
      }
    )
  }
  RegisterUser() {
    let data=this.verifycode.value.Activationcode
    if(data==this.activationcode){
    this.userService.addUser(this.user).subscribe(
      res=>{
        console.log(res);
        this.toastr.success("register done")
        this.router.navigate(['/login'])
      },
      err=>{
        console.log(err);
        this.toastr.warning("register failed")
      }
    )}else{
      this.toastr.warning("Activation code is wrong")
    }
    
  }
  close(){
   this.sign=false
  }

}
