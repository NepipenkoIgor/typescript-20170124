

import { isInArray } from './task-1';


type anyBasic = string|number|boolean|null|undefined;


function getUnique(arr: anyBasic[]): anyBasic[] {

    let uniqueList: anyBasic[] = [];

    for (let ele of arr) {
        if (!isInArray(uniqueList, ele)) {
            uniqueList.push(ele);
        }
    }

    return uniqueList;

}

//  Такие вызовы невозможны:
  
//  getUnique();
//  getUnique(1);
//  getUnique([ {foo: 132} ]);



//  Такие вызовы работают:

//  console.log(getUnique([1,1,1,2,2,2,3,3,3])); // [1,2,3]
//  console.log(getUnique(['a','b','c','a','b','c','a','b','c'])); //['a','b','c']
//  console.log(getUnique(['a','b',2,'c',true,'a','b',false,'c',8,'a',null,false,'b',undefined,'c'])); //[ 'a', 'b', 2, 'c', true, false, 8, null, undefined ]


