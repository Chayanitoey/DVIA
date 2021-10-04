const fs = require('fs');
var data = fs.readFileSync('UHF42.geo.json');
var myObject= JSON.parse(data);

let newData = [
  {
    "Average": 7.18
  },
  {
    "Average": 7.225
  },
  {
    "Average": 7.355
  },
  {
    "Average": 7.26
  },
  {
    "Average": 7.845
  },
  {
    "Average": 7.92
  },
  {
    "Average": 8.055
  },
  {
    "Average": 8.85
  },
  {
    "Average": 8.1
  },
  {
    "Average": 7.4
  },
  {
    "Average": 7.29
  },
  {
    "Average": 7.905
  },
  {
    "Average": 7.13
  },
  {
    "Average": 7.2
  },
  {
    "Average": 6.865
  },
  {
    "Average": 6.86
  },
  {
    "Average": 6.69
  },
  {
    "Average": 8.165
  },
  {
    "Average": 7.555
  },
  {
    "Average": 7.73
  },
  {
    "Average": 7.75
  },
  {
    "Average": 8.245
  },
  {
    "Average": 8.765
  },
  {
    "Average": 9.94
  },
  {
    "Average": 10.315
  },
  {
    "Average": 8.905
  },
  {
    "Average": 8.33
  },
  {
    "Average": 8.975
  },
  {
    "Average": 8.29
  },
  {
    "Average": 7.75
  },
  {
    "Average": 7.085
  },
  {
    "Average": 6.755
  },
  {
    "Average": 7.155
  },
  {
    "Average": 6.8
  },
  {
    "Average": 6.75
  },
  {
    "Average": 6.885
  },
  {
    "Average": 6.585
  },
  {
    "Average": 6.19
  },
  {
    "Average": 6.985
  },
  {
    "Average": 6.58
  },
  {
    "Average": 6.84
  },
  {
    "Average": 6.38
  }
];

// for (let i = 0; i < myObject.length; i++) {
//   const x = myObject[i].appendChild(newData[i]);
//   console.log('x');
// }

// myObject.push(newData);

// var newData2 = JSON.stringify(myObject);
// fs.writeFile("data2.json", newData2, (err) => {

  for (let i = 0; i < myObject.length; i++) {
      const x = []
  x += myObject[i].push(newData[i]);
        console.log(x);
}

//     // error checking
//     if(err) throw err;
    
//     console.log("New data added");
// });   