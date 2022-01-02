
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //// Initializing variables
  board: string[] = [
    '','','',
    '','','',
    '','',''
  ];
  ai='X';
  human='O';
  currentPlayer;
  winner:string;

  scores = {
    X:10,
    O: -10,
    tie: 0
  };

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame(){
    this.board = [
      '','','',
      '','','',
      '','',''
    ];
    this.AImove();
    this.currentPlayer= this.human;
    this.winner = null;
  }

  makeMove(idx:number){
    if(this.currentPlayer==this.human){
      if(this.board[idx]==''){
        this.board[idx] = this.human;
        console.log(this.board);
        this.currentPlayer= this.ai;
        this.AImove();
      }
    }
    this.winner = this.calculateWinner();
    console.log(this.winner);
  }

  AImove(){
    //AI to make its turn
    let bestScore = -Infinity;
    let bestMove;
    for(var i = 0; i <this.board.length;i++){
      if(this.board[i]==''){
        this.board[i] = this.ai;
        let score = this.minimax(this.board, 0, false);
        console.log("score "+score);
        this.board[i]='';

        if(score>bestScore){
          bestScore = score;
          bestMove = i;
        }
      }  
    }
    console.log("bestMove "+bestMove);
    this.board[bestMove] = this.ai;
    this.currentPlayer = this.human;
  }

  

  minimax(board: string[], depth: number, isMaximizing: boolean){
    let result = this.calculateWinner();
    if(result !==null){
      if(result =='O'){
        return -10;
      }else if(result == 'X'){
        return +10;
      }else if(result =='tie'){
        return 0;
      }
    }

    if(isMaximizing){
      let bestScore = -Infinity;
      for(var i =0;i<board.length;i++){
        if(board[i]==''){
          board[i]=this.ai;
          let score = this.minimax(board, depth+1, false);
          board[i]='';
          if(score>bestScore){
            bestScore = score;
          }else{
            bestScore = bestScore;
          }
        }
      }
      return bestScore;
    }else{
      let bestScore = Infinity;
      for(var i =0;i<board.length;i++){
        if(board[i]==''){
          board[i] = this.human;
          let score = this.minimax(board, depth+1, true);
          board[i]='';
          if(score<bestScore){
            bestScore = score;
          }else{
            bestScore = bestScore;
          }
        }
      }
      return bestScore;
    }
  }

  calculateWinner(){
    let winner = null;
    let openSpaces = this.emptySpaces();
    //012
    if(
      this.board[0] == this.board[1] &&
      this.board[1] == this.board[2] &&
      this.board[2] == this.board[0]
    ){
      winner = this.board[0];
    }  
    //345
    if(
      this.board[3] == this.board[4] &&
      this.board[4] == this.board[5] &&
      this.board[5] == this.board[3]
    ){
      winner = this.board[3];
    } 
    //678
    if(
      this.board[6] == this.board[7] &&
      this.board[7] == this.board[8] &&
      this.board[8] == this.board[6]
    ){
      winner = this.board[7];
    } 
    //036
    if(
      this.board[0] == this.board[3] &&
      this.board[3] == this.board[6] &&
      this.board[6] == this.board[0]
    ){
      winner = this.board[0];
    } 
    //147
    if(
      this.board[1] == this.board[4] &&
      this.board[4] == this.board[7] &&
      this.board[7] == this.board[1]
    ){
      winner = this.board[1];
    } 
    //258
    if(
      this.board[2] == this.board[5] &&
      this.board[5] == this.board[8] &&
      this.board[8] == this.board[2]
    ){
      winner = this.board[2];
    } 
    //048
    if(
      this.board[0] == this.board[4] &&
      this.board[4] == this.board[8] &&
      this.board[8] == this.board[0]
    ){
      winner = this.board[0];
    } 
    //246
    if(
      this.board[2] == this.board[4] &&
      this.board[4] == this.board[6] &&
      this.board[6] == this.board[2]
    ){
      winner = this.board[2];
    } 
    if(winner == null && openSpaces==0){
      return 'tie';
    }else {
      return winner;
    }
  }

  emptySpaces():number{
    let emptySpaces=0;
    for(var i =0;i<9;i++){
      if(this.board[i]==''){
        emptySpaces++;
      }
    }
    return emptySpaces;
  }


}