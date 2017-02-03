
type ns = number|string;
type nsList = ns[];

function isNumberList(list: nsList): list is number[] {
    for (let item of list) {
        if (typeof item !== 'number') {
            return false;
        }
    }
    return true;
}

function isStringList(list: nsList): list is string[] {
    for (let item of list) {
        if (typeof item !== 'string') {
            return false;
        }
    }
    return true;
}

function summator(...list: number[]): number;
function summator(...list: string[]): string;
function summator(...list: ns[]): any {

    if (isNumberList(list)) {

        let result: number = 0;
        for (let item of list) {
            result += item;
        }
        return result;

    } else if (isStringList(list)) {

        let result: string = '';
        for (let item of list) {
            result += item;
        }
        return result;

    }

}


//  Такой вызов невозможен:

//  summator('test', 123);




//  Такие вызовы работают:

//console.log(summator('test', ' ', 'summator', ' ', 'hello', '!'));  // test summator hello!
//console.log(summator(4,5,6,7,8,100000)); // 100030



//  Это спорно, но работает:

//console.log(summator()); // 0

 

