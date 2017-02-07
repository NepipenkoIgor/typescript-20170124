/***
 Task#4
 Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
 цифры и специальные символы должны остаться на месте
 s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
 s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
 s1tar3t 2   low5  ->  t1rat3s 2   wol5
 *
 ***/

function isLetter(a: string): boolean {
    return !!(a.match(/^[A-Za-z]+$/));
}

function reverseWord(word: string): string {

    let onlyLetters: string[] = word.split('').
        filter((a) => {
            return isLetter(a);
        });

    let chars: string[] = word.split('').
        map((char) => {
            return (isLetter(char)) ? onlyLetters.pop() : char;
        });

    return chars.join('');
}

function reverseSentence(sentence: string): string {
    let words: string[] = sentence.split(' ').map( (word) => { return reverseWord(word); });
    return words.join(' ');
}

console.log(reverseSentence('s1tar3t 2 hellow'));    //   t1rat3s 2 wolleh
console.log(reverseSentence('s1ta$%r3t 2 hel^low')); // t1ra$%t3s 2 wol^leh
console.log(reverseSentence('s1tar3t 2   low5'));    //    t1rat3s 2   wol5