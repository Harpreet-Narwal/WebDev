// let x:number = 1;
// console.log(x); 

function greet(firstName : string) : void{
    console.log("Hello " + firstName);
}

greet("Harshii");

function sum(a : number, b : number): Number{
    return a + b;
}

console.log(sum(7, 2));

function isLegal(age: number) : Boolean{
    if(age > 18) return true;
    else return false;
}

console.log(isLegal(1));

function delayedCall(fn: () => void){
    setTimeout(fn, 1000);
}

delayedCall(() => {
    console.log("Hello Cutiee");
})