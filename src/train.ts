// J-TASK: 

// Shunday function yozing, u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin.
// MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan


function findLongestWord(text: string): string {
    return text.split(' ').reduce((maxWord , currentWord ) => {
        return currentWord .length > maxWord .length ? currentWord  : maxWord ;
    }, '');
}

// Test the function
console.log(findLongestWord("I come from Uzbekistan")); // Should return "Uzbekistan"

  
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

/*
 * re
 */