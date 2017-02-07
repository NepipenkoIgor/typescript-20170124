// область TypeScript
// interface IProfile {
//   name: string;
//   surname: string;
// }
// let account = {
//   name: 'Igor',
//   surname: 'Nepipenko'
// };
//
// // область JavaScript
// let person: typeof account;
//
// person = {
//   name: './Igor'
// }
//
// class A {
// }
//
// let a: A;
// let b = A;
// let a = {y: 1, r: 2, x: 3}
// let b = {b: 1}
// let c = {c: 1}
//
// let merge = {...a, ...b, ...c}
//
//
// let {y, ...t}= a;
// let age: number | null;
// let firsName: string;
// let isGood: boolean;
//
// age = null;
//
// let all: any = {};
//
// all.a = 1;
// all = 1;
//
// let iamvoid: void = undefined;
//
// function myFunc(): void {
//
// }
// let profile1: {name: string; surname: string; age?: number};
// profile1 = {name: 'igor', surname: 'Nepipenko'};
// let profile2: typeof profile1;
// profile2 = {name: 'igor', surname: 'Nepipenko', age: 30};
// const account: {readonly name: string; readonly surname: string} = {name: 'igor', surname: 'Nepipenko'};
// account.name = 'Vova';
// account.surname = 'Vova';
// let names: ReadonlyArray<string> = ['Igor', 'Vova'];
//
// names.length = 4;
// names[4] = 4;
// names[1] = 'as';
// let account: [string, number];
// account = ['Igor', 30];
//
// let sum: {(a: number, b: number): number};
//
// sum = (a: number, b: number) => {
//   return a + b;
// };
//
// let Account: {new (): {name: string}};
// interface ListItem {
//   getList(): this;
// }
// function f(this: void) {
//  //this.a = 1;
// }
//
// f(1);
// interface UIElement {
//   addClick(onclick: (this: void, e: Event) => void): void;
// }
//
// class Handler {
//   info: string;
//
//   onClicBad(this: Handler, e: Event) {
//     this.info = 'Hi this';
//   }
// }
// let h = new Handler();
// let uIElement: UIElement = {
//   addClick: (onclick: (this: void, e: Event) => void) => {
//   }
// };
//
// uIElement.addClick(h.onClicBad);
// enum Size {
//   'L' = 42,
//   'M' = 44,
//   'XL' = 52,
//   'XXL' = 56
// }
//
// Size[42]; // => M
// Size.XL; // => 52
//
// let a: Size.XL | Size.M;
// custom type / alias
// type profile = {name: string; surname: string; age?: number};
//
// let account: profile;
//
// interface IProfile {
//
// }
//
// class A implements profile {
//   name: string;
//   surname: string;
// }
//
// type g = {x: g};
// interface IService {
//   getList(): string[];
// }
//
// interface IMover {
//   move(): void;
//   getStatus: () => {speed: number};
// }
// interface IShaker {
//   shale(): void;
//   getStatus: () => {frequency: number};
// }
//
// interface IMoveShaker extends IMover, IShaker {
//   getStatus: () => {speed: number, frequency: number};
// }
//
// interface Window {
//   fb: any;
// }
//
// let fb = (<any>window);
// interface IWindow extends Window {
//   fb: any;
// }
// function getValue<T, U>(a: T, b: U): T {
//   return a;
// }
// let a = getValue<string, string>('asd', 'asd');
//
// interface IAccount<T extends {id: number, name: string}> {
//   someProp: T;
// }
//
// let persone1: IAccount<{id: number, isFemale: boolean}>;
// let persone2: IAccount<{id: number, name: string, isFemale: boolean}>; 
