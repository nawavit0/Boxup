import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordService } from '../../services/word.service';

@Component({
  templateUrl: './word.component.html'
})
export class WordComponent implements OnInit {

  searchStringID: String;
  searchID: number;
  imgWord: string;
  wordDetail: any = {
    Word_ID: '',
    Word: '',
    Definition: '',
    Length: '',
    Part_Of_Speech: '',
    Pronunciation: '',
    Picture: '',
    Sample_Sentence: '',
    Level: ''
  };

  constructor(private router: Router, private wordService: WordService) { }

  ngOnInit() {
  }

  searchWord(){
    this.searchID = Number(this.searchStringID);
    this.wordService.getWord(this.searchID)
      .subscribe(
        data => {
          this.wordDetail = {
            Word_ID: String(data[0].Word_ID),
            Word: data[0].Word,
            Definition: data[0].Definition,
            Length: String(data[0].Length),
            Part_Of_Speech: data[0].Part_Of_Speech,
            Pronunciation: data[0].Pronunciation,
            Picture: data[0].Picture,
            Sample_Sentence: data[0].Sample_Sentence,
            Level: data[0].Level
          };
          this.imgWord = 'assets/word/' + this.wordDetail.Picture;
        },
        error => {}
      );
  }

}
