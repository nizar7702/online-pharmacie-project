export class User {
    constructor(
        private firstname?:string,
        private lastname?:string,
        public email?:string,
        private adress?:string,
        private phone?:string,
        private password?:string,
    ){}
}
