// // I-TASK:

// // Shunday function yozing, u parametridagi array ichida eng kop takrorlangan raqamni topib qaytarsin.
// // MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4

// function findArrayElement(arr: number[]): number {
//     // Сортируем массив (это поможет группировать одинаковые элементы рядом)
//     arr.sort((a, b) => a - b);

//     let maxCount = 0;
//     let findArrayElement = arr[0]; // По умолчанию выбираем первый элемент массива
//     let currentCount = 1;

//     // Проходимся по отсортированному массиву и считаем повторения
//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] === arr[i - 1]) {
//             currentCount++;
//         } else {
//             if (currentCount > maxCount) {
//                 maxCount = currentCount;
//                 findArrayElement = arr[i - 1];
//             }
//             currentCount = 1; // Сбрасываем счетчик для нового элемента
//         }
//     }

//     // Проверяем последний набор элементов
//     if (currentCount > maxCount) {
//         maxCount = currentCount;
//         findArrayElement = arr[arr.length - 1];
//     }

//     return findArrayElement;
// }

// // Пример использования:
// console.log(findArrayElement([1, 2, 3, 4, 5, 4, 3, 4])); // Выведет 4
// console.log(findArrayElement([1, 2, 3, 4, 5, 4, 5, 5])); // Выведет 5
//console.log(findArrayElement([1, 2, 3, 4, 5, 4, 3, 3])); // Выведет 3
  
/* project Standarts:
    -Logging standarts
    -Naming standards
        function, method, variable = > CAMEL goHome
        class => PASCAL                     MemberService
        folder => KEBAB                     
        css => SNAKE                         button
    -Error handling   

*/
/*
    - Eng kop ishlatiladigan Api-
    Traditinal Api Burak
    Rest Api    Burak
    GraphQL Api 
*/    

/* Traditional "Frontend development"(HTML (HyperText Markup Language):) =>
     BSSR ("Adminka"="Back-end site server rendering.") =>
        EJS(EJS is a simple yet powerful templating language for generating HTML markup with JavaScript)

    Modern "Frontend development" => 
        SPA("USer"="SPA stands for Single Page Application") =>
        REACT
*/        