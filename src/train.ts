// O-TASK:

// Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin.
// MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45


function SumOfNumbers(numbers: any[]): number {
    return numbers.reduce((sum, number) => sum + (typeof number === 'number' ? number : 0));
  }

const numbers = [40, "10", { son: 10 }, true, 25];
const sum = SumOfNumbers(numbers);
console.log(sum); // 65

/*
---Validations---
frontend
backend
database
*/

/* project Standarts:
    -Logging standarts
    -Naming standards
        function, method, variable = > CAMEL goHome
        class => PASCAL                     MemberService
        folder => KEBAB                     
        css => SNAKE                         button
    -Error handling   

*/
/*  REQUEST:
    - Eng kop ishlatiladigan Api-
    Traditinal Api Burak HTML ozini elementlaru orqali amalga oshiriladugon request = form -> POst
    Rest Api    Burak json almashinuvi
    GraphQL Api 
*/    


/* 
Traditional "Frontend development"(HTML (HyperText Markup Language):) =>
     BSSR ("Adminka"="Back-end site server rendering.") =>
        EJS(EJS is a simple yet powerful templating language for generating HTML markup with JavaScript)

    Modern "Frontend development" => 
        SPA("USer"="SPA stands for Single Page Application") =>
        REACT


*/        

/*
 * Validation 
    frontend validation
    backend validation
    database validation
 */