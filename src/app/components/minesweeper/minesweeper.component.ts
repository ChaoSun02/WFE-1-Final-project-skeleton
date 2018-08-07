import { Component, OnInit } from '@angular/core';
import { CellCreate } from '../../models/cell-create';
import { GetServerGameService } from '../../services/get-server-game.service';


@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {

  private mines: string[][][] =[ 
    [
      [' ', '1', '1', '1', ' ', '1', 'B', '1', ' ', ' '],
      [' ', '2', 'B', '2', ' ', '1', '2', '3', '2', '1'],
      [' ', '3', 'B', '3', ' ', ' ', '2', 'B', 'B', '1'],
      [' ', '2', 'B', '2', ' ', ' ', '2', 'B', '3', '1'],
      [' ', '1', '1', '2', '1', '1', '1', '1', '1', ' '],
      [' ', ' ', ' ', '1', 'B', '1', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', '1', '1', '1', ' ', ' ', ' ', ' '],
      [' ', '1', '1', '1', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', '1', 'B', '1', ' ', ' ', ' ', ' ', '1', '1'],
      [' ', '1', '1', '1', ' ', ' ', ' ', ' ', '1', 'B']
    ],
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', 'B', '1'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', '1', '1'],
      [' ', ' ', '1', '1', '1', '1', '1', '1', '1', ' '],
      ['1', '1', '2', 'B', '1', '2', 'B', '2', ' ', ' '],
      ['1', 'B', '3', '2', '2', '2', 'B', '4', '2', '1'],
      ['1', '1', '2', 'B', '1', '2', '3', 'B', 'B', '1'],
      [' ', ' ', '1', '1', '1', '1', 'B', '3', '2', '1'],
      [' ', ' ', ' ', '1', '1', '2', '1', '1', ' ', ' '],
      [' ', ' ', ' ', '1', 'B', '1', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', '1', '1', '1', ' ', ' ', ' ', ' ']
    ],
    [
      [' ', ' ', '1', '2', 'B', '1', ' ', ' ', ' ', ' '],
      [' ', ' ', '1', 'B', '2', '2', '1', '1', ' ', ' '],
      [' ', ' ', '1', '2', '2', '2', 'B', '1', ' ', ' '],
      [' ', ' ', ' ', '1', 'B', '2', '1', '2', '1', '1'],
      [' ', ' ', ' ', '1', '1', '1', ' ', '1', 'B', '1'],
      [' ', ' ', '1', '1', '1', '1', '1', '2', '1', '1'],
      [' ', ' ', '1', 'B', '2', '3', 'B', '2', ' ', ' '],
      [' ', ' ', '1', '2', 'B', '3', 'B', '3', '1', ' '],
      [' ', ' ', ' ', '1', '1', '2', '2', 'B', '1', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', '1', '1', '1', ' ']
    ]
  ]

  private minesGame: CellCreate[][] = [
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10),
    new Array<CellCreate>(10)
  ];//creates an empty 2d array of the object CellCreate
  private score:number = 0;//counts score to see if player won
  private thesiGame: number;//this re presents which of the games will be loaded
  private clicking: boolean;

  onStart(){
    this.score=0;
    this.clicking=true;
    //this.thesiGame = Math.floor(Math.random() * Math.floor(3));
    let board = this.gameService.newGame('Entry');
    for(let i=0; i<10; i++) {
      for(let j=0; j<10; j++){
        if(board[i][j] === 'B') {
          this.minesGame[i][j] = new CellCreate(true, false, board[i][j], true);
        }
        else if(board[i][j]==='0') {
          this.minesGame[i][j] = new CellCreate(false, false, ' ', true);
        }
        else {
          this.minesGame[i][j] = new CellCreate(false, false, board[i][j], true);
        }
      }
    }
  }//initialize the values of each object in the 2darray
 

  constructor(
    private gameService: GetServerGameService
  ) { 
    
  }

  ngOnInit() {
    
  }

  /*checkes if the cell has bomb to make a lose statement
   *checks if the cell has a number
   *checks if the cell has space content and the begins to check its surroundings for the other space contents
   */
  showContent(i: number, j: number){
    if(i<0){ return ;}
    if(i>9){ return ;}
    if(j<0){ return ;}
    if(j>9){ return ;}
    if(this.minesGame[i][j].isClickable===true){
      this.minesGame[i][j].isClickable=false;
      if(this.minesGame[i][j].isOpen===false) {
        this.minesGame[i][j].isOpen = true;
        this.score++;
        if(this.minesGame[i][j].getHasMines()===true){
          alert("You Lost!");
          this.score = -90;
          for(let y=0; y<10; y++) {
            for(let z=0; z<10; z++){
              this.minesGame[y][z].isClickable=false;
              if(this.minesGame[y][z].getContent() === 'B') {
                this.minesGame[y][z].isOpen=true;
              }
            }
          }
        } else if(this.minesGame[i][j].getContent()!==' '){
          return;
        } else if(this.minesGame[i][j].getContent()===' '){
          this.showContent(i-1,j-1);
          this.showContent(i-1,j);
          this.showContent(i-1,j+1);
          this.showContent(i,j-1);
          this.showContent(i,j+1);
          this.showContent(i+1,j-1);
          this.showContent(i+1,j);
          this.showContent(i+1,j+1);
        }
      }
      else {
        return;
      }
    }
    
  } 
  //check if the player have won
  showWin(){
    if(this.score===90 && this.clicking===true){
      alert("You Won!");
      for(let y=0; y<10; y++) {
        for(let z=0; z<10; z++){
          this.minesGame[y][z].isClickable=false;
        }
      }
      this.clicking = false;
      return;
    }
  }
}
