// X-TASK:

//  Shunday function yozing, uni object va string parapetrlari bolsin. Function string parametri 
//object ichida necha marotaba takrorlanganligini qaytarsin (nested object bolsa ham sanasin)
//  MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

function countReduce(obj: any, searchString: string): number {
  let count = 0;

  function search(obj: any): void {
    if (obj !== null && typeof obj === 'object') {
      Object.keys(obj).reduce((acc, key) => {
        if (key === searchString || obj[key] === searchString) {
          count++;
        }
        search(obj[key]);
        return acc;
      }, {});
    }
  }

  search(obj);
  return count;
}

// Test
console.log(countReduce({ model: 'Bugatti', steer: { model: 'HANKOOK', size: 30, brand: 'model' } }, 'model')); 


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