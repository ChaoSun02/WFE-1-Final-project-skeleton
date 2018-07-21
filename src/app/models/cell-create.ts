export class CellCreate {
    constructor(
        private hasMines: boolean,
        public isOpen: boolean,
        private content: string,
        public isClickable: boolean
    ) {;}

    getHasMines() {return this.hasMines;}
    getIsOpen() {return this.isOpen;}
    getContent() {return this.content;}
}
