/*
  Write a function `compression` which takes a string as input and returns a compressed version of the string. The compression is done by replacing consecutive repeating characters with the character followed by the count of repetitions. If a character does not repeat, it is not followed by a count.

  Example:
  - Input: "aaabbbbcccvvmm"
  - Output: "a3b4c3v2m2"

  - Input: "abc"
  - Output: "abc"

  - Input: "aabbcc"
  - Output: "a2b2c2"

  - Input: ""
  - Output: ""

  Note:
  - The function should work for any alphanumeric string.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressString`
*/

function compression(str) {
  // Your code here
  let cnt = 1;
  let result = "";

  if(str == "") return "";

  // for(let i=1; i<str.length; i++){
  //   if(str[i] != str[i-1] && cnt > 1){
  //     result += str[i-1] + "" +cnt;
  //     cnt = 1;
  //   }else{
  //     cnt++;
  //   }
  // }
  // let n = str.length;
  // if(cnt > 1){
  //   result += str[n-1] + "" + cnt;
  // } else{
  //   result += str[n-1];
  // }
  // return result;

  for(let i=1; i<str.length; i++){
    if(str[i] === str[i-1]){
      cnt++;
    }else{
      result += str[i-1];
      if(cnt > 1){
        result += cnt;
      }
      cnt = 1;
    }
  }

  result += str[str.length -1];
  if(cnt > 1) result += cnt;

  return result;

}



module.exports = compression;