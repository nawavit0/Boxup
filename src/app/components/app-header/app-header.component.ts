import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  
  currentUser: User;
  imgProfile: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { 
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if(this.currentUser.pic!=null){
      this.imgProfile = this.imgProfile = 'assets/profiles/' + this.currentUser.pic;
    }
    else{
      if(this.currentUser.gender=='male'){
        this.imgProfile = 'assets/profiles/profile_man.png';
      }
      else{
        this.imgProfile = 'assets/profiles/profile_woman.jpg';
      }
    }
  }

}

