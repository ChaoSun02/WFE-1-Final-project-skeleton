import { MineMines } from "./mine-mines";

export class MineLevel {
    constructor(
        private Name: string,
        private Width: number,
        private Height: number,
        private id: string = null
    ) {
        // add code here to clean the minefield
        // you also can transfer here the array that holds all the information
        // alternatively you can modify your existing data & code to match the logic of this
        // however it is a nice excercise to have all the code here in one class
    }
        
    public getId(): string { return this.id; }
    public getName(): string { return this.Name; }
    public getHeight(): number { return this.Height; }
    public getWidth(): number { return this.Width; }
        
    public setMines(mines: MineMines[]): boolean {
        // add here the code that given an array of mines populates the array of the board and sets up the numbers at the cells
        return false;
    }
        
    public getMineCount(): number {
        // implement this method
        return -1;
    }
        
}
