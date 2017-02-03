// function getAverage(a: number, b: number, c: number): string {
//   let total: number = a + b + c;
//   let average: number = total / 3;
//   return `The average is ${average}`;
// }
//
// console.log(getAverage(1, 2, 4));
// function getAverage(a: number, b: number, c?: number): string {
//   let total: number = a;
//   let count: number = 1;
//   total += b;
//   count++;
//   if (typeof c !== 'undefined') {
//     total += c;
//     count++;
//   }
//   let average: number = total / count;
//   return `The average is ${average}`;
// }
// console.log(getAverage(1, 2));
// function getAverage(a: number, b: number, c: number = 0): string {
//   let total: number = a + b + c;
//   let average: number = total / 3;
//   return `The average is ${average}`;
// }
//
// console.log(getAverage(1, 2));
// function getAverage(...a: number[]): string {
//   let total: number = 0;
//   let count: number = 0;
//   for (let i = 0; i < a.length; i++) {
//     total += a[i];
//     count++;
//   }
//   let average: number = total / count;
//   return `The average is ${average}`;
// }
// console.log(getAverage(1, 2));
// console.log(getAverage(1, 2, 3, 4, 5, 11, 3));
// type ns = number|string;
// function isString(a: ns): a is string {
//   if (typeof a === 'string') {
//     return true;
//   }
//   return false;
// }
// function isNumber(a: ns): a is number {
//   if (typeof a === 'number') {
//     return true;
//   }
//   return false;
// }
//
//
// function getAverage(a: number, b: number, c: number): string;
// function getAverage(a: string, b: string, c: string): string;
// function getAverage(a: ns, b: ns, c: ns): string {
//   let total: number = 0;
//   if (isString(a)) {
//     total += parseInt(a, 10); // я строка
//   }
//   if (isNumber(a)) {
//     // я число
//     total += a;
//   }
//   // number|string
//
//
//   let average: number = total / 3;
//   return `The average is ${average}`;
// }
// getAverage('1', '2', '3');
// interface IAccount {
//   name: string;
//   age: number;
// // }
// interface IAccountMethods {
//   getAge(): number;
//   setName(name: string): string;
// }
//
//
// class Account implements IAccountMethods {
//   public constructor(private name: string, protected age: number) {
//   }
//
//   public getAge(): number {
//     return this.age;
//   }
//
//   public setName(name: string): string {
//     this.name = name;
//     return this.name;
//   }
// }
//
// class Profile extends Account {
//   public constructor(name: string, age: number) {
//     super(name, age);
//   }
//
//   public sayAge() {
//     console.log(this.age);
//     console.log(this.name);
//   }
// }
//
// let person = new Profile('Igor', 30);
// class Singleton {
//   private static instance: Singleton;
//
//   private _name: string;
//
//   private constructor() {
//   }
//
//   static getInstance() {
//     if (!Singleton.instance) {
//       Singleton.instance = new Singleton();
//     }
//     return Singleton.instance;
//   }
//
//   public set name(newName: string) {
//     this._name = newName;
//   }
//
//   public get name(): string {
//     return this._name;
//   }
// }
//
// let singleton = Singleton.getInstance();
//
//
// abstract class Account {
//   public getAge(): number {
//     return 30;
//   }
//
//   public abstract setName(name: string): string
// }
//
// class Profile1 extends Account {
//   setName(name: string): string {
//     return 'Igor';
//   }
// }
