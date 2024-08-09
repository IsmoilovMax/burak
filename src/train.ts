// ZG-TASK:

// Shunday function yozing, u berilgan string parametrni snake casega otkazib qaytarsin. 
// MASALAN: capitalizeWords('name should be a string') return 'name_should_be_a_string'

function toSnakeCase(str: string): string {
    return str.split(' ').reduce((acc, word, index) => {
        return acc + (index > 0 ? '_' : '') + word.toLowerCase();
    }, '');
}
console.log(toSnakeCase("waiting for changes before restart"))

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