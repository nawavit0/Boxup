import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit{
  model: any = {};
  eduList = ['Nursery', 
            'Anuban 1', 'Anuban 2', 'Anuban 3', 
            'Prathom 1', 'Prathom 2', 'Prathom 3', 'Prathom 4', 'Prathom 5', 'Prathom 6', 
            'Matthayom 1', 'Matthayom 2', 'Matthayom 3', 'Matthayom 4', 'Matthayom 5', 'Matthayom 6', 
            'Bachelor’s degree', 'Master’s degree', 'Doctor’s degree'
          ];
  genderList = ['male','female'];
          
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  
  ngOnInit() {
    this.authenticationService.logout();
  }

  register(){
    if(this.model.password == this.model.repassword) {
      this.authenticationService.createUser(this.model)
        .subscribe(
          data => {
            if(data['code']==200){
              console.log(data['code']);
              this.router.navigate(['/pages/login']);
            }
          },
          error => {
          }
        );
    }
  }

}
