// interface IValidator {
//   isValid(s: string): boolean;
// }
//
//
// class NameValidator implements IValidator {
//   isValid(name: string): boolean {
//     return /^([aA-zZ]\-]+|[аА-яЯ]\-]+)$/.test(name);
//   }
// }
//
// class PhoneValidator implements IValidator {
//   isValid(phone: string): boolean {
//     return /^093\d{7}$/.test(phone);
//   }
// }
//
//
// let nameValidator = new NameValidator();


// namespace Interfaces {
//   export interface IValidator {
//     isValid(s: string): boolean;
//   }
//   export class A {}
// }
//
// namespace Validators {
//
//   import IValidator = Interfaces.IValidator;
//
//   export class NameValidator implements IValidator {
//     isValid(name: string): boolean {
//       return /^([aA-zZ]\-]+|[аА-яЯ]\-]+)$/.test(name);
//     }
//   }
//
//   export class PhoneValidator implements IValidator {
//     isValid(phone: string): boolean {
//       return /^093\d{7}$/.test(phone);
//     }
//   }
// }
//
// let nameValidator = new Validators.NameValidator();

//
// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;


// class MathLib {
//   @logMethod('const')
//   public areaOfCircle(r: number): number {
//     return Math.PI * r ** 2;
//   }
// }
//
// function logMethod(myParam: any): any {
//   return (target: any, key: string, descriptor: any) => {
//     return {
//       value: (...args: any[]) => {
//         let b = args.map((a: any) => JSON.stringify(a)).join();
//         let result = descriptor.value(...args);
//         let r = JSON.stringify(result);
//         console.log(`Call: ${key}(${b}) => ${r}`);
//         return result;
//       }
//     };
//   };
// }
//
// let math = new MathLib();
//
// math.areaOfCircle(3);


// class Account {
//   @logProperty
//   public firstName: string;
//   public lastName: string;
//
//   public constructor(firstName: string, lastName: string) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
// }
//
//
// function logProperty(target: any, key: string): void {
//
//   let _val = target[key];
//
//   let _getter = (): typeof _val => {
//     console.log(`Get: ${key} => ${_val}`);
//   };
//   let _setter = (newValue: string): void => {
//     console.log(`Set: ${key} => ${newValue}`);
//     _val = newValue;
//   };
//
//   Object.defineProperty(target, key, {
//     get: _getter,
//     set: _setter,
//     enumerable: true,
//     configurable: true
//   });
// }
//
//
// let me = new Account('Igor', 'Nepipenko');
// let myName = me.firstName;
// me.firstName = 'Stepan';

// @logClass
// class Account {
//   public firstName: string;
//   public lastName: string;
//
//   public constructor(firstName: string, lastName: string) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
// }
//
// function logClass(target: any): any {
//   return () => {
//     console.log(`New instance of ${target.name}`);
//     return target;
//   };
// }
// let person1 = new Account('Igor', 'Nepipenko');
// let person2 = new Account('Igor', 'Nepipenko');


class Account {
  public firstName: string;
  public lastName: string;

  public constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @readMetadta
  public sayMessage(@setMetadta msg: string): string {
    return `${this.firstName} ${this.lastName} : ${msg}`;
  }
}

function setMetadta(target: any, key: string, index: number): void {
  let metadtaKey = `___log_${key}_parametres`;
  if (Array.isArray(target[metadtaKey])) {
    target[metadtaKey].push(index);
    return;
  }
  target[metadtaKey] = [index];
}

function readMetadta(target: any, key: string, desc: any): any {
  let metadtaKey = `___log_${key}_parametres`;
  let indices = target[metadtaKey];
  let originDesc = desc.value;
  desc.value = (...args: any[]): any => {
    console.log(`${key} arg[${indices}]: ${args[indices]}`);
    return originDesc(...args);
  };
  return desc;
}

let person = new Account('Igor', 'Nepipenko');
person.sayMessage('TypeScript is the best');
person.sayMessage('Angular is awesome');

let a: new () => {};
let v: {new (): {}};
