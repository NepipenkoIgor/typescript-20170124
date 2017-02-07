export default function swapWordLetters(str: string): string {
    let arrayTizedStr: string[] = stringToArray(str);
    let stateObj: StateObj = {wordLetterIndeces: [], wordStartIndex: null, result: [...arrayTizedStr]};

    let {result} = arrayTizedStr.reduce(processWordLetter, stateObj);
    return arrayToString(result);
}

function processWordLetter(stateObj: StateObj, symbol: string, index: number, processedArray: string[]): StateObj {
    if (!isWordSeparator(symbol)) {
        if (!hasStoredWordStartIndex(stateObj)) {
            startWordLetterCollection(stateObj, index);
        }
        if (isLetter(symbol)) {
            storeWordLetter(stateObj, index);
        }
    }
    if (shouldStartLetterSwapping(stateObj, symbol, processedArray, index)) {
        swapProcessedWordLetters(stateObj, processedArray);
    }
    return stateObj;
}

function storeWordLetter(stateObj: StateObj, index: number) {
    stateObj.wordLetterIndeces.push(index);
}

function startWordLetterCollection(stateObj: StateObj, index: number) {
    stateObj.wordStartIndex = index;
    stateObj.wordLetterIndeces = [];
}

function swapProcessedWordLetters(stateObj: StateObj, processedArray: string[]) {
    stateObj.wordStartIndex = null;
    for (let i: number = 0; i < (stateObj.wordLetterIndeces.length / 2); i++) {
        let firstIndex: number = stateObj.wordLetterIndeces[i];
        let secondIndex: number = stateObj.wordLetterIndeces[stateObj.wordLetterIndeces.length - i - 1];
        swapTwoLettersAtIndexes(processedArray, firstIndex, secondIndex, stateObj);
    }
}

function swapTwoLettersAtIndexes(processedArray: string[], firstIndex: number, secondIndex: number, stateObj: StateObj) {
    let firstLetter: string = processedArray[firstIndex];
    let secondLetter: string = processedArray[secondIndex];
    stateObj.result[firstIndex] = secondLetter;
    stateObj.result[secondIndex] = firstLetter;
}

function shouldStartLetterSwapping(stateObj: StateObj, symbol: string, processedArray: string[], index: number): boolean {
    return hasStoredWordStartIndex(stateObj) && (symbol === ' ' || processedArray.length === (index + 1));
}

function hasStoredWordStartIndex(stateObj: StateObj): boolean {
    return stateObj.wordStartIndex !== null;
}

function isWordSeparator(symbol: string): boolean {
    const wordSeparator: string = ' ';
    return symbol === wordSeparator;
}

function arrayToString(arr: string[]): string {
    return arr.join('');
}

function stringToArray(str: string): string[] {
    return str.split('');
}

function isLetter(str: string): boolean {
    return str.length === 1 && !!str.match(/[a-z]/i);
}

type StateObj = {wordLetterIndeces: number[], wordStartIndex: number | null, result: string[]};


test();
function test() {
    console.log(swapWordLetters('s1tar3t 2 hellow') === 't1rat3s 2 wolleh');
    console.log(swapWordLetters('s1ta$%r3t 2 hel^low') === 't1ra$%t3s 2 wol^leh');
    console.log(swapWordLetters('s1tar3t 2   low5') === 't1rat3s 2   wol5');
}