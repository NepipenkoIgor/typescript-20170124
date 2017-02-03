function revertLettersInAllWords(inputSting) {
    return inputSting.split(' ').map(revertLettersInWord).join(' ');
}
function revertLettersInWord(inputSting) {
    var inputArray = inputSting.split(''), i = 0, j = inputArray.length - 1, tmp;
    while (i < j) {
        if (!isLetter(inputArray[i])) {
            i++;
        }
        else if (!isLetter(inputArray[j])) {
            j--;
        }
        else {
            tmp = inputArray[i];
            inputArray[i] = inputArray[j];
            inputArray[j] = tmp;
            i++;
            j--;
        }
    }
    return inputArray.join('');
}
function isLetter(str) {
    return !!(str.match(/[a-z]/i));
}
console.log(revertLettersInAllWords('s1tar3t 2 hellow')); //  w1oll3e 2 htrats
console.log(revertLettersInAllWords('s1ta$%r3t 2 hel^low')); //  w1ol$%l3e 2 htr^ats
console.log(revertLettersInAllWords('s1tar3t 2   low5')); //  w1olt3r 2   ats5
