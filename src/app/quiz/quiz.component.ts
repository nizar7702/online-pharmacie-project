import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  quiz(){
    var fievre= <HTMLInputElement> document.getElementById("fievre");
    var tete= <HTMLInputElement> document.getElementById("tete");
    var gorge= <HTMLInputElement> document.getElementById("gorge");
    var toux= <HTMLInputElement> document.getElementById("toux");
    var douleur= <HTMLInputElement> document.getElementById("douleur");
    var diar= <HTMLInputElement> document.getElementById("diar");
    var appetit= <HTMLInputElement> document.getElementById("appetit");
    var vomi= <HTMLInputElement> document.getElementById("vomi");
    var og= <HTMLInputElement> document.getElementById("o&g");
    var resp= <HTMLInputElement> document.getElementById("resp");
    if(fievre.checked && tete.checked && gorge.checked && toux.checked && douleur.checked && appetit.checked && og.checked && resp.checked){this.toastr.warning("vous avez les symptomes du corona virus")}
    else{this.toastr.success("vous n'avez pas corona virus")}
  }
}

