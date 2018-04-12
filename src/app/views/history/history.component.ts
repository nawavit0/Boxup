import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { LogService } from '../../services/log.service';

@Component({
  templateUrl: 'history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  currentUser: User;
  playingLogs: any = [];
  searchString: string;
  searchColumn: string;
  myOrderBy: string = 'Date_Time';

  selectedLog:number = 0;
  selectedChapter:string = '';
  selectedStage:string = '';
  selectedDate:string = '';
  selectedTotalScore:string = '';
  selectedStatus:string = '';
  selectedWords:any = [];
  selectedWordsNum:string = '';
  isSlected:boolean = false;

  constructor(private router: Router, private logService: LogService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.onLoad();
  }

  ngOnInit() {
  }

  onLoad(){
    this.logService.getAllPlayingLog(this.currentUser.id)
      .subscribe(
        data => {
          console.log('LogAll: ');
          console.log(data);
          this.playingLogs = data;
        },
        error => {
        }
      )
  }

  selectLog(logID:number, dateTime:string, chapName:string, chapDes:string, stgName:string, totalScore:number, stgStatus:string){
    var playingLog_id = logID;
    if(playingLog_id==this.selectedLog){
      this.isSlected = !this.isSlected;
    }
    else{
      this.isSlected = true;
    }
    this.selectedLog = playingLog_id;
    if(this.isSlected){
      this.selectedChapter = chapName + ' (' + chapDes + ')';
      this.selectedStage = stgName;
      this.selectedDate = dateTime;
      this.selectedTotalScore = totalScore.toString();
      this.selectedStatus = stgStatus;
      this.logService.getPlayingAnswer(playingLog_id)
        .subscribe(
          data => {
            this.selectedWords = data;
            this.selectedWordsNum = this.selectedWords.length.toString();
          },
          error => {
          }
        )
    }
    else{
      this.selectedLog = 0;
      this.selectedChapter = '';
      this.selectedStage = '';
      this.selectedDate = '';
      this.selectedTotalScore = '';
      this.selectedStatus = '';
      this.selectedWords = [];
      this.selectedWordsNum = '';
    }
    
  }

}
