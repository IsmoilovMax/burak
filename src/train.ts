// Q-TASK:

// Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string. Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin.
// MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false

function hasProperty(obj: object, propertyName: string): boolean {
    for (const key in obj) {
      if (key === propertyName) {
        return true;
      }
    }
    return false;
  }

  const obj = { name: "BMW", model: "M3" };

console.log(hasProperty(obj, "model")); // true
console.log(hasProperty(obj, "year")); // false

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