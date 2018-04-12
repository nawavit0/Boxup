import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  imgProfile: string;
  age: number;
  fullname: string;

  constructor(private router: Router) { 
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
    this.age = this.getAge(this.currentUser.dob);
    this.fullname = this.currentUser.firstname + ' ' + this.currentUser.lastname;
  }

  getAge(currentDOB: string){
    var birthDate = new Date(currentDOB);
    var ageDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifMs);
    console.log(birthDate);
    console.log(birthDate.getFullYear());
    return Math.abs(ageDate.getUTCFullYear()-1970);
  }

}
