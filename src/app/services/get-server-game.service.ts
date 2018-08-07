import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MineLevel } from '../models/mine-level';
import { MineMines } from '../models/mine-mines';
import { MineScore } from '../models/mine-score';
import { Airtable } from '../models/airtable';

@Injectable({
  providedIn: 'root'
})
export class GetServerGameService {

  private mineLevels:MineLevel[] = [];
  private mineMines:MineMines[] = [];
  private mineScores:MineScore[] = [];
  private readonly listMineLevelsUrl = 'https://api.airtable.com/v0/appNXDXYVqKJaBxEW/Levels';
  private readonly listMineMinesUrl = 'https://api.airtable.com/v0/appNXDXYVqKJaBxEW/Mines'; //?filterByFormula={Name}=\'PUTLEVELNAMEHERE\'';
  private readonly listMineScoresUrl = 'https://api.airtable.com/v0/appNXDXYVqKJaBxEW/HighScores';
  

  constructor(
    private http: HttpClient
  ) 
  {
    const httpOptions = {
      headers: new HttpHeaders(
        {
        'Authorization': 'Bearer keyKSN5waI74aIlQV' // αυτό είναι το API key
        })
    };
      
    this.http.get<Airtable>(this.listMineLevelsUrl, httpOptions).subscribe((data: Airtable) => {
      this.mineLevels.splice(0,this.mineLevels.length);
      for(let r of data.records) {
        this.mineLevels.push( new MineLevel(
        r.fields.Name,
        r.fields.Width,
        r.fields.Height,
        r.id
        ));
      }
        
      // now that you have the levels, get the mines
      this.http.get<Airtable>(this.listMineMinesUrl, httpOptions).subscribe((data: Airtable) => {
      // probably this is NOT the way to do it - somehow the mines of each level must be grouped and added to each level
      // you are free to change the method that adds the mines to a level to a more suitable one. I assume a method that
      // adds the mines to the level, one by one
        this.mineMines.splice(0,this.mineMines.length);
        for(let r of data.records) {
          this.mineMines.push( new MineMines(
          r.fields.Name,
          r.fields.X,
          r.fields.Y,
          r.id
          ));
        }
        });
    });

    this.http.get<Airtable>(this.listMineScoresUrl, httpOptions).subscribe((data: Airtable) => {
      this.mineScores.splice(0,this.mineScores.length);
      for(let r of data.records) {
        this.mineScores.push( new MineScore(
        r.fields.Name,
        r.fields.Score,
        r.fields.Level,
        r.fields.When,
        r.id
        ));
      }
    });
  }

  
    

  private getLevelByName(name: string): MineLevel {
    for(let i=0; i<this.mineLevels.length; i++){
      if (name===this.mineLevels[i].getName()){
        return this.mineLevels[i];
      }
    }
    return undefined;
  }
  newGame(name: string){
    //analoga to onoma vriskw to antikeimeno tou minelevel,
    let currentLevel = this.getLevelByName(name);
    // apo auto vriskw tis diastaseis pou xrisimopoiountai
    //se metavlites gia na orisoun ta for gia na ftixtei o pinakas me tis theseis twn vomvwn
    let table: string[][] = [];
    for(let y=0; y<currentLevel.getHeight(); y++){
      table[y] = [];
      for(let z=0; z<currentLevel.getWidth(); z++){
        table[y][z] = ' ';
      }
    }
    for(let y=0; y<this.mineMines.length; y++){
      if(this.mineMines[y].getLevelName()===name){
        table[this.mineMines[y].getY()-1][this.mineMines[y].getX()-1] = 'B';
      }
    }
    for(let y=0; y<currentLevel.getHeight(); y++){
      for(let z=0; z<currentLevel.getWidth(); z++){
        if(table[y][z]===' '){
          let counter = 0;
          if(this.getContent(y-1, z-1, table)==='B'){counter++;}
          if(this.getContent(y-1, z, table)==='B'){counter++;}
          if(this.getContent(y-1, z+1, table)==='B'){counter++;}
          if(this.getContent(y, z-1, table)==='B'){counter++;}
          if(this.getContent(y, z+1, table)==='B'){counter++;}
          if(this.getContent(y+1, z-1, table)==='B'){counter++;}
          if(this.getContent(y+1, z, table)==='B'){counter++;}
          if(this.getContent(y+1, z+1, table)==='B'){counter++;}
          table[y][z]=''+counter;
        }
      }
    }
    for(let y=0; y<currentLevel.getHeight(); y++){
      for(let z=0; z<currentLevel.getWidth(); z++){
        console.log(table[y][z]);
      }
    }
    return table;
  }
  
  getContent(y: number, z: number, table:string[][]){
      if(y<0){return ' ';}
      if(y>=table.length){return ' ';}
      if(z<0){return ' ';}
      if(z>table[y].length){return ' ';}
      return table[y][z];
  }
}
