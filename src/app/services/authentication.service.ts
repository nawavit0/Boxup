import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map'
import { User } from '../models/index';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }

  login(username:string, password:string){
    return this.http.get('/api/authenticate/'+username+'/'+password)
      .map((res:Response)=>{
        var user = res.json();
        if (user['code'] == 200){
          sessionStorage.setItem('currentUser', JSON.stringify(user['user']));
        }
        console.log(sessionStorage.getItem('currentUser'));
        return user;
      });
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    console.log('logout');
  }

  createUser(user: User){
    return this.http.get('/api/register/'+user.card+'/'+user.username+'/'+user.password+'/'+user.firstname+'/'+user.lastname+'/'+user.dob+'/'+user.gender+'/'+user.address+'/'+user.academy+'/'+user.edu)
      .map((res:Response)=>{
        var status = res.json();
        return status;
      });
  }

}
