import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map'

@Injectable()
export class WordService {

  constructor(private http:Http) { }

  getWord(wordID:number){
    return this.http.get('/api/word/'+wordID)
      .map((res:Response)=>{
        var result = res.json();
        var wordInfo = result['result'];
        return wordInfo;
      });
  }

}
