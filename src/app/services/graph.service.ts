import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map'

@Injectable()
export class GraphService {

  constructor(private http:Http) { }

  getTotalWord(learner:number){
    return this.http.get('/api/totalword/'+learner)
      .map((res:Response)=>{
        var result = res.json();
        var totalWord = result['result'];
        return totalWord;
      });
  }

  getTotalPlay(learner:number){
    return this.http.get('/api/totalplay/'+learner)
      .map((res:Response)=>{
        var result = res.json();
        var totalPlay = result['result'];
        return totalPlay;
      });
  }

  getTotalSpendTime(learner:number){
    return this.http.get('/api/totalspendtime/'+learner)
      .map((res:Response)=>{
        var result = res.json();
        var totalSpendTime = result['result'];
        return totalSpendTime;
      });
  }

  getTotalSkipWord(learner:number){
    return this.http.get('/api/totalskipword/'+learner)
      .map((res:Response)=>{
        var result = res.json();
        var totalSkipWord = result['result'];
        return totalSkipWord;
      });
  }

  getTopWords(learner:number, qty:number){
    return this.http.get('/api/topword/'+learner+'/'+qty)
      .map((res:Response)=>{
        var result = res.json();
        var topWords = result['result'];
        return topWords;
      });
  }

  getWorstWords(learner:number, qty:number){
    return this.http.get('/api/worstword/'+learner+'/'+qty)
      .map((res:Response)=>{
        var result = res.json();
        var worstWords = result['result'];
        return worstWords;
      });
  }

  useBarChart(learner:number, length:number){
    return this.http.get('/api/wordInMonth/'+learner+'/'+length)
      .map((res:Response)=>{
        var result = res.json();
        var numWord = result['result'];
        return numWord;
      });
  }

  useLineChart(learner:number, length:number){
    return this.http.get('/api/playInMonth/'+learner+'/'+length)
      .map((res:Response)=>{
        var result = res.json();
        var numPlay = result['result'];
        return numPlay;
      });
  }

  useDoughnutChart(learner:number){
    return this.http.get('/api/answerStatus/'+learner)
      .map((res:Response)=>{
        var result = res.json();
        var countStatus = result['result'];
        return countStatus;
      });
  }



}
