export class CellCreate {
    constructor(
        private hasMines: boolean,
        public isOpen: boolean,
        private content: string
    ) {;}

    getHasMines() {return this.hasMines;}
    getIsOpen() {return this.isOpen;}
    getContent() {return this.content;}
}
