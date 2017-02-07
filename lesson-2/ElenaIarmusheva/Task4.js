/***
 Task#4
 Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
 цифры и специальные символы должны остаться на месте
 s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
 s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
 s1tar3t 2   low5  ->  t1rat3s 2   wol5
 *
 ***/
function isLetter(a) {
    return !!(a.match(/^[A-Za-z]+$/));
}
function reverseWord(word) {
    var onlyLetters = word.split('').
        filter(function (a) {
        return isLetter(a);
    });
    var chars = word.split('').
        map(function (char) {
        return (isLetter(char)) ? onlyLetters.pop() : char;
    });
    return chars.join('');
}
function reverseSentence(sentence) {
    var words = sentence.split(' ').map(function (word) { return reverseWord(word); });
    return words.join(' ');
}
console.log(reverseSentence('s1tar3t 2 hellow')); //   t1rat3s 2 wolleh
console.log(reverseSentence('s1ta$%r3t 2 hel^low')); // t1ra$%t3s 2 wol^leh
console.log(reverseSentence('s1tar3t 2   low5')); //    t1rat3s 2   wol5
