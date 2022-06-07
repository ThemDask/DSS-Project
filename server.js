const express = require('express')
const app = express()
const port = 8000
const bp = require('body-parser');
const { exec } = require("child_process");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// set path
app.use('/public',express.static(__dirname + '/public/'));

//load html template from server
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html')
});

// handling post request 
app.post("/", (req, res) => {
  data = req.body;
  write(data) //function to create .arff file
  res.status(201).send('post request successful')
})

// handling get request
app.get('/res', (req, res) => {
  res.send(result)
});

// server Setup
app.listen(port, () => {
  console.log(`App listening on port ${port}\nhttp://localhost:${port}/`)
})

// create .arff format and store it
arff = "@relation heart_failure"+
"\n"+
"\n@attribute age numeric"+
"\n@attribute anaemia {0,1}"+
"\n@attribute creatinine_phosphokinase numeric"+
"\n@attribute diabetes {0,1}"+
"\n@attribute ejection_fraction numeric"+
"\n@attribute high_blood_pressure {0,1}"+
"\n@attribute platelets numeric"+
"\n@attribute serum_creatinine numeric"+
"\n@attribute serum_sodium numeric"+
"\n@attribute sex {0,1}"+
"\n@attribute smoking {0,1}"+
"\n@attribute time numeric"+
"\n@attribute DEATH_EVENT {0,1}"+
"\n"+
"\n@data";
	
// function to write user input into .arff file
function write(data) {
  const fs = require('fs');

  // concaternate user input into .arff file
  arffdata = arff.concat('\n',data.age, ',', data.anaemia, ',', data.cpk, ',',
  data.diabetes, ',', data.contraction, ',', data.pressure, ',', data.platelets, ',',
  data.serum_creatinine, ',', data.serum_sodium, ',', data.gender, ',', data.smoking,
  ',', data.time, ',', '?')

  fs.writeFile('data.arff', arffdata, err => {
      if (err) {
          console.log('error in writing file.');
      }
  })

  // execute cmd weka classifier function and console-log result
  exec("java weka.classifiers.functions.Logistic -T data.arff -l heart_failure.model -p 0"
  , (error, stdout, stderr) => {
  //save result in var to pass to the front end
  result = stdout;
  console.log(result);
  });
}
