// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
//  must resolve with an array of results in the sItame order once all inputs resolve, or reject immediately if any input rejects.
function promiseAll(promises) {
    // if(promises.length === 0){
    //     return Promise.resolve([]);
    // }
    // if(!Array.isArray(promises)) {return Promise.reject(new TypeError("Input must be an array"))}

    // const [first, ...rest] = promises;

    // return Promise.resolve(first).then(firstResult =>{
    //     return promiseAll(rest).then(restResult => {
    //         return [firstResult, ...restResult];
    //     })
    // })
    return new Promise((resolve, reject)=>{
        if(promises.length === 0){
            resolve([]);
            return;
        }

        const results = [];
        let completedCount= 0;

        promises.forEach((item, index) =>{
            Promise.resolve(item)
                .then((value) =>{
                    results[index] = value;
                    completedCount++;
                
                    if(completedCount === promises.length){
                        resolve(results);
                    }
                })
                .catch((error) =>{
                    reject(error);
                })
        })
    })
}



module.exports = promiseAll;
