// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {

    return new Promise((resolve, reject) =>{
        if(!Array.isArray(promises)) return reject(new TypeError("Input must be an array"));

        if(promises.length === 0){
            return reject(new AggregateError([], "Empty iterable"));
        }

        const errors = [];
        let rejectedCount = 0;

        promises.forEach((item, index) =>{
            Promise.resolve(item)
                .then((value) =>{
                    resolve(value);
                })
                .catch((error) =>{
                    errors[index] = error;
                    rejectedCount++;

                    if(rejectedCount === promises.length){
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                })
        }) 

    })

}

module.exports = promiseAny;
