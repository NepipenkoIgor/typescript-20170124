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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var Account = (function () {
    function Account(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Account.prototype.sayMessage = function (msg) {
        return this.firstName + " " + this.lastName + " : " + msg;
    };
    return Account;
}());
__decorate([
    readMetadta,
    __param(0, setMetadta),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], Account.prototype, "sayMessage", null);
function setMetadta(target, key, index) {
    var metadtaKey = "___log_" + key + "_parametres";
    if (Array.isArray(target[metadtaKey])) {
        target[metadtaKey].push(index);
        return;
    }
    target[metadtaKey] = [index];
}
function readMetadta(target, key, desc) {
    var metadtaKey = "___log_" + key + "_parametres";
    var indices = target[metadtaKey];
    var originDesc = desc.value;
    desc.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(key + " arg[" + indices + "]: " + args[indices]);
        return originDesc.apply(void 0, args);
    };
    return desc;
}
var person = new Account('Igor', 'Nepipenko');
person.sayMessage('TypeScript is the best');
person.sayMessage('Angular is awesome');
var a;
var v;
//# sourceMappingURL=class-work.js.map