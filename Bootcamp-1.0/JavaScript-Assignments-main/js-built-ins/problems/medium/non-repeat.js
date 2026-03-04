/*
  Write a function `nonrepeat` which takes a string as input and returns the first non-repeating character in the string.

  What is a non-repeating character?
  - A character that appears only once in the entire string.

  Example:
  - Input: "abcab"
  - Output: "c"

  - Input: "aabbcc"
  - Output: null

  - Input: "abcdef"
  - Output: "a"

  - Input: ""
  - Output: null

  Once you've implemented the logic, test your code by running
  - `npm run test-nonrepeat`
*/
function nonrepeat(str) {
  // Your code here
  // const char = str.split('').filter((index, pos, self) => {
  //   return self.indexOf(index) == pos;
  // }).join('');

  // console.log(char);

  let freq = {};

  for(let ch of str){
    freq[ch] = (freq[ch] || 0 ) + 1;
  }

  for(let ch of str){
    if(freq[ch] === 1){
      return ch;
    }
  }

  return null;


}

module.exports = nonrepeat;
