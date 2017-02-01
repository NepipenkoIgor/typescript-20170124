// interface Iprofile {
//     name:string;
//     surname: string;
// }

// let account = {
//     name: 'Roma',
//     surname: 'Ermochenkov';
// }
//
// let user:typeof account;
//
// user = [1];

let el: HTMLElement = document.getElementById("result");

let a = "fffff";

el.append(a);

class Greeter {

    element: HTMLElement;
    span: HTMLElement;
    time: number;

    constructor(element: HTMLElement){
        this.element = element;
        this.element.innerHTML += "Time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    time() {
        this.timerToken = setInterval ( () => this.span.innerHTML =  new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}


window,onload = () => {
    let el = document.getElementById('result');
    let greeter = new Greeter(el);
    greeter.time();
}


let firstName: string = "Roma";
let age: number = 22;
let info: string = `Name ${firstName} age ${age}`;


