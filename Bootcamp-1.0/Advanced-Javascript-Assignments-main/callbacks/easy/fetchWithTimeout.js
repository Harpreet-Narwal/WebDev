// Problem Description – fetchWithTimeout(url, ms)

// You are required to write a function named fetchWithTimeout that accepts a URL and a time limit in milliseconds. 
// The function must return a Promise that attempts to fetch data from the given URL.
// If the request completes within the specified time, the Promise resolves with the fetched data. 
// If the operation exceeds the time limit, the Promise rejects with the message "Request Timed Out".

function fetchWithTimeout(url, ms) {
    const response = fetch(url)

    const timeoutPromise = new Promise((_, reject) =>{
        setTimeout(() =>{
            reject("Request Timed Out");
        }, ms);
    })

    return Promise.race([response, timeoutPromise]);
}

function fetchWithTimeoutClean(url, ms) {

    const controller = new AbortController();
    const { signal } = controller;

    return new Promise((resolve, reject) =>{
        const timeoutId = setTimeout(() => {
            controller.abort();
            reject("Request Timed Out")
        }, ms);

        fetch(url, { signal })
            .then((response) => {
                clearTimeout(timeoutId);
                resolve(response);
            })
            .catch((error) => {
                // If the request was aborted, throw the specific string required by the test
                if (error.name === 'AbortError') {
                    throw "Request Timed Out";
                }
                // For any other error, rethrow it as is
                throw error;
            });
    })

}



module.exports = { fetchWithTimeout, fetchWithTimeoutClean };




