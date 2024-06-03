/*
G-TASK:

Shunday function tuzingki unga integerlardan iborat array pass bolsin va function bizga osha arrayning eng katta qiymatiga tegishli birinchi indexni qaytarsin.
    MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.
*/

function getHighestIndex(arr) {
    return arr.reduce((maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);
}

// Test
const arr = [5, 11, 21, 31, 44];
console.log(getHighestIndex(arr));
