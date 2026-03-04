/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let largestEle =  -Infinity;
  if(numbers.length == 0) return undefined;
  for(let i=0; i<numbers.length; i++){
    largestEle = Math.max(largestEle, numbers[i]);
  }

  return largestEle;

}

module.exports = findLargestElement;