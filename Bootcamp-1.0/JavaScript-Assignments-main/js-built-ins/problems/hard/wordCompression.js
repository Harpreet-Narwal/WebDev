/*
  Write a function `compressWords` which takes an array of strings as input and returns a new array with consecutive duplicate elements compressed. If an element appears consecutively, it is replaced by the element followed by the count of its occurrences.

  Example:
  - Input: ["apple", "apple", "banana", "banana", "banana", "cherry", "apple", "apple"]
  - Output: ["apple2", "banana3", "cherry", "apple2"]

  - Input: ["cat", "dog", "dog", "dog", "cat"]
  - Output: ["cat", "dog3", "cat"]

  - Input: ["one", "two", "three"]
  - Output: ["one", "two", "three"]

  - Input: []
  - Output: []

  Note:
  - The function should handle empty arrays and arrays with no consecutive duplicates.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressWord`
*/


function compressWords(arr) {
  // Your code here

  let output = [];
  let cnt = 1;
  let result = "";
  for(let i=1; i<=arr.length; i++){
    if(arr[i] === arr[i-1]){
      cnt++;
    }else{
      if(cnt > 1){
        result += arr[i-1] + cnt;
        output.push(result);
        result = "";
        cnt = 1;
      }else{
        output.push(arr[i-1]);
      }
    }
  }

  return output;

}

console.log(compressWords(["one", "two", "three"]))
module.exports = compressWords;
