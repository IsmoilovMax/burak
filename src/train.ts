// K-TASK: 

// Shunday function yozing, u string qabul qilsin va string ichidagi unli harflar sonini qaytarsin.
// MASALAN: countVowels("string") return 1;

function calculateVowels(text: string): number {
    const vowelArray: string[] = ['a', 'e', 'i', 'o', 'u', "o' ", 'A', 'E', 'I', 'O', 'U', "O' "];
    
    return text.split('').filter(char => vowelArray.includes(char)).length;
}

// Example usage:

console.log(calculateVowels("JavaScript")); // Output: 3




  
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
    Traditinal Api Burak
    Rest Api    Burak
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