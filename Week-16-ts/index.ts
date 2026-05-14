// function sum(a: number, b: number){
//     return a + b;
// }

// let x = 123;
// let y = 2;

// console.log(sum(x, y));


// function first_element(arr: Array<Number>) : Number | null{
//     if(arr.length > 0){
//         return arr[arr.length - 1] ?? null;
//     }
//     return null;
// }



// const ans = first_element([1, 2, 3]);
// console.log(ans);


function delayedCall(fn: () => void){
    setTimeout(fn, 1000);
}

function x(){
    console.log("hi");
}

delayedCall(x);