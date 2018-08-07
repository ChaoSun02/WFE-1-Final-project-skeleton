export class MineScore {
    constructor(
        private Name: string, // the player name
        private Score: number,
        private Level: string, // the level name
        private When: string, // a date time stamp in the following format "2018-07-15T08:00:00.000Z" (time in Greenwich)
        private id: string = null
    ) {
        
    }
        
    public getPlayerName(): string { return this.Name; }
    public getLevelName(): string { return this.Level; }
    public getScore(): number { return this.Score; }
    public getWhen(): string { return this.When; }
    public getId(): string { return this.id; }    
}
