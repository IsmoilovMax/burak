// H2-TASK: 

// Shunday function tuzing, unga string argument pass bolsin. Function ushbu agrumentdagi digitlarni yangi stringda return qilsin
// MASALAN: getDigits("m14i1t") return qiladi "141"

function extractDigits(s: string): string {
    return s.split('').reduce((result, char) => {
        return char >= '0' && char <= '9' ? result + char : result;
    }, '');
}

// Misol
const extractedDigits = extractDigits("Senior95MIT14Group");
console.log(extractedDigits);  // Bu yerda "141" ni qaytarishi kerak
