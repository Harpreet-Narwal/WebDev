import { z } from "zod";
import express from "express";

const app = express();

app.use(express.json());

interface User{
    id?: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

/* function sumOfAge(user1 : User, user2: User): number{
    return user1.age + user2.age;
}

const age = sumOfAge({name: "Harpreet", age: 23}, {name: "Harkirat", age: 28});

console.log(age);

 */

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>

type UpdatePropsOptional = Partial<UpdateProps>

function updateUser(updatedProps: UpdatePropsOptional){
    console.log(`Name: ${updatedProps.name}, Email: ${updatedProps.email}`);
}

let user4: UpdatePropsOptional ={
    name: "Harpreet",
    //age: 23,
    email: "harpreetnarwal9@gmail.com"
}

updateUser(user4);

type Emp1 = {
    readonly name: string;
    readonly age : number;
}

const emp : Emp1 = {
    name: "John",
    age: 21
}

// OR:

type Emp2 = {
     name: string;
     age : number;
}

const emp1: Readonly<Emp2> = {
    name: "Happy",
    age: 23
}
 

//emp.age = 12; not possible cause readonly

// RECORDS AND MAPS:

type AnotherUser = {
    id: string;
    username: string;

}

type UsersToo = {
    [key: string] : AnotherUser
}


const users : UsersToo  = {
    "ras@qd1" : {
        id: "ras@qd1",
        username: "Harkirat"
    },
    "ras1dr@": {
        id: 'ras1dr@',
        username: "John"
    }
}


// RECORDS: 
type UsersAsWell = Record<string, {age: number, name: string}>

const users2: UsersAsWell = {
    "ras@qd1" : {age: 21, name: "harkirat"},
    "ras1dr@" : {age: 33, name: "asdasd"}
}

//MAPS: 
type MapUser = {
    name: string;
    age: number;
    email?: string;
}


const mapusers = new Map<string, MapUser>();
mapusers.set("ras@qd1", {name: "Ras", age: 23});
mapusers.set("sarah@qd1", {name: "Sarah", age: 32});

const user5 = mapusers.get("sarah@qd1");

console.log(user5);


// EXCLUDE:

type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType, 'scroll'>;

const handleEvent = (event: ExcludeEvent) =>{
    console.log(`Handeling Event : ${event}`);
};
handleEvent("click")


// Type inference in Zod

const userProfileSchema = z.object({
    name:z.string().min(1, {message: "Name cannot be empty"}),
    email: z.email({message: "Invalid email format"}),
    age: z.number().min(18, {message: "You must be at least 18 years old"}).optional()
});

type ZodUser = z.infer<typeof userProfileSchema>

app.put("/user", (req, res) =>{
    const {success} = userProfileSchema.safeParse(req.body);
    const updateBody: ZodUser = req.body;

    if(!success){
        res.status(411).json({});
        return;
    }
    else{
        res.json({
            message: "Update successful"
        })
    }
})
