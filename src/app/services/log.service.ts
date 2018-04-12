import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map'

@Injectable()
export class LogService {

  constructor(private http:Http) { }

  getAllPlayingLog(learnerID:number){
    return this.http.get('/api/playinglog/'+learnerID)
      .map((res:Response)=>{
        var result = res.json();
        var playingLog = result['result'];
        return playingLog;
      });
  }

  getPlayingAnswer(logid:number){
    return this.http.get('/api/playinganswer/'+logid)
      .map((res:Response)=>{
        var result = res.json();
        var playingAnswer = result['result'];
        return playingAnswer;
      });
  }

}
