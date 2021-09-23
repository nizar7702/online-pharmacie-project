import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup
  newpass: FormGroup
  emailverification:FormGroup
  verifycode: FormGroup
  user:User
  sign:Boolean=false
  activationcode:string
  useremail:string
  closeResult = '';
  @ViewChild('content') content:any;
  @ViewChild('content1') content1:any;
  @ViewChild('content2') content2:any;
    constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService,private modalService: NgbModal) {
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    }
    this.login = this.fb.group(formControls);
    let formControls1 = {
      emailverif: new FormControl('', [
        Validators.required,
        Validators.email,])
    }
    this.emailverification = fb.group(formControls1)
    let formControls2 = {
      Activationcode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern("^[0-9]*$"),
      ]),
    }
    this.verifycode=this.fb.group(formControls2);
    let formControls3 = {
      newpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),]),
      ConfirmPassword: new FormControl('', [
          Validators.required,
      ]),
    }
    this.newpass = fb.group(formControls3)
    
  }
  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }
  get emailverif(){
    return this.emailverification.get('emailverif')
  }
  get Activationcode(){
    return this.verifycode.get('Activationcode')
  };
  get newpassword() {
    return this.newpass.get('newpassword')
  }
  get ConfirmPassword() {
    return this.newpass.get('ConfirmPassword');
  };
  
  ngOnInit(): void {
    this.sign=false
  }
  saveUser() {
    let data = this.login.value;
    let user = new User(null, null, data.email, null, null, data.password)
    this.userService.login(user).subscribe(
      res => {
        console.log(res);
        let token = res.token;
        localStorage.setItem("myToken", token);
        let decoded = jwt_decode(token);
        var id = decoded['id'];
        console.log(id);
        if (id == "601abce3fd9e760c28212a2e") {
          this.router.navigate(['/clientslist']);
        }
        else { this.router.navigate(['/shop']) }
        this.toastr.success("login done")
      },
      err => {
        console.log(err);
        this.toastr.warning("login failed")
      }
    )
  }
  verifyemail(){
    let data=this.emailverification.value.emailverif
    this.user=new User(null, null, data, null, null,null)
    console.log(this.user)
    this.userService.verifyemail(data).subscribe(
      res=>{
        this.useremail=data
        this.toastr.success("email exist")
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
        this.open(this.content1)
      },
      err=>{
        console.log(err);
        this.toastr.warning("error email is wrong")
      }
    )
  }
  sendemail() {
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
  codeverification() {
    let data=this.verifycode.value.Activationcode
    if(data==this.activationcode){
    this.open(this.content2)
    }else{
      this.toastr.warning("Activation code is wrong")
    }
    
  }
  updatepassword(){
    let password=this.newpass.value.newpassword
    let email=this.user.email
    this.userService.updatepassword(email,password).subscribe(
      res=>{
        this.toastr.success("password updated successfully")
        window.location.reload();
      },
      err=>{
        console.log(err);
        this.toastr.warning("error")
      }
    )
  }
  open(content) {
    this.sign=true
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.sign=false
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}



