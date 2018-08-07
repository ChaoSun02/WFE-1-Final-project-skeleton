export class MineMines {
    constructor(
        private Name: string, // this is the level name
        private X: number,
        private Y: number,
        private id: string = null
    ) {
    }
        
    public getLevelName():string { return this.Name; }
    public getX() : number { return this.X; }
    public getY() : number { return this.Y; }
    public getId(): string { return this.id; }        
}
