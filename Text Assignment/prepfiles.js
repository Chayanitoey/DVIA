
const fs = require('fs'); 
// file system is preinstalled
const got = require('got');
var content = fs.readFileSync('MergedFiles/merged-Obama.txt');
var allwords = content.toString().toLowerCase();
var text = allwords.toString().split(/\W+/);
var counts ={};

for (var i = 0; i <= text.length; i++) {
  var word = text[i];
  // It's a new word!
  if (counts[word] === undefined) {
    counts[word] = 1;
  // We've seen this word before!
  } else {
    counts[word]++;
  }
// console.log(text);
}

fs.writeFileSync('Obama_alltext.txt',text); 






















//JavaScript code
// function countWords(str) {
// //Edge case: an empty array
//   if (str.length === 0) {
//     return {};
//   } 
//   var output = {};
//   var split = str.toString().split(" ");

//   // var strArr = str.toString().split(",").toString().split(".").toString().split("-").toString().split(":").toString().split(" ").toString().split(",");
//   var strArr = str.toString().split(" ");
// //A loop
//   for (var i=0; i < strArr.length; i++) {
//     var word = strArr[i];
//       // if (split[i] != " ") {
//       //               output[word] += 1;
//       //           }
                
//     if (output[word] === undefined) {
//       output[word] = 1;
//     } else {
//       output[word] += 1;
//     }
    
//   }
//   return output;
// }
/* TEST CODE */


// var output = countWords(content); 
// var freq = output.length;
// console.log('****',freq);
// console.log(output);
// // { ask: 1, a: 2, bunch: 2, get: 1 }

//JavaScript code, rewritten
// function countWords(str) {
//   if (str.length === 0) {
//     return {};
//   }
// var output = {};
//   var strArr = str.split(" ")
//   str.split(" ").map(word => output[word]? output[word]++ : output[word] = 1)
//   return output;
// }
// /* TEST CODE */
// var output = countWords(text); 
// console.log(output);
//output: { ask: 1, a: 2, bunch: 2, get: 1 }