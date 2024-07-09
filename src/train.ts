// S-TASK:

// Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin
// MASALAN: missingNumber([3, 0, 1]) return 2

// Функция для нахождения пропущенного числа в массиве
function missingNumber(nums: number[]): number {
    // n это длина массива
    const n = nums.length;
    
    // Вычисляем сумму первых n натуральных чисел, включая 0
    const totalSum = (n * (n + 1)) / 2;
    
    // Вычисляем сумму элементов данного массива
    const arraySum = nums.reduce((acc, num) => {
        console.log(`acc: ${acc}, num: ${num}`); // Вывод текущего значения аккумулятора и элемента массива
        return acc + num; // Добавляем текущий элемент к аккумулятору
    }, 0); // Начальное значение аккумулятора равно 0

    console.log(`totalSum: ${totalSum}, arraySum: ${arraySum}`); // Вывод общей суммы и суммы массива
    
    // Разница между общей суммой и суммой массива - это пропущенное число
    return totalSum - arraySum;
}

// Примеры использования:
console.log(missingNumber([3, 0, 1])); // Результат: 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // Результат: 8
console.log(missingNumber([0, 1])); // Результат: 2
console.log(missingNumber([0])); // Результат: 1



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