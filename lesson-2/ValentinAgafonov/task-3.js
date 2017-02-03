"use strict";
var task_1_1 = require('./task-1');
function getUnique(arr) {
    var uniqueList = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var ele = arr_1[_i];
        if (!task_1_1.isInArray(uniqueList, ele)) {
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
