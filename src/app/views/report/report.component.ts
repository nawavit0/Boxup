import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { GraphService } from '../../services/graph.service'

@Component({
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {

  currentUser: User;
  totalWord: number = 0;
  totalPlay: number = 0;
  totalSpendTime: number = 0;
  minSpendTime: number = 0;
  secSpendTime: number = 0;
  totalSkipWord: number = 0;
  radioModelBar: string = '6';
  radioModelLine: string = '6';
  monthNames: string[] = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  constructor(private router: Router, private graphService: GraphService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.radioModelBar = '6';
    this.radioModelLine = '6';
    this.onLoadTotalWord();
    this.onLoadTotalPlay();
    this.onLoadTotalSpendTime();
    this.onLoadTotalSkipWord();
    this.setBarChart();
    this.setLineChart();
  }

  ngOnInit() {
  }

  onLoadTotalWord(){
    this.graphService.getTotalWord(this.currentUser.id)
      .subscribe(
        data => {
          this.totalWord = data;
        },
        error => {
        }
      );
  }

  onLoadTotalPlay(){
    this.graphService.getTotalPlay(this.currentUser.id)
      .subscribe(
        data => {
          this.totalPlay = data;
        },
        error => {
        }
      );
  }

  onLoadTotalSpendTime(){
    this.graphService.getTotalSpendTime(this.currentUser.id)
      .subscribe(
        data => {
          this.totalSpendTime = data;
          this.minSpendTime = Math.floor(this.totalSpendTime/60);
          this.secSpendTime = this.totalSpendTime%60;
        },
        error => {
        }
      );
  }

  onLoadTotalSkipWord(){
    this.graphService.getTotalSkipWord(this.currentUser.id)
      .subscribe(
        data => {
          this.totalSkipWord = data;
        },
        error => {
        }
      );
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public barLength:number;
  public barYears: number[] = [];
  public barMonths: number[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [{data:[], label:''}];

  public lineLength:number;
  public lineYears: number[] = [];
  public lineMonths: number[] = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLabels: string[];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData: any[] = [{data:[], label:''}];

  setBarChart(){
    this.barLength = Number(this.radioModelBar);
    this.getBarMonthLatest(this.barLength);
    var datas = [];
    var results:any = [];
    this.graphService.useBarChart(this.currentUser.id, this.barLength)
      .subscribe(
        data => {
          results = data;
          for(var i = 0; i < this.barLength; i++){
            var wordNum = 0
            for(var j = 0; j < results.length; j++){
              if(results[j]['Month']==(this.barMonths[i]+1)&&results[j]['Year']==this.barYears[i]){
                wordNum = results[j]['countWord'];
              }
            }
            datas.push(wordNum);
          }
          console.log('datas: ' + datas);
          this.barChartData = [{
            data: datas,
            label: 'Number of learned words'
          }]
        },
        error => {

        }
      );
  }

  getBarMonthLatest(num: number){
    this.barChartLabels = [];
    this.barMonths = [];
    this.barYears = [];
    var date = new Date();
    for(var i = 0; i < num; i++){
      console.log(date.getMonth());
      this.barMonths[i] = date.getMonth();
      this.barYears[i] = date.getFullYear();
      this.barChartLabels[i] = '' + this.monthNames[date.getMonth()] + ' (' + date.getFullYear() + ')';
      date.setMonth(date.getMonth()-1);
    }
    console.log(this.barChartLabels)
    this.barChartLabels = this.barChartLabels.reverse();
    this.barMonths = this.barMonths.reverse();
    this.barYears = this.barYears.reverse();
  }

  setLineChart(){
    this.lineLength = Number(this.radioModelLine);
    this.getLineMonthLatest(this.lineLength);
    var datas = [];
    var results:any = [];
    this.graphService.useLineChart(this.currentUser.id, this.lineLength)
      .subscribe(
        data => {
          results = data;
          for(var i = 0; i < this.lineLength; i++){
            var logNum = 0
            for(var j = 0; j < results.length; j++){
              if(results[j]['Month']==(this.lineMonths[i]+1)&&results[j]['Year']==this.lineYears[i]){
                logNum = results[j]['countPlay'];
              }
            }
            datas.push(logNum);
          }
          console.log('datas: ' + datas);
          this.lineChartData = [{
            data: datas,
            label: 'Number of play'
          }]
        },
        error => {

        }
      );
  }

  getLineMonthLatest(num: number){
    this.lineChartLabels = [];
    this.lineMonths = [];
    this.lineYears = [];
    var date = new Date();
    for(var i = 0; i < num; i++){
      console.log(date.getMonth());
      this.lineMonths[i] = date.getMonth();
      this.lineYears[i] = date.getFullYear();
      this.lineChartLabels[i] = '' + this.monthNames[date.getMonth()] + ' (' + date.getFullYear() + ')';
      date.setMonth(date.getMonth()-1);
    }
    console.log(this.lineChartLabels)
    this.lineChartLabels = this.lineChartLabels.reverse();
    this.lineMonths = this.lineMonths.reverse();
    this.lineYears = this.lineYears.reverse();
  }

}
