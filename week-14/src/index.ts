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

// interface User{
//     firstname: string,
//     age: number,
//     lastname: string
// }

function greet(user : UserType){
    console.log("hello " + user.firstname +" " + user.lastname+ " Your age: " + user.age);
}

// let user1: User  = { 
//     firstname: "Harshii",
//     age: 22,
//     lastname: "Khatri"
// }


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


// // Union:
// interface Manager{
//     name: string,
//     age: number
// }

// interface Employee{
//     name: string,
//     departement: string
// }

// type TeamLead = Manager & Employee

// let t: TeamLead ={
//     name: "Harpreet",
//     age: 23,
//     departement: "SE"
// }

// console.log(t);

interface People{
    name: string;
    age: number;
    greet(name: string): string;
}

class Manager implements People{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    greet() : string{
        return "Hi " + this.name;
    }
    
}

console.log("---------------------")
let user = new Manager("John", 30);
console.log(user.greet());

abstract class User{
    name!: string;
    abstract greet():  string;
}


class Employee extends User{
    name: string;

    constructor(name: string){
        super();
        this.name = name;
    }

    greet(): string {
        return "Hi " + this.name;
    }
}
console.log("--------------")
let emp = new Employee("Happy");
console.log(emp.greet());


interface Admin{
    name: string;
    permission: string;
}

// interface User{
//     name: string;
//     age: number;
// }

// type UserOrAdmin = User | Admin;

// function greet1( user: UserOrAdmin){
//     console.log(user.name);
// }

// interface User{
//     age: number | string;
// }

// Arrays in TS:

function getMax(nums: number[]){
    let maxVal = -Infinity
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== undefined && nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;

}

console.log("---------------");
console.log(getMax([1,2,3,4,5]));

interface User2{
    firstName: string;
    lastName: string;
    age: number;
}

function isLegal(user: User2[]) {
    // for(let i=0; i<user.length; i++){
    //     if(user[i]?.age >=18){
    //         return true;
    //     }
    // }
    // return false;
    let ans = [];
    for(let i=0; i<user.length; i++){
        if(user[i]?.age > 18){
            ans.push(user[i]);
        }
    }
    return ans;
}

const filteredUsers = isLegal([
    {
        firstName: "harkirat",
        lastName: "Singh",
        age: 19
    }
])

//console.log(isLegal([{ firstName: "abc", lastName: "xyz", age: 18 }]));

console.log(filteredUsers);