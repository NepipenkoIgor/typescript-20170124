
type anyBasic = string|number|boolean|null|undefined;

export function isInArray(list: anyBasic[], firstElement: anyBasic, ...otherElements: anyBasic[]): boolean {
    let elements: anyBasic[] = [firstElement, ...otherElements];
    for (let element of elements) {
        let hasElement: boolean = false;
        for (let item of list) {
            if (item === element) {
                hasElement = true;
            }
        }
        if (!hasElement) {
            return false;
        }
    }
    return true;
}



//  Такие вызовы невозможны:
//  isInArray(1);
//  isInArray();
//  isInArray(1,2,3,4);
//  isInArray([1,2,3,4]);
//  isInArray([{a:1}], {a:1});



//  Такие вызовы работают:

//console.log(isInArray([1,2,3,4],2));  // true
//console.log(isInArray([7,8,9],7,8,9));  // true
//console.log(isInArray([7,8,9],7,8,9,1));  // false
//console.log(isInArray([],1));  // false

