/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let cnt = 0;
    let str2 = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    for(let i=0; i<str2.length; i++){
      if(str2[i] == 'a' || str2[i] == 'e' || str2[i] == 'i' || str2[i] == 'o' || str2[i] == 'u'){
        cnt++;
      }
    }
    return cnt;
}

module.exports = countVowels;