// let x:number = 1;
// console.log(x); 

// function greet(firstName : string) : void{
//     console.log("Hello " + firstName);
// }

// greet("Harshii");

// function sum(a : number, b : number): Number{
//     return a + b;
// }

// console.log(sum(7, 2));

// function isLegal(age: number) : Boolean{
//     if(age > 18) return true;
//     else return false;
// }

// console.log(isLegal(1));

// function delayedCall(fn: () => void){
//     setTimeout(fn, 1000);
// }

// delayedCall(() => {
//     console.log("Hello Cutiee");
// })

interface User{
    firstname: string,
    age: number,
    lastname: string
}

function greet(user : UserType){
    console.log("hello " + user.firstname +" " + user.lastname+ " Your age: " + user.age);
}

let user1: User  = { 
    firstname: "Harshii",
    age: 22,
    lastname: "Khatri"
}


let user2: UserType  = { 
    firstname: "Harshii",
    age: 22,
    lastname: "Khatri"
}

greet(user2);

type UserType = {
    firstname: string,
    age: number
    lastname: string
}


// OR:
type StringOrNumber = string|number;

function printId(id: StringOrNumber){
    console.log(`Id: ${id}`);
    console.log(typeof(id))
}

printId("101");
printId(2301);


// Union:
interface Manager{
    name: string,
    age: number
}

interface Employee{
    name: string,
    departement: string
}

type TeamLead = Manager & Employee

let t: TeamLead ={
    name: "Harpreet",
    age: 23,
    departement: "SE"
}

console.log(t);