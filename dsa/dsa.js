/* 
Given an array arr[], the task is to reverse the array. 
Reversing an array means rearranging the elements such that the first element becomes the last, 
the second element becomes second last and so on.

input=  [1, 4, 3, 2, 6, 5];
output= [5, 6, 2, 3, 4, 1];

input = [4, 5, 1, 2]
output = [2, 1, 5, 4]

[4, 5, 1, 2]

lengthOfArr = 4;
4/2 = 2
i=2
j=3
*/

exports.reverseArray = (arr) => {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr;

  const lengthOfArr = arr.length;

  let i = 0;
  let j = 0;

  if (lengthOfArr % 2 === 0) {
    i = lengthOfArr / 2 - 1;
    j = i + 1;
    console.log("i", i, "\nj", j);
  } else {
    i = Math.floor(lengthOfArr / 2) - 1;
    j = i + 2;
  }

  while (i >= 0 && j < lengthOfArr) {
    const iel = arr[i];
    arr[i] = arr[j];
    arr[j] = iel;
    i--;
    j++;
  }
  return arr;
};

/* 
Maximum and minimum of an array using minimum number of comparisons
Given an array of size N. The task is to find the maximum and the minimum element of the array 
using the minimum number of comparisons.

input = [3, 5, 4, 1, 9]
output: Minimum element is 1
        Maximum element is 9

input = [22, 14, 8, 17, 35, 3]
output: Minimum element is:3;
        Maximum element is:35;

*/

exports.findMaxMin = (arr) => {
  if (arr.length === 0) return null;
  if (arr.length === 1)
    return `Minimum element is: ${arr[0]} \nMaximum element is: ${arr[0]}`;
  let max = arr[0];
  let min = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }

    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return `Minumum element is: ${min}  \nMaximum element is: ${max}`;
};

/* 
 Kth smallest

 Given an array arr[] and an integer k where k is smaller than the size of the array, 
 the task is to find the kth smallest element in the given array

 input: [7, 10, 4, 3, 20, 15]
 output: 7
 explanation: 3rd smallest element is 7

 input: [2, 3, 1, 20, 15] k=4
 output 15;
*/

exports.kthSmallest = (arr, k) => {
  let min = [];
  let minVal = -Infinity;

  for (let i = 0; i < arr.length; i++) {}
};
