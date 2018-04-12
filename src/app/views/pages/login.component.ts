import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  model: any = {};
  result: any = {};
  returnUrl: string;
  errorLog: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log('Data: ');
          console.log(data);
          this.result = data;
          if(this.result['code']==200){
            console.log(this.result['code']);
            this.router.navigate([this.returnUrl]);
          }
          else{
            this.errorLog = this.result['log'];
          }
        },
        error => {
            this.errorLog = error;
        }
      )
  }

  register(){
    this.router.navigate(['/pages/register']);
  }

}
