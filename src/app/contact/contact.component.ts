import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/contact';
import { UserService } from 'src/app/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: FormGroup

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    let formControls = {
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z .'-]+"),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ])
    }
    this.contact = this.fb.group(formControls);
  }
  get message() {
    return this.contact.get('message');
  }
  get name() {
    return this.contact.get('name');
  }
  get email() {
    return this.contact.get('email');
  }
  get subject() {
    return this.contact.get('subject');
  }
  
  ngOnInit(): void {
  }

  saveUser() {
    let data = this.contact.value;
    let contact = new Contact(data.message, data.name, data.email, data.subject)
    console.log(contact);
    this.userService.contact(contact).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
