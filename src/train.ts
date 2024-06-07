// H-TASK: 

// shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib, faqat positive qiymatlarni olib string holatda return qilsin
// MASALAN: getPositive([1, -4, 2]) return qiladi "12"

function posiString(arr: number[]): string {
    return arr.reduce((str, num) => num > 0 ? str + num : str, '');
}

// Examples:
console.log(posiString([1, -4, 4])); // "14"
console.log(posiString([-1, -5, -3])); // ""
console.log(posiString([2, 5, 7, -8])); // "257"
